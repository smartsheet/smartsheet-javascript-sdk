var _ = require('underscore');
var types = require('../utils/constants').types;

/**
 * @typedef Favorite
 * @type {object}
 * @property {number} objectId - Id of the favorited object.
 * @property {string} type - Type of the favorited asset.
 * `folder` `report` `sheet` `sight` `template` `workspace`
 */

/**
 * @typedef GetFavoritesResponse
 * @type {object}
 * @property {number} pageNumber - The current page of favorites.
 * @property {number | null} pageSize - The number of favorites per page.
 * @property {number} totalPages - The number of pages of favorites for the request.
 * @property {number} totalCount - Total number of favorites.
 * @property {Favorite[]} data - list of favorites on the current page.
 */

/**
 * @typedef AddFavoritesResponse
 * @type {object}
 * @property {string} message - Message indicating the success of the request. `PARTIAL_SUCCESS` or `SUCCESS`.
 * @property {number} resultCode - Number indicating the success of the request. `0` indicates success. `3` 
 * indicates partial success.
 * @property {Favorite | Favorite[]} result - favorite(s) that were added successfully.
 */

/**
 * @typedef DeleteFavoritesResponse
 * @type {object}
 * @property {string} message - Message indicating the success of the request. `PARTIAL_SUCCESS` or `SUCCESS`.
 * @property {number} resultCode - Number indicating the success of the request. `0` indicates success. `3` 
 * indicates partial success.
 */

exports.create = options => {
  var requestor = options.requestor;

  var optionsToSend = {
    url: options.apiUrls.favorites,
  };
  _.extend(optionsToSend, options.clientOptions);

  /**
   * @function listFavorites
   * @description Gets a list of all of the user's favorite assets
   * @param {boolean | undefined} getOptions.queryParameters.includeAll - If `true` it will not 
   * paginate and all favorites will be returned in one request. Defaults to `false`.
   * @param {number | undefined} getOptions.queryParameters.page - Which page of results to return. 
   * Defaults to `1`.
   * @param {number | undefined} getOptions.queryParameters.pageSize - Maximum number of results returned
   * in one page. Defaults to `100`.
   * @param {string | undefined} getOptions.queryParameters.include - Comma separated list of optional 
   * elements to include in the response. Ex: `directId` or `name`.
   * @param {Function} callback 
   * @returns {GetFavoritesResponse}
   */
  var listFavorites = (getOptions, callback) =>
    requestor.get(_.extend({}, optionsToSend, getOptions), callback);

  /**
   * @function addItemsToFavorites
   * @description Method to add one or more favorite items for the user.
   * @param {Favorite | Favorite[]} postOptions.body - A single asset or a list of assets that you
   * want to add as favorites.
   * @param {Function} callback 
   * @returns {AddFavoritesResponse}
   */
  var addItemsToFavorites = (postOptions, callback) =>
    requestor.post(_.extend({}, optionsToSend, postOptions), callback);

  var handleFavorites = (postOptions, callback) => {
    var body = _.pick(postOptions, 'type', 'objectId');
    var options = _.omit(postOptions, 'type', 'objectId');

    options.body = body;
    return addItemsToFavorites(options, callback);
  };

  var buildFavoriteAddition = function(type) {
    return (postOptions, callback) => {
      var options = JSON.parse(JSON.stringify(postOptions));
      options.type = type;
      return handleFavorites(options, callback);
    };
  };

  /**
   * @function addSheetToFavorites
   * @description Method to favorite one sheet.
   * @param {string} postOptions.objectId - Id of the sheet you would like to favorite.
   * @param {Function} callback
   * @returns {AddFavoritesResponse}
   */
  var addSheetToFavorites = buildFavoriteAddition(types.sheet);

  /**
   * @function addFolderToFavorites
   * @description Method to favorite one folder.
   * @param {string} postOptions.objectId - Id of the folder you would like to favorite.
   * @param {Function} callback
   * @returns {AddFavoritesResponse}
   */
  var addFolderToFavorites = buildFavoriteAddition(types.folder);

  /**
   * @function addReportToFavorites
   * @description Method to favorite one report.
   * @param {string} postOptions.objectId - Id of the report you would like to favorite.
   * @param {Function} callback
   * @returns {AddFavoritesResponse}
   */
  var addReportToFavorites = buildFavoriteAddition(types.report);

  /**
   * @function addTemplateToFavorites
   * @description Method to favorite one template.
   * @param {string} postOptions.objectId - Id of the template you would like to favorite.
   * @param {Function} callback
   * @returns {AddFavoritesResponse}
   */
  var addTemplateToFavorites = buildFavoriteAddition(types.template);

  /**
   * @function addWorkspaceToFavorites
   * @description Method to favorite one workspace.
   * @param {string} postOptions.objectId - Id of the workspace you would like to favorite.
   * @param {Function} callback
   * @returns {AddFavoritesResponse}
   */
  var addWorkspaceToFavorites = buildFavoriteAddition(types.workspace);

  /**
   * @function addSightToFavorites
   * @description Method to favorite one sight.
   * @param {string} postOptions.objectId - Id of the sight you would like to favorite.
   * @param {Function} callback
   * @returns {AddFavoritesResponse}
   */
  var addSightToFavorites = buildFavoriteAddition(types.sight);

  /**
   * @function addMultipleToFavorites
   * @description Method to add one or more favorite items for the user.
   * @param {Favorite[]} postOptions.body - A list of assets that you
   * want to add as favorites.
   * @param {Function} callback 
   * @returns {AddFavoritesResponse}
   */
  var addMultipleToFavorites = (postOptions, callback) => {
    return requestor.post(_.extend({}, optionsToSend, postOptions), callback);
  };

  var removeFavorite = (deleteOptions, callback) => {
    var params = deleteOptions.queryParameters;
    if (params && _.isArray(params.objectIds)) {
      params.objectIds = params.objectIds.join(',');
    }

    var urlOptions = {url: options.apiUrls.favorites + deleteOptions.type + '/' + (deleteOptions.id || deleteOptions.objectId || '')};
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  var buildFavoriteRemoval = function(type) {
    return (deleteOptions, callback) => {
      var options = JSON.parse(JSON.stringify(deleteOptions));
      options.type = type;
      return removeFavorite(options, callback);
    };
  };

  /**
   * @function removeSheetFromFavorites
   * @description Remove one or multiple sheets from favorites.
   * Only one of the id parameters below must be set.
   * @param {string[] | undefined} deleteOptions.queryParameters.objectIds - An array of ids of sheets to be removed from favorites.
   * @param {string | undefined} deleteOptions.id - Id of a sheet that should be removed from favorites.
   * @param {Function} callback
   * @returns {DeleteFavoritesResponse}
   */
  var removeSheetFromFavorites = buildFavoriteRemoval(types.sheet);

  /**
   * @function removeFolderFromFavorites
   * @description Remove one or multiple folders from favorites.
   * @param {string[] | undefined} deleteOptions.queryParameters.objectIds - An array of ids of folders to be removed from favorites.
   * @param {string | undefined} deleteOptions.id - Id of a sheet that should be removed from favorites.
   * @param {Function} callback
   * @returns {DeleteFavoritesResponse}
   */
  var removeFolderFromFavorites = buildFavoriteRemoval(types.folder);

  /**
   * @function removeReportFromFavorites
   * @description Remove one or multiple reports from favorites.
   * @param {string[] | undefined} deleteOptions.queryParameters.objectIds - An array of ids of reports to be removed from favorites.
   * @param {string | undefined} deleteOptions.id - Id of a report that should be removed from favorites.
   * @param {Function} callback
   * @returns {DeleteFavoritesResponse}
   */
  var removeReportFromFavorites = buildFavoriteRemoval(types.report);

  /**
   * @function removeTemplateFromFavorites
   * @description Remove one or multiple templates from favorites.
   * @param {string[] | undefined} objectIds - An array of ids of templates to be removed from favorites.
   * @param {string | undefined} id - Id of a template that should be removed from favorites.
   * @returns {DeleteFavoritesResponse}
   */
  var removeTemplateFromFavorites = buildFavoriteRemoval(types.template);

  /**
   * @function removeWorkspaceFromFavorites
   * @description Remove one or multiple workspaces from favorites.
   * @param {string[] | undefined} deleteOptions.queryParameters.objectIds - an array of ids of workspaces to be removed from favorites.
   * @param {string | undefined} deleteOptions.id - Id of a workspace that should be removed from favorites.
   * @param {Function} callback
   * @returns {DeleteFavoritesResponse}
   */
  var removeWorkspaceFromFavorites = buildFavoriteRemoval(types.workspace);

  /**
   * @function removeSightFromFavorites
   * @description Remove one or multiple Sights from favorites.
   * @param {string[] | undefined} deleteOptions.queryParameters.objectIds - an array of ids of sights to be removed from favorites.
   * @param {string | undefined} deleteOptions.id - Id of a sight that should be removed from favorites.
   * @param {Function} callback
   * @returns {DeleteFavoritesResponse}
   */
  var removeSightFromFavorites = buildFavoriteRemoval(types.sight);

  return {
    listFavorites : listFavorites,
    addItemsToFavorites : addItemsToFavorites,
    addSheetToFavorites : addSheetToFavorites,
    addFolderToFavorites : addFolderToFavorites,
    addReportToFavorites : addReportToFavorites,
    addTemplateToFavorites : addTemplateToFavorites,
    addSightToFavorites : addSightToFavorites,
    addWorkspaceToFavorites : addWorkspaceToFavorites,
    addMultipleToFavorites : addMultipleToFavorites,
    removeSheetFromFavorites : removeSheetFromFavorites,
    removeFolderFromFavorites : removeFolderFromFavorites,
    removeReportFromFavorites : removeReportFromFavorites,
    removeTemplateFromFavorites : removeTemplateFromFavorites,
    removeSightFromFavorites : removeSightFromFavorites,
    removeWorkspaceFromFavorites : removeWorkspaceFromFavorites,
    //convenience methods to remove multiples.
    //Uses the same as the singular remove methods.
    removeSheetsFromFavorites : removeSheetFromFavorites,
    removeFoldersFromFavorites : removeFolderFromFavorites,
    removeReportsFromFavorites : removeReportFromFavorites,
    removeTemplatesFromFavorites : removeTemplateFromFavorites,
    removeSightsFromFavorites : removeSightFromFavorites,
    removeWorkspacesFromFavorites : removeWorkspaceFromFavorites
  };
};
