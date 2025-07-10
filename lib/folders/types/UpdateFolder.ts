import type { Folder, FolderResultCodeEnum, FolderResultMessageEnum } from '../types';
import type { GridListing } from '../../types';

export interface FailedItemsError {
  /**
   * @description The Id of the specific error occurance. Please include this information when contacting Smartsheet support.
   */
  refId?: string;
  /**
   * @description Custom error code from Smartsheet. See the complete {@link https://developers.smartsheet.com/api/smartsheet/error-codes|Error Code List}
   */
  errorCode: number;
  /**
   * @description Descriptive error message.
   */
  message: string;
}

export interface BulkItemFailure {
  /**
   * @description The Id of the row that failed. Applicable only to bulk row operations.
   */
  rowId: number | null;
  /**
   * @description The error caused by the failed item.
   */
  error: FailedItemsError;
  /**
   * @description The index of the failed item in the bulk request array.
   */
  index: number;
}

export interface UpdateFolderBody {
  /**
   * @description Folder Id.
   */
  folderId?: number;
  /**
   * @description Folders contained in folder.
   * @see {@link Folder}
   */
  folders?: Folder[];
  /**
   * @description Folder name.
   */
  name?: string;
  /**
   * @description URL that represents a direct link to the folder in Smartsheet.
   */
  permalink?: string;
  /**
   * @description Reports contained in folder.
   */
  reports?: GridListing[];
  /**
   * @description Sheets contained in folder.
   */
  sheets?: GridListing[];
  /**
   * @description Dashboards contained in folder.
   */
  sights?: GridListing[];
  /**
   * @description Templates contained in folder.
   */
  templates?: GridListing[];
  /**
   * @description Returned only if the user has marked the folder as a favorite in their "Home" tab (value = true).
   * @deprecated
   */
  favorite?: boolean;
}

export interface UpdateFolderResponse {
  /**
   * @description New version of the sheet. Applicable only for operations which update sheet data.
   */
  version: number | null;
  /**
   * @description Array of BulkItemFailure objects which represents the items that failed to be added or updated. See {@link https://developers.smartsheet.com/api/smartsheet/guides/advanced-topics/scalability-options| Bulk operations > Partial success} for more information. Applicable only for bulk operations that support partial success.
   */
  failedItems: BulkItemFailure[];
  /**
   * @description Message that indicates the outcome of the request.
   * @example "SUCCESS" or "PARTIAL_SUCCESS"
   */
  message: FolderResultMessageEnum;
  /**
   * @description '0' for success, '3' for partial success of Bulk Operation
   * @example 0 or 3
   */
  resultCode: FolderResultCodeEnum;
  /**
   * @description Can contain dashboards, folders, reports, sheets, or templates.
   * @see {@link Folder}
   */
  result: Folder;
}
