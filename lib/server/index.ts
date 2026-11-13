import _ from 'underscore';
import type { CreateOptions } from '../types/CreateOptions';
import type { RequestCallback } from '../types/RequestCallback';
import type { GetServerInfoOptions, ServerApi, ServerInfo } from './types';

export function create(options: CreateOptions): ServerApi {
  const optionsToSend = {
    url: options.apiUrls.server,
    urls: options.apiUrls,
  };
  _.extend(optionsToSend, options.clientOptions);

  const getInfo = (getOptions?: GetServerInfoOptions, callback?: RequestCallback<ServerInfo>): Promise<ServerInfo> =>
    options.requestor.get(_.extend({}, optionsToSend, getOptions), callback);

  return {
    getInfo: getInfo,
  };
}
