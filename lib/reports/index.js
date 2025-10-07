var _ = require('underscore');
var constants = require('../utils/constants.js');

exports.create = function (options) {
  // Legacy shares module (deprecated)
  var shares = require('../share/share.js')(options.apiUrls.reports);
  var requestor = options.requestor;
  
  // Create a wrapper for the new sharing API that maintains backward compatibility
  var sharesWrapper = {
    create: function(options) {
      var legacyShares = shares.create(options);
      
      /**
       * @deprecated Use client.sharing.listAssetShares instead
       */
      function getReportShares(getOptions, callback) {
        console.warn('DEPRECATED: getReportShares is deprecated. Use client.sharing.listAssetShares instead.');
        return legacyShares.listShares(getOptions, callback);
      }
      
      /**
       * @deprecated Use client.sharing.shareAsset instead
       */
      function shareReport(postOptions, callback) {
        console.warn('DEPRECATED: shareReport is deprecated. Use client.sharing.shareAsset instead.');
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
        getReportShares: getReportShares,
        shareReport: shareReport,
        listShares: getReportShares, // Alias for backward compatibility
        deleteShare: deleteShare,
        updateShare: updateShare
      };
    }
  };

  var optionsToSend = {
    url: options.apiUrls.reports,
  };
  _.extend(optionsToSend, options.clientOptions);

  var getReport = (getOptions, callback) => {
    return requestor.get(_.extend({}, optionsToSend, getOptions), callback);
  };

  var sendReportViaEmail = (postOptions, callback) => {
    var urlOptions = { url: options.apiUrls.reports + postOptions.reportId + '/emails' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var getReportAsExcel = (getOptions, callback) => {
    var acceptOptions = { accept: constants.acceptHeaders.vndMsExcel, encoding: null };
    return requestor.get(_.extend({}, optionsToSend, acceptOptions, getOptions), callback);
  };

  var getReportAsCSV = (getOptions, callback) => {
    var acceptOptions = { accept: constants.acceptHeaders.textCsv };
    return requestor.get(_.extend({}, optionsToSend, acceptOptions, getOptions), callback);
  };

  var getReportPublishStatus = (getOptions, callback) => {
    var urlOptions = { url: options.apiUrls.reports + getOptions.reportId + '/publish' };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var setReportPublishStatus = (putOptions, callback) => {
    var urlOptions = { url: options.apiUrls.reports + putOptions.reportId + '/publish' };
    return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  var reportObject = {
    listReports: getReport,
    getReport: getReport,
    sendReportViaEmail: sendReportViaEmail,
    getReportAsExcel: getReportAsExcel,
    getReportAsCSV: getReportAsCSV,
    getReportPublishStatus: getReportPublishStatus,
    setReportPublishStatus: setReportPublishStatus,
  };

  return _.extend(reportObject, sharesWrapper.create(options));
};
