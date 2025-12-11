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

/**
 * Extended pagination query parameters that include modifiedSince filter.
 */
export interface PaginationWithModifiedSinceQueryParameters extends PaginationQueryParameters {
  /**
   * When specified with a date and time value, response only includes
   * the objects that are modified on or after the date and time specified.
   * Can be a timestamp string (ISO-8601) or number (milliseconds since UNIX epoch).
   */
  modifiedSince?: string | number;

  /**
   * If true, dates/times are sent and received as milliseconds since
   * the UNIX epoch (midnight on January 1, 1970 in UTC time).
   * @defaultValue false
   */
  numericDates?: boolean;
}
