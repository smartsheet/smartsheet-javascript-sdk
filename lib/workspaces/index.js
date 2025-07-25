
exports.create = function (options) {
  var requestor = options.requestor;
  var shares = require('../share/share.js')(options.apiUrls.workspaces);

  var optionsToSend = {
    url: options.apiUrls.workspaces,
  };
  optionsToSend = { ...optionsToSend, ...options.clientOptions };

  var listWorkspaces = (getOptions, callback) => {
    var urlOptions = { url: buildUrl(getOptions) };
    return requestor.get({ ...optionsToSend, ...urlOptions, ...getOptions }, callback);
  };

  var listWorkspaceFolders = (getOptions, callback) => {
    var urlOptions = { url: buildUrl(getOptions) + '/folders' };
    return requestor.get({ ...optionsToSend, ...urlOptions, ...getOptions }, callback);
  };

  var createWorkspace = (postOptions, callback) => {
    var urlOptions = { url: buildUrl(postOptions) };
    return requestor.post({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

  var createFolder = (postOptions, callback) => {
    var urlOptions = { url: buildUrl(postOptions) + '/folders' };
    return requestor.post({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

  var updateWorkspace = (putOptions, callback) => {
    var urlOptions = { url: buildUrl(putOptions) };
    return requestor.put({ ...optionsToSend, ...urlOptions, ...putOptions }, callback);
  };

  var deleteWorkspace = (deleteOptions, callback) => {
    var urlOptions = { url: buildUrl(deleteOptions) };
    return requestor.delete({ ...optionsToSend, ...urlOptions, ...deleteOptions }, callback);
  };

  var copyWorkspace = (postOptions, callback) => {
    var urlOptions = { url: buildUrl(postOptions) + '/copy' };
    return requestor.post({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
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
    listWorkspaceFolders: listWorkspaceFolders,
    createWorkspace: createWorkspace,
    createFolder: createFolder,
    deleteWorkspace: deleteWorkspace,
    updateWorkspace: updateWorkspace,
    copyWorkspace: copyWorkspace,
  };

  workspaceObject = { ...workspaceObject, ...shares.create(options) };

  return workspaceObject;
};
