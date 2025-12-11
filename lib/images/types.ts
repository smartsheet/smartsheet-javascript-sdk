import type { FailedItem } from '../webhooks/types';
import type { ApiError, BaseResponseStatus } from '../types';
import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';

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

export interface Row {
  id: number;
  sheetId: number;
  siblingId: number;
  accessLevel: string;
  attachments?: Attachment[];
  cells: Cell[];
  columns: Column[];
  conditionalFormat?: string;
  createdAt: string | number;
  createdBy: User;
  discussions?: Discussion[];
  proof: Proof;
  expanded: boolean;
  filteredOut?: boolean;
  format?: string;
  inCriticalPath?: boolean;
  locked: boolean;
  lockedForUser: boolean;
  modifiedAt: string | number;
  modifiedBy: User;
  permaLink?: string;
  rowNumber: number;
  version: number;
}

export interface Cell {
  columnId: number;
  columnType?: string;
  conditionalFormat?: string;
  displayValue: string;
  format?: string;
  formula: string;
  hyperlink: Hyperlink;
  image?: CellImage;
  linkInFromCell?: CellLink;
  linksOutToCells?: CellLink[];
  objectValue: ObjectValue;
  overrideValidation?: boolean;
  strict: boolean;
  value?: string | number | boolean | null;
}

export interface Attachment {
  id: number;
  parentId: number;
  attachmentType: string;
  attachmentSubType: string;
  mimeType: string;
  parentType: string;
  createdAt: string | number;
  createdBy: User;
  name: string;
  sizeInKb: number;
  url: string;
  urlExpiresInMillis: number;
}

export interface Column {
  autoNumberFormat: AutoNumberFormat;
  contactOptions: ContactOption[];
  description: string;
  format?: string;
  formula: string;
  hidden: boolean;
  id: number;
  index: number;
  locked: boolean;
  lockedForUser: boolean;
  options: string[];
  primary?: boolean;
  symbol?: string;
  systemColumnType: string;
  tags: string[];
  title: string;
  type: string;
  validation: boolean;
  version: number;
  width: number;
}

export interface User {
  email: string;
  name: string;
}

export interface Discussion {
  accessLevel: string;
  id: number;
  comments?: Comment[];
  commentAttachments?: Attachment[];
  commentCount: number;
  createdBy: User;
  lastCommentedAt: string | number;
  lastCommentedUser: User;
  parentId: number;
  parentType: string;
  readOnly: boolean;
  title: string;
}

export interface Proof {
  id: number;
  originalId: number;
  name?: string;
  type: string;
  documentType: string;
  proofRequestUrl: string;
  version: number;
  lastUpdatedAt: string | number;
  lastUpdatedBy: User;
  isCompleted: boolean;
  attachments?: Attachment[];
  discussions?: Discussion[];
}

export interface Hyperlink {
  reportId?: number;
  sheetId?: number;
  sightId?: number;
  url?: string;
}

export interface CellImage {
  altText: string;
  height: number;
  id: string;
  width: number;
}

export interface CellLink {
  columnId: number;
  rowId: number;
  sheetId: number;
  sheetName: string;
  status: string;
}

export interface ObjectValue {
  objectType: string;
  value: string;
}

export interface AutoNumberFormat {
  fill: string;
  prefix: string;
  startingNumber: number;
  suffix: string;
}

export interface ContactOption {
  email: string;
  name: string;
}
