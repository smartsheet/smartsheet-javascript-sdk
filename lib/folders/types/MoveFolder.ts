import type { FolderDestinationTypeEnum } from "../types";

export interface MoveFolderBody {
    /**
     * @description The ID of the destination container.
     */
    destinationId: number;
    /**
     * @description Type of destination container.
     */
    destinationType?: FolderDestinationTypeEnum | null;
}

export interface MoveFolderResponse {
    /**
     * @description The ID of the destination container.
     */
    destinationId: number;
    /**
     * @description The type of the destination container.
     */
    destinationType?: FolderDestinationTypeEnum | null;
}