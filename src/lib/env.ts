import { z } from 'zod';

// Define environment variable schema
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().optional(),
  SUPABASE_URL: z.string().optional(),
  SUPABASE_ANON_KEY: z.string().optional(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),
  
  // Email
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().email().default('hello@austinmander.com'),
  EMAIL_TO: z.string().email().default('austin@austinmander.com'),
  
  // Calendly
  CALENDLY_TOKEN: z.string().optional(),
  CALENDLY_USER: z.string().optional(),
  CALENDLY_WEBHOOK_SECRET: z.string().optional(),
  
  // Analytics
  GA4_MEASUREMENT_ID: z.string().optional(),
  PLAUSIBLE_DOMAIN: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
  SENTRY_AUTH_TOKEN: z.string().optional(),
  
  // Security
  RECAPTCHA_SITE_KEY: z.string().optional(),
  RECAPTCHA_SECRET_KEY: z.string().optional(),
  
  // Admin
  ADMIN_PASSWORD: z.string().optional(),
  
  // Site Configuration
  NEXT_PUBLIC_SITE_URL: z.string().url().default('https://austinmander.com'),
  NEXT_PUBLIC_SITE_NAME: z.string().default('Austin Mander - AI Consultant'),
  NEXT_PUBLIC_HOURLY_RATE: z.string().transform(Number).default('300'),
  NEXT_PUBLIC_PILOT_PRICE: z.string().transform(Number).default('15000'),
  
  // Feature Flags
  ENABLE_SOW_GENERATOR: z.string().transform(val => val === 'true').default('false'),
  ENABLE_ROI_CALCULATOR: z.string().transform(val => val === 'true').default('false'),
  ENABLE_BOOKING: z.string().transform(val => val === 'true').default('false'),
  
  // Environment
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

// Parse environment variables with defaults
const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:', error.errors);
      // In development, we can continue with defaults
      if (process.env.NODE_ENV === 'development') {
        console.warn('⚠️ Using default values for missing environment variables');
        return envSchema.parse({});
      }
      throw new Error('Missing required environment variables');
    }
    throw error;
  }
};

export const env = parseEnv();

// Helper functions for checking feature availability
export const isEmailConfigured = () => {
  return Boolean(env.RESEND_API_KEY);
};

export const isDatabaseConfigured = () => {
  return Boolean(env.SUPABASE_URL && env.SUPABASE_ANON_KEY);
};

export const isAnalyticsConfigured = () => {
  return Boolean(env.GA4_MEASUREMENT_ID || env.PLAUSIBLE_DOMAIN);
};

export const isBookingEnabled = () => {
  return env.ENABLE_BOOKING && Boolean(env.CALENDLY_TOKEN);
};

export const isSOWGeneratorEnabled = () => {
  return env.ENABLE_SOW_GENERATOR;
};

export const isROICalculatorEnabled = () => {
  return env.ENABLE_ROI_CALCULATOR;
};

// Safe environment variable access for client-side
export const publicEnv = {
  siteUrl: env.NEXT_PUBLIC_SITE_URL,
  siteName: env.NEXT_PUBLIC_SITE_NAME,
  hourlyRate: env.NEXT_PUBLIC_HOURLY_RATE,
  pilotPrice: env.NEXT_PUBLIC_PILOT_PRICE,
  features: {
    sowGenerator: isSOWGeneratorEnabled(),
    roiCalculator: isROICalculatorEnabled(),
    booking: isBookingEnabled(),
  },
};