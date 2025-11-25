import _ from 'underscore';

export function create(options) {
  const requestor = options.requestor;

  const optionsToSend = {
    url: options.apiUrls.home,
  };
  _.extend(optionsToSend, options.clientOptions);

  /**
   * @deprecated See: https://developers.smartsheet.com/api/smartsheet/guides/updating-code/migrate-from-using-the-sheets-folder
   */
  const listContents = (getOptions, callback) => {
    console.warn('DEPRECATED: Home.listContents is deprecated.');
    return requestor.get(_.extend({}, optionsToSend, getOptions), callback);
  };

  /**
   * @deprecated See: https://developers.smartsheet.com/api/smartsheet/guides/updating-code/migrate-from-using-the-sheets-folder
   */
  const listFolders = (getOptions, callback) => {
    console.warn('DEPRECATED: Home.listFolders is deprecated.');
    return listContents(_.extend({ url: options.apiUrls.home + '/' + 'folders' }, getOptions), callback);
  };

  /**
   * @deprecated See: https://developers.smartsheet.com/api/smartsheet/guides/updating-code/migrate-from-using-the-sheets-folder
   */
  const createFolder = (postOptions, callback) => {
    console.warn('DEPRECATED: Home.createFolder is deprecated.');
    const urlOptions = { url: options.apiUrls.home + '/' + 'folders' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  return {
    listContents: listContents,
    listFolders: listFolders,
    createFolder: createFolder,
  };
}
