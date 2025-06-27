export enum MoveFolderDestinationTypeEnum {
    FOLDER = 'folder',
    /**
     * @deprecated
     * @description The HOME destination type is deprecated since March 25, 2025, and will be removed.
     */
    HOME = 'home',
    WORKSPACE = 'workspace',
}

export interface MoveFolderBody {
    /**
     * @description The ID of the destination container.
     */
    destinationId: number;
    /**
     * @description Type of destination container.
     */
    destinationType?: MoveFolderDestinationTypeEnum | null;
}

export interface MoveFolderResponse {
    /**
     * @description The ID of the destination container.
     */
    destinationId: number;
    /**
     * @description The type of the destination container.
     */
    destinationType?: MoveFolderDestinationTypeEnum | null;
}