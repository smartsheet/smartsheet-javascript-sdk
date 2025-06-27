import type { FolderDestinationTypeEnum, FolderPath } from '../types';
// ignoring as this is for documentation purposes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { FolderQueryEnum } from '../types';
// ignoring as this is for documentation purposes
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { FolderSkipRemapEnum } from '../types';

export interface CopyFolderOptions extends FolderPath {
  /**
   * @description A comma-separated list of elements to copy
   * @example "attachments,cellLinks,data,discussions,filters,forms,ruleRecipients,rules,shares"
   * @see {@link FolderQueryEnum}
   */
  include: string;
  /**
   * @description When specified with a value of sheetHyperlinks, excludes this category from the response
   * @example "sheetHyperlinks"
   */
  exclude?: "sheetHyperlinks";
  /**
   * @description A comma-separated list of references to NOT re-map for the newly created folder.
   * @example "cellLinks,reports,sheetHyperlinks,sights"
   * @see {@link FolderSkipRemapEnum}
   */
  skipRemap?: string;
}

export interface CopyFolderBody {
    /**
     * @description The ID of the destination container.
     */
    destinationId: number;
    /**
     * @description Type of destination container.
     * @note The HOME destination type is deprecated since March 25, 2025, and will be removed.
     */
    destinationType?: FolderDestinationTypeEnum | null;
    /**
     * @description Name of the newly created object (when copying a dashboard, folder, sheet, or workspace).
     */
    newName?: string;
}

export interface CopyFolderResponse {
    /**
     * @description The ID of the destination container.
     */
    destinationId: number;
    /**
     * @description The type of the destination container.
     */
    destinationType?: FolderDestinationTypeEnum | null;
    /**
     * @description The name of the newly created object (when copying a dashboard, folder, sheet, or workspace).
     */
    newName?: string;
}