import type { BaseResponseStatus } from '../types/BaseResponseStatus';
import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';

// ============================================================================
// Favorites API Interface
// ============================================================================

export interface FavoritesApi {
  /**
   * Gets a list of all of the user's favorite items.
   *
   * @param options - {@link RequestOptions}\<{@link ListFavoritesQueryParameters}, undefined\> - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link ListFavoritesResponse}\> - Optional callback function
   * @returns Promise\<{@link ListFavoritesResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `GET /favorites`
   *
   * @example
   * ```typescript
   * const favorites = await client.favorites.listFavorites({
   *   queryParameters: { includeAll: true }
   * });
   * ```
   */
  listFavorites: (
    options: RequestOptions<ListFavoritesQueryParameters, undefined>,
    callback?: RequestCallback<ListFavoritesResponse>
  ) => Promise<ListFavoritesResponse>;

  /**
   * Adds one or more items to the user's list of favorite items.
   *
   * @param options - {@link RequestOptions}\<undefined, {@link AddFavoritesBody} | {@link AddFavoritesBody}[]\> - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link AddFavoritesResponse}\> - Optional callback function
   * @returns Promise\<{@link AddFavoritesResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `POST /favorites`
   *
   * @example
   * ```typescript
   * const result = await client.favorites.addItemsToFavorites({
   *   body: [
   *     { type: 'sheet', objectId: 123456789 }
   *   ]
   * });
   * ```
   */
  addItemsToFavorites: (
    options: RequestOptions<undefined, AddFavoritesBody | AddFavoritesBody[]>,
    callback?: RequestCallback<AddFavoritesResponse>
  ) => Promise<AddFavoritesResponse>;

  /**
   * Adds a sheet to the user's list of favorite items.
   * @param options - {@link AddFavoriteConvenienceOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link AddFavoritesResponse}\> - Optional callback function
   * @returns Promise\<{@link AddFavoritesResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `POST /favorites`
   */
  addSheetToFavorites: (
    options: AddFavoriteConvenienceOptions,
    callback?: RequestCallback<AddFavoritesResponse>
  ) => Promise<AddFavoritesResponse>;

  /**
   * Adds a folder to the user's list of favorite items.
   *
   * @param options - {@link AddFavoriteConvenienceOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link AddFavoritesResponse}\> - Optional callback function
   * @returns Promise\<{@link AddFavoritesResponse}\>
   */
  addFolderToFavorites: (
    options: AddFavoriteConvenienceOptions,
    callback?: RequestCallback<AddFavoritesResponse>
  ) => Promise<AddFavoritesResponse>;

  /**
   * Adds a report to the user's list of favorite items.
   *
   * @param options - {@link AddFavoriteConvenienceOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link AddFavoritesResponse}\> - Optional callback function
   * @returns Promise\<{@link AddFavoritesResponse}\>
   */
  addReportToFavorites: (
    options: AddFavoriteConvenienceOptions,
    callback?: RequestCallback<AddFavoritesResponse>
  ) => Promise<AddFavoritesResponse>;

  /**
   * Adds a template to the user's list of favorite items.
   *
   * @param options - {@link AddFavoriteConvenienceOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link AddFavoritesResponse}\> - Optional callback function
   * @returns Promise\<{@link AddFavoritesResponse}\>
   */
  addTemplateToFavorites: (
    options: AddFavoriteConvenienceOptions,
    callback?: RequestCallback<AddFavoritesResponse>
  ) => Promise<AddFavoritesResponse>;

  /**
   * Adds a workspace to the user's list of favorite items.
   *
   * @param options - {@link AddFavoriteConvenienceOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link AddFavoritesResponse}\> - Optional callback function
   * @returns Promise\<{@link AddFavoritesResponse}\>
   */
  addWorkspaceToFavorites: (
    options: AddFavoriteConvenienceOptions,
    callback?: RequestCallback<AddFavoritesResponse>
  ) => Promise<AddFavoritesResponse>;

  /**
   * Adds a sight (dashboard) to the user's list of favorite items.
   *
   * @param options - {@link AddFavoriteConvenienceOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link AddFavoritesResponse}\> - Optional callback function
   * @returns Promise\<{@link AddFavoritesResponse}\>
   */
  addSightToFavorites: (
    options: AddFavoriteConvenienceOptions,
    callback?: RequestCallback<AddFavoritesResponse>
  ) => Promise<AddFavoritesResponse>;

  /**
   * Adds multiple items to the user's list of favorite items.
   *
   * @param options - {@link RequestOptions}\<undefined, {@link Favorite}[]\> - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link AddFavoritesResponse}\> - Optional callback function
   * @returns Promise\<{@link AddFavoritesResponse}\>
   */
  addMultipleToFavorites: (
    options: RequestOptions<undefined, AddFavoritesBody[]>,
    callback?: RequestCallback<AddFavoritesResponse>
  ) => Promise<AddFavoritesResponse>;

  /**
   * Removes a sheet from the user's list of favorite items.
   *
   * @param options - {@link RemoveFavoriteOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link BaseResponseStatus}\> - Optional callback function
   * @returns Promise\<{@link BaseResponseStatus}\>
   */
  removeSheetFromFavorites: (
    options: RemoveFavoriteOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => Promise<BaseResponseStatus>;

  /**
   * Removes a folder from the user's list of favorite items.
   *
   * @param options - {@link RemoveFavoriteOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link BaseResponseStatus}\> - Optional callback function
   * @returns Promise\<{@link BaseResponseStatus}\>
   */
  removeFolderFromFavorites: (
    options: RemoveFavoriteOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => Promise<BaseResponseStatus>;

  /**
   * Removes a report from the user's list of favorite items.
   *
   * @param options - {@link RemoveFavoriteOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link BaseResponseStatus}\> - Optional callback function
   * @returns Promise\<{@link BaseResponseStatus}\>
   */
  removeReportFromFavorites: (
    options: RemoveFavoriteOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => Promise<BaseResponseStatus>;

  /**
   * Removes a template from the user's list of favorite items.
   *
   * @param options - {@link RemoveFavoriteOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link BaseResponseStatus}\> - Optional callback function
   * @returns Promise\<{@link BaseResponseStatus}\>
   */
  removeTemplateFromFavorites: (
    options: RemoveFavoriteOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => Promise<BaseResponseStatus>;

  /**
   * Removes a sight (dashboard) from the user's list of favorite items.
   *
   * @param options - {@link RemoveFavoriteOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link BaseResponseStatus}\> - Optional callback function
   * @returns Promise\<{@link BaseResponseStatus}\>
   */
  removeSightFromFavorites: (
    options: RemoveFavoriteOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => Promise<BaseResponseStatus>;

  /**
   * Removes a workspace from the user's list of favorite items.
   *
   * @param options - {@link RemoveFavoriteOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link BaseResponseStatus}\> - Optional callback function
   * @returns Promise\<{@link BaseResponseStatus}\>
   */
  removeWorkspaceFromFavorites: (
    options: RemoveFavoriteOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => Promise<BaseResponseStatus>;

  /**
   * Removes multiple sheets from the user's list of favorite items.
   *
   * @param options - {@link RemoveMultipleFavoritesOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link BaseResponseStatus}\> - Optional callback function
   * @returns Promise\<{@link BaseResponseStatus}\>
   */
  removeSheetsFromFavorites: (
    options: RemoveMultipleFavoritesOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => Promise<BaseResponseStatus>;

  /**
   * Removes multiple folders from the user's list of favorite items.
   *
   * @param options - {@link RemoveMultipleFavoritesOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link BaseResponseStatus}\> - Optional callback function
   * @returns Promise\<{@link BaseResponseStatus}\>
   */
  removeFoldersFromFavorites: (
    options: RemoveMultipleFavoritesOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => Promise<BaseResponseStatus>;

  /**
   * Removes multiple reports from the user's list of favorite items.
   *
   * @param options - {@link RemoveMultipleFavoritesOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link BaseResponseStatus}\> - Optional callback function
   * @returns Promise\<{@link BaseResponseStatus}\>
   */
  removeReportsFromFavorites: (
    options: RemoveMultipleFavoritesOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => Promise<BaseResponseStatus>;

  /**
   * Removes multiple templates from the user's list of favorite items.
   *
   * @param options - {@link RemoveMultipleFavoritesOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link BaseResponseStatus}\> - Optional callback function
   * @returns Promise\<{@link BaseResponseStatus}\>
   */
  removeTemplatesFromFavorites: (
    options: RemoveMultipleFavoritesOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => Promise<BaseResponseStatus>;

  /**
   * Removes multiple sights (dashboards) from the user's list of favorite items.
   *
   * @param options - {@link RemoveMultipleFavoritesOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link BaseResponseStatus}\> - Optional callback function
   * @returns Promise\<{@link BaseResponseStatus}\>
   */
  removeSightsFromFavorites: (
    options: RemoveMultipleFavoritesOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => Promise<BaseResponseStatus>;

  /**
   * Removes multiple workspaces from the user's list of favorite items.
   *
   * @param options - {@link RemoveMultipleFavoritesOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link BaseResponseStatus}\> - Optional callback function
   * @returns Promise\<{@link BaseResponseStatus}\>
   */
  removeWorkspacesFromFavorites: (
    options: RemoveMultipleFavoritesOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => Promise<BaseResponseStatus>;
}

// ============================================================================
// Favorite Types
// ============================================================================

/**
 * Favorite object type enumeration
 */
export enum FavoriteType {
  SHEET = 'sheet',
  FOLDER = 'folder',
  REPORT = 'report',
  TEMPLATE = 'template',
  WORKSPACE = 'workspace',
  SIGHT = 'sight',
}

/**
 * Favorite object
 */
export interface Favorite {
  /**
   * The type of the favorite object
   */
  type: FavoriteType;

  /**
   * The ID of the favorite object
   */
  objectId: number;
}

// ============================================================================
// List Favorites
// ============================================================================

export interface ListFavoritesQueryParameters {
  /**
   * If true, include all results (do not paginate)
   * @defaultValue false
   */
  includeAll?: boolean;

  /**
   * A comma-separated list of optional elements to include in the response.
   */
  include?: string;

  /**
   * Which page to return
   * @defaultValue 1
   */
  page?: number;

  /**
   * The maximum number of items to return per page
   * @defaultValue 100
   */
  pageSize?: number;
}

export interface ListFavoritesResponse {
  /**
   * The current page number
   * @defaultValue 1
   */
  pageNumber: number;

  /**
   * The number of items per page
   * @defaultValue 100
   */
  pageSize: number;

  /**
   * The total number of pages
   */
  totalPages: number;

  /**
   * The total number of favorites
   */
  totalCount: number;

  /**
   * Array of Favorite objects
   */
  data: Favorite[];
}

// ============================================================================
// Add Favorites
// ============================================================================

export interface AddFavoritesBody {
  objectId: number;
  type: FavoriteType;
}

/**
 * Options for convenience functions like addSheetToFavorites, addFolderToFavorites, etc.
 * Extends RequestOptions to include objectId as a top-level property.
 */
export interface AddFavoriteConvenienceOptions extends RequestOptions<undefined, AddFavoritesBody> {
  /**
   * The ID of the object to add to favorites
   */
  objectId: number;

  /**
   * The type of the favorite object (set internally by convenience functions)
   */
  type?: FavoriteType;
}

export interface AddFavoritesResponse {
  /**
   * Status message
   */
  message: string;

  /**
   * Result code
   */
  resultCode: number;

  /**
   * The added favorite(s)
   */
  result: Favorite | Favorite[];
}

// ============================================================================
// Remove Favorites
// ============================================================================

export interface RemoveMultipleFavoritesQueryParams {
  /**
   * A comma-separated list of Ids of the favorited item.
   */
  objectIds?: string | string[] | number | number[];
}

export interface RemoveMultipleFavoritesOptions extends RequestOptions<RemoveMultipleFavoritesQueryParams, undefined> {
  /**
   * The type of the favorite object
   */
  favoriteType?: FavoriteType;
}

export interface RemoveFavoriteOptions extends RequestOptions<undefined, undefined> {
  /**
   * The ID of the object to remove from favorites (for single removal)
   */
  favoriteId?: number;

  /**
   * The type of the favorite object
   */
  favoriteType?: FavoriteType;
}
