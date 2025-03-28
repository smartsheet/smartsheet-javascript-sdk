import { ApiResource, CreateOptions } from '../types';
import { createApiProvider } from '../utils/createApiProvider';
import { createListFavorites } from './endpoints/ListFavorites';
import { ApiCreator } from './sharedTypes';
import { FavoritesApi } from './types';

const buildFavoritesApi: ApiCreator<FavoritesApi> = (requestor, optionsToSend) => {
  return {
    listFavorites: createListFavorites(requestor, optionsToSend),
  };
};
//type FavoritesApi = {
//    listFavorites : listFavorites,
//    addItemsToFavorites : addItemsToFavorites,
//    addSheetToFavorites : addSheetToFavorites,
//    addFolderToFavorites : addFolderToFavorites,
//    addReportToFavorites : addReportToFavorites,
//    addTemplateToFavorites : addTemplateToFavorites,
//    addSightToFavorites : addSightToFavorites,
//    addWorkspaceToFavorites : addWorkspaceToFavorites,
//    addMultipleToFavorites : addMultipleToFavorites,
//    removeSheetFromFavorites : removeSheetFromFavorites,
//    removeFolderFromFavorites : removeFolderFromFavorites,
//    removeReportFromFavorites : removeReportFromFavorites,
//    removeTemplateFromFavorites : removeTemplateFromFavorites,
//    removeSightFromFavorites : removeSightFromFavorites,
//    removeWorkspaceFromFavorites : removeWorkspaceFromFavorites,
//    //convenience methods to remove multiples.
//    //Uses the same as the singular remove methods.
//    removeSheetsFromFavorites : removeSheetFromFavorites,
//    removeFoldersFromFavorites : removeFolderFromFavorites,
//    removeReportsFromFavorites : removeReportFromFavorites,
//    removeTemplatesFromFavorites : removeTemplateFromFavorites,
//    removeSightsFromFavorites : removeSightFromFavorites,
//    removeWorkspacesFromFavorites : removeWorkspaceFromFavorites
//
//}

export const createFavorites = (options: CreateOptions) => {
  return createApiProvider(options, ApiResource.Favorites, buildFavoritesApi);
};
