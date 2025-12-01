import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';
import type { CreateOptions } from '../types/CreateOptions';

/**
 * Asset types supported by the Sharing API
 */
export enum AssetType {
  SHEET = 'sheet',
  REPORT = 'report',
  SIGHT = 'sight',
  WORKSPACE = 'workspace',
  COLLECTION = 'collection',
  FILE = 'file',
}

/**
 * Access levels for sharing
 */
export enum AccessLevel {
  ADMIN = 'ADMIN',
  COMMENTER = 'COMMENTER',
  EDITOR = 'EDITOR',
  EDITOR_SHARE = 'EDITOR_SHARE',
  OWNER = 'OWNER',
  VIEWER = 'VIEWER',
}

/**
 * Share scope
 */
export enum ShareScope {
  ITEM = 'ITEM',
  WORKSPACE = 'WORKSPACE',
}

/**
 * Share type
 */
export enum ShareType {
  GROUP = 'GROUP',
  USER = 'USER',
}

/**
 * Share response object
 */
export interface ShareResponse {
  id: string;
  email?: string;
  userId?: number;
  groupId?: number;
  name?: string;
  type: ShareType;
  accessLevel: AccessLevel;
  scope: ShareScope;
}

/**
 * Create share request object
 */
export interface CreateShareRequest {
  email?: string;
  groupId?: number;
  accessLevel: AccessLevel;
  subject?: string;
  message?: string;
  ccMe?: boolean;
}

/**
 * Update share request object
 */
export interface UpdateShareRequest {
  accessLevel: AccessLevel;
}

/**
 * Response for list share operations
 */
export interface ListSharesResponse {
  items: ShareResponse[];
  lastKey?: string;
}

/**
 * Success result with shares
 */
export interface SharesResult {
  result: ShareResponse[];
  message: string;
  resultCode: number;
}

/**
 * Query parameters for listing shares
 */
export interface ListSharesQueryParams {
  assetType: AssetType;
  assetId: string | number;
  sharingInclude?: string;
  maxItems?: number;
  lastKey?: string;
}

/**
 * Query parameters for get shares
 */
export interface GetShareQueryParams {
  assetType: AssetType;
  assetId: string | number;
}

/**
 * Query parameters for update shares
 */
export interface UpdateShareQueryParams {
  assetType: AssetType;
  assetId: string | number;
}

/**
 * Query parameters for delete shares
 */
export interface DeleteShareQueryParams {
  assetType: AssetType;
  assetId: string | number;
}

/**
 * Query parameters for share asset
 */
export interface ShareAssetQueryParams {
  assetType: AssetType;
  assetId: string | number;
  sendEmail?: boolean;
}

/**
 * Options for listing shares
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface ListSharesOptions extends RequestOptions<ListSharesQueryParams, undefined> {}

/**
 * Options for getting a share
 */
export interface GetShareOptions extends RequestOptions<GetShareQueryParams, undefined> {
  shareId: string;
}

/**
 * Options for sharing an asset
 */
export interface ShareAssetOptions extends RequestOptions<ShareAssetQueryParams, CreateShareRequest[]> {
  body: CreateShareRequest[];
}

/**
 * Options for updating a share
 */
export interface UpdateShareOptions extends RequestOptions<UpdateShareQueryParams, UpdateShareRequest> {
  shareId: string;
  body: UpdateShareRequest;
}

/**
 * Options for deleting a share
 */
export interface DeleteShareOptions extends RequestOptions<DeleteShareQueryParams, undefined> {
  shareId: string;
}

/**
 * Sharing API interface
 */
export interface SharingApi {
  listAssetShares: (
    options: ListSharesOptions,
    callback?: RequestCallback<ListSharesResponse>
  ) => Promise<ListSharesResponse>;

  getAssetShare: (options: GetShareOptions, callback?: RequestCallback<ShareResponse>) => Promise<ShareResponse>;

  shareAsset: (options: ShareAssetOptions, callback?: RequestCallback<SharesResult>) => Promise<SharesResult>;

  updateAssetShare: (options: UpdateShareOptions, callback?: RequestCallback<ShareResponse>) => Promise<ShareResponse>;

  deleteAssetShare: (options: DeleteShareOptions, callback?: RequestCallback<any>) => Promise<any>;
}

/**
 * Creates and returns the sharing API
 * @param options Create options
 * @returns Sharing API
 */
export const createSharing = (options: CreateOptions): SharingApi => {
  const requestor = options.requestor;

  const optionsToSend = {
    ...options.clientOptions,
  };

  // Base URL for shares endpoints
  const baseUrl = '/shares';

  /**
   * List all shares for a specified asset
   * @param options Options for listing shares
   * @param callback Optional callback
   * @returns Promise with shares response
   */
  const listAssetShares = (
    options: ListSharesOptions,
    callback?: RequestCallback<ListSharesResponse>
  ): Promise<ListSharesResponse> => {
    const { queryParameters } = options;

    // Build the base URL with required parameters
    const urlParams = new URLSearchParams();
    urlParams.append('assetType', queryParameters.assetType.toString());
    urlParams.append('assetId', queryParameters.assetId.toString());

    // Add optional query parameters
    if (queryParameters.maxItems) {
      urlParams.append('maxItems', queryParameters.maxItems.toString());
    }
    if (queryParameters.lastKey) {
      urlParams.append('lastKey', queryParameters.lastKey);
    }
    if (queryParameters.sharingInclude) {
      urlParams.append('sharingInclude', queryParameters.sharingInclude);
    }

    const url = `${baseUrl}?${urlParams.toString()}`;

    return requestor.get({ ...optionsToSend, url, ...options }, callback);
  };

  /**
   * Get a specific share for a specified asset
   * @param options Options for getting a share
   * @param callback Optional callback
   * @returns Promise with share response
   */
  const getAssetShare = (
    options: GetShareOptions,
    callback?: RequestCallback<ShareResponse>
  ): Promise<ShareResponse> => {
    const { shareId, queryParameters } = options;

    const url = `${baseUrl}/${shareId}?assetType=${queryParameters.assetType}&assetId=${queryParameters.assetId}`;

    return requestor.get({ ...optionsToSend, url, ...options }, callback);
  };

  /**
   * Share an asset with specified users and/or groups
   * @param options Options for sharing an asset
   * @param callback Optional callback
   * @returns Promise with shares success result
   */
  const shareAsset = (options: ShareAssetOptions, callback?: RequestCallback<SharesResult>): Promise<SharesResult> => {
    const { body, queryParameters } = options;

    let url = `${baseUrl}?assetType=${queryParameters.assetType}&assetId=${queryParameters.assetId}`;
    if (queryParameters.sendEmail) {
      url += '&sendEmail=true';
    }

    return requestor.post({ ...optionsToSend, url, body, ...options }, callback);
  };

  /**
   * Update a specific share for a specified asset
   * @param options Options for updating a share
   * @param callback Optional callback
   * @returns Promise with share response
   */
  const updateAssetShare = (
    options: UpdateShareOptions,
    callback?: RequestCallback<ShareResponse>
  ): Promise<ShareResponse> => {
    const { shareId, queryParameters, body } = options;

    const url = `${baseUrl}/${shareId}?assetType=${queryParameters.assetType}&assetId=${queryParameters.assetId}`;

    return requestor.patch({ ...optionsToSend, url, body, ...options }, callback);
  };

  /**
   * Delete a specific share for a specified asset
   * @param options Options for deleting a share
   * @param callback Optional callback
   * @returns Promise with success result
   */
  const deleteAssetShare = (options: DeleteShareOptions, callback?: RequestCallback<any>): Promise<any> => {
    const { shareId, queryParameters } = options;

    const url = `${baseUrl}/${shareId}?assetType=${queryParameters.assetType}&assetId=${queryParameters.assetId}`;

    return requestor.delete({ ...optionsToSend, url, ...options }, callback);
  };

  return {
    listAssetShares,
    getAssetShare,
    shareAsset,
    updateAssetShare,
    deleteAssetShare,
  };
};
