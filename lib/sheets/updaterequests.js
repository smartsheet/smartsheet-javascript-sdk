import _ from 'underscore';

export function create(options) {
  const requestor = options.requestor;

  const optionsToSend = _.extend({}, options.clientOptions);

  const createUpdateRequest = (postOptions, callback) => {
    const urlOptions = { url: buildUrl(postOptions) };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const deleteUpdateRequest = (deleteOptions, callback) => {
    const urlOptions = { url: buildUrl(deleteOptions) };
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  const getUpdateRequest = (getOptions, callback) => {
    const urlOptions = { url: buildUrl(getOptions) };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const getAllUpdateRequests = (getOptions, callback) => {
    const urlOptions = { url: buildUrl(getOptions) };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const changeUpdateRequest = (putOptions, callback) => {
    const urlOptions = { url: buildUrl(putOptions) };
    return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  const buildUrl = (urlOptions) => {
    let url = options.apiUrls.sheets + '/' + urlOptions.sheetId + '/updaterequests';
    if (urlOptions.updateRequestId !== undefined) {
      url += '/' + urlOptions.updateRequestId;
    }
    return url;
  };

  return {
    createUpdateRequest: createUpdateRequest,
    deleteUpdateRequest: deleteUpdateRequest,
    getUpdateRequest: getUpdateRequest,
    getAllUpdateRequests: getAllUpdateRequests,
    changeUpdateRequest: changeUpdateRequest,
  };
}
