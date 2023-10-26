var _ = require('underscore');

/**
 * @typedef Event
 * @type {object}
 * @param {string} eventId - Id of the event
 * @param {string} objectType - The smartsheet resource impacted by the event.
 * Either `SHEET` or `WORKSPACE`.
 * @param {string} action - The action applied to the object. Ex: `CREATE` or `DELETE`
 * @param {string} objectId - Id of the object impacted by the action.
 * @param {string} eventTimeStamp - Datetime of the event. Defaults to ISO-8601 format.
 * @param {string} userId - Id of the user who initiated the event.
 * @param {number} requestUserId - Id of the user whose id is embedded in the request
 * that initiated the event.
 * @param {number | null} accessTokenName - Name of the access token that initiated the action.
 * @param {string} source - Identifies the type of action that triggered the event.
 * @param {object} additionalDetails - Container object with additional event specific properties.
 */

/**
 * @typedef EventResponse
 * @type {object}
 * @property {string} nextStreamPosition - This string should be passed in a subsequent call
 * to get the next stream of events.
 * @property {boolean} moreAvailable - `true` if there are more results available in the next
 * stream.
 * @property {Event[]} data - Array of events in this stream. 
 */

exports.create = function(options) {
  var requestor = options.requestor;

  var optionsToSend = {
    url: options.apiUrls.events
  };
  _.extend(optionsToSend, options.clientOptions);

  /**
   * @function getEvents
   * @description Gets events that are occurring in your Smartsheet organization account.
   * Examples of events are creation, update, load, and delete of sheets, reports, dashboards,
   * attachments, users, etc.
   * @param {string | undefined} getOptions.queryParameters.since When provided will return
   * events that occured after the specified datetime. Interpreted as ISO-8601 format, unless
   * numericDates is specified (see details about numericDates below). Should not be set
   * if a `streamPosition` is set.
   * @param {string | undefined} getOptions.queryParameters.streamPosition - Indiates the next
   * set of events to be returned. You must pass a `streamPosition` OR `since`.
   * @param {number | undefined} getOptions.queryParameters.maxCount - Maximum number of 
   * events to return in a call. Must be between 1 and 10,000 inclusive. Defaults to 1000.
   * @param {boolean | undefined} getOptions.queryParameters.numericDates - If `true` dates
   * are accepted and returned in UNIX epoch time. Defaults to `false`.
   * @param {number | undefined} getOptions.queryParameters.managedPlanId - The target 
   * managed plan to list events for.
   * @param {Function} callback 
   * @returns {EventResponse}
   */
  var getEvents = (getOptions, callback) =>
    requestor.get(_.extend({}, optionsToSend, getOptions), callback);

  return {
    getEvents : getEvents
  };
};
