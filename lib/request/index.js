import _ from 'underscore';

export function create(options) {
  const requestor = options.requestor;

  const optionsToSend = _.extend({}, options.clientOptions);

  const get = (getOptions, callback) => requestor.get(_.extend({}, optionsToSend, getOptions), callback);

  const post = (postOptions, callback) => requestor.post(_.extend({}, optionsToSend, postOptions), callback);

  const put = (putOptions, callback) => requestor.put(_.extend({}, optionsToSend, putOptions), callback);

  const postFile = (postOptions, callback) => requestor.postFile(_.extend({}, optionsToSend, postOptions), callback);

  const deleteRequest = (deleteOptions, callback) =>
    requestor.delete(_.extend({}, optionsToSend, deleteOptions), callback);

  return {
    get: get,
    post: post,
    put: put,
    postFile: postFile,
    delete: deleteRequest,
  };
}
