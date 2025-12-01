import shareModule from '../share/share';
import _ from 'underscore';
import * as attachments from './attachments';
import * as automationRules from './automationrules';
import * as columns from './columns';
import * as comments from './comments';
import * as createSheets from './create';
import * as crossSheetReferences from './crosssheetreferences';
import * as discussions from './discussions';
import * as getSheets from './get';
import * as summaries from './sheetsummaries';
import * as rows from './rows';
import * as sentUpdateRequests from './sentupdaterequests';
import * as updateRequests from './updaterequests';

export function create(options) {
  const requestor = options.requestor;

  // Legacy shares module (deprecated)
  const shares = shareModule(options.apiUrls.sheets);

  const optionsToSend = {
    urls: options.apiUrls,
  };
  _.extend(optionsToSend, options.clientOptions);

  const updateSheet = (putOptions, callback) => {
    const urlOptions = { url: options.apiUrls.sheets + '/' + putOptions.sheetId };
    return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  const deleteSheet = (deleteOptions, callback) => {
    const urlOptions = { url: options.apiUrls.sheets + '/' + deleteOptions.sheetId };
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  const sendSheetViaEmail = (postOptions, callback) => {
    const urlOptions = { url: options.apiUrls.sheets + '/' + postOptions.sheetId + '/emails' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const moveSheet = (postOptions, callback) => {
    const urlOptions = { url: options.apiUrls.sheets + '/' + postOptions.sheetId + '/move' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const getPublishStatus = (getOptions, callback) => {
    const urlOptions = { url: options.apiUrls.sheets + '/' + getOptions.sheetId + '/publish' };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const setPublishStatus = (putOptions, callback) => {
    const urlOptions = { url: options.apiUrls.sheets + '/' + putOptions.sheetId + '/publish' };
    return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  const sortRowsInSheet = (postOptions, callback) => {
    const urlOptions = { url: options.apiUrls.sheets + '/' + postOptions.sheetId + '/sort' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const sheetObject = {
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
}
