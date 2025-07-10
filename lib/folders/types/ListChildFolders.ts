import type { Folder, FolderPath } from '../types';

export interface ListChildFoldersOptions extends FolderPath {
  /**
   * @description If true, include all results, that is, do not paginate. Mutually exclusive with page and pageSize (they are ignored if includeAll=true is specified).
   * @default false
   */
  includeAll?: boolean;
  /**
   * @description Which page to return. Defaults to 1 if not specified. If you specify a value greater than the total number of pages, the last page of results is returned.
   * @default 1
   */
  page?: number;
  /**
   * @description The maximum number of items to return per page. Unless otherwise stated for a specific endpoint, defaults to 100. If only page is specified, defaults to a page size of 100. For reports, the default is 100 rows. If you need larger sets of data from your report, returns a maximum of 10,000 rows per request.
   * @default 100
   */
  pageSize?: number;
}

export interface ListChildFoldersResponse {
  /**
   * @description The current page in the full result set that the data array represents. NOTE when a page number greater than totalPages is requested, the last page is instead returned.
   * @example 1
   */
  pageNumber: number;
  /**
   * @description The number of items in a page. Omitted if there is no limit to page size (and hence, all results are included). Unless otherwise specified, this defaults to 100 for most endpoints.
   * @example 50
   */
  pageSize: number | null;
  /**
   * @description The total number of pages in the full result set.
   * @example 25
   */
  totalPages: number;
  /**
   * @description The total number of items in the full result set.
   * @example 136
   */
  totalCount: number;
  /**
   * @description Array of Folder objects.
   * @see {@link Folder}
   */
  result: Folder[];
}
