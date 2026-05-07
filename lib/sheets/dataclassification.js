import _ from 'underscore';

export function create(options) {
  const requestor = options.requestor;
  const optionsToSend = {
    urls: options.apiUrls,
  };
  _.extend(optionsToSend, options.clientOptions);

  const buildUrl = (urlOptions) => options.apiUrls.sheets + '/' + urlOptions.sheetId + '/dataclassification';

  const setDataClassification = (putOptions, callback) => {
    const urlOptions = { url: buildUrl(putOptions) };
    return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  const deleteDataClassification = (deleteOptions, callback) => {
    const urlOptions = { url: buildUrl(deleteOptions) };
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  return {
    setDataClassification: setDataClassification,
    deleteDataClassification: deleteDataClassification,
  };
}
