import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';
import type { BaseResponseStatus } from '../types/BaseResponseStatus';
import type { FailedItem } from '../types/FailedItem';
import { APIAccessLevel } from '@smartsheet/types';

// ============================================================================
// Folders API Interface
// ============================================================================

export interface FoldersApi {
  /**
   * Gets the metadata of a folder.
   *
   * @param options - {@link GetFolderMetadataOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link GetFolderMetadataResponse}\> - Optional callback function
   * @returns Promise\<{@link GetFolderMetadataResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `GET /folders/{folderId}/metadata`
   *
   * @example
   * ```typescript
   * const metadata = await client.folders.getFolderMetadata({
   *   folderId: 7116448184199044
   * });
   * ```
   */
  getFolderMetadata: (
    options: GetFolderMetadataOptions,
    callback?: RequestCallback<GetFolderMetadataResponse>
  ) => Promise<GetFolderMetadataResponse>;

  /**
   * Gets a page of the folder's children of the specified type(s).
   *
   * @param options - {@link GetFolderChildrenOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link GetFolderChildrenResponse}\> - Optional callback function
   * @returns Promise\<{@link GetFolderChildrenResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `GET /folders/{folderId}/children`
   *
   * For pagination guidance, refer to Token-based pagination.
   *
   * @example
   * ```typescript
   * const children = await client.folders.getFolderChildren({
   *   folderId: 7116448184199044,
   *   queryParameters: {
   *     childrenResourceTypes: 'sheets,folders'
   *   }
   * });
   * ```
   */
  getFolderChildren: (
    options: GetFolderChildrenOptions,
    callback?: RequestCallback<GetFolderChildrenResponse>
  ) => Promise<GetFolderChildrenResponse>;

  /**
   * Creates a new folder.
   *
   * @param options - {@link CreateChildFolderOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link CreateFolderResponse}\> - Optional callback function
   * @returns Promise\<{@link CreateFolderResponse}\>
   *
   * @remarks
   * **Who can use this operation:**
   * - **Permissions:** Admin on workspace or folder
   *
   * It mirrors to the following Smartsheet REST API method: `POST /folders/{folderId}/folders`
   *
   * @example
   * ```typescript
   * const newFolder = await client.folders.createChildFolder({
   *   folderId: 7116448184199044,
   *   body: {
   *     name: 'New Folder'
   *   }
   * });
   * ```
   */
  createChildFolder: (
    options: CreateChildFolderOptions,
    callback?: RequestCallback<CreateFolderResponse>
  ) => Promise<CreateFolderResponse>;

  /**
   * Updates a folder.
   *
   * @param options - {@link UpdateFolderOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link UpdateFolderResponse}\> - Optional callback function
   * @returns Promise\<{@link UpdateFolderResponse}\>
   *
   * @remarks
   * **Who can use this operation:**
   * - **Permissions:** Admin on workspace or folder
   *
   * It mirrors to the following Smartsheet REST API method: `PUT /folders/{folderId}`
   *
   * @example
   * ```typescript
   * const result = await client.folders.updateFolder({
   *   folderId: 7116448184199044,
   *   body: {
   *     name: 'Updated Folder Name'
   *   }
   * });
   * ```
   */
  updateFolder: (
    options: UpdateFolderOptions,
    callback?: RequestCallback<UpdateFolderResponse>
  ) => Promise<UpdateFolderResponse>;

  /**
   * Deletes a folder.
   *
   * @param options - {@link DeleteFolderOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link BaseResponseStatus}\> - Optional callback function
   * @returns Promise\<{@link BaseResponseStatus}\>
   *
   * @remarks
   * **Who can use this operation:**
   * - **Permissions:** Admin on workspace or folder
   *
   * It mirrors to the following Smartsheet REST API method: `DELETE /folders/{folderId}`
   *
   * @example
   * ```typescript
   * const result = await client.folders.deleteFolder({
   *   folderId: 7116448184199044
   * });
   * ```
   */
  deleteFolder: (
    options: DeleteFolderOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => Promise<BaseResponseStatus>;

  /**
   * Copies a folder.
   *
   * @param options - {@link CopyFolderOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link CopyFolderResponse}\> - Optional callback function
   * @returns Promise\<{@link CopyFolderResponse}\>
   *
   * @remarks
   * **Who can use this operation:**
   * - **Permissions:** Admin on workspace or folder
   *
   * It mirrors to the following Smartsheet REST API method: `POST /folders/{folderId}/copy`
   *
   * @example
   * ```typescript
   * const result = await client.folders.copyFolder({
   *   folderId: 7116448184199044,
   *   body: {
   *     destinationType: 'folder',
   *     destinationId: 9876543210123456,
   *     newName: 'Copied Folder'
   *   }
   * });
   * ```
   */
  copyFolder: (
    options: CopyFolderOptions,
    callback?: RequestCallback<CopyFolderResponse>
  ) => Promise<CopyFolderResponse>;

  /**
   * Moves a folder.
   *
   * @param options - {@link MoveFolderOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link MoveFolderResponse}\> - Optional callback function
   * @returns Promise\<{@link MoveFolderResponse}\>
   *
   * @remarks
   * **Who can use this operation:**
   * - **Permissions:** Admin on workspace or folder
   *
   * It mirrors to the following Smartsheet REST API method: `POST /folders/{folderId}/move`
   *
   * @example
   * ```typescript
   * const result = await client.folders.moveFolder({
   *   folderId: 7116448184199044,
   *   body: {
   *     destinationType: 'folder',
   *     destinationId: 9876543210123456
   *   }
   * });
   * ```
   */
  moveFolder: (
    options: MoveFolderOptions,
    callback?: RequestCallback<MoveFolderResponse>
  ) => Promise<MoveFolderResponse>;

  /**
   * Gets the path from the workspace root to the specified folder.
   *
   * @param options - {@link GetFolderPathOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link FolderPathNode}\> - Optional callback function
   * @returns Promise\<{@link FolderPathNode}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `GET /folders/{folderId}/path`
   *
   * @example
   * ```typescript
   * const path = await client.folders.getFolderPath({
   *   folderId: 7116448184199044
   * });
   * ```
   */
  getFolderPath: (options: GetFolderPathOptions, callback?: RequestCallback<FolderPathNode>) => Promise<FolderPathNode>;
}

// ============================================================================
// Folder Types
// ============================================================================

export interface Folder {
  /**
   * Folder Id.
   */
  id?: number;

  /**
   * Folder name.
   */
  name?: string;

  /**
   * Folder permalink.
   */
  permalink?: string;

  /**
   * Array of Folder objects.
   */
  folders?: Folder[];

  /**
   * Array of Sheet objects.
   */
  sheets?: FolderSheet[];

  /**
   * Array of Report objects.
   */
  reports?: FolderReport[];

  /**
   * Array of Sight (Dashboard) objects.
   */
  sights?: FolderSight[];

  /**
   * Array of Template objects.
   */
  templates?: FolderTemplate[];
}

export interface FolderSheet {
  /**
   * Sheet Id.
   */
  id: number;

  /**
   * Sheet name.
   */
  name: string;

  /**
   * Sheet permalink.
   */
  permalink?: string;
}

export interface FolderReport {
  /**
   * Report Id.
   */
  id: number;

  /**
   * Report name.
   */
  name: string;

  /**
   * Report permalink.
   */
  permalink?: string;
}

export interface FolderSight {
  /**
   * Sight (Dashboard) Id.
   */
  id: number;

  /**
   * Sight (Dashboard) name.
   */
  name: string;

  /**
   * Sight (Dashboard) permalink.
   */
  permalink?: string;

  /**
   * Created at timestamp.
   */
  createdAt?: string | number;

  /**
   * Modified at timestamp.
   */
  modifiedAt?: string | number;
}

export interface FolderTemplate {
  /**
   * Template Id.
   */
  id: number;

  /**
   * Template name.
   */
  name: string;

  /**
   * Template permalink.
   */
  permalink?: string;
}

export enum DestinationType {
  FOLDER = 'folder',
  WORKSPACE = 'workspace',
  HOME = 'home',
}

export interface ContainerDestination {
  /**
   * Destination type (folder, workspace, home).
   */
  destinationType?: DestinationType;

  /**
   * Destination Id (required if destinationType is folder or workspace).
   */
  destinationId?: number;

  /**
   * New name for the copied/moved folder.
   */
  newName?: string;
}

// ============================================================================
// Get Folder Metadata
// ============================================================================

export interface GetFolderMetadataResponse {
  /**
   * Folder Id.
   */
  id: number;

  /**
   * Folder name.
   */
  name: string;

  /**
   * Folder permalink.
   */
  permalink: string;

  /**
   * Folder creation date.
   */
  createdAt: string | number;

  /**
   * Folder last modified date.
   */
  modifiedAt: string | number;
}

export interface GetFolderMetadataQueryParameters {
  /**
   * Comma-separated list of elements to include (source).
   */
  include?: string;

  /**
   * If true, dates are returned as numbers (Unix epoch time).
   * @defaultValue false
   */
  numericDates?: boolean;
}

export interface GetFolderMetadataOptions extends RequestOptions<GetFolderMetadataQueryParameters, undefined> {
  /**
   * Folder Id.
   */
  folderId: number;
}

// ============================================================================
// Get Folder Children
// ============================================================================

export interface GetFolderChildrenQueryParameters {
  /**
   * Filter by resource type(s) (sheets, reports, sights, folders, templates).
   * Comma-separated string of types.
   */
  childrenResourceTypes?: string;

  /**
   * Comma-separated list of optional elements to include (source, ownerInfo).
   */
  include?: string;

  /**
   * Maximum items per page (100-1000, multiples of 100).
   */
  maxItems?: number;

  /**
   * Token for pagination.
   */
  lastKey?: string;

  /**
   * If true, dates are returned as numbers (Unix epoch time).
   * @defaultValue false
   */
  numericDates?: boolean;

  /**
   * Access API level.
   * @defaultValue 0
   */
  accessApiLevel?: number;
}

export interface GetFolderChildrenOptions extends RequestOptions<GetFolderChildrenQueryParameters, undefined> {
  /**
   * Folder Id.
   */
  folderId: number;
}

export interface AssetReference {
  /**
   * Asset Id.
   */
  id: number;

  /**
   * Asset name.
   */
  name: string;

  /**
   * Asset permalink.
   */
  permalink: string;

  /**
   * Asset creation date.
   */
  createdAt: string | number;

  /**
   * Asset last modified date.
   */
  modifiedAt: string | number;

  /**
   * Asset access level.
   */
  accessLevel?: string;

  /**
   * Asset type (sheet, report, sight, folder, template, workspace).
   */
  resourceType: string;
}

export interface GetFolderChildrenResponse {
  /**
   * Array of asset references.
   */
  data: AssetReference[];

  /**
   * Pagination token for next page.
   */
  lastKey?: string;
}

// ============================================================================
// Create Child Folder
// ============================================================================

export interface CreateFolderBody {
  /**
   * Folder Id.
   */
  id?: number;

  /**
   * Folders contained in folder.
   */
  folders?: Folder[];

  /**
   * Folder name (required).
   */
  name?: string;

  /**
   * URL that represents a direct link to the folder in Smartsheet.
   */
  permalink?: string;

  /**
   * Reports contained in folder.
   */
  reports?: FolderReport[];

  /**
   * Sheets contained in folder.
   */
  sheets?: FolderSheet[];

  /**
   * Dashboards contained in folder.
   */
  sights?: FolderSight[];

  /**
   * Templates contained in folder.
   */
  templates?: FolderTemplate[];
}

export interface CreateChildFolderOptions extends RequestOptions<undefined, CreateFolderBody> {
  /**
   * Parent Folder Id.
   */
  folderId: number;
}

export interface CreateFolderResponse {
  /**
   * Status message.
   */
  message: string;

  /**
   * Result code.
   */
  resultCode: number;

  /**
   * The created folder object.
   */
  result: Folder;
}

// ============================================================================
// Update Folder
// ============================================================================

export interface UpdateFolderBody {
  /**
   * Folder Id.
   */
  id?: number;

  /**
   * Folders contained in folder.
   */
  folders?: Folder[];

  /**
   * Folder name (required).
   */
  name?: string;

  /**
   * URL that represents a direct link to the folder in Smartsheet.
   */
  permalink?: string;

  /**
   * Reports contained in folder.
   */
  reports?: FolderReport[];

  /**
   * Sheets contained in folder.
   */
  sheets?: FolderSheet[];

  /**
   * Dashboards contained in folder.
   */
  sights?: FolderSight[];

  /**
   * Templates contained in folder.
   */
  templates?: FolderTemplate[];
}

export interface UpdateFolderOptions extends RequestOptions<undefined, UpdateFolderBody> {
  /**
   * Folder Id.
   */
  folderId: number;
}

export interface UpdateFolderResponse {
  /**
   * New version of the sheet. Applicable only for operations which update sheet data.
   */
  version?: number;

  /**
   * Array of BulkItemFailure objects which represents the items that failed to be added or updated.
   */
  failedItems: FailedItem[];

  /**
   * Status message.
   */
  message: string;

  /**
   * Result code.
   */
  resultCode: number;

  /**
   * The updated folder object.
   */
  result: Folder;
}

// ============================================================================
// Delete Folder
// ============================================================================

export interface DeleteFolderOptions extends RequestOptions<undefined, undefined> {
  /**
   * Folder Id.
   */
  folderId: number;
}

// ============================================================================
// Copy Folder
// ============================================================================

export interface CopyFolderQueryParameters {
  /**
   * Comma-separated list of elements to include when copying.
   */
  include?: string;

  /**
   * Comma-separated list of elements to exclude when copying.
   */
  exclude?: string;

  /**
   * Comma-separated list of references to skip remapping.
   */
  skipRemap?: string;
}

export interface CopyFolderOptions extends RequestOptions<CopyFolderQueryParameters, ContainerDestination> {
  /**
   * Folder Id to copy.
   */
  folderId: number;
}

export interface CopyFolderResponse extends BaseResponseStatus {
  /**
   * The copied folder object.
   */
  result: Folder;
}

// ============================================================================
// Move Folder
// ============================================================================

export interface MoveFolderBody {
  /**
   * The ID of the destination container.
   */
  destinationId: number;

  /**
   * Type of destination container.
   */
  destinationType?: DestinationType;
}

export interface MoveFolderOptions extends RequestOptions<undefined, MoveFolderBody> {
  /**
   * Folder Id to move.
   */
  folderId: number;
}

export interface MoveFolderResponse extends BaseResponseStatus {
  /**
   * The moved folder object.
   */
  result: Folder;
}

// ============================================================================
// Get Folder Path
// ============================================================================

export class FolderPathNode {
  id: number;
  name: string;
  permalink: string;
  accessLevel?: APIAccessLevel;
  folders?: FolderPathNode[];

  constructor(data: Record<string, unknown>) {
    this.id = data.id as number;
    this.name = data.name as string;
    this.permalink = data.permalink as string;
    this.accessLevel = data.accessLevel as APIAccessLevel | undefined;
    if (Array.isArray(data.folders)) {
      this.folders = (data.folders as Record<string, unknown>[]).map((f) => new FolderPathNode(f));
    }
  }

  private _walkToLeaf(): FolderPathNode[] {
    if (this.folders && this.folders.length > 0) {
      return [this, ...this.folders[0]._walkToLeaf()];
    }
    return [this];
  }

  /** Returns the deepest FolderPathNode (the target folder). */
  getFolder(): FolderPathNode {
    const nodes = this._walkToLeaf();
    return nodes[nodes.length - 1];
  }

  /** Returns a slash-separated path string of folder names from this node to the target folder. */
  getFolderPath(): string {
    const nodes = this._walkToLeaf();
    return nodes
      .map((n) => n.name)
      .filter(Boolean)
      .join('/');
  }
}

export interface GetFolderPathOptions extends RequestOptions<undefined, undefined> {
  /**
   * Folder Id.
   */
  folderId: number;
}
