import type { FolderPath } from '../types';

export enum GetFolderQueryEnum {
  /**
   * @description adds the Source object indicating which object the folder was created from, if any
   */
  source = 'source',
  distributionLink = 'distributionLink',
  /**
   * @description Returns the user with the owner permissions, or the user with admin
   * permissions if there is no owner assigned. If no owner or admins are assigned, the
   * Plan Asset Admin is returned. If no Plan Asset Admin is assigned, the System Admin
   * is returned.
   */
  ownerInfo = 'ownerInfo',
  sheetVersion = 'sheetVersion',
  permalinks = 'permalinks',
}

export interface GetFolderOptions extends FolderPath {
  /**
   * @description A comma-separated list of optional elements to include in the response
   * @example "source,distributionLink,ownerInfo,sheetVersion,permalinks"
   * @see {@link GetFolderQueryEnum}
   */
  include?: string;
}
