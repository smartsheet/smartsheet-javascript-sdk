import _ from 'underscore';

export function create(options) {
  const requestor = options.requestor;

  const optionsToSend = _.extend({}, options.clientOptions);

  const getComment = (getOptions, callback) => {
    const urlOptions = { url: buildUrl(getOptions) };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const deleteComment = (deleteOptions, callback) => {
    const urlOptions = { url: buildUrl(deleteOptions) };
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  const addCommentUrlAttachment = (postOptions, callback) => {
    const urlOptions = { url: buildUrl(postOptions) + '/attachments' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const addCommentFileAttachment = (postOptions, callback) => {
    const urlOptions = { url: buildUrl(postOptions) + '/attachments' };
    return requestor.postFile(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const editComment = (putOptions, callback) => {
    const urlOptions = { url: buildUrl(putOptions) };
    return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  const buildUrl = (urlOptions) =>
    options.apiUrls.sheets + '/' + urlOptions.sheetId + '/comments/' + (urlOptions.commentId || '');

  return {
    getComment: getComment,
    deleteComment: deleteComment,
    addCommentUrlAttachment: addCommentUrlAttachment,
    addCommentAttachment: addCommentUrlAttachment,
    addCommentFileAttachment: addCommentFileAttachment,
    editComment: editComment,
  };
}
