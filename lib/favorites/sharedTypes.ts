import { OptionsToSend, Requestor } from '../types';

export type Pagination = {
  /**
   * @description Which page to return. Defaults to 1 if not specified. If you specify a value greater than the total number of pages, the last page of results is returned.
   *
   */
  page?: number;
  /**
   * @description The maximum number of items to return per page. Unless otherwise stated for a specific endpoint, defaults to 100. If only page is specified, defaults to a page size of 100. For reports, the default is 100 rows. If you need larger sets of data from your report, returns a maximum of 10,000 rows per request.
   */
  pageSize?: number;
};

export type PaginationResponse = {
  pageNumber: number;
  pageSize?: number;
  totalPages: number;
  totalCount: number;
};

export enum FavoritableResource {
  Folder = 'folder',
  Report = 'report',
  Sheet = 'sheet',
  Sight = 'sight',
  Template = 'template',
  Workspace = 'workspace',
}

export enum ResponseStatusMessage {
  PartialSuccess = 'PARTIAL_SUCCESS',
  SUCCESS = 'SUCCESS',
}

export enum ResultCode {
  Success = 0,
  PartialSuccess = 3,
}

export type PostResult = {
  /**
   * @description Message that indicates the outcome of the request. (One of SUCCESS or PARTIAL_SUCCESS)
   */
  message: ResponseStatusMessage;
  /**
   * @description number indicating result status: 0 Success, 3 Partial Success of Bulk Operation
   *
   */
  resultCode: ResultCode;
};

export type FavoriteItem = {
  objectId: string;
  type: FavoritableResource;
};

export type ApiGenerator<T> = (requestor: Requestor, optionsToSend: OptionsToSend) => T;
