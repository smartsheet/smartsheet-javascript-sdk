import shareModule from '../share/share.js';
import _ from 'underscore';
import * as attachments from './attachments.js';
import * as automationRules from './automationrules.js';
import * as columns from './columns.js';
import * as comments from './comments.js';
import * as createSheets from './create.js';
import * as crossSheetReferences from './crosssheetreferences.js';
import * as discussions from './discussions.js';
import * as getSheets from './get.js';
import * as summaries from './sheetsummaries.js';
import * as rows from './rows.js';
import * as sentUpdateRequests from './sentupdaterequests.js';
import * as updateRequests from './updaterequests.js';

export function create(options) {
  var requestor = options.requestor;

  // Legacy shares module (deprecated)
  const shares = shareModule(options.apiUrls.sheets);

  var optionsToSend = {
    urls: options.apiUrls,
  };
  _.extend(optionsToSend, options.clientOptions);

  var updateSheet = (putOptions, callback) => {
    var urlOptions = { url: options.apiUrls.sheets + '/' + putOptions.sheetId };
    return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  var deleteSheet = (deleteOptions, callback) => {
    var urlOptions = { url: options.apiUrls.sheets + '/' + deleteOptions.sheetId };
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  var sendSheetViaEmail = (postOptions, callback) => {
    var urlOptions = { url: options.apiUrls.sheets + '/' + postOptions.sheetId + '/emails' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var moveSheet = (postOptions, callback) => {
    var urlOptions = { url: options.apiUrls.sheets + '/' + postOptions.sheetId + '/move' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  var getPublishStatus = (getOptions, callback) => {
    var urlOptions = { url: options.apiUrls.sheets + '/' + getOptions.sheetId + '/publish' };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  var setPublishStatus = (putOptions, callback) => {
    var urlOptions = { url: options.apiUrls.sheets + '/' + putOptions.sheetId + '/publish' };
    return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  var sortRowsInSheet = (postOptions, callback) => {
    var urlOptions = { url: options.apiUrls.sheets + '/' + postOptions.sheetId + '/sort' };
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
  _.extend(sheetObject, shares.create(options));
  _.extend(sheetObject, updateRequests.create(options));

  return sheetObject;
};
