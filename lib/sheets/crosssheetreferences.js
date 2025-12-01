import _ from 'underscore';

export function create(options) {
  const requestor = options.requestor;

  const optionsToSend = _.extend({}, options.clientOptions);

  const createCrossSheetReference = (postOptions, callback) => {
    const urlOptions = { url: buildUrlBase(postOptions) };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const getCrossSheetReference = (getOptions, callback) => {
    const urlOptions = { url: buildUrlBase(getOptions) + '/' + getOptions.crossSheetReferenceId };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const listCrossSheetReferences = (getOptions, callback) => {
    const urlOptions = { url: buildUrlBase(getOptions) };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const buildUrlBase = (urlOptions) => options.apiUrls.sheets + '/' + urlOptions.sheetId + '/crosssheetreferences';

  return {
    createCrossSheetReference: createCrossSheetReference,
    getCrossSheetReference: getCrossSheetReference,
    listCrossSheetReferences: listCrossSheetReferences,
  };
}
