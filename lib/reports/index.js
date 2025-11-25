import shareModule from '../share/share';
import _ from 'underscore';
import * as constants from '../utils/constants';

export function create(options) {
  // Legacy shares module (deprecated)
  const shares = shareModule(options.apiUrls.reports);
  const requestor = options.requestor;

  const optionsToSend = {
    url: options.apiUrls.reports,
  };
  _.extend(optionsToSend, options.clientOptions);

  const getReport = (getOptions, callback) => {
    let url = options.apiUrls.reports;
    if (getOptions?.reportId) {
      url += '/' + getOptions.reportId;
    }
    const urlOptions = { url };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const sendReportViaEmail = (postOptions, callback) => {
    const urlOptions = { url: options.apiUrls.reports + '/' + postOptions.reportId + '/emails' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const getReportAsExcel = (getOptions, callback) => {
    const acceptOptions = { accept: constants.acceptHeaders.vndMsExcel, encoding: null };
    const urlOptions = { url: options.apiUrls.reports + '/' + getOptions.reportId };
    return requestor.get(_.extend({}, optionsToSend, acceptOptions, urlOptions, getOptions), callback);
  };

  const getReportAsCSV = (getOptions, callback) => {
    const acceptOptions = { accept: constants.acceptHeaders.textCsv };
    const urlOptions = { url: options.apiUrls.reports + '/' + getOptions.reportId };
    return requestor.get(_.extend({}, optionsToSend, acceptOptions, urlOptions, getOptions), callback);
  };

  const getReportPublishStatus = (getOptions, callback) => {
    const urlOptions = { url: options.apiUrls.reports + '/' + getOptions.reportId + '/publish' };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const setReportPublishStatus = (putOptions, callback) => {
    const urlOptions = { url: options.apiUrls.reports + '/' + putOptions.reportId + '/publish' };
    return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  const reportObject = {
    listReports: getReport,
    getReport: getReport,
    sendReportViaEmail: sendReportViaEmail,
    getReportAsExcel: getReportAsExcel,
    getReportAsCSV: getReportAsCSV,
    getReportPublishStatus: getReportPublishStatus,
    setReportPublishStatus: setReportPublishStatus,
  };

  return _.extend(reportObject, shares.create(options));
}
