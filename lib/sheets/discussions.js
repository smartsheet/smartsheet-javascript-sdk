import _ from 'underscore';

export function create(options) {
  const requestor = options.requestor;

  const optionsToSend = _.extend({}, options.clientOptions);

  const getDiscussions = (getOptions, callback) => {
    const urlOptions = { url: buildUrl(getOptions) };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const listDiscussionAttachments = (getOptions, callback) => {
    const urlOptions = { url: buildUrl(getOptions) + '/attachments' };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const createDiscussion = (postOptions, callback) => {
    const urlOptions = { url: buildUrl(postOptions) };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const addDiscussionComment = (postOptions, callback) => {
    const urlOptions = { url: buildUrl(postOptions) + '/comments' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const deleteDiscussion = (deleteOptions, callback) => {
    const urlOptions = { url: buildUrl(deleteOptions) };
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  const buildUrl = (urlOptions) => {
    let url = options.apiUrls.sheets + '/' + urlOptions.sheetId + '/discussions';
    if (urlOptions.discussionId !== undefined) {
      url += '/' + urlOptions.discussionId;
    }
    return url;
  };

  return {
    getDiscussions: getDiscussions,
    getDiscussion: getDiscussions,
    listDiscussionAttachments: listDiscussionAttachments,
    createDiscussion: createDiscussion,
    addDiscussionComment: addDiscussionComment,
    deleteDiscussion: deleteDiscussion,
  };
}
