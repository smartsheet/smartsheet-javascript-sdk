import _ from 'underscore';

export function create(options) {
  const requestor = options.requestor;

  const optionsToSend = {
    url: options.apiUrls.folders,
    urls: options.apiUrls,
  };
  _.extend(optionsToSend, options.clientOptions);

  /**
   * @deprecated Use both getFolderMetadata and getFolderChildren instead.
   */
  const getFolder = (getOptions, callback) => {
    console.warn('DEPRECATED: Folders.getFolder is deprecated. Use getFolderMetadata and getFolderChildren instead.');
    return requestor.get(_.extend({}, optionsToSend, getOptions), callback);
  };

  /**
   * @deprecated Use getFolderChildren with childrenResourceTypes=folders instead.
   */
  const listChildFolders = (getOptions, callback) => {
    console.warn('DEPRECATED: Folders.listChildFolders is deprecated. Use getFolderChildren instead.');
    const urlOptions = { url: options.apiUrls.folders + '/' + getOptions.folderId + '/folders' };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const createChildFolder = (postOptions, callback) => {
    const urlOptions = { url: options.apiUrls.folders + '/' + postOptions.folderId + '/folders' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const updateFolder = (putOptions, callback) => {
    const urlOptions = { url: options.apiUrls.folders + '/' + putOptions.folderId };
    requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  const deleteFolder = (deleteOptions, callback) => {
    const urlOptions = { url: options.apiUrls.folders + '/' + deleteOptions.folderId };
    requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  const copyFolder = (postOptions, callback) => {
    const urlOptions = { url: options.apiUrls.folders + '/' + postOptions.folderId + '/copy' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const moveFolder = (postOptions, callback) => {
    const urlOptions = { url: options.apiUrls.folders + '/' + postOptions.folderId + '/move' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  /**
   * Get metadata of a folder
   * @param {Object} getOptions - Options including folderId and optional query parameters
   * @param {number} getOptions.folderId - The folder ID
   * @param {Object} [getOptions.queryParameters] - Optional query parameters
   * @param {string} [getOptions.queryParameters.include] - Comma-separated list of fields to include (source)
   * @param {Function} callback - Callback function
   */
  const getFolderMetadata = (getOptions, callback) => {
    const urlOptions = { url: options.apiUrls.folders + '/' + getOptions.folderId + '/metadata' };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  /**
   * Get children of a folder with token-based pagination
   * @param {Object} getOptions - Options including folderId and optional query parameters
   * @param {number} getOptions.folderId - The folder ID
   * @param {Object} [getOptions.queryParameters] - Optional query parameters
   * @param {string} [getOptions.queryParameters.childrenResourceTypes] - Filter by resource type(s) (sheets, reports, sights, folders). Comma-separated string of types.
   * @param {string} [getOptions.queryParameters.include] - Comma-separated list of fields to include (source, ownerInfo)
   * @param {number} [getOptions.queryParameters.maxItems] - Maximum items per page
   * @param {string} [getOptions.queryParameters.lastKey] - Token for pagination
   * @param {Function} callback - Callback function
   */
  const getFolderChildren = (getOptions, callback) => {
    const urlOptions = { url: options.apiUrls.folders + '/' + getOptions.folderId + '/children' };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  return {
    getFolder: getFolder,
    getFolderMetadata: getFolderMetadata,
    getFolderChildren: getFolderChildren,
    listChildFolders: listChildFolders,
    createChildFolder: createChildFolder,
    updateFolder: updateFolder,
    deleteFolder: deleteFolder,
    moveFolder: moveFolder,
    copyFolder: copyFolder,
  };
}
