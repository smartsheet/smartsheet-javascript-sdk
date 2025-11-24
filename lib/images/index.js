import _ from 'underscore';

export function create(options) {
  var optionsToSend = {
    url: options.apiUrls.imageUrls,
  };
  _.extend(optionsToSend, options.clientOptions);

  var listImageUrls = (postOptions, callback) =>
    options.requestor.post(_.extend({}, optionsToSend, postOptions), callback);

  return {
    listImageUrls: listImageUrls,
  };
}
