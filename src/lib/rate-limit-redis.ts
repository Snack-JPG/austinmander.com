import { NextRequest } from 'next/server';
import Redis from 'ioredis';
import { logger } from './logger';

interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  uniqueTokenPerInterval: number; // Max requests per interval
  prefix?: string; // Redis key prefix
}

interface RateLimitResult {
  success: boolean;
  limit: number;
  remaining: number;
  reset: number;
}

// Redis client singleton
let redisClient: Redis | null = null;

// Initialize Redis client
function getRedisClient(): Redis | null {
  if (redisClient) {
    return redisClient;
  }

  const redisUrl = process.env.REDIS_URL;
  if (!redisUrl) {
    logger.warn('Redis URL not configured, using in-memory rate limiting');
    return null;
  }

  try {
    redisClient = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      retryStrategy: (times) => {
        if (times > 3) {
          logger.error('Redis connection failed after 3 retries');
          return null; // Stop retrying
        }
        return Math.min(times * 100, 3000);
      },
      enableOfflineQueue: false,
    });

    redisClient.on('error', (error) => {
      logger.error('Redis error', error);
      // Fall back to in-memory if Redis fails
      redisClient = null;
    });

    redisClient.on('connect', () => {
      logger.info('Redis connected for rate limiting');
    });

    return redisClient;
  } catch (error) {
    logger.error('Failed to initialize Redis client', error);
    return null;
  }
}

// In-memory fallback store
interface MemoryStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const memoryStore: MemoryStore = {};

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  Object.keys(memoryStore).forEach(key => {
    if (memoryStore[key].resetTime < now) {
      delete memoryStore[key];
    }
  });
}, 60000); // Clean every minute

export class RateLimiterRedis {
  private config: RateLimitConfig;
  private redis: Redis | null;

  constructor(config: RateLimitConfig) {
    this.config = {
      ...config,
      prefix: config.prefix || 'rate-limit:',
    };
    this.redis = getRedisClient();
  }

  private getIdentifier(request: NextRequest): string {
    // Try to get the real IP address
    const forwarded = request.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0].trim() : 
               request.headers.get('x-real-ip') ||
               request.headers.get('cf-connecting-ip') || // Cloudflare
               'unknown';
    
    // Include path to have different limits for different endpoints
    const path = request.nextUrl.pathname;
    return `${ip}:${path}`;
  }

  async checkWithRedis(identifier: string): Promise<RateLimitResult> {
    if (!this.redis) {
      return this.checkWithMemory(identifier);
    }

    const key = `${this.config.prefix}${identifier}`;
    const now = Date.now();
    const window = Math.floor(now / this.config.interval);
    const redisKey = `${key}:${window}`;
    const resetTime = (window + 1) * this.config.interval;

    try {
      // Use Redis pipeline for atomic operations
      const pipeline = this.redis.pipeline();
      pipeline.incr(redisKey);
      pipeline.expire(redisKey, Math.ceil(this.config.interval / 1000));
      
      const results = await pipeline.exec();
      if (!results || results.length === 0) {
        throw new Error('Redis pipeline failed');
      }

      const [[, count]] = results as [[Error | null, number]];
      
      if (typeof count !== 'number') {
        throw new Error('Invalid Redis response');
      }

      const remaining = Math.max(0, this.config.uniqueTokenPerInterval - count);
      
      return {
        success: count <= this.config.uniqueTokenPerInterval,
        limit: this.config.uniqueTokenPerInterval,
        remaining,
        reset: resetTime,
      };
    } catch (error) {
      logger.error('Redis rate limit check failed, falling back to memory', error);
      // Fall back to in-memory rate limiting
      return this.checkWithMemory(identifier);
    }
  }

  private checkWithMemory(identifier: string): RateLimitResult {
    const now = Date.now();
    const resetTime = now + this.config.interval;

    if (!memoryStore[identifier] || memoryStore[identifier].resetTime < now) {
      // First request or expired window
      memoryStore[identifier] = {
        count: 1,
        resetTime: resetTime,
      };
      
      return {
        success: true,
        limit: this.config.uniqueTokenPerInterval,
        remaining: this.config.uniqueTokenPerInterval - 1,
        reset: resetTime,
      };
    }

    const record = memoryStore[identifier];
    
    if (record.count >= this.config.uniqueTokenPerInterval) {
      return {
        success: false,
        limit: this.config.uniqueTokenPerInterval,
        remaining: 0,
        reset: record.resetTime,
      };
    }

    record.count++;
    
    return {
      success: true,
      limit: this.config.uniqueTokenPerInterval,
      remaining: this.config.uniqueTokenPerInterval - record.count,
      reset: record.resetTime,
    };
  }

  async check(request: NextRequest): Promise<RateLimitResult> {
    const identifier = this.getIdentifier(request);
    
    if (this.redis) {
      return this.checkWithRedis(identifier);
    }
    
    return this.checkWithMemory(identifier);
  }

  // Reset rate limit for a specific identifier (useful for testing)
  async reset(request: NextRequest): Promise<void> {
    const identifier = this.getIdentifier(request);
    
    if (this.redis) {
      const key = `${this.config.prefix}${identifier}`;
      const window = Math.floor(Date.now() / this.config.interval);
      const redisKey = `${key}:${window}`;
      
      try {
        await this.redis.del(redisKey);
      } catch (error) {
        logger.error('Failed to reset Redis rate limit', error);
      }
    } else {
      delete memoryStore[identifier];
    }
  }
}

// Create rate limiter instances for different endpoints
export const rateLimiters = {
  // Strict limit for contact form (5 requests per minute)
  contact: new RateLimiterRedis({
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 5,
    prefix: 'rl:contact:',
  }),
  
  // Moderate limit for newsletter (10 requests per minute)
  newsletter: new RateLimiterRedis({
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 10,
    prefix: 'rl:newsletter:',
  }),
  
  // General API limit (100 requests per minute)
  api: new RateLimiterRedis({
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 100,
    prefix: 'rl:api:',
  }),
  
  // Strict limit for admin routes (20 requests per minute)
  admin: new RateLimiterRedis({
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 20,
    prefix: 'rl:admin:',
  }),
};

// Graceful shutdown
if (process.env.NODE_ENV !== 'test') {
  process.on('SIGINT', async () => {
    if (redisClient) {
      await redisClient.quit();
    }
  });
  
  process.on('SIGTERM', async () => {
    if (redisClient) {
      await redisClient.quit();
    }
  });
}