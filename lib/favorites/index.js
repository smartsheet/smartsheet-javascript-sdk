import _ from 'underscore';
import { types } from '../utils/constants';

export function create(options) {
  const requestor = options.requestor;

  const optionsToSend = {
    url: options.apiUrls.favorites,
  };
  _.extend(optionsToSend, options.clientOptions);

  const listFavorites = (getOptions, callback) => requestor.get(_.extend({}, optionsToSend, getOptions), callback);

  const addItemsToFavorites = (postOptions, callback) =>
    requestor.post(_.extend({}, optionsToSend, postOptions), callback);

  const handleFavorites = (postOptions, callback) => {
    const body = _.pick(postOptions, 'type', 'objectId');
    const options = _.omit(postOptions, 'type', 'objectId');

    options.body = body;
    return addItemsToFavorites(options, callback);
  };

  const buildFavoriteAddition = function (type) {
    return (postOptions, callback) => {
      const options = JSON.parse(JSON.stringify(postOptions));
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

  const addMultipleToFavorites = (postOptions, callback) => {
    return requestor.post(_.extend({}, optionsToSend, postOptions), callback);
  };

  const removeFavorite = (deleteOptions, callback) => {
    const params = deleteOptions.queryParameters;
    if (params && _.isArray(params.objectIds)) {
      params.objectIds = params.objectIds.join(',');
    }

    const urlOptions = {
      url: deleteOptions.objectId
        ? options.apiUrls.favorites + '/' + deleteOptions.type + '/' + deleteOptions.objectId
        : options.apiUrls.favorites + '/' + deleteOptions.type,
    };
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  const buildFavoriteRemoval = function (type) {
    return (deleteOptions, callback) => {
      const options = JSON.parse(JSON.stringify(deleteOptions));
      options.type = type;
      return removeFavorite(options, callback);
    };
  };

  const removeSheetFromFavorites = buildFavoriteRemoval(types.sheet);

  const removeFolderFromFavorites = buildFavoriteRemoval(types.folder);

  const removeReportFromFavorites = buildFavoriteRemoval(types.report);

  const removeTemplateFromFavorites = buildFavoriteRemoval(types.template);

  const removeWorkspaceFromFavorites = buildFavoriteRemoval(types.workspace);

  const removeSightFromFavorites = buildFavoriteRemoval(types.sight);

  return {
    listFavorites: listFavorites,
    addItemsToFavorites: addItemsToFavorites,
    addSheetToFavorites: addSheetToFavorites,
    addFolderToFavorites: addFolderToFavorites,
    addReportToFavorites: addReportToFavorites,
    addTemplateToFavorites: addTemplateToFavorites,
    addSightToFavorites: addSightToFavorites,
    addWorkspaceToFavorites: addWorkspaceToFavorites,
    addMultipleToFavorites: addMultipleToFavorites,
    removeSheetFromFavorites: removeSheetFromFavorites,
    removeFolderFromFavorites: removeFolderFromFavorites,
    removeReportFromFavorites: removeReportFromFavorites,
    removeTemplateFromFavorites: removeTemplateFromFavorites,
    removeSightFromFavorites: removeSightFromFavorites,
    removeWorkspaceFromFavorites: removeWorkspaceFromFavorites,
    //convenience methods to remove multiples.
    //Uses the same as the singular remove methods.
    removeSheetsFromFavorites: removeSheetFromFavorites,
    removeFoldersFromFavorites: removeFolderFromFavorites,
    removeReportsFromFavorites: removeReportFromFavorites,
    removeTemplatesFromFavorites: removeTemplateFromFavorites,
    removeSightsFromFavorites: removeSightFromFavorites,
    removeWorkspacesFromFavorites: removeWorkspaceFromFavorites,
  };
}
