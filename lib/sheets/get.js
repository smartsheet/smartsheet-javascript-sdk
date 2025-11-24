import _ from 'underscore';
import { acceptHeaders as headers } from '../utils/constants';

export function create(options) {
  const requestor = options.requestor;

  const optionsToSend = {
    url: options.apiUrls.sheets,
  };
  _.extend(optionsToSend, options.clientOptions);

  const listSheets = (getOptions, callback) => requestor.get(_.extend({}, optionsToSend, getOptions), callback);

  const getSheetAsCSV = (getOptions, callback) =>
    listSheets(_.extend({}, getOptions, { accept: headers.textCsv }), callback);

  const getSheetAsPDF = (getOptions, callback) =>
    listSheets(_.extend({}, getOptions, { accept: headers.applicationPdf, encoding: null }), callback);

  const getSheetAsExcel = (getOptions, callback) =>
    listSheets(_.extend({}, getOptions, { accept: headers.vndMsExcel, encoding: null }), callback);

  const getSheetVersion = (getOptions, callback) => {
    const urlOptions = { url: options.apiUrls.sheets + '/' + getOptions.sheetId + '/version' };
    return listSheets(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const listOrganizationSheets = (getOptions, callback) => {
    const urlOptions = { url: options.apiUrls.users + '/sheets' };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  return {
    getSheet: listSheets, // will retrieve a single sheet when passed 'id' field
    listSheets: listSheets,
    getSheetAsCSV: getSheetAsCSV,
    getSheetAsExcel: getSheetAsExcel,
    getSheetAsPDF: getSheetAsPDF,
    getSheetVersion: getSheetVersion,
    listOrganizationSheets: listOrganizationSheets,
  };
}
