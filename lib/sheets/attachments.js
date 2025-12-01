import _ from 'underscore';

export function create(options) {
  const requestor = options.requestor;

  const optionsToSend = _.extend({}, options.clientOptions);

  const listAttachments = (getOptions, callback) => {
    const urlOptions = { url: buildUrl(getOptions) };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const listAttachmentVersions = (getOptions, callback) => {
    const urlOptions = { url: buildUrl(getOptions) + '/versions' };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const addUrlAttachment = (postOptions, callback) => {
    const urlOptions = { url: buildUrl(postOptions) };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const addFileAttachment = (postOptions, callback) => {
    const urlOptions = { url: buildUrl(postOptions) };
    return requestor.postFile(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const attachNewVersion = (postOptions, callback) => {
    const urlOptions = { url: buildUrl(postOptions) + '/versions' };
    return requestor.postFile(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const deleteAttachment = (deleteOptions, callback) => {
    const urlOptions = { url: buildUrl(deleteOptions) };
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  const deleteAllAttachmentVersions = (deleteOptions, callback) => {
    const urlOptions = { url: buildUrl(deleteOptions) + '/versions' };
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  const buildUrl = (urlOptions) => {
    let url = options.apiUrls.sheets + '/' + urlOptions.sheetId + '/attachments';
    if (urlOptions.attachmentId !== undefined) {
      url += '/' + urlOptions.attachmentId;
    }
    return url;
  };

  return {
    getAttachment: listAttachments,
    listAttachments: listAttachments,
    listAttachmentVersions: listAttachmentVersions,
    addAttachment: addUrlAttachment,
    addUrlAttachment: addUrlAttachment,
    addFileAttachment: addFileAttachment,
    attachNewVersion: attachNewVersion,
    deleteAttachment: deleteAttachment,
    deleteAllAttachmentVersions: deleteAllAttachmentVersions,
  };
}
