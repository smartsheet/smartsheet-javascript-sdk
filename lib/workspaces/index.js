var _ = require('underscore');

exports.create = function (options) {
  var requestor = options.requestor;
  // Legacy shares module (deprecated)
  var shares = require('../share/share.js')(options.apiUrls.workspaces);
  
  // Create a wrapper for the new sharing API that maintains backward compatibility
  var sharesWrapper = {
    create: function(options) {
      var legacyShares = shares.create(options);
      
      /**
       * @deprecated Use client.sharing.listAssetShares instead
       */
      function getWorkspaceShares(getOptions, callback) {
        console.warn('DEPRECATED: getWorkspaceShares is deprecated. Use client.sharing.listAssetShares instead.');
        return legacyShares.listShares(getOptions, callback);
      }
      
      /**
       * @deprecated Use client.sharing.shareAsset instead
       */
      function shareWorkspace(postOptions, callback) {
        console.warn('DEPRECATED: shareWorkspace is deprecated. Use client.sharing.shareAsset instead.');
        return legacyShares.share(postOptions, callback);
      }
      
      /**
       * @deprecated Use client.sharing.deleteShare instead
       */
      function deleteShare(deleteOptions, callback) {
        console.warn('DEPRECATED: deleteShare is deprecated. Use client.sharing.deleteShare instead.');
        return legacyShares.deleteShare(deleteOptions, callback);
      }
      
      /**
       * @deprecated Use client.sharing.updateShare instead
       */
      function updateShare(putOptions, callback) {
        console.warn('DEPRECATED: updateShare is deprecated. Use client.sharing.updateShare instead.');
        return legacyShares.updateShare(putOptions, callback);
      }
      
      return {
        getWorkspaceShares: getWorkspaceShares,
        shareWorkspace: shareWorkspace,
        deleteShare: deleteShare,
        updateShare: updateShare
      };
    }
  };

  var optionsToSend = {
    url: options.apiUrls.workspaces,
  };
  _.extend(optionsToSend, options.clientOptions);

  var listWorkspaces = (getOptions, callback) => {
    var urlOptions = { url: buildUrl(getOptions) };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var listWorkspaceFolders = (getOptions, callback) => {
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

  _.extend(workspaceObject, sharesWrapper.create(options));

  return workspaceObject;
};
