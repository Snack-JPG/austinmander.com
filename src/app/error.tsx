'use client';

import { useEffect } from 'react';
import { logger } from '@/lib/logger';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error when component mounts
    logger.error('Application error occurred', error, {
      digest: error.digest,
    });
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <svg
            className="mx-auto h-12 w-12 text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Something went wrong!
        </h1>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          An unexpected error has occurred. Our team has been notified and is working on a fix.
        </p>
        
        {process.env.NODE_ENV === 'development' && (
          <details className="mb-8 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-600">
              Error details (development only)
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-4 rounded overflow-auto">
              {error.message}
              {error.stack}
            </pre>
          </details>
        )}
        
        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
          >
            Try again
          </button>
          
          <a
            href="/"
            className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}