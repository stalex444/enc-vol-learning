'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    // Log error to console for debugging
    console.error('Application error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-primary-50/20 to-white flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">⚠️</span>
        </div>
        
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          Something went wrong
        </h1>
        
        <p className="text-gray-600 mb-4">
          We encountered an unexpected error. Don't worry - your progress is saved.
        </p>

        {/* Always show error message */}
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg text-left">
          <p className="text-sm font-semibold text-red-900 mb-2">Error:</p>
          <p className="text-sm text-red-800">{error.message}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.location.href = '/learn'}
            className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-full font-medium hover:shadow-lg transition-all"
          >
            Back to Modules
          </button>
          
          <button
            onClick={() => window.location.href = '/'}
            className="px-6 py-3 bg-white text-primary-700 border-2 border-primary-200 rounded-full font-medium hover:border-primary-400 transition-all"
          >
            Go to home
          </button>
        </div>

        {process.env.NODE_ENV === 'development' && error.stack && (
          <details className="mt-8 text-left">
            <summary className="text-sm text-gray-500 cursor-pointer hover:text-gray-700">
              Stack trace (development only)
            </summary>
            <pre className="mt-4 p-4 bg-gray-100 rounded-lg text-xs overflow-auto">
              {error.stack}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
