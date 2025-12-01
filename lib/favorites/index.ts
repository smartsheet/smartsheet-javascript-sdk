import type { CreateOptions } from '../types/CreateOptions';
import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';
import type {
  FavoritesApi,
  ListFavoritesQueryParameters,
  ListFavoritesResponse,
  AddFavoritesBody,
  AddFavoritesResponse,
  RemoveFavoriteOptions,
  RemoveMultipleFavoritesOptions,
  RemoveFavoritesResponse,
} from './types';
import { FavoriteType } from './types'
import { types } from '../utils/constants';

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
    postOptions: RequestOptions<undefined, AddFavoritesBody | AddFavoritesBody[]>,
    callback?: RequestCallback<AddFavoritesResponse>
  ) => {
    const body: AddFavoritesBody = {
      type: (postOptions as any).type,
      objectId: (postOptions as any).objectId,
    };
    const options = { ...postOptions, body };
    return addItemsToFavorites(options, callback);
  };

  const buildFavoriteAddition = (type: string) => {
    return (
      postOptions: RequestOptions<undefined, AddFavoritesBody | AddFavoritesBody[]>,
      callback?: RequestCallback<AddFavoritesResponse>
    ) => {
      const options = JSON.parse(JSON.stringify(postOptions)) as any;
      options.type = type;
      return handleFavorites(options, callback);
    };
  };

  const addSheetToFavorites = buildFavoriteAddition(types.sheet);

  const addFolderToFavorites = buildFavoriteAddition(types.folder);

  const addReportToFavorites = buildFavoriteAddition(types.report);

  const addTemplateToFavorites = buildFavoriteAddition(types.template);

  const addWorkspaceToFavorites = buildFavoriteAddition(types.workspace);

  const addSightToFavorites = buildFavoriteAddition(types.sight);

  const addMultipleToFavorites = (
    postOptions: RequestOptions<undefined, AddFavoritesBody[]>,
    callback?: RequestCallback<AddFavoritesResponse>
  ) => {
    return requestor.post({ ...optionsToSend, ...postOptions }, callback);
  };

  const removeFavorite = (
    deleteOptions: RemoveFavoriteOptions,
    callback?: RequestCallback<RemoveFavoritesResponse>
  ) => {
    const favoriteId = deleteOptions.favoriteId;
    const urlOptions = { url: options.apiUrls.favorites + '/' + deleteOptions.favoriteType + '/' + favoriteId };
    return requestor.delete({ ...optionsToSend, ...urlOptions, ...deleteOptions }, callback);
  };

  const removeMultipleFavorites = (
    deleteOptions: RemoveMultipleFavoritesOptions,
    callback?: RequestCallback<RemoveFavoritesResponse>
  ) => {
    const urlOptions = {
      url: options.apiUrls.favorites + '/' + deleteOptions.favoriteType,
    };
    return requestor.delete({ ...optionsToSend, ...urlOptions, ...deleteOptions }, callback);
  };

  const buildFavoriteRemoval = (type: FavoriteType) => {
    return (
      deleteOptions: RemoveFavoriteOptions,
      callback?: RequestCallback<RemoveFavoritesResponse>
    ) => {
      const options = JSON.parse(JSON.stringify(deleteOptions)) as RemoveFavoriteOptions;
      options.favoriteType = type as FavoriteType;
      return removeFavorite(options, callback);
    };
  };

  const buildMultipleFavoriteRemoval = (type: FavoriteType) => {
    return (
      deleteOptions: RemoveMultipleFavoritesOptions,
      callback?: RequestCallback<RemoveFavoritesResponse>
    ) => {
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
