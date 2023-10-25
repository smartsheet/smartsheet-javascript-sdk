var _ = require('underscore');

/**
 * @typedef ServerInfoResponse
 * @type {object}
 * @property {object} formats - object to hold various formatting information.
 * The structure of this object is not guarenteed to stay the same even within the same major api version.
 * @property {string[]} supportedLocales - Array of string representing the locales Smartsheet supports.
 */

exports.create = function(options) {
  var optionsToSend = {
    url: options.apiUrls.server,
    urls : options.apiUrls,
  };
  _.extend(optionsToSend, options.clientOptions);

  /**
   * @function getInfo
   * @description get static reference data from the server.
   * @param {Function} callback 
   * @returns {ServerInfoResponse}
   */
  var getInfo = (getOptions, callback) =>
    options.requestor.get(_.extend({}, optionsToSend, getOptions), callback);

  return {
    getInfo : getInfo
  };
};
