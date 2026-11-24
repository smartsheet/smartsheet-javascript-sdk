import type {
  CreateFolderBody,
  Folder,
  GetFolderChildrenQueryParameters,
  GetFolderChildrenResponse,
} from '../folders/types';
import type { Source } from '../reports/types';
import type { BaseResponseStatus } from '../types/BaseResponseStatus';
import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';
import type { TokenPaginationQueryParameters } from '../types/TokenPaginationQueryParameters';
import type { TokenPaginationResponse } from '../types/TokenPaginationResponse';

export interface WorkspacesApi {
  /**
   * Lists the workspaces the user has access to, using token-based pagination.
   *
   * @param options - Optional configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link ListWorkspacesResponse}\> - Optional callback function
   * @returns Promise\<{@link ListWorkspacesResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `GET /workspaces`.
   * The SDK always sends `paginationType=token`.
   *
   * @example
   * ```typescript
   * let page = await client.workspaces.listWorkspaces({ queryParameters: { maxItems: 100 } });
   * const workspaces = [...page.data];
   * while (page.lastKey) {
   *   page = await client.workspaces.listWorkspaces({ queryParameters: { maxItems: 100, lastKey: page.lastKey } });
   *   workspaces.push(...page.data);
   * }
   * ```
   */
  listWorkspaces: (
    options?: RequestOptions<ListWorkspacesQueryParameters, undefined>,
    callback?: RequestCallback<ListWorkspacesResponse>
  ) => Promise<ListWorkspacesResponse>;

  /**
   * Gets the metadata of a workspace.
   *
   * @param options - {@link GetWorkspaceMetadataOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link WorkspaceMetadata}\> - Optional callback function
   * @returns Promise\<{@link WorkspaceMetadata}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `GET /workspaces/{workspaceId}/metadata`
   *
   * @example
   * ```typescript
   * const metadata = await client.workspaces.getWorkspaceMetadata({ workspaceId: 7116448184199044 });
   * ```
   */
  getWorkspaceMetadata: (
    options: GetWorkspaceMetadataOptions,
    callback?: RequestCallback<WorkspaceMetadata>
  ) => Promise<WorkspaceMetadata>;

  /**
   * Gets a page of the workspace's children, optionally filtered by resource type.
   *
   * @param options - {@link GetWorkspaceChildrenOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link GetWorkspaceChildrenResponse}\> - Optional callback function
   * @returns Promise\<{@link GetWorkspaceChildrenResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `GET /workspaces/{workspaceId}/children`
   *
   * @example
   * ```typescript
   * const children = await client.workspaces.getWorkspaceChildren({
   *   workspaceId: 7116448184199044,
   *   queryParameters: { childrenResourceTypes: 'sheets,folders' },
   * });
   * ```
   */
  getWorkspaceChildren: (
    options: GetWorkspaceChildrenOptions,
    callback?: RequestCallback<GetWorkspaceChildrenResponse>
  ) => Promise<GetWorkspaceChildrenResponse>;

  /**
   * Creates a workspace.
   *
   * @param options - {@link CreateWorkspaceOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link WorkspaceResult}\> - Optional callback function
   * @returns Promise\<{@link WorkspaceResult}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `POST /workspaces`
   *
   * @example
   * ```typescript
   * const created = await client.workspaces.createWorkspace({ body: { name: 'New workspace' } });
   * ```
   */
  createWorkspace: (
    options: CreateWorkspaceOptions,
    callback?: RequestCallback<WorkspaceResult>
  ) => Promise<WorkspaceResult>;

  /**
   * Creates a folder in a workspace.
   *
   * @param options - {@link CreateWorkspaceFolderOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link CreateWorkspaceFolderResponse}\> - Optional callback function
   * @returns Promise\<{@link CreateWorkspaceFolderResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `POST /workspaces/{workspaceId}/folders`
   *
   * @example
   * ```typescript
   * const folder = await client.workspaces.createFolder({ workspaceId: 7116448184199044, body: { name: 'Reports' } });
   * ```
   */
  createFolder: (
    options: CreateWorkspaceFolderOptions,
    callback?: RequestCallback<CreateWorkspaceFolderResponse>
  ) => Promise<CreateWorkspaceFolderResponse>;

  /**
   * Updates a workspace.
   *
   * @param options - {@link UpdateWorkspaceOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link WorkspaceResult}\> - Optional callback function
   * @returns Promise\<{@link WorkspaceResult}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `PUT /workspaces/{workspaceId}`
   *
   * @example
   * ```typescript
   * await client.workspaces.updateWorkspace({ workspaceId: 7116448184199044, body: { name: 'Renamed' } });
   * ```
   */
  updateWorkspace: (
    options: UpdateWorkspaceOptions,
    callback?: RequestCallback<WorkspaceResult>
  ) => Promise<WorkspaceResult>;

  /**
   * Deletes a workspace.
   *
   * @param options - {@link DeleteWorkspaceOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link BaseResponseStatus}\> - Optional callback function
   * @returns Promise\<{@link BaseResponseStatus}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `DELETE /workspaces/{workspaceId}`
   */
  deleteWorkspace: (
    options: DeleteWorkspaceOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => Promise<BaseResponseStatus>;

  /**
   * Copies a workspace.
   *
   * @param options - {@link CopyWorkspaceOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link WorkspaceResult}\> - Optional callback function
   * @returns Promise\<{@link WorkspaceResult}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `POST /workspaces/{workspaceId}/copy`
   *
   * @example
   * ```typescript
   * const copy = await client.workspaces.copyWorkspace({
   *   workspaceId: 7116448184199044,
   *   queryParameters: { include: 'data' },
   *   body: { newName: 'Copy of workspace' },
   * });
   * ```
   */
  copyWorkspace: (
    options: CopyWorkspaceOptions,
    callback?: RequestCallback<WorkspaceResult>
  ) => Promise<WorkspaceResult>;
}

export interface WorkspaceListing {
  /**
   * Workspace Id.
   */
  id?: number;
  /**
   * Workspace name.
   */
  name?: string;
  /**
   * The user's access level, e.g. `OWNER`, `ADMIN`, `EDITOR_SHARE`, `EDITOR`, `COMMENTER`, `VIEWER`.
   */
  accessLevel?: string;
  /**
   * URL that represents a direct link to the workspace in Smartsheet.
   */
  permalink?: string;
}

export type ListWorkspacesQueryParameters = TokenPaginationQueryParameters & {
  /** Allows COMMENTER access for inputs and return values; `0` (default) or `1`. */
  accessApiLevel?: number;
};

export type ListWorkspacesResponse = TokenPaginationResponse<WorkspaceListing>;

export interface GetWorkspaceMetadataQueryParameters {
  /** Additional fields to include, e.g. `source`. */
  include?: string;
  /** If true, dates are returned as milliseconds since the UNIX epoch. */
  numericDates?: boolean;
  /** Allows COMMENTER access for inputs and return values; `0` (default) or `1`. */
  accessApiLevel?: number;
}

export interface GetWorkspaceMetadataOptions extends RequestOptions<GetWorkspaceMetadataQueryParameters, undefined> {
  /** Workspace Id. */
  workspaceId: number;
}

export interface WorkspaceMetadata {
  /** Workspace Id. */
  id: number;
  /** Workspace name. */
  name: string;
  /** URL that represents a direct link to the workspace in Smartsheet. */
  permalink: string;
  /** Time the workspace was created (ISO-8601 string, or a number with `numericDates`). */
  createdAt: string | number;
  /** Time the workspace was last modified (ISO-8601 string, or a number with `numericDates`). */
  modifiedAt: string | number;
  /** The user's access level, e.g. `OWNER`, `ADMIN`, `EDITOR_SHARE`, `EDITOR`, `COMMENTER`, `VIEWER`. */
  accessLevel: string;
  /**
   * The workspace this one was copied from; returned when `include=source` is requested.
   *
   * @remarks
   * Not in the OpenAPI spec; present in the WireMock mappings and the Java and C# SDK models.
   */
  source?: Source;
}

export interface GetWorkspaceChildrenOptions extends RequestOptions<GetFolderChildrenQueryParameters, undefined> {
  /** Workspace Id. */
  workspaceId: number;
}

export type GetWorkspaceChildrenResponse = GetFolderChildrenResponse;

export interface CreateWorkspaceBody {
  /** Workspace name (max 50 characters). */
  name: string;
}

export interface CreateWorkspaceOptions extends RequestOptions<undefined, CreateWorkspaceBody> {
  /** The workspace to create; `name` is required. */
  body: CreateWorkspaceBody;
}

export interface CreateWorkspaceFolderOptions extends RequestOptions<undefined, CreateFolderBody & { name: string }> {
  /** Workspace Id. */
  workspaceId: number;
  /** The folder to create; `name` is required. */
  body: CreateFolderBody & { name: string };
}

export interface CreateWorkspaceFolderResponse extends BaseResponseStatus {
  /** The created folder. */
  result?: Folder;
}

export interface UpdateWorkspaceBody {
  /** The new workspace name (max 50 characters). */
  name?: string;
}

export interface UpdateWorkspaceOptions extends RequestOptions<undefined, UpdateWorkspaceBody> {
  /** Workspace Id. */
  workspaceId: number;
  /**
   * The workspace changes.
   *
   * @remarks
   * Required, unlike the OpenAPI spec, which marks the request body optional: the API rejects a request without one (400, error code 2233).
   */
  body: UpdateWorkspaceBody;
}

export interface DeleteWorkspaceOptions extends RequestOptions<undefined, undefined> {
  /** Workspace Id. */
  workspaceId: number;
}

export interface CopyWorkspaceQueryParameters {
  /** Comma-separated elements to copy, e.g. `data,attachments` or `all`. */
  include?: string;
  /** Comma-separated references not to remap in the copy, e.g. `cellLinks,reports`. */
  skipRemap?: string;
}

export interface CopyWorkspaceBody {
  /** Name of the new workspace (max 50 characters). */
  newName: string;
}

export interface CopyWorkspaceOptions extends RequestOptions<CopyWorkspaceQueryParameters, CopyWorkspaceBody> {
  /** Workspace Id. */
  workspaceId: number;
  /** The new workspace; `newName` is required. */
  body: CopyWorkspaceBody;
}

export interface WorkspaceResult extends BaseResponseStatus {
  /** The created, updated, or copied workspace. */
  result?: WorkspaceListing;
}
