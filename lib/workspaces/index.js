var _ = require('underscore');

exports.create = function (options) {
  var requestor = options.requestor;
  var shares = require('../share/share.js')(options.apiUrls.workspaces);

  var optionsToSend = {
    url: options.apiUrls.workspaces,
  };
  _.extend(optionsToSend, options.clientOptions);

  var listWorkspaces = (getOptions, callback) => {
    var urlOptions = { url: buildUrl(getOptions) };

    if (getOptions && getOptions.pageSize) {
      console.warn('[DEPRECATED] pageSize parameter is deprecated in listWorkspaces. Use paginationType: "token" with maxItems instead.');
    }
    
    if (getOptions && getOptions.page) {
      console.warn('[DEPRECATED] page parameter is deprecated in listWorkspaces. Use paginationType: "token" with lastKey instead.');
    }
    
    if (getOptions && getOptions.includeAll) {
      console.warn('[DEPRECATED] includeAll parameter is deprecated in listWorkspaces. Use paginationType: "token" instead.');
    }

    var paginationType = getOptions && getOptions.paginationType;
    // Validate that lastKey and maxItems are only used with token pagination
    if (getOptions && getOptions.lastKey && paginationType !== 'token') {
      console.warn('[VALIDATION ERROR] lastKey parameter can only be used when paginationType is set to "token".');
    }

    if (getOptions && getOptions.maxItems && paginationType !== 'token') {
      console.warn('[VALIDATION ERROR] maxItems parameter can only be used when paginationType is set to "token".');
    }

    var queryParams = {};
    if (paginationType === 'token') {
      if( getOptions && getOptions.lastKey) {
        queryParams.lastKey = getOptions.lastKey;
      }
      if( getOptions && getOptions.maxItems) {
        queryParams.maxItems = getOptions.maxItems;
      }
    } else if (getOptions){
      if (getOptions.pageSize) {
        queryParams.pageSize = getOptions.pageSize;
      }
      if (getOptions.page) {
        queryParams.page = getOptions.page;
      }
      if (getOptions.includeAll) {
        queryParams.includeAll = getOptions.includeAll;
      }
    }

    const options = {
      ...urlOptions,
      ...getOptions,
      qs : queryParams
    }
    return requestor.get(_.extend({}, optionsToSend, options), callback);
  };

  /**
   * @deprecated Use getWorkspaceChildren with childrenResourceTypes=folders instead.
   */
  var listWorkspaceFolders = (getOptions, callback) => {
    console.warn('DEPRECATED: Workspaces.listWorkspaceFolders is deprecated. Use getWorkspaceChildren instead.');
    var urlOptions = { url: buildUrl(getOptions) + '/folders' };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var createWorkspace = (postOptions, callback) => {
    var urlOptions = { url: buildUrl(postOptions) };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var createFolder = (postOptions, callback) => {
    var urlOptions = { url: buildUrl(postOptions) + '/folders' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var updateWorkspace = (putOptions, callback) => {
    var urlOptions = { url: buildUrl(putOptions) };
    return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  var deleteWorkspace = (deleteOptions, callback) => {
    var urlOptions = { url: buildUrl(deleteOptions) };
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  var copyWorkspace = (postOptions, callback) => {
    var urlOptions = { url: buildUrl(postOptions) + '/copy' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  /**
   * Get metadata of a workspace
   * @param {Object} getOptions - Options including workspaceId and optional query parameters
   * @param {number} getOptions.workspaceId - The workspace ID
   * @param {Object} [getOptions.queryParameters] - Optional query parameters
   * @param {string} [getOptions.queryParameters.include] - Comma-separated list of fields to include (source)
   * @param {Function} callback - Callback function
   */
  var getWorkspaceMetadata = (getOptions, callback) => {
    var urlOptions = { url: buildUrl(getOptions) + '/metadata' };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  /**
   * Get children of a workspace with token-based pagination
   * @param {Object} getOptions - Options including workspaceId and optional query parameters
   * @param {number} getOptions.workspaceId - The workspace ID
   * @param {Object} [getOptions.queryParameters] - Optional query parameters
   * @param {string} [getOptions.queryParameters.childrenResourceTypes] - Filter by resource type(s) (sheets, reports, sights, folders). Comma-separated string of types.
   * @param {string} [getOptions.queryParameters.include] - Comma-separated list of fields to include (source, ownerInfo)
   * @param {number} [getOptions.queryParameters.maxItems] - Maximum items per page
   * @param {string} [getOptions.queryParameters.lastKey] - Token for pagination
   * @param {Function} callback - Callback function
   */
  var getWorkspaceChildren = (getOptions, callback) => {
    var urlOptions = { url: buildUrl(getOptions) + '/children' };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var buildUrl = (urlOptions) => {
    var id = '';
    if (urlOptions && urlOptions.workspaceId) {
      id = urlOptions.workspaceId;
    }
    return options.apiUrls.workspaces + id;
  };

  var workspaceObject = {
    listWorkspaces: listWorkspaces,
    getWorkspace: listWorkspaces,
    getWorkspaceMetadata: getWorkspaceMetadata,
    getWorkspaceChildren: getWorkspaceChildren,
    listWorkspaceFolders: listWorkspaceFolders,
    createWorkspace: createWorkspace,
    createFolder: createFolder,
    deleteWorkspace: deleteWorkspace,
    updateWorkspace: updateWorkspace,
    copyWorkspace: copyWorkspace,
  };

  _.extend(workspaceObject, shares.create(options));

  return workspaceObject;
};
