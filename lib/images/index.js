import _ from 'underscore';

export function create(options) {
  const optionsToSend = {
    url: options.apiUrls.imageUrls,
  };
  _.extend(optionsToSend, options.clientOptions);

  const listImageUrls = (postOptions, callback) =>
    options.requestor.post(_.extend({}, optionsToSend, postOptions), callback);

  return {
    listImageUrls: listImageUrls,
  };
}
