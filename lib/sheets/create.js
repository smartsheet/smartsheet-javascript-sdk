import _ from 'underscore';
import { acceptHeaders as headers } from '../utils/constants';

export function create(options) {
  const requestor = options.requestor;

  const optionsToSend = {
    url: options.apiUrls.sheets,
  };
  _.extend(optionsToSend, options.clientOptions);

  const createSheet = (postOptions, callback) => requestor.post(_.extend({}, optionsToSend, postOptions), callback);

  const createSheetFromExisting = (postOptions, callback) => {
    const options = JSON.parse(JSON.stringify(postOptions));
    if (options.workspaceId) {
      return createSheetInWorkspace(options, callback);
    } else if (options.folderId) {
      return createSheetInFolder(options, callback);
    } else {
      return createSheet(options, callback);
    }
  };

  const createSheetInFolder = (postOptions, callback) => {
    const urlOptions = { url: buildFolderUrl(postOptions) };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const createSheetInWorkspace = (postOptions, callback) => {
    const urlOptions = { url: buildWorkspaceUrl(postOptions) };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const copySheet = (postOptions, callback) => {
    const urlOptions = { url: options.apiUrls.sheets + '/' + postOptions.sheetId + '/copy' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const importSheet = (postOptions, callback, contentType, baseUrl) => {
    const urlOptions = {
      url: baseUrl + 'import',
      contentType: contentType,
      contentDisposition: 'attachment',
    };
    return requestor.postFile(_.extend({}, optionsToSend, urlOptions, postOptions));
  };

  const _importXlsxAndReplaceSheet = (postOptions, callback) => {
    const baseUrl = options.apiUrls.sheets + '/' + postOptions.sheetId + '/';
    return importSheet(postOptions, callback, headers.vndOpenXml, baseUrl);
  };

  const _importCsvAndReplaceSheet = (postOptions, callback) => {
    const baseUrl = options.apiUrls.sheets + '/' + postOptions.sheetId + '/';
    return importSheet(postOptions, callback, headers.textCsv, baseUrl);
  };

  const importXlsxSheet = (postOptions, callback) => {
    return importSheet(postOptions, callback, headers.vndOpenXml, options.apiUrls.sheets + '/');
  };

  const importCsvSheet = (postOptions, callback) => {
    return importSheet(postOptions, callback, headers.textCsv, options.apiUrls.sheets + '/');
  };

  const importXlsxSheetIntoFolder = (postOptions, callback) => {
    return importSheet(postOptions, callback, headers.vndOpenXml, buildFolderUrl(postOptions) + '/');
  };

  const importCsvSheetIntoFolder = (postOptions, callback) => {
    return importSheet(postOptions, callback, headers.textCsv, buildFolderUrl(postOptions) + '/');
  };

  const importXlsxSheetIntoWorkspace = (postOptions, callback) => {
    return importSheet(postOptions, callback, headers.vndOpenXml, buildWorkspaceUrl(postOptions) + '/');
  };

  const importCsvSheetIntoWorkspace = (postOptions, callback) => {
    return importSheet(postOptions, callback, headers.textCsv, buildWorkspaceUrl(postOptions) + '/');
  };

  const buildFolderUrl = (requestOptions) => {
    return options.apiUrls.folders + '/' + requestOptions.folderId + '/sheets';
  };

  const buildWorkspaceUrl = (requestOptions) => {
    return options.apiUrls.workspaces + '/' + requestOptions.workspaceId + '/sheets';
  };

  return {
    createSheet: createSheet,
    createSheetFromExisting: createSheetFromExisting,
    createSheetInFolder: createSheetInFolder,
    createSheetInWorkspace: createSheetInWorkspace,
    copySheet: copySheet,
    // Not yet released in the API
    // importCsvAndReplaceSheet     : importCsvAndReplaceSheet,
    // importXlsxAndReplaceSheet    : importXlsxAndReplaceSheet,
    importCsvSheet: importCsvSheet,
    importXlsxSheet: importXlsxSheet,
    importCsvSheetIntoFolder: importCsvSheetIntoFolder,
    importXlsxSheetIntoFolder: importXlsxSheetIntoFolder,
    importCsvSheetIntoWorkspace: importCsvSheetIntoWorkspace,
    importXlsxSheetIntoWorkspace: importXlsxSheetIntoWorkspace,
  };
}
