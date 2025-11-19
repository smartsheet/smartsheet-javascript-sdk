import _ from 'underscore';

export function create(options) {
  var optionsToSend = {
    url: options.apiUrls.server,
    urls: options.apiUrls,
  };
  _.extend(optionsToSend, options.clientOptions);

  var getInfo = (getOptions, callback) => options.requestor.get(_.extend({}, optionsToSend, getOptions), callback);

  return {
    getInfo: getInfo,
  };
};
