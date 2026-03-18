import _ from 'underscore';
import { acceptHeaders as headers } from '../utils/constants';

export function create(options) {
  const requestor = options.requestor;

  const optionsToSend = {
    ...options.clientOptions,
  };

  const listSheets = (getOptions, callback) => {
    const urlOptions = { url: buildUrl() };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const getSheet = (getOptions, callback) => {
    const urlOptions = { url: buildUrl(getOptions.sheetId) };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const getSheetAsCSV = (getOptions, callback) => {
    const urlOptions = { url: buildUrl(getOptions.sheetId) };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions, { accept: headers.textCsv }), callback);
  };

  const getSheetAsPDF = (getOptions, callback) => {
    const urlOptions = { url: buildUrl(getOptions.sheetId) };
    return requestor.get(
      _.extend({}, optionsToSend, urlOptions, getOptions, { accept: headers.applicationPdf, encoding: null }),
      callback
    );
  };

  const getSheetAsExcel = (getOptions, callback) => {
    const urlOptions = { url: buildUrl(getOptions.sheetId) };
    return requestor.get(
      _.extend({}, optionsToSend, urlOptions, getOptions, { accept: headers.vndMsExcel, encoding: null }),
      callback
    );
  };

  const getSheetVersion = (getOptions, callback) => {
    const urlOptions = { url: buildUrl(getOptions.sheetId) + '/version' };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const listOrganizationSheets = (getOptions, callback) => {
    const urlOptions = { url: options.apiUrls.users + '/sheets' };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const buildUrl = (sheetId) => {
    if (sheetId !== undefined) {
      return options.apiUrls.sheets + '/' + sheetId;
    }
    return options.apiUrls.sheets;
  };

  return {
    getSheet: getSheet,
    listSheets: listSheets,
    getSheetAsCSV: getSheetAsCSV,
    getSheetAsExcel: getSheetAsExcel,
    getSheetAsPDF: getSheetAsPDF,
    getSheetVersion: getSheetVersion,
    listOrganizationSheets: listOrganizationSheets,
  };
}
