var _ = require('underscore');

/**
 * @typedef AttachmentUser
 * @type {object}
 * @property {string} name - Name of the user who created the attachment.
 * @property {string} email - Email of the user who created the attachment.
 */

/**
 * @typedef Attachment
 * @type {object}
 * @property {number} id - Id of the attachment.
 * @property {number} parentId - Id of the parent of the attachment
 * @property {string} attachmentType - String representing the attachment type
 * @property {string} attachmentSubType - More information about the type of the attachment
 * @property {string} mimeType - Mime type of the attachment
 * @property {string} parentType - Type of the parent object `COMMENT`, `PROOF`, `ROW`, `SHEET`
 * @property {string | number} createdAt - Datetime the attachment was added.
 * @property {AttachmentUser} createdBy - User who created the attachment.
 * @property {string} name - Name of the attachment.
 * @property {number} sizeInKb - Size of the attachment if the `attachmentType` is `FILE`.
 * @property {string} url - Temporary url to the attachment (files only).
 * @property {number} urlExpiresInMillis - Number of ms left before the `url` above expires.
 */

/**
 * @typedef GetAttachmentResponse
 * @type {object}
 * @property {number} pageNumber - Current page of results.
 * @property {number | null} pageSize - Number of items on a page. Null if there are no pages.
 * @property {number} totalPages - Total number of pages.
 * @property {number} totalCount - Total number of attachments that match the query.
 * @property {Attachment[]} - Array of attachments in this page.
 */

/**
 * @typedef DeleteAttachmentResponse
 * @type {object}
 * @property {string} message - string indicating the outcome of the request.
 * `PARTIAL_SUCCESS` or `SUCCESS`.
 * @property {number} resultCode - number indicating the outcome of the request.
 * `0` indicates success. `3` indicates partial success.
 */

/**
 * @typedef UploadAttachmentResponse
 * @type {object}
 * @property {number | null} version - New version of the sheet.
 * @property {string} message - string indicating the outcome of the request.
 * `PARTIAL_SUCCESS` or `SUCCESS`.
 * @property {number} resultCode - number indicating the outcome of the request.
 * `0` indicates success. `3` indicates partial success.
 * @property {Attachment} result - Attachment that was uploaded.
 */

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = _.extend({}, options.clientOptions);

  /**
   * @function listAttachments
   * @description Get the attachment(s) that match the query.
   * @param {string} getOptions.sheetId - Id of the sheet to search on.
   * @param {string | undefined} getOptions.attachmentId - Id of the attachment to look for.
   * @param {number | undefined} getOptions.queryParameters.page - Which page of results you want to query for.
   * Defaults to `1`.
   * @param {number | undefined} getOptions.queryParameters.pageSize - Maximum number of attachments
   * per page. Defaults to `100`.
   * @param {boolean | undefined} getOptions.queryParameters.includeAll - When `true` returns all 
   * results on one page. Defaults to `false`.
   * @param {Function} callback 
   * @returns {Attachment | GetAttachmentResponse}
   */
  var listAttachments = (getOptions, callback) => {
    var urlOptions = {url: buildUrl(getOptions)};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  /**
   * @function listAttachmentVersions
   * @description Get a list of all versions of a given attachment.
   * @param {string} getOptions.sheetId - Id of the sheet the attachment lives on.
   * @param {string} getOptions.attachmentId - Id of the attachment.
   * @param {number | undefined} getOptions.queryParameters.page - Which page of results you want to query for.
   * Defaults to `1`.
   * @param {number | undefined} getOptions.queryParameters.pageSize - Maximum number of attachments
   * per page. Defaults to `100`.
   * @param {boolean | undefined} getOptions.queryParameters.includeAll - When `true` returns all 
   * results on one page. Defaults to `false`.
   * @param {Function} callback 
   * @returns {GetAttachmentResponse}
   */
  var listAttachmentVersions = (getOptions, callback) => {
    var urlOptions = {url: buildUrl(getOptions) + '/versions'};
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  /**
   * @function addUrlAttachment
   * @description Add a new url attachment to a sheet
   * @param {string} postOptions.body.attachmentType - Type of document being uploaded.
   * @param {string} postOptions.body.attachmentSubType - Additional information about the attachment type.
   * @param {string | undefined} postOptions.body.description - String describing the attachment.
   * @param {string} postOptions.body.name - Name of the attachment.
   * @param {string} postOptions.body.url - Url of the attachment.
   * @param {Function} callback 
   * @returns {UploadAttachmentResponse}
   */
  var addUrlAttachment = (postOptions, callback) => {
    var urlOptions = {url: buildUrl(postOptions)};
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  /**
   * @function addFileAttachment
   * @description Attach a new file attachment to a sheet.
   * @param {number} postOptions.sheetId - Id of the sheet the attachment is on.
   * @param {number} postOptions.attachmentId - Id of the attachment being updated.
   * @param {number} postOptions.fileSize - Size of the new version.
   * @param {string} postOptions.fileName - Name of the updated attachment version.
   * @param {object} postOptions.fileStream - File stream of the new version of the attachment.
   * @param {Function} callback 
   * @returns {UploadAttachmentResponse}
   */
  var addFileAttachment = (postOptions, callback) => {
    var urlOptions = {url: buildUrl(postOptions)};
    return requestor.postFile(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  /**
   * @function attachNewVersion
   * @description Attach a new version of an attachment
   * @param {number} postOptions.sheetId - Id of the sheet the attachment is on.
   * @param {number} postOptions.attachmentId - Id of the attachment being updated.
   * @param {number} postOptions.fileSize - Size of the new version.
   * @param {string} postOptions.fileName - Name of the updated attachment version.
   * @param {object} postOptions.fileStream - File stream of the new version of the attachment.
   * @param {Function} callback 
   * @returns {UploadAttachmentResponse}
   */
  var attachNewVersion = (postOptions, callback) => {
    var urlOptions = {url: buildUrl(postOptions) + '/versions'};
    return requestor.postFile(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  /**
   * @function deleteAttachment
   * @description Method to delete an attachment
   * @param {number} deleteOptions.sheetId - Id of the sheet the attachment is on.
   * @param {number} deleteOptions.attachmentId - Id of the attachment to delete.
   * @param {Function} callback 
   * @returns {DeleteAttachmentResponse}
   */
  var deleteAttachment = (deleteOptions, callback) => {
    var urlOptions = {url: buildUrl(deleteOptions)};
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  /**
   * @function deleteAllAttachmentVersions
   * @description Deletes all versions of the attachment passed.
   * @param {number} deleteOptions.sheetId - Id of the sheet the attachment is on.
   * @param {number} deleteOptions.attachmentId - Id of the attachment to delete.
   * @param {Function} callback 
   * @returns {DeleteAttachmentResponse}
   */
  var deleteAllAttachmentVersions = (deleteOptions, callback) => {
    var urlOptions = {url: buildUrl(deleteOptions) + '/versions'};
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  var buildUrl = urlOptions =>
    options.apiUrls.sheets + urlOptions.sheetId + '/attachments/' + (urlOptions.attachmentId || '');

  return {
    getAttachment : listAttachments,
    listAttachments : listAttachments,
    listAttachmentVersions : listAttachmentVersions,
    addAttachment: addUrlAttachment,
    addUrlAttachment : addUrlAttachment,
    addFileAttachment : addFileAttachment,
    attachNewVersion : attachNewVersion,
    deleteAttachment : deleteAttachment,
    deleteAllAttachmentVersions : deleteAllAttachmentVersions
  };
};
