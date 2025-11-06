var _ = require('underscore');
var constants = require('../utils/constants.js');

exports.create = function (options) {
  // Legacy shares module (deprecated)
  var shares = require('../share/share.js')(options.apiUrls.reports);
  var requestor = options.requestor;

  var optionsToSend = {
    url: options.apiUrls.reports,
  };
  _.extend(optionsToSend, options.clientOptions);

  var getReport = (getOptions, callback) => {
    let url = options.apiUrls.reports;
    if (getOptions.reportId !== undefined) {
      url += '/' + getOptions.reportId;
    }
    var urlOptions = { url };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var sendReportViaEmail = (postOptions, callback) => {
    var urlOptions = { url: options.apiUrls.reports + '/' + postOptions.reportId + '/emails' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var getReportAsExcel = (getOptions, callback) => {
    var acceptOptions = { accept: constants.acceptHeaders.vndMsExcel, encoding: null };
    var urlOptions = { url: options.apiUrls.reports + '/' + getOptions.reportId };
    return requestor.get(_.extend({}, optionsToSend, acceptOptions, urlOptions, getOptions), callback);
  };

  var getReportAsCSV = (getOptions, callback) => {
    var acceptOptions = { accept: constants.acceptHeaders.textCsv };
    var urlOptions = { url: options.apiUrls.reports + '/' + getOptions.reportId };
    return requestor.get(_.extend({}, optionsToSend, acceptOptions, urlOptions, getOptions), callback);
  };

  var getReportPublishStatus = (getOptions, callback) => {
    var urlOptions = { url: options.apiUrls.reports + '/' + getOptions.reportId + '/publish' };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var setReportPublishStatus = (putOptions, callback) => {
    var urlOptions = { url: options.apiUrls.reports + '/' + putOptions.reportId + '/publish' };
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

  return _.extend(reportObject, shares.create(options));
};
