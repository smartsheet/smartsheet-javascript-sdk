import type { BaseResponseStatus } from '../types/BaseResponseStatus';
import type { CreateOptions } from '../types/CreateOptions';
import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';
import type {
  FavoritesApi,
  ListFavoritesQueryParameters,
  ListFavoritesResponse,
  AddFavoritesBody,
  AddFavoritesResponse,
  AddFavoriteConvenienceOptions,
  RemoveFavoriteOptions,
  RemoveMultipleFavoritesOptions,
} from './types';
import { FavoriteType } from './types';

export function create(options: CreateOptions): FavoritesApi {
  const requestor = options.requestor;

  const optionsToSend = {
    url: options.apiUrls.favorites,
    ...options.clientOptions,
  };

  const listFavorites = (
    getOptions: RequestOptions<ListFavoritesQueryParameters, undefined>,
    callback?: RequestCallback<ListFavoritesResponse>
  ) => requestor.get({ ...optionsToSend, ...getOptions }, callback);

  const addItemsToFavorites = (
    postOptions: RequestOptions<undefined, AddFavoritesBody | AddFavoritesBody[]>,
    callback?: RequestCallback<AddFavoritesResponse>
  ) => requestor.post({ ...optionsToSend, ...postOptions }, callback);

  const handleFavorites = (
    postOptions: AddFavoriteConvenienceOptions,
    callback?: RequestCallback<AddFavoritesResponse>
  ) => {
    const body: AddFavoritesBody = {
      type: postOptions.type,
      objectId: postOptions.objectId,
    };
    const options = { ...postOptions, body };
    return addItemsToFavorites(options, callback);
  };

  const buildFavoriteAddition = (type: FavoriteType) => {
    return (postOptions: AddFavoriteConvenienceOptions, callback?: RequestCallback<AddFavoritesResponse>) => {
      const options: AddFavoriteConvenienceOptions = {
        ...JSON.parse(JSON.stringify(postOptions)),
        type,
      };
      return handleFavorites(options, callback);
    };
  };

  const addSheetToFavorites = buildFavoriteAddition(FavoriteType.SHEET);

  const addFolderToFavorites = buildFavoriteAddition(FavoriteType.FOLDER);

  const addReportToFavorites = buildFavoriteAddition(FavoriteType.REPORT);

  const addTemplateToFavorites = buildFavoriteAddition(FavoriteType.TEMPLATE);

  const addWorkspaceToFavorites = buildFavoriteAddition(FavoriteType.WORKSPACE);

  const addSightToFavorites = buildFavoriteAddition(FavoriteType.SIGHT);

  const addMultipleToFavorites = (
    postOptions: RequestOptions<undefined, AddFavoritesBody[]>,
    callback?: RequestCallback<AddFavoritesResponse>
  ) => {
    return requestor.post({ ...optionsToSend, ...postOptions }, callback);
  };

  const removeFavorite = (deleteOptions: RemoveFavoriteOptions, callback?: RequestCallback<BaseResponseStatus>) => {
    const favoriteId = deleteOptions.favoriteId;
    const urlOptions = { url: options.apiUrls.favorites + '/' + deleteOptions.favoriteType + '/' + favoriteId };
    return requestor.delete({ ...optionsToSend, ...urlOptions, ...deleteOptions }, callback);
  };

  const removeMultipleFavorites = (
    deleteOptions: RemoveMultipleFavoritesOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => {
    const urlOptions = {
      url: options.apiUrls.favorites + '/' + deleteOptions.favoriteType,
    };

    // Transform objectIds array to comma-separated string if needed
    const processedOptions = { ...deleteOptions };
    if (processedOptions.queryParameters?.objectIds && Array.isArray(processedOptions.queryParameters.objectIds)) {
      processedOptions.queryParameters = {
        ...processedOptions.queryParameters,
        objectIds: processedOptions.queryParameters.objectIds.join(','),
      };
    }

    return requestor.delete({ ...optionsToSend, ...urlOptions, ...processedOptions }, callback);
  };

  const buildFavoriteRemoval = (type: FavoriteType) => {
    return (deleteOptions: RemoveFavoriteOptions, callback?: RequestCallback<BaseResponseStatus>) => {
      const options = JSON.parse(JSON.stringify(deleteOptions)) as RemoveFavoriteOptions;
      options.favoriteType = type as FavoriteType;
      return removeFavorite(options, callback);
    };
  };

  const buildMultipleFavoriteRemoval = (type: FavoriteType) => {
    return (deleteOptions: RemoveMultipleFavoritesOptions, callback?: RequestCallback<BaseResponseStatus>) => {
      const options = JSON.parse(JSON.stringify(deleteOptions)) as RemoveMultipleFavoritesOptions;
      options.favoriteType = type as FavoriteType;
      return removeMultipleFavorites(options, callback);
    };
  };

  const removeSheetFromFavorites = buildFavoriteRemoval(FavoriteType.SHEET);

  const removeFolderFromFavorites = buildFavoriteRemoval(FavoriteType.FOLDER);

  const removeReportFromFavorites = buildFavoriteRemoval(FavoriteType.REPORT);

  const removeTemplateFromFavorites = buildFavoriteRemoval(FavoriteType.TEMPLATE);

  const removeWorkspaceFromFavorites = buildFavoriteRemoval(FavoriteType.WORKSPACE);

  const removeSightFromFavorites = buildFavoriteRemoval(FavoriteType.SIGHT);

  return {
    listFavorites,
    addItemsToFavorites,
    addSheetToFavorites,
    addFolderToFavorites,
    addReportToFavorites,
    addTemplateToFavorites,
    addSightToFavorites,
    addWorkspaceToFavorites,
    addMultipleToFavorites,
    removeSheetFromFavorites,
    removeFolderFromFavorites,
    removeReportFromFavorites,
    removeTemplateFromFavorites,
    removeSightFromFavorites,
    removeWorkspaceFromFavorites,
    // Convenience methods to remove multiples.
    removeSheetsFromFavorites: buildMultipleFavoriteRemoval(FavoriteType.SHEET),
    removeFoldersFromFavorites: buildMultipleFavoriteRemoval(FavoriteType.FOLDER),
    removeReportsFromFavorites: buildMultipleFavoriteRemoval(FavoriteType.REPORT),
    removeTemplatesFromFavorites: buildMultipleFavoriteRemoval(FavoriteType.TEMPLATE),
    removeSightsFromFavorites: buildMultipleFavoriteRemoval(FavoriteType.SIGHT),
    removeWorkspacesFromFavorites: buildMultipleFavoriteRemoval(FavoriteType.WORKSPACE),
  };
}
