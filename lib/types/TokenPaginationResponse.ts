/**
 * Common token-based pagination response structure used across multiple endpoints.
 */
export interface TokenPaginationResponse<T> {
  /**
   * The lastKey token to be used in the next request to retrieve the next page of results.
   * If null, there are no more pages of results.
   */
  lastKey?: string | null;

  /**
   * Array of data items.
   */
  data: T[];
}
