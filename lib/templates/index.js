import _ from 'underscore';

export function create(options) {
  const requestor = options.requestor;

  const optionsToSend = {
    url: options.apiUrls.templates,
  };
  _.extend(optionsToSend, options.clientOptions);

  const listUserCreatedTemplates = (getOptions, callback) =>
    requestor.get(_.extend({}, optionsToSend, getOptions), callback);

  const listPublicTemplates = (getOptions, callback) => {
    const urlOptions = { url: options.apiUrls.templatesPublic };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  return {
    listUserCreatedTemplates: listUserCreatedTemplates,
    listPublicTemplates: listPublicTemplates,
  };
}
