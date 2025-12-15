import type { ApiError } from '../types/ApiError';
import type { Row } from '../rows/types';
import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';
import type { FailedItem } from '../types/FailedItem';
import type { BaseResponseStatus } from '../types/BaseResponseStatus';

// ============================================================================
// Images API Interface
// ============================================================================

export interface ImagesApi {
  /**
   * Gets temporary URLs for accessing cell images or attachment images.
   *
   * @param options - {@link RequestOptions}\<undefined, {@link ImageUrl}[]\> - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link ListImageUrlsResponse}\> - Optional callback function
   * @returns Promise\<{@link ListImageUrlsResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `POST /imageurls`
   *
   * @example
   * ```typescript
   * const result = await client.images.listImageUrls({
   *   body: [
   *     { imageId: 'jpbGklqdfZuL4Jw-kZhdZA', height: 40, width: 20 }
   *   ]
   * });
   * ```
   */
  listImageUrls: (
    options: RequestOptions<undefined, ImageUrl[]>,
    callback?: RequestCallback<ListImageUrlsResponse>
  ) => Promise<ListImageUrlsResponse>;

  /**
   * Uploads an image to the specified cell within a sheet.
   *
   * @param options - {@link AddImageToCellOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link AddImageToCellResponse}\> - Optional callback function
   * @returns Promise\<{@link AddImageToCellResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `POST /sheets/{sheetId}/rows/{rowId}/columns/{columnId}/cellimages`
   *
   * @example
   * ```typescript
   * const fs = require('fs');
   *
   * const options = {
   *   sheetId: 1696831624483716,
   *   rowId: 1049441315358596,
   *   columnId: 74761903175665540,
   *   fileSize: 458,
   *   fileName: 'img_pl_decisionshapesHold.png',
   *   fileStream: fs.createReadStream('/path/to/image.png'),
   *   queryParameters: {
   *     altText: 'Caution sign',
   *     overrideValidation: true
   *   }
   * };
   *
   * const result = await client.images.addImageToCell(options);
   * ```
   */
  addImageToCell: (
    options: AddImageToCellOptions,
    callback?: RequestCallback<AddImageToCellResponse>
  ) => Promise<AddImageToCellResponse>;
}

// ============================================================================
// List Image URLs
// ============================================================================

/**
 * Represents an image URL request/response item.
 */
export interface ImageUrl {
  /**
   * Image ID.
   */
  imageId: string;

  /**
   * The error caused by the failed item.
   */
  error?: ApiError;

  /**
   * Image height (in pixels).
   */
  height?: number;

  /**
   * Image width (in pixels).
   */
  width?: number;

  /**
   * Temporary URL that can be used to retrieve the image.
   */
  url?: string;
}

/**
 * Response from listing image URLs.
 */
export interface ListImageUrlsResponse {
  /**
   * Array of ImageUrl objects with temporary URLs.
   */
  imageUrls: ImageUrl[];

  /**
   * Milliseconds before the URLs within imageUrls expire.
   */
  urlExpiresInMillis: number;
}

// ============================================================================
// Add Image to Cell
// ============================================================================

export interface AddImageToCellQueryParams {
  /**
   * Url-encoded alternate text for the image
   */
  altText?: string;

  /**
   * You may use the query string parameter overrideValidation with a value of true to allow a cell value outside of the validation limits. You must specify strict with a value of false to bypass value type checking.
   */
  overrideValidation?: boolean;
}

export interface AddImageToCellOptions extends RequestOptions<AddImageToCellQueryParams, Buffer | Blob | ArrayBuffer> {
  /**
   * Sheet Id of the sheet being accessed.
   */
  sheetId: number;

  /**
   * Row Id in the sheet being accessed.
   */
  rowId: number;

  /**
   * Column Id in the sheet being accessed.
   */
  columnId: number;
}

export interface AddImageToCellResponse extends BaseResponseStatus {
  version: number;
  failedItems?: FailedItem[];
  result: Row;
}
