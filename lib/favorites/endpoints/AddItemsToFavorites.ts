import { RequestCallback } from '../../types';
import { ApiGenerator, FavoritableResource, FavoriteItem, PostResult } from '../sharedTypes';
const _ = require('underscore');

type AddItemsToFavoritesParams = {
  body: FavoriteItem | FavoriteItem[];
};

type AddItemsToFavoritesResponse = {
  /**
   * @description Favorite (object) or Array of Favorite (objects)
   */
  result: FavoriteItem | FavoriteItem[];
} & PostResult;

type AddItemsToFavoritesRequest = (
  params: AddItemsToFavoritesParams,
  callback: RequestCallback<AddItemsToFavoritesResponse>
) => Promise<AddItemsToFavoritesResponse>;

export const addItemsToFavorites: ApiGenerator<AddItemsToFavoritesRequest> =
  (requestor, optionsToSend) => (params, callback) => {
    // TODO Bfeigin do i need to explicitly set this to be a body param?
    return requestor.post(_.extend({}, optionsToSend, params), callback);
  };

type AddResourceToFavoritesParams = {
  objectId: string;
};

type AddItemOfTypeToFavoritesRequest = (
  params: AddResourceToFavoritesParams,
  callback: RequestCallback<AddItemsToFavoritesResponse>
) => Promise<AddItemsToFavoritesResponse>;

type AddFavoritesBuilder = (resourceType: FavoritableResource) => ApiGenerator<AddItemOfTypeToFavoritesRequest>;

export const buildAddFavoriteResourceFn: AddFavoritesBuilder = (resourceType: FavoritableResource) => {
  return (requestor, optionsToSend) => (params, callback) => {
    const generatedBody = {
      objectId: params.objectId,
      type: resourceType,
    };

    // Ensure we've extracted out any type and objectId params, placing them into body instead
    const constructedPostParams = {
      ..._.omit(params, 'type', 'objectId'),
      body: generatedBody,
    };

    return requestor.post(_.extend({}, optionsToSend, constructedPostParams), callback);
  };
};

export const addSheetToFavorites = buildAddFavoriteResourceFn(FavoritableResource.Sheet);
export const addFolderToFavorites = buildAddFavoriteResourceFn(FavoritableResource.Folder);
export const addReportToFavorites = buildAddFavoriteResourceFn(FavoritableResource.Report);
export const addTemplateToFavorites = buildAddFavoriteResourceFn(FavoritableResource.Template);
export const addWorkspaceToFavorites = buildAddFavoriteResourceFn(FavoritableResource.Workspace);
export const addSightToFavorites = buildAddFavoriteResourceFn(FavoritableResource.Sight);
