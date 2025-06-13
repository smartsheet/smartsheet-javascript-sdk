var _ = require('underscore');
var attachments = require('./attachments.js');
var automationRules = require('./automationrules.js');
var columns = require('./columns.js');
var comments = require('./comments.js');
var createSheets = require('./create.js');
var crossSheetReferences = require('./crosssheetreferences.js');
var discussions = require('./discussions');
var getSheets = require('./get.js');
var summaries = require('./sheetsummaries.js');
var rows = require('./rows.js');
var sentUpdateRequests = require('./sentupdaterequests.js');
var updateRequests = require('./updaterequests.js');

exports.create = function (options) {
  var requestor = options.requestor;
  
  // Legacy shares module (deprecated)
  var shares = require('../share/share.js')(options.apiUrls.sheets);
  
  // Create a wrapper for the new sharing API that maintains backward compatibility
  var sharesWrapper = {
    create: function(options) {
      var legacyShares = shares.create(options);
      
      /**
       * @deprecated Use client.sharing.listAssetShares instead
       */
      function getSheetShares(getOptions, callback) {
        console.warn('DEPRECATED: getSheetShares is deprecated. Use client.sharing.listAssetShares instead.');
        return legacyShares.listShares(getOptions, callback);
      }
      
      /**
       * @deprecated Use client.sharing.shareAsset instead
       */
      function shareSheet(postOptions, callback) {
        console.warn('DEPRECATED: shareSheet is deprecated. Use client.sharing.shareAsset instead.');
        return legacyShares.share(postOptions, callback);
      }
      
      /**
       * @deprecated Use client.sharing.deleteShare instead
       */
      function deleteShare(deleteOptions, callback) {
        console.warn('DEPRECATED: deleteShare is deprecated. Use client.sharing.deleteShare instead.');
        return legacyShares.deleteShare(deleteOptions, callback);
      }
      
      /**
       * @deprecated Use client.sharing.updateShare instead
       */
      function updateShare(putOptions, callback) {
        console.warn('DEPRECATED: updateShare is deprecated. Use client.sharing.updateShare instead.');
        return legacyShares.updateShare(putOptions, callback);
      }
      
      return {
        getSheetShares: getSheetShares,
        shareSheet: shareSheet,
        deleteShare: deleteShare,
        updateShare: updateShare
      };
    }
  };

  var optionsToSend = {
    urls: options.apiUrls,
  };
  _.extend(optionsToSend, options.clientOptions);

  var updateSheet = (putOptions, callback) => {
    var urlOptions = { url: options.apiUrls.sheets };
    return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  var deleteSheet = (deleteOptions, callback) => {
    var urlOptions = { url: options.apiUrls.sheets };
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  var sendSheetViaEmail = (postOptions, callback) => {
    var urlOptions = { url: options.apiUrls.sheets + postOptions.sheetId + '/emails' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var moveSheet = (postOptions, callback) => {
    var urlOptions = { url: options.apiUrls.sheets + postOptions.sheetId + '/move' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var getPublishStatus = (getOptions, callback) => {
    var urlOptions = { url: options.apiUrls.sheets + getOptions.sheetId + '/publish' };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var setPublishStatus = (putOptions, callback) => {
    var urlOptions = { url: options.apiUrls.sheets + putOptions.sheetId + '/publish' };
    return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  var sortRowsInSheet = (postOptions, callback) => {
    var urlOptions = { url: options.apiUrls.sheets + postOptions.sheetId + '/sort' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var sheetObject = {
    sendSheetViaEmail: sendSheetViaEmail,
    getPublishStatus: getPublishStatus,
    setPublishStatus: setPublishStatus,
    updateSheet: updateSheet,
    deleteSheet: deleteSheet,
    moveSheet: moveSheet,
    sortRowsInSheet: sortRowsInSheet,
  };

  _.extend(sheetObject, attachments.create(options));
  _.extend(sheetObject, automationRules.create(options));
  _.extend(sheetObject, columns.create(options));
  _.extend(sheetObject, comments.create(options));
  _.extend(sheetObject, createSheets.create(options));
  _.extend(sheetObject, crossSheetReferences.create(options));
  _.extend(sheetObject, discussions.create(options));
  _.extend(sheetObject, getSheets.create(options));
  _.extend(sheetObject, summaries.create(options));
  _.extend(sheetObject, rows.create(options));
  _.extend(sheetObject, sentUpdateRequests.create(options));
  _.extend(sheetObject, sharesWrapper.create(options));
  _.extend(sheetObject, updateRequests.create(options));

  return sheetObject;
};
