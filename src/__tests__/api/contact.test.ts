/**
 * @jest-environment node
 */

import { NextRequest } from 'next/server';
import { POST } from '@/app/api/contact/route';

// Mock dependencies
jest.mock('@/lib/rate-limit-redis', () => ({
  rateLimiters: {
    contact: {
      check: jest.fn().mockResolvedValue({
        success: true,
        limit: 5,
        remaining: 4,
        reset: Date.now() + 60000,
      }),
    },
  },
}));

jest.mock('@/lib/email', () => ({
  sendContactEmail: jest.fn().mockResolvedValue({
    ownerEmail: { success: true, data: { id: 'email-1' } },
    senderEmail: { success: true, data: { id: 'email-2' } },
  }),
}));

jest.mock('@/lib/database', () => ({
  createLead: jest.fn().mockResolvedValue({
    success: true,
    data: { id: 'lead-123', name: 'Test User' },
  }),
}));

jest.mock('@/lib/env', () => ({
  isEmailConfigured: jest.fn().mockReturnValue(true),
}));

jest.mock('@/lib/logger', () => ({
  logger: {
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn(),
    important: jest.fn(),
  },
}));

describe('Contact API Route', () => {
  const mockRequest = (body: any): NextRequest => {
    return {
      json: async () => body,
      headers: new Headers({
        'content-type': 'application/json',
      }),
      url: 'http://localhost:3000/api/contact',
      nextUrl: {
        pathname: '/api/contact',
      },
    } as unknown as NextRequest;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /api/contact', () => {
    it('successfully processes valid contact form submission', async () => {
      const validBody = {
        name: 'John Doe',
        email: 'john@example.com',
        company: 'Test Corp',
        role: 'CEO',
        message: 'I would like to discuss a potential project.',
        source: 'website',
      };

      const response = await POST(mockRequest(validBody));
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.message).toContain('Thank you');
      expect(data.leadId).toBe('lead-123');
      expect(data.emailSent).toBe(true);
    });

    it('rejects request with missing required fields', async () => {
      const invalidBody = {
        name: 'John',
        // Missing email and message
      };

      const response = await POST(mockRequest(invalidBody));
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Validation failed');
      expect(data.issues).toBeDefined();
      expect(data.issues).toBeInstanceOf(Array);
    });

    it('validates email format', async () => {
      const invalidEmailBody = {
        name: 'John Doe',
        email: 'invalid-email',
        message: 'Test message with sufficient length',
      };

      const response = await POST(mockRequest(invalidEmailBody));
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Validation failed');
      expect(data.issues).toContainEqual(
        expect.objectContaining({
          field: 'email',
          message: expect.stringContaining('email'),
        })
      );
    });

    it('validates message minimum length', async () => {
      const shortMessageBody = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Too short',
      };

      const response = await POST(mockRequest(shortMessageBody));
      const data = await response.json();

      expect(response.status).toBe(400);
      expect(data.error).toBe('Validation failed');
      expect(data.issues).toContainEqual(
        expect.objectContaining({
          field: 'message',
          message: expect.stringContaining('10 characters'),
        })
      );
    });

    it('handles rate limiting', async () => {
      const { rateLimiters } = require('@/lib/rate-limit-redis');
      rateLimiters.contact.check.mockResolvedValueOnce({
        success: false,
        limit: 5,
        remaining: 0,
        reset: Date.now() + 60000,
      });

      const validBody = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message with sufficient length',
      };

      const response = await POST(mockRequest(validBody));
      const data = await response.json();

      expect(response.status).toBe(429);
      expect(data.error).toContain('Too many requests');
      expect(data.retryAfter).toBeDefined();
      expect(response.headers.get('X-RateLimit-Limit')).toBe('5');
      expect(response.headers.get('X-RateLimit-Remaining')).toBe('0');
    });

    it('continues even if email sending fails', async () => {
      const { sendContactEmail } = require('@/lib/email');
      sendContactEmail.mockResolvedValueOnce({
        ownerEmail: { success: false, error: 'Email service error' },
        senderEmail: { success: false, error: 'Email service error' },
      });

      const validBody = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message with sufficient length',
      };

      const response = await POST(mockRequest(validBody));
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.emailSent).toBe(false);
    });

    it('works without email configuration', async () => {
      const { isEmailConfigured } = require('@/lib/env');
      isEmailConfigured.mockReturnValueOnce(false);

      const validBody = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message with sufficient length',
      };

      const response = await POST(mockRequest(validBody));
      const data = await response.json();

      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.emailSent).toBe(false);
    });

    it('logs high-value leads', async () => {
      const { logger } = require('@/lib/logger');
      const highValueBody = {
        name: 'Jane CEO',
        email: 'jane@bigcorp.com',
        company: 'Big Corporation',
        role: 'CEO',
        message: 'We have a significant budget for an urgent AI transformation pilot project and need to move quickly on procurement.',
      };

      await POST(mockRequest(highValueBody));

      expect(logger.important).toHaveBeenCalledWith(
        expect.stringContaining('HIGH-VALUE LEAD'),
        expect.objectContaining({
          email: 'jane@bigcorp.com',
          company: 'Big Corporation',
        })
      );
    });

    it('handles database errors gracefully', async () => {
      const { createLead } = require('@/lib/database');
      createLead.mockResolvedValueOnce({
        success: false,
        error: 'Database connection failed',
      });

      const validBody = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message with sufficient length',
      };

      const response = await POST(mockRequest(validBody));
      const data = await response.json();

      // Should still succeed even if database fails
      expect(response.status).toBe(200);
      expect(data.success).toBe(true);
    });

    it('handles unexpected errors', async () => {
      const request = mockRequest(null);
      request.json = async () => {
        throw new Error('JSON parsing failed');
      };

      const response = await POST(request);
      const data = await response.json();

      expect(response.status).toBe(500);
      expect(data.error).toContain('unexpected error');
    });
  });
});