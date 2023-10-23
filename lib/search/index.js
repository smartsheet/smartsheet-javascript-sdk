var _ = require('underscore');

/**
 * @typedef SearchResult
 * @type {object}
 * @property {number} objectId - search result object id.
 * @property {number} parentObjectId - object id of the parent of the search result.
 * @property {string[]} contextData - additional information on the context of the search result.
 * @property {string} objectType - search result object type 
 * (attachment, dashboard, discussion, folder, report, row, sheet, summaryField, template, or workspace).
 * @property {string} parentObjectName - name of the parent object of the search result.
 * @property {string} parentObjectType - object type of the parent of the search result
 * (attachment, dashboard, discussion, folder, report, row, sheet, summaryField, template, or workspace).
 * @property {string} proofUrl - the proofUrl string will be present in the contextData if the
 * discussion or attachment belongs to a proof.
 * @property {string} text - piece of text that is relevant to the query from the search result.
 */

/**
 * @typedef SearchResponse
 * @type {object}
 * @property {SearchResult[]} results - array of `SearchResult`s that matched the search.
 * @property {number} totalCount - total number of results.
 */

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = {
    url: options.apiUrls.search,
    urls : options.apiUrls,
  };
  _.extend(optionsToSend, options.clientOptions);


  /**
   * @function searchAll
   * @description Perform a search for any asset type you have access to that 
   * matches the query string and the filtering passed as query parameters.
   * @param {string} getOptions.query - text to search for
   * @param {string | undefined} getOptions.queryParameters.location - when specified with the value of `personalWorkspace` it 
   * limits the response to only items in the user's personal workspace.
   * @param {string | number | undefined} getOptions.queryParameters.modifiedSince - when specified with a datetime in ms will
   * only show results modified since that time.
   * @param {string | undefined} getOptions.queryParameters.include - when specified as `favoriteFlag` the response
   * will indicate which results have been favorited by the user.
   * @param {string[] | undefined} getOptions.queryParameters.scopes - when specified results will be limited to the passed scopes.
   * Valid scopes include "attachments" "cellData" "comments" "folderNames" "reportNames"
   * "sheetNames" "sightNames" "summaryFields" "templateNames" "workspaceNames".
   * @param {function} callback
   * @returns {SearchResponse}
   */
  var searchAll = (getOptions, callback) => {
    var options = JSON.parse(JSON.stringify(getOptions));
    options.queryParameters = options.queryParameters || {};
    options.queryParameters = _.extend({query: options.query}, options.queryParameters);

    return requestor.get(_.extend({}, optionsToSend, options), callback);
  };

  /**
   * @function searchSheet
   * @description Perform a search for assets located within a specified sheet.
   * @param {string} getOptions.sheetId - id of the sheet to search within.
   * @param {string} getOptions.query - text to search for
   * @param {function} callback 
   * @returns {SearchResponse}
   */
  var searchSheet = (getOptions, callback) => {
    var urlOptions = {url: options.apiUrls.search + 'sheets/' + getOptions.sheetId};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  return {
    searchAll : searchAll,
    searchSheet : searchSheet
  };
};
