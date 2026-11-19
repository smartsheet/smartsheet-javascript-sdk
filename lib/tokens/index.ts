import _ from 'underscore';
import type { ClientOptions, CreateOptions } from '../types/CreateOptions';
import type { RequestCallback } from '../types/RequestCallback';
import type {
  GetAccessTokenOptions,
  RefreshAccessTokenOptions,
  RevokeAccessTokenOptions,
  RevokeAccessTokenResponse,
  Token,
  TokensApi,
} from './types';

export function create(options: CreateOptions): TokensApi {
  const requestor = options.requestor;

  const optionsToSend: { url: string } & ClientOptions = {
    url: options.apiUrls.token,
  };
  _.extend(optionsToSend, options.clientOptions);
  delete optionsToSend.accessToken;

  const getAccessToken = (postOptions: GetAccessTokenOptions, callback?: RequestCallback<Token>): Promise<Token> => {
    const getTokenQueryStrings = {
      grant_type: 'authorization_code',
    };
    const combinedQueryParams = {
      queryParameters: _.extend(getTokenQueryStrings, postOptions.queryParameters),
    };
    return requestor.post(_.extend({}, optionsToSend, postOptions, combinedQueryParams), callback);
  };

  const refreshAccessToken = (
    postOptions: RefreshAccessTokenOptions,
    callback?: RequestCallback<Token>
  ): Promise<Token> => {
    const getTokenQueryStrings = {
      grant_type: 'refresh_token',
    };
    const combinedQueryParams = {
      queryParameters: _.extend(getTokenQueryStrings, postOptions.queryParameters),
    };
    return requestor.post(_.extend({}, optionsToSend, postOptions, combinedQueryParams), callback);
  };

  const revokeAccessToken = (
    deleteOptions?: RevokeAccessTokenOptions,
    callback?: RequestCallback<RevokeAccessTokenResponse>
  ): Promise<RevokeAccessTokenResponse> => {
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
