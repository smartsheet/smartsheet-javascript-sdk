import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';

/**
 * Generic request options type for all HTTP operations
 */
export interface HttpRequestOptions {
  url: string;
  queryParameters?: Record<string, string | number | boolean>;
  body?: unknown;
  [key: string]: unknown;
}

/**
 * Workspace requestor interface for HTTP operations
 */
export interface WorkspaceRequestor {
  get: <T>(options: HttpRequestOptions, callback?: RequestCallback<T>) => Promise<T>;
  post: <T>(options: HttpRequestOptions, callback?: RequestCallback<T>) => Promise<T>;
  put: <T>(options: HttpRequestOptions, callback?: RequestCallback<T>) => Promise<T>;
  delete: <T>(options: HttpRequestOptions, callback?: RequestCallback<T>) => Promise<T>;
}

/**
 * Options for the workspace module
 */
export interface WorkspaceOptions {
  requestor: WorkspaceRequestor;
  apiUrls: {
    workspaces: string;
  };
  clientOptions: Record<string, unknown>;
}

/**
 * URL options for workspace operations
 */
export interface WorkspaceUrlOptions {
  workspaceId?: string;
  sheetId?: string;
  reportId?: string;
  sightId?: string;
  shareId?: string;
  [key: string]: unknown;
}

/**
 * Query parameters for workspace GET operations
 */
export interface WorkspaceGetQueryParams {
  includeAll?: boolean;
  [key: string]: string | number | boolean | undefined;
}

/**
 * Options for GET workspace operations
 */
export interface GetWorkspaceOptions extends WorkspaceUrlOptions, RequestOptions<WorkspaceGetQueryParams, never> {}

/**
 * Body for workspace POST operations
 */
export interface WorkspacePostBody {
  name?: string;
  [key: string]: unknown;
}

/**
 * Options for POST workspace operations
 */
export interface PostWorkspaceOptions extends WorkspaceUrlOptions, RequestOptions<Record<string, string | number | boolean>, WorkspacePostBody> {}

/**
 * Options for DELETE workspace operations
 */
export interface DeleteWorkspaceOptions extends WorkspaceUrlOptions, RequestOptions<Record<string, string | number | boolean>, never> {}

/**
 * Body for workspace PUT operations
 */
export interface WorkspacePutBody {
  name?: string;
  [key: string]: unknown;
}

/**
 * Options for PUT workspace operations
 */
export interface PutWorkspaceOptions extends WorkspaceUrlOptions, RequestOptions<Record<string, string | number | boolean>, WorkspacePutBody> {}

/**
 * Workspace object interface returned by the create function
 */
export interface WorkspaceObject {
  /**
   * Lists all workspaces
   */
  listWorkspaces: <T>(getOptions: GetWorkspaceOptions, callback?: RequestCallback<T>) => Promise<T>;
  
  /**
   * Gets a specific workspace
   */
  getWorkspace: <T>(getOptions: GetWorkspaceOptions, callback?: RequestCallback<T>) => Promise<T>;
  
  /**
   * Lists folders in a workspace
   */
  listWorkspaceFolders: <T>(getOptions: GetWorkspaceOptions, callback?: RequestCallback<T>) => Promise<T>;
  
  /**
   * Creates a new workspace
   */
  createWorkspace: <T>(postOptions: PostWorkspaceOptions, callback?: RequestCallback<T>) => Promise<T>;
  
  /**
   * Creates a folder in a workspace
   */
  createFolder: <T>(postOptions: PostWorkspaceOptions, callback?: RequestCallback<T>) => Promise<T>;
  
  /**
   * Deletes a workspace
   */
  deleteWorkspace: <T>(deleteOptions: DeleteWorkspaceOptions, callback?: RequestCallback<T>) => Promise<T>;
  
  /**
   * Updates a workspace
   */
  updateWorkspace: <T>(putOptions: PutWorkspaceOptions, callback?: RequestCallback<T>) => Promise<T>;
  
  /**
   * Copies a workspace
   */
  copyWorkspace: <T>(postOptions: PostWorkspaceOptions, callback?: RequestCallback<T>) => Promise<T>;

}

/**
 * Response type for workspace operations (can be extended for specific responses)
 */
export interface WorkspaceResponse {
  message?: string;
  result?: {
    id?: number | string;
    name?: string;
    [key: string]: unknown;
  };
  statusCode?: number;
}
