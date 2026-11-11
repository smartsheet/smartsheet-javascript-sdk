import _ from 'underscore';
import type { CreateOptions } from '../types/CreateOptions';
import type { RequestCallback } from '../types/RequestCallback';
import type { RawRequestOptions, RequestApi } from './types';

export function create(options: CreateOptions): RequestApi {
  const requestor = options.requestor;

  const optionsToSend = _.extend({}, options.clientOptions);

  const get = <R = unknown, B = unknown>(getOptions: RawRequestOptions<B>, callback?: RequestCallback<R>): Promise<R> =>
    requestor.get(_.extend({}, optionsToSend, getOptions), callback);

  const post = <R = unknown, B = unknown>(
    postOptions: RawRequestOptions<B>,
    callback?: RequestCallback<R>
  ): Promise<R> => requestor.post(_.extend({}, optionsToSend, postOptions), callback);

  const put = <R = unknown, B = unknown>(putOptions: RawRequestOptions<B>, callback?: RequestCallback<R>): Promise<R> =>
    requestor.put(_.extend({}, optionsToSend, putOptions), callback);

  const postFile = <R = unknown, B = unknown>(
    postOptions: RawRequestOptions<B>,
    callback?: RequestCallback<R>
  ): Promise<R> => requestor.postFile(_.extend({}, optionsToSend, postOptions), callback);

  const deleteRequest = <R = unknown, B = unknown>(
    deleteOptions: RawRequestOptions<B>,
    callback?: RequestCallback<R>
  ): Promise<R> => requestor.delete(_.extend({}, optionsToSend, deleteOptions), callback);

  return {
    get: get,
    post: post,
    put: put,
    postFile: postFile,
    delete: deleteRequest,
  };
}
