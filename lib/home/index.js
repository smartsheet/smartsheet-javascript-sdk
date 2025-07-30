var _ = require('underscore');

exports.create = function (options) {
  var requestor = options.requestor;

  var optionsToSend = {
    url: options.apiUrls.home,
  };
  _.extend(optionsToSend, options.clientOptions);

  /**
   * @deprecated This method is deprecated.
   */
  var listContents = (getOptions, callback) => requestor.get(_.extend({}, optionsToSend, getOptions), callback);

  /**
   * @deprecated This method is deprecated.
   */
  var listFolders = (getOptions, callback) =>
    listContents(_.extend({ url: options.apiUrls.home + 'folders' }, getOptions), callback);

  /**
   * @deprecated This method is deprecated.
   */
  var createFolder = (postOptions, callback) => {
    var urlOptions = { url: options.apiUrls.home + 'folders' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  return {
    listContents: listContents,
    listFolders: listFolders,
    createFolder: createFolder,
  };
};
