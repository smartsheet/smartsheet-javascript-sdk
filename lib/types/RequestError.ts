import type { ApiError } from './ApiError';

/**
 * The error passed to request callbacks: the Smartsheet API error fields plus the HTTP response details.
 */
export interface RequestError extends ApiError {
  /** HTTP status code; absent on network failures. */
  statusCode?: number;
  /** HTTP response headers. */
  headers?: Record<string, unknown>;
  /** Raw response body. */
  body?: unknown;
  /** Additional error details returned by some endpoints. */
  detail?: unknown;
}
