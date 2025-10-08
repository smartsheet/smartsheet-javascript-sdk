import type { CreateOptions, RequestCallback, RequestOptions } from '../types';

/**
 * Asset types supported by the Sharing API
 */
export enum AssetType {
  SHEET = 'sheet',
  REPORT = 'report',
  SIGHT = 'sight',
  WORKSPACE = 'workspace',
  COLLECTION = 'collection',
  FILE = 'file'
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
  VIEWER = 'VIEWER'
}

/**
 * Share scope
 */
export enum ShareScope {
  ITEM = 'ITEM',
  WORKSPACE = 'WORKSPACE'
}

/**
 * Share type
 */
export enum ShareType {
  GROUP = 'GROUP',
  USER = 'USER'
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
 * Response for share operations
 */
export interface SharesResponse {
  items: ShareResponse[];
  lastKey?: string;
}

/**
 * Success result with shares
 */
export interface SharesSuccessResult {
  result: ShareResponse[];
  message: string;
  resultCode: number;
}

/**
 * Query parameters for listing shares
 */
export interface ListSharesQueryParams {
  maxItems?: number;
  lastKey?: string;
  include?: string;
}

/**
 * Options for listing shares
 */
export interface ListSharesOptions extends RequestOptions<ListSharesQueryParams, undefined> {
  assetType: AssetType;
  assetId: string | number;
  maxItems?: number;
  lastKey?: string;
  sharingInclude?: string;
}

/**
 * Options for getting a share
 */
export interface GetShareOptions extends RequestOptions<object, undefined> {
  assetType: AssetType;
  assetId: string | number;
  shareId: string;
}

/**
 * Options for sharing an asset
 */
export interface ShareAssetOptions extends RequestOptions<{ sendEmail?: boolean }, CreateShareRequest[]> {
  assetType: AssetType;
  assetId: string | number;
  sendEmail?: boolean;
  body: CreateShareRequest[];
}

/**
 * Options for updating a share
 */
export interface UpdateShareOptions extends RequestOptions<object, UpdateShareRequest> {
  assetType: AssetType;
  assetId: string | number;
  shareId: string;
  body: UpdateShareRequest;
}

/**
 * Options for deleting a share
 */
export interface DeleteShareOptions extends RequestOptions<object, undefined> {
  assetType: AssetType;
  assetId: string | number;
  shareId: string;
}

/**
 * Sharing API interface
 */
export interface SharingApi {
  listAssetShares: (
    options: ListSharesOptions,
    callback?: RequestCallback<SharesResponse>
  ) => Promise<SharesResponse>;
  
  getAssetShare: (
    options: GetShareOptions,
    callback?: RequestCallback<ShareResponse>
  ) => Promise<ShareResponse>;
  
  shareAsset: (
    options: ShareAssetOptions,
    callback?: RequestCallback<SharesSuccessResult>
  ) => Promise<SharesSuccessResult>;
  
  updateShare: (
    options: UpdateShareOptions,
    callback?: RequestCallback<ShareResponse>
  ) => Promise<ShareResponse>;
  
  deleteShare: (
    options: DeleteShareOptions,
    callback?: RequestCallback<any>
  ) => Promise<any>;
}

/**
 * Creates and returns the sharing API
 * @param options Create options
 * @returns Sharing API
 */
export const createSharing = (options: CreateOptions): SharingApi => {
  const requestor = options.requestor;
  
  const optionsToSend = {
    ...options.clientOptions
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
    callback?: RequestCallback<SharesResponse>
  ): Promise<SharesResponse> => {
    const { assetType, assetId, maxItems, lastKey, sharingInclude } = options;

    // Build the base URL with required parameters
    const urlParams = new URLSearchParams();
    urlParams.append('assetType', assetType.toString());
    urlParams.append('assetId', assetId.toString());

    // Add optional query parameters
    if (maxItems !== undefined) {
      urlParams.append('maxItems', maxItems.toString());
    }
    if (lastKey) {
      urlParams.append('lastKey', lastKey);
    }
    if (sharingInclude) {
      urlParams.append('include', sharingInclude);
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
    const { assetType, assetId, shareId } = options;
    
    const url = `${baseUrl}/${shareId}?assetType=${assetType}&assetId=${assetId}`;
    
    return requestor.get({ ...optionsToSend, url, ...options }, callback);
  };

  /**
   * Share an asset with specified users and/or groups
   * @param options Options for sharing an asset
   * @param callback Optional callback
   * @returns Promise with shares success result
   */
  const shareAsset = (
    options: ShareAssetOptions,
    callback?: RequestCallback<SharesSuccessResult>
  ): Promise<SharesSuccessResult> => {
    const { assetType, assetId, body, queryParameters } = options;
    
    let url = `${baseUrl}?assetType=${assetType}&assetId=${assetId}`;
    if (queryParameters?.sendEmail) {
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
  const updateShare = (
    options: UpdateShareOptions,
    callback?: RequestCallback<ShareResponse>
  ): Promise<ShareResponse> => {
    const { assetType, assetId, shareId, body } = options;
    
    const url = `${baseUrl}/${shareId}?assetType=${assetType}&assetId=${assetId}`;
    
    return requestor.patch({ ...optionsToSend, url, body, ...options }, callback);
  };

  /**
   * Delete a specific share for a specified asset
   * @param options Options for deleting a share
   * @param callback Optional callback
   * @returns Promise with success result
   */
  const deleteShare = (
    options: DeleteShareOptions,
    callback?: RequestCallback<any>
  ): Promise<any> => {
    const { assetType, assetId, shareId } = options;
    
    const url = `${baseUrl}/${shareId}?assetType=${assetType}&assetId=${assetId}`;
    
    return requestor.delete({ ...optionsToSend, url, ...options }, callback);
  };

  return {
    listAssetShares,
    getAssetShare,
    shareAsset,
    updateShare,
    deleteShare
  };
};
