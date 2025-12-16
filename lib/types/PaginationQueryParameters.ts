/**
 * Common pagination query parameters used across multiple endpoints.
 */
export interface PaginationQueryParameters {
  /**
   * If true, include all results (do not paginate).
   * Mutually exclusive with page and pageSize.
   * @defaultValue false
   */
  includeAll?: boolean;

  /**
   * Which page to return.
   * @defaultValue 1
   */
  page?: number;

  /**
   * The maximum number of items to return per page.
   * @defaultValue 100
   */
  pageSize?: number;
}
