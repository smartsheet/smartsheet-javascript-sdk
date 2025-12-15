import type { ApiError } from './ApiError';

/**
 * Represents an item that failed during a bulk operation.
 * Used across multiple endpoints for error reporting.
 */
export interface FailedItem {
  /**
   * Row Id of the failed item (when applicable).
   */
  rowId?: number;

  /**
   * Error details.
   * @see ApiError
   */
  error: ApiError;

  /**
   * Index of the failed item in the request array.
   */
  index?: number;
}
