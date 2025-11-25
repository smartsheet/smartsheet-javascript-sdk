import _ from 'underscore';

export function create(options) {
  const requestor = options.requestor;

  const optionsToSend = _.extend({}, options.clientOptions);

  const getColumns = (getOptions, callback) => {
    const urlOptions = { url: buildUrl(getOptions) };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const addColumn = (postOptions, callback) => {
    const urlOptions = { url: buildUrl(postOptions) };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const updateColumn = (putOptions, callback) => {
    const urlOptions = { url: buildUrl(putOptions) };
    return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  const deleteColumn = (deleteOptions, callback) => {
    const urlOptions = { url: buildUrl(deleteOptions) };
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  const buildUrl = (urlOptions) => {
    let url = options.apiUrls.sheets + '/' + urlOptions.sheetId + '/columns';
    if (urlOptions.columnId !== undefined) {
      url += '/' + urlOptions.columnId;
    }
    return url;
  };

  return {
    getColumns: getColumns,
    getColumn: getColumns,
    addColumn: addColumn,
    deleteColumn: deleteColumn,
    updateColumn: updateColumn,
  };
}
