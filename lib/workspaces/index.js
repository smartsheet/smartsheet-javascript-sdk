import _ from 'underscore';

export function create(options) {
  const requestor = options.requestor;

  const optionsToSend = {
    url: options.apiUrls.workspaces,
  };
  _.extend(optionsToSend, options.clientOptions);

  /**
   * @typedef {Object} QueryParameters
   * @property {string} [lastKey] - Token for getting the next page of results
   * @property {number} [maxItems] - Maximum number of items to return per page
   */

  /**
   * List workspaces in the organization
   * @param {Object} [getOptions] - Options for listing workspaces
   * @param {QueryParameters} [getOptions.queryParameters] - Optional query parameters
   * @param {Function} [callback] - Callback function to handle the response
   * @returns {Promise|undefined} Returns a promise if no callback is provided
   */
  const listWorkspaces = (getOptions, callback) => {
    const urlOptions = { url: buildUrl(getOptions) };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const createWorkspace = (postOptions, callback) => {
    const urlOptions = { url: buildUrl(postOptions) };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const createFolder = (postOptions, callback) => {
    const urlOptions = { url: buildUrl(postOptions) + '/folders' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const updateWorkspace = (putOptions, callback) => {
    const urlOptions = { url: buildUrl(putOptions) };
    return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  const deleteWorkspace = (deleteOptions, callback) => {
    const urlOptions = { url: buildUrl(deleteOptions) };
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  const copyWorkspace = (postOptions, callback) => {
    const urlOptions = { url: buildUrl(postOptions) + '/copy' };
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
  const getWorkspaceMetadata = (getOptions, callback) => {
    const urlOptions = { url: buildUrl(getOptions) + '/metadata' };
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
  const getWorkspaceChildren = (getOptions, callback) => {
    const urlOptions = { url: buildUrl(getOptions) + '/children' };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const buildUrl = (urlOptions) => {
    let id = '';
    if (urlOptions && urlOptions.workspaceId) {
      id = '/' + urlOptions.workspaceId;
    }
    return options.apiUrls.workspaces + id;
  };

  const workspaceObject = {
    listWorkspaces: listWorkspaces,
    getWorkspaceMetadata: getWorkspaceMetadata,
    getWorkspaceChildren: getWorkspaceChildren,
    createWorkspace: createWorkspace,
    createFolder: createFolder,
    deleteWorkspace: deleteWorkspace,
    updateWorkspace: updateWorkspace,
    copyWorkspace: copyWorkspace,
  };

  return workspaceObject;
}
