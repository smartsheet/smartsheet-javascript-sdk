var _ = require('underscore');

exports.create = function (options) {
  var requestor = options.requestor;

  var optionsToSend = {
    url: options.apiUrls.home,
  };
  _.extend(optionsToSend, options.clientOptions);

  /**
   * @deprecated See: https://developers.smartsheet.com/api/smartsheet/guides/updating-code/migrate-from-using-the-sheets-folder
   */
  var listContents = (getOptions, callback) => {
    console.warn('DEPRECATED: Home.listContents is deprecated.');
    return requestor.get(_.extend({}, optionsToSend, getOptions), callback);
  };

  /**
   * @deprecated See: https://developers.smartsheet.com/api/smartsheet/guides/updating-code/migrate-from-using-the-sheets-folder
   */
  var listFolders = (getOptions, callback) => {
    console.warn('DEPRECATED: Home.listFolders is deprecated.');
    return listContents(_.extend({ url: options.apiUrls.home + '/' + 'folders' }, getOptions), callback);
  };

  /**
   * @deprecated See: https://developers.smartsheet.com/api/smartsheet/guides/updating-code/migrate-from-using-the-sheets-folder
   */
  var createFolder = (postOptions, callback) => {
    console.warn('DEPRECATED: Home.createFolder is deprecated.');
    var urlOptions = { url: options.apiUrls.home + '/' + 'folders' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  return {
    listContents: listContents,
    listFolders: listFolders,
    createFolder: createFolder,
  };
};
