import type { FolderPath } from '../types';

export enum CopyFolderQueryEnum {
  ATTACHMENTS = 'attachments',
  /**
   * @description includes cross-sheet references
   */
  CELL_LINKS = 'cellLinks',
  /**
   * @description includes formatting
   */
  DATA = 'data',
  /**
   * @description includes comments
   */
  DISCUSSIONS = 'discussions',
  FILTERS = 'filters',
  FORMS = 'forms',
  /**
   * @description includes notification recipients, must also include rules when using this attribute
   */
  RULE_RECIPIENTS = 'ruleRecipients',
  /**
   * @description includes notifications and workflow rules
   */
  RULES = 'rules',
  /**
   * @description Cell history is not copied, regardless of which include parameter values are specified
   */
  SHARES = 'shares',
}

export interface CopyFolderOptions extends FolderPath {
  /**
   * @description A comma-separated list of elements to copy
   * @example "attachments,cellLinks,data,discussions,filters,forms,ruleRecipients,rules,shares"
   * @see {@link CopyFolderQueryEnum}
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

export enum CopyFolderDestinationTypeEnum {
    FOLDER = 'folder',
    /**
     * @deprecated
     * @description The HOME destination type is deprecated since March 25, 2025, and will be removed.
     */
    HOME = 'home',
    WORKSPACE = 'workspace',
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
    destinationType?: CopyFolderDestinationTypeEnum | null;
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
    destinationType?: CopyFolderDestinationTypeEnum | null;
    /**
     * @description The name of the newly created object (when copying a dashboard, folder, sheet, or workspace).
     */
    newName?: string;
}