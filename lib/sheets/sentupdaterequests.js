import _ from 'underscore';

export function create(options) {
  const requestor = options.requestor;

  const optionsToSend = _.extend({}, options.clientOptions);

  const deleteSentUpdateRequest = (deleteOptions, callback) => {
    const urlOptions = { url: buildUrl(deleteOptions) };
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  const getSentUpdateRequest = (getOptions, callback) => {
    const urlOptions = { url: buildUrl(getOptions) };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const getAllSentUpdateRequests = (getOptions, callback) => {
    const urlOptions = { url: buildUrl(getOptions) };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const buildUrl = (urlOptions) => {
    let url = options.apiUrls.sheets + '/' + urlOptions.sheetId + '/sentupdaterequests';
    if (urlOptions.sentUpdateRequestId !== undefined) {
      url += '/' + urlOptions.sentUpdateRequestId;
    }
    return url;
  };

  return {
    deleteSentUpdateRequest: deleteSentUpdateRequest,
    getSentUpdateRequest: getSentUpdateRequest,
    getAllSentUpdateRequests: getAllSentUpdateRequests,
  };
}
