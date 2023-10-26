var _ = require('underscore');

/**
 * @typedef Contact
 * @type {object}
 * @property {string} id - contact id
 * @property {string} name - full name of the contact
 * @property {string} email - contact's email address
 */

/**
 * @typedef ListContactsResponse
 * @property {number} pageNumber - number of pages of results that match the query.
 * @property {number} pageSize - number of results on each page.
 * @property {number} totalPages - number of pages of results that match the query.
 * @property {number} totalCount - number of contacts that match the query.
 * @property {Contact[]} data - Array of contacts representing this page of results.
 */

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = {
      url: options.apiUrls.contacts,
  };
  _.extend(optionsToSend, options.clientOptions);


  /**
   * @function getContact
   * @description Function to get one contact the user has access to using the 
   * contact id.
   * @param {number} getOptions.id - id of the contact to return.
   * @param {string} getOptions.queryParameters - comma-separated list of optional elements to
   * include in the response. Ex: "profileImage"
   * @param {function} callback 
   * @returns {Contact}
   */
  var getContact = (getOptions, callback) =>
    requestor.get(_.extend({}, optionsToSend, getOptions), callback);

  /**
   * @function listContacts
   * @description Lists all of the contacts that the user has access to
   * that meet any of the optional filtering criteria. Note that this call is paginated
   * unless the `includeAll` flag is set to false.
   * @param {boolean | undefined} getOptions.queryParameters.includeAll - The return will not be paginated if this is
   * set to true. Defaults to `false`.
   * @param {string | number | undefined} getOptions.queryParameters.modifiedSince - When passed only contacts modified 
   * after the passed datetime will be returned.
   * @param {boolean | undefined} getOptions.queryParameters.numericDates - You can optionally chose to send
   * and receive dates in the numeric format (ms since the UNIX epoch). Defaults to `false`.
   * @param {number | undefined} getOptions.queryParameters.page - Which page of results to return. Defaults to `1`.
   * @param {number | undefined} getOptions.queryParameters.pageSize - The maximum number of results to return per page.
   * Defaults to `100`.
   * @param {Function} callback 
   * @returns {ListContactsResponse}
   */
  var listContacts = (getOptions, callback) =>
    requestor.get(_.extend({}, optionsToSend, getOptions), callback);

  return {
    getContact : getContact,
    listContacts : listContacts
  };
};
