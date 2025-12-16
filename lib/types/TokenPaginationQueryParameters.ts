export interface TokenPaginationQueryParameters {
  /**
   * The lastKey token returned from the previous page of results. If not specified, the first page of results is returned.
   */
  lastKey?: string;

  /**
   * The maximum number of items to return in the response. The actual number of items returned may be less than maxItems.
   */
  maxItems?: number;
}
