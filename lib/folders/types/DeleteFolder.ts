import type { FolderResultCodeEnum, FolderResultMessageEnum } from '../types';

export interface DeleteFolderResponse {
  /**
   * @description Message that indicates the result of the request.
   * @example "SUCCESS" or "PARTIAL_SUCCESS"
   */
  message: FolderResultMessageEnum;
  /**
   * @description '0' for success, '3' for partial success of Bulk Operation
   * @example 0 or 3
   */
  resultCode: FolderResultCodeEnum;
}
