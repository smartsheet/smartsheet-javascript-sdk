import type { Folder, FolderPath } from "../types";

export enum CreateChildFolderQueryEnum {
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
     * @description NOTE: Cell history is not copied, regardless of which include parameter values are specified.
     */
    SHARES = 'shares',
}

export interface CreateChildFolderOptions extends FolderPath {
    /**
     * @description A comma-separated list of elements to copy
     * @example "attachments,cellLinks,data,discussions,filters,forms,ruleRecipients,rules,shares"
     * @see {@link CreateChildFolderQueryEnum}
     */
    include?: string;
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

export interface CreateChildFolderBody {
    /**
     * @description Folder Id.
     */
    id?: number;
    /**
     * @description Returned only if the user has marked the folder as a favorite in their "Home" tab (value = true).
     * @deprecated
     */
    favorite?: boolean;
    /**
     * @description Array of Folder objects.
     * @see {@link Folder}
     */
    folders?: Folder[];
}

export enum CreateChildFolderResultMessageEnum {
    SUCCESS = 'SUCCESS',
    PARTIAL_SUCCESS = 'PARTIAL_SUCCESS',
}

export enum CreateChildFolderResultCodeEnum {
    SUCCESS = 3,
    PARTIAL_SUCCESS = 0,
}

export interface CreateChildFolderResponse {
    message: CreateChildFolderResultMessageEnum;
    resultCode: CreateChildFolderResultCodeEnum;
    result: Folder;
}