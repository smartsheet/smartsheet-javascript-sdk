import type { Folder } from '../folders/types';
import type { BaseResponseStatus } from '../types/BaseResponseStatus';
import type { PaginationResponse } from '../types/PaginationResponse';
import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';

/**
 * @deprecated The Home endpoints are being shut off as part of the sheets folder deprecation.
 * See: https://developers.smartsheet.com/api/smartsheet/guides/updating-code/migrate-from-using-the-sheets-folder
 */
export interface HomeApi {
  /**
   * Lists the contents of the user's Home.
   *
   * @param options - Optional configuration options for the request
   * @param callback - {@link RequestCallback} - Optional callback function
   * @returns Promise with the Home contents
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `GET /home`.
   * This endpoint is no longer listed in the Smartsheet OpenAPI spec, so the response is loosely typed.
   *
   * @deprecated See: https://developers.smartsheet.com/api/smartsheet/guides/updating-code/migrate-from-using-the-sheets-folder
   */
  listContents: (
    options?: RequestOptions<undefined, undefined>,
    callback?: RequestCallback<Record<string, unknown>>
  ) => Promise<Record<string, unknown>>;

  /**
   * Lists the folders in the user's Home.
   *
   * @param options - Optional configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link PaginationResponse}\<{@link Folder}\>\> - Optional callback function
   * @returns Promise\<{@link PaginationResponse}\<{@link Folder}\>\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `GET /home/folders`
   *
   * @deprecated See: https://developers.smartsheet.com/api/smartsheet/guides/updating-code/migrate-from-using-the-sheets-folder
   */
  listFolders: (
    options?: RequestOptions<ListHomeFoldersQueryParameters, undefined>,
    callback?: RequestCallback<PaginationResponse<Folder>>
  ) => Promise<PaginationResponse<Folder>>;

  /**
   * Creates a folder in the user's Home.
   *
   * @param options - Configuration options for the request; `body.name` is the folder name
   * @param callback - {@link RequestCallback}\<{@link CreateHomeFolderResponse}\> - Optional callback function
   * @returns Promise\<{@link CreateHomeFolderResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `POST /home/folders`
   *
   * @deprecated See: https://developers.smartsheet.com/api/smartsheet/guides/updating-code/migrate-from-using-the-sheets-folder
   */
  createFolder: (
    options: RequestOptions<undefined, { name: string }>,
    callback?: RequestCallback<CreateHomeFolderResponse>
  ) => Promise<CreateHomeFolderResponse>;
}

export interface ListHomeFoldersQueryParameters {
  /** If true, include all results; do not paginate. */
  includeAll?: boolean;
  /** Which page to return. */
  page?: number;
  /** Maximum number of items to return per page. */
  pageSize?: number;
}

export interface CreateHomeFolderResponse extends BaseResponseStatus {
  /** The created folder. */
  result: Folder;
}
