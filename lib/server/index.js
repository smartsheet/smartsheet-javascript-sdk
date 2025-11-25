import _ from 'underscore';

export function create(options) {
  const optionsToSend = {
    url: options.apiUrls.server,
    urls: options.apiUrls,
  };
  _.extend(optionsToSend, options.clientOptions);

  const getInfo = (getOptions, callback) => options.requestor.get(_.extend({}, optionsToSend, getOptions), callback);

  return {
    getInfo: getInfo,
  };
}
