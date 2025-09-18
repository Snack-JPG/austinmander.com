import { NextRequest } from 'next/server';

interface RateLimitConfig {
  interval: number; // Time window in milliseconds
  uniqueTokenPerInterval: number; // Max requests per interval
}

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

// In-memory store (in production, use Redis)
const store: RateLimitStore = {};

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  Object.keys(store).forEach(key => {
    if (store[key].resetTime < now) {
      delete store[key];
    }
  });
}, 60000); // Clean every minute

export class RateLimiter {
  private config: RateLimitConfig;

  constructor(config: RateLimitConfig) {
    this.config = config;
  }

  async check(request: NextRequest): Promise<{ success: boolean; limit: number; remaining: number; reset: number }> {
    const identifier = this.getIdentifier(request);
    const now = Date.now();
    const resetTime = now + this.config.interval;

    if (!store[identifier] || store[identifier].resetTime < now) {
      // First request or expired window
      store[identifier] = {
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

    if (store[identifier].count >= this.config.uniqueTokenPerInterval) {
      // Rate limit exceeded
      return {
        success: false,
        limit: this.config.uniqueTokenPerInterval,
        remaining: 0,
        reset: store[identifier].resetTime,
      };
    }

    // Increment count
    store[identifier].count++;
    return {
      success: true,
      limit: this.config.uniqueTokenPerInterval,
      remaining: this.config.uniqueTokenPerInterval - store[identifier].count,
      reset: store[identifier].resetTime,
    };
  }

  private getIdentifier(request: NextRequest): string {
    // Try to get IP address from various headers
    const forwarded = request.headers.get('x-forwarded-for');
    const real = request.headers.get('x-real-ip');
    const ip = forwarded?.split(',')[0] || real || 'unknown';
    
    // Combine with a user identifier if available (e.g., from auth)
    return `ratelimit:${ip}`;
  }
}

// Preset rate limiters
export const rateLimiters = {
  // Contact form: 5 requests per hour
  contact: new RateLimiter({
    interval: 60 * 60 * 1000, // 1 hour
    uniqueTokenPerInterval: 5,
  }),
  
  // Newsletter: 3 requests per hour
  newsletter: new RateLimiter({
    interval: 60 * 60 * 1000, // 1 hour
    uniqueTokenPerInterval: 3,
  }),
  
  // API: 100 requests per minute
  api: new RateLimiter({
    interval: 60 * 1000, // 1 minute
    uniqueTokenPerInterval: 100,
  }),
  
  // Downloads: 10 per hour
  downloads: new RateLimiter({
    interval: 60 * 60 * 1000, // 1 hour
    uniqueTokenPerInterval: 10,
  }),
};