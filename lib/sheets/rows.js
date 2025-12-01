import _ from 'underscore';

export function create(options) {
  const requestor = options.requestor;

  const optionsToSend = _.extend({}, options.clientOptions);

  const getRow = (getOptions, callback) => {
    const urlOptions = { url: buildUrlWithRowId(getOptions) };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const getRowAttachments = (getOptions, callback) => {
    const urlOptions = { url: buildUrlWithRowId(getOptions) + '/attachments' };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const getRowDiscussions = (getOptions, callback) => {
    const urlOptions = { url: buildUrlWithRowId(getOptions) + '/discussions' };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const getCellHistory = (getOptions, callback) => {
    const urlOptions = { url: buildUrlWithRowId(getOptions) + '/columns/' + getOptions.columnId + '/history' };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const copyRowToAnotherSheet = (postOptions, callback) => {
    const urlOptions = { url: buildUrl(postOptions) + '/copy' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const moveRowToAnotherSheet = (postOptions, callback) => {
    const urlOptions = { url: buildUrl(postOptions) + '/move' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const addRow = (postOptions, callback) => {
    const urlOptions = { url: buildUrl(postOptions) };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const addRowUrlAttachment = (postOptions, callback) => {
    const urlOptions = { url: buildUrlWithRowId(postOptions) + '/attachments' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const addRowFileAttachment = (postOptions, callback) => {
    const urlOptions = { url: buildUrlWithRowId(postOptions) + '/attachments' };
    return requestor.postFile(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const createRowDiscussion = (postOptions, callback) => {
    const urlOptions = { url: buildUrlWithRowId(postOptions) + '/discussions' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const sendRows = (postOptions, callback) => {
    const urlOptions = { url: buildUrl(postOptions) + '/emails' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const updateRow = (putOptions, callback) => {
    const urlOptions = { url: buildUrl(putOptions) };
    return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  const deleteRow = (deleteOptions, callback) => {
    const urlOptions = { url: buildUrl(deleteOptions) + '?ids=' + (deleteOptions.rowId || '') };
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  const deleteRows = (deleteOptions, callback) => {
    const options = JSON.parse(JSON.stringify(deleteOptions));
    const params = options.queryParameters;
    if (_.isArray(params.ids)) {
      params.ids = params.ids.join(',');
    }

    const urlOptions = { url: buildUrl(options) };
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, options), callback);
  };

  const addImageToCell = (postOptions, callback) => {
    const urlOptions = { url: buildUrlWithRowId(postOptions) + '/columns/' + postOptions.columnId + '/cellimages' };
    return requestor.postFile(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const buildUrlWithRowId = (urlOptions) => buildUrl(urlOptions) + '/' + urlOptions.rowId;

  const buildUrl = (urlOptions) => options.apiUrls.sheets + '/' + urlOptions.sheetId + '/rows';

  return {
    getRow: getRow,
    getRowAttachments: getRowAttachments,
    getRowDiscussions: getRowDiscussions,
    getCellHistory: getCellHistory,
    copyRowToAnotherSheet: copyRowToAnotherSheet,
    moveRowToAnotherSheet: moveRowToAnotherSheet,
    addRow: addRow,
    addRows: addRow,
    addRowUrlAttachment: addRowUrlAttachment,
    addRowAttachment: addRowUrlAttachment,
    addRowFileAttachment: addRowFileAttachment,
    createRowDiscussion: createRowDiscussion,
    sendRows: sendRows,
    deleteRow: deleteRow,
    deleteRows: deleteRows,
    updateRow: updateRow,
    addImageToCell: addImageToCell,
  };
}
