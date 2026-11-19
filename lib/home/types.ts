import type { CreateFolderBody, Folder } from '../folders/types';
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
   * @param callback - {@link RequestCallback}\<R\> - Optional callback function
   * @returns Promise\<R\>, the Home contents (pass a type for `R` to type the result)
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `GET /home`.
   * This endpoint is no longer listed in the Smartsheet OpenAPI spec, so the response is loosely typed.
   *
   * @deprecated See: https://developers.smartsheet.com/api/smartsheet/guides/updating-code/migrate-from-using-the-sheets-folder
   */
  listContents: <R = Record<string, unknown>>(
    options?: RequestOptions<object, undefined>,
    callback?: RequestCallback<R>
  ) => Promise<R>;

  /**
   * Lists the folders in the user's Home.
   *
   * @param options - Optional configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link PaginationResponse}\<{@link Folder}\>\> - Optional callback function
   * @returns Promise\<{@link PaginationResponse}\<{@link Folder}\>\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `GET /home/folders`.
   * The API returns the folders in `data` (verified against the API); the OpenAPI spec names this field `result`.
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
   * @param options - {@link CreateHomeFolderOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link CreateHomeFolderResponse}\> - Optional callback function
   * @returns Promise\<{@link CreateHomeFolderResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `POST /home/folders`
   *
   * @deprecated See: https://developers.smartsheet.com/api/smartsheet/guides/updating-code/migrate-from-using-the-sheets-folder
   */
  createFolder: (
    options: CreateHomeFolderOptions,
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

export interface CreateHomeFolderOptions extends RequestOptions<undefined, CreateFolderBody & { name: string }> {
  /** The folder to create; `name` is required. */
  body: CreateFolderBody & { name: string };
}

export interface CreateHomeFolderResponse extends BaseResponseStatus {
  /** The created folder. */
  result: Folder;
}
