import { ApiResource, CreateOptions } from '../types';
import { createApiProvider } from '../utils/createApiProvider';
import { createListFavorites } from './endpoints/ListFavorites';
import {
  addFolderToFavorites,
  addItemsToFavorites,
  addReportToFavorites,
  addSheetToFavorites,
  addSightToFavorites,
  addTemplateToFavorites,
  addWorkspaceToFavorites,
} from './endpoints/AddItemsToFavorites';
import { ApiGenerator } from './sharedTypes';
import { FavoritesApi } from './types';

const buildFavoritesApi: ApiGenerator<FavoritesApi> = (requestor, optionsToSend) => {
  return {
    listFavorites: createListFavorites(requestor, optionsToSend),
    addItemsToFavorites: addItemsToFavorites(requestor, optionsToSend),
    addFolderToFavorites: addFolderToFavorites(requestor, optionsToSend),
    addReportToFavorites: addReportToFavorites(requestor, optionsToSend),
    addSheetToFavorites: addSheetToFavorites(requestor, optionsToSend),
    addSightToFavorites: addSightToFavorites(requestor, optionsToSend),
    addTemplateToFavorites: addTemplateToFavorites(requestor, optionsToSend),
    addWorkspaceToFavorites: addWorkspaceToFavorites(requestor, optionsToSend),
    // Duplicate of addItemsToFavorites
    addMultipleToFavorites: addItemsToFavorites(requestor, optionsToSend),
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
