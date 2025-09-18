/**
 * Production-safe logger utility
 * Only logs in development mode or when explicitly enabled
 */

import { env } from './env';

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: any;
}

class Logger {
  private isDevelopment = env.NODE_ENV === 'development';
  private isEnabled = this.isDevelopment || process.env.ENABLE_LOGGING === 'true';

  private formatMessage(level: LogLevel, message: string, context?: LogContext): string {
    const timestamp = new Date().toISOString();
    const contextString = context ? ` ${JSON.stringify(context)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${contextString}`;
  }

  debug(message: string, context?: LogContext): void {
    if (this.isEnabled) {
      console.debug(this.formatMessage('debug', message, context));
    }
  }

  info(message: string, context?: LogContext): void {
    if (this.isEnabled) {
      console.info(this.formatMessage('info', message, context));
    }
  }

  warn(message: string, context?: LogContext): void {
    // Warnings are always logged in production
    console.warn(this.formatMessage('warn', message, context));
  }

  error(message: string, error?: Error | unknown, context?: LogContext): void {
    // Errors are always logged in production
    const errorContext = {
      ...context,
      ...(error instanceof Error ? {
        errorMessage: error.message,
        errorStack: this.isDevelopment ? error.stack : undefined,
      } : {
        error: String(error),
      }),
    };
    console.error(this.formatMessage('error', message, errorContext));
  }

  /**
   * Log high-value events that should always be visible
   * (e.g., high-value leads, successful transactions)
   */
  important(message: string, context?: LogContext): void {
    // Important logs are always shown
    console.log(`[IMPORTANT] ${message}`, context || '');
  }
}

export const logger = new Logger();