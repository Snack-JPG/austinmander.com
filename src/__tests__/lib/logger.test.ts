import { logger } from '@/lib/logger';

describe('Logger', () => {
  let originalEnv: string | undefined;
  let consoleSpy: {
    debug: jest.SpyInstance;
    info: jest.SpyInstance;
    warn: jest.SpyInstance;
    error: jest.SpyInstance;
    log: jest.SpyInstance;
  };

  beforeEach(() => {
    originalEnv = process.env.NODE_ENV;
    consoleSpy = {
      debug: jest.spyOn(console, 'debug').mockImplementation(),
      info: jest.spyOn(console, 'info').mockImplementation(),
      warn: jest.spyOn(console, 'warn').mockImplementation(),
      error: jest.spyOn(console, 'error').mockImplementation(),
      log: jest.spyOn(console, 'log').mockImplementation(),
    };
  });

  afterEach(() => {
    Object.defineProperty(process.env, 'NODE_ENV', {
      value: originalEnv,
      writable: true,
    });
    jest.restoreAllMocks();
  });

  describe('in development mode', () => {
    beforeEach(() => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'development',
        writable: true,
      });
    });

    it('logs debug messages', () => {
      logger.debug('Debug message');
      expect(consoleSpy.debug).toHaveBeenCalled();
      expect(consoleSpy.debug).toHaveBeenCalledWith(
        expect.stringContaining('[DEBUG] Debug message')
      );
    });

    it('logs info messages', () => {
      logger.info('Info message');
      expect(consoleSpy.info).toHaveBeenCalled();
      expect(consoleSpy.info).toHaveBeenCalledWith(
        expect.stringContaining('[INFO] Info message')
      );
    });

    it('logs warning messages', () => {
      logger.warn('Warning message');
      expect(consoleSpy.warn).toHaveBeenCalled();
      expect(consoleSpy.warn).toHaveBeenCalledWith(
        expect.stringContaining('[WARN] Warning message')
      );
    });

    it('logs error messages with stack trace', () => {
      const error = new Error('Test error');
      logger.error('Error occurred', error);
      expect(consoleSpy.error).toHaveBeenCalled();
      expect(consoleSpy.error).toHaveBeenCalledWith(
        expect.stringContaining('[ERROR] Error occurred'),
        expect.stringContaining('Test error')
      );
    });

    it('logs messages with context', () => {
      logger.info('User action', { userId: 123, action: 'login' });
      expect(consoleSpy.info).toHaveBeenCalledWith(
        expect.stringContaining('[INFO] User action'),
        expect.stringContaining('"userId":123')
      );
    });
  });

  describe('in production mode', () => {
    beforeEach(() => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'production',
        writable: true,
      });
    });

    it('does not log debug messages', () => {
      logger.debug('Debug message');
      expect(consoleSpy.debug).not.toHaveBeenCalled();
    });

    it('does not log info messages', () => {
      logger.info('Info message');
      expect(consoleSpy.info).not.toHaveBeenCalled();
    });

    it('always logs warning messages', () => {
      logger.warn('Warning message');
      expect(consoleSpy.warn).toHaveBeenCalled();
    });

    it('always logs error messages without stack trace', () => {
      const error = new Error('Test error');
      logger.error('Error occurred', error);
      expect(consoleSpy.error).toHaveBeenCalled();
      const call = consoleSpy.error.mock.calls[0][0];
      expect(call).toContain('[ERROR] Error occurred');
      expect(call).not.toContain('at '); // Stack trace should not be included
    });

    it('always logs important messages', () => {
      logger.important('High-value lead', { score: 95 });
      expect(consoleSpy.log).toHaveBeenCalled();
      expect(consoleSpy.log).toHaveBeenCalledWith(
        '[IMPORTANT] High-value lead',
        { score: 95 }
      );
    });
  });

  describe('with ENABLE_LOGGING flag', () => {
    it('logs when ENABLE_LOGGING is true in production', () => {
      Object.defineProperty(process.env, 'NODE_ENV', {
        value: 'production',
        writable: true,
      });
      process.env.ENABLE_LOGGING = 'true';
      
      // Re-import to get new instance with updated env
      jest.resetModules();
      const { logger: loggerWithFlag } = require('@/lib/logger');
      
      loggerWithFlag.info('Should be logged');
      expect(consoleSpy.info).toHaveBeenCalled();
      
      delete process.env.ENABLE_LOGGING;
    });
  });

  describe('error handling', () => {
    it('handles non-Error objects in error method', () => {
      logger.error('String error', 'This is a string error');
      expect(consoleSpy.error).toHaveBeenCalled();
      expect(consoleSpy.error).toHaveBeenCalledWith(
        expect.stringContaining('[ERROR] String error'),
        expect.stringContaining('This is a string error')
      );
    });

    it('handles null/undefined errors gracefully', () => {
      logger.error('Null error', null);
      expect(consoleSpy.error).toHaveBeenCalled();
      
      logger.error('Undefined error', undefined);
      expect(consoleSpy.error).toHaveBeenCalled();
    });
  });

  describe('timestamp formatting', () => {
    it('includes ISO timestamp in all log messages', () => {
      const now = new Date();
      jest.spyOn(Date.prototype, 'toISOString').mockReturnValue('2024-01-01T12:00:00.000Z');
      
      logger.info('Test message');
      expect(consoleSpy.info).toHaveBeenCalledWith(
        expect.stringContaining('[2024-01-01T12:00:00.000Z]')
      );
    });
  });
});