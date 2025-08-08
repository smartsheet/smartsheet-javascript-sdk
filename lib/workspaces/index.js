var _ = require('underscore');

exports.create = function (options) {
  var requestor = options.requestor;
  var shares = require('../share/share.js')(options.apiUrls.workspaces);

  var optionsToSend = {
    url: options.apiUrls.workspaces,
  };
  _.extend(optionsToSend, options.clientOptions);

  /**
   * @deprecated Use both getWorkspaceMetadata and getWorkspaceChildren instead.
   */
  var getWorkspace = (getOptions, callback) => {
    if (getOptions && getOptions.workspaceId) {
      console.warn('[DEPRECATED] getWorkspace is deprecated. Use getWorkspaceMetadata and getWorkspaceChildren instead.');
    }
    var urlOptions = { url: buildUrl(getOptions) };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };


  /**
   * @typedef {Object} QueryParameters
   * @property {string} [paginationType] - Type of pagination to use
   * @property {string} [lastKey] - Token for getting the next page of results
   * @property {number} [maxItems] - Maximum number of items to return per page
   * @property {number} [pageSize] - (deprecated) Page size for pagination
   * @property {number} [page] - (deprecated) Page number
   * @property {boolean} [includeAll] - (deprecated) Include all results
   */

  /**
   * @param {QueryParameters} params - Query parameters to check for deprecated usage
   */
  var warnDeprecatedParams = (params) => {
    const deprecationMappings = {
      pageSize: 'Use paginationType: "token" with maxItems instead.',
      page: 'Use paginationType: "token" with lastKey instead.',
      includeAll: 'Use paginationType: "token" instead.'
    };

    Object.keys(deprecationMappings).forEach(param => {
      if (params[param]) {
        console.warn(`[DEPRECATED] ${param} parameter is deprecated in listWorkspaces. ${deprecationMappings[param]}`);
      }
    });
  };

  /**
   * @param {QueryParameters} params - Query parameters to validate
   * @param {string} paginationType - The pagination type being used
   */
  var validateTokenPaginationParams = (params, paginationType) => {
    const tokenOnlyParams = ['lastKey', 'maxItems'];

    tokenOnlyParams.forEach(param => {
      if (params[param] && paginationType !== 'token') {
        console.warn(`[VALIDATION ERROR] ${param} parameter can only be used when paginationType is set to "token".`);
      }
    });
  };

  /**
   * @param {QueryParameters} params - Input query parameters
   * @param {string} paginationType - The pagination type being used
   * @returns {Object} Built query parameters object
   */
  var buildQueryParameters = (params, paginationType) => {
    const queryParams = {};

    if (paginationType === 'token') {
      queryParams['paginationType'] = paginationType;
      ['lastKey', 'maxItems'].forEach(param => {
        if (params[param]) {
          queryParams[param] = params[param];
        }
      });
    } else {
      ['pageSize', 'page', 'includeAll'].forEach(param => {
        if (params[param]) {
          queryParams[param] = params[param];
        }
      });
    }

    return queryParams;
  };

  /**
   * List workspaces in the organization
   * @param {Object} [getOptions] - Options for listing workspaces
   * @param {QueryParameters} [getOptions.queryParameters] - Optional query parameters
   * @param {Function} [callback] - Callback function to handle the response
   * @returns {Promise|undefined} Returns a promise if no callback is provided
   */
  var listWorkspaces = (getOptions, callback) => {
    var urlOptions = { url: buildUrl(getOptions) };
    /** @type {QueryParameters} */
    var inputQueryParams = (getOptions && getOptions.queryParameters) || {};
    var paginationType = inputQueryParams.paginationType;

    warnDeprecatedParams(inputQueryParams);
    validateTokenPaginationParams(inputQueryParams, paginationType);

    var queryParameters = buildQueryParameters(inputQueryParams, paginationType);

    const options = {
      ...urlOptions,
      ...getOptions,
      queryParameters: queryParameters
    };

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
    getWorkspace: getWorkspace,
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
