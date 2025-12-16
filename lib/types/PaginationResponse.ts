/**
 * Common pagination response structure used across multiple endpoints.
 */
export interface PaginationResponse<T> {
  /**
   * The current page in the full result set.
   * @defaultValue 1
   */
  pageNumber: number;

  /**
   * The number of items in a page.
   * @defaultValue 100
   */
  pageSize: number;

  /**
   * The total number of pages in the full result set.
   */
  totalPages: number;

  /**
   * The total number of items in the full result set.
   */
  totalCount: number;

  /**
   * Array of data items.
   */
  data: T[];
}
