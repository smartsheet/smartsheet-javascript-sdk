import _ from 'underscore';

export function create(options) {
  const requestor = options.requestor;

  const optionsToSend = {
    url: options.apiUrls.token,
  };
  _.extend(optionsToSend, options.clientOptions);
  delete optionsToSend.accessToken;

  const getAccessToken = (postOptions, callback) => {
    const getTokenQueryStrings = {
      grant_type: 'authorization_code',
    };
    const combinedQueryParams = {
      queryParameters: _.extend(getTokenQueryStrings, postOptions.queryParameters),
    };
    return requestor.post(_.extend({}, optionsToSend, postOptions, combinedQueryParams), callback);
  };

  const refreshAccessToken = (postOptions, callback) => {
    const getTokenQueryStrings = {
      grant_type: 'refresh_token',
    };
    const combinedQueryParams = {
      queryParameters: _.extend(getTokenQueryStrings, postOptions.queryParameters),
    };
    return requestor.post(_.extend({}, optionsToSend, postOptions, combinedQueryParams), callback);
  };

  const revokeAccessToken = (deleteOptions, callback) => {
    const accessTokenOptions = {
      accessToken: options.clientOptions.accessToken,
    };
    return requestor.delete(_.extend({}, optionsToSend, accessTokenOptions, deleteOptions), callback);
  };

  return {
    getAccessToken: getAccessToken,
    refreshAccessToken: refreshAccessToken,
    revokeAccessToken: revokeAccessToken,
  };
}
