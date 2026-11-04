import type { BaseResponseStatus } from '../types/BaseResponseStatus';
import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';

export interface TokensApi {
  /**
   * Exchanges an OAuth authorization code for an access token.
   *
   * @param options - {@link GetAccessTokenOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link Token}\> - Optional callback function
   * @returns Promise\<{@link Token}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `POST /token` with `grant_type=authorization_code`.
   * The SDK sets `grant_type`; the request is sent without the client's access token.
   *
   * @example
   * ```typescript
   * const token = await client.tokens.getAccessToken({
   *   queryParameters: { client_id: clientId, code, hash: sha256(`${appSecret}|${code}`) },
   * });
   * ```
   */
  getAccessToken: (options: GetAccessTokenOptions, callback?: RequestCallback<Token>) => Promise<Token>;

  /**
   * Refreshes an access token using a refresh token.
   *
   * @param options - {@link RefreshAccessTokenOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link Token}\> - Optional callback function
   * @returns Promise\<{@link Token}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `POST /token` with `grant_type=refresh_token`.
   * The SDK sets `grant_type`; the request is sent without the client's access token.
   *
   * @example
   * ```typescript
   * const token = await client.tokens.refreshAccessToken({
   *   queryParameters: { client_id: clientId, refresh_token: refreshToken, hash: sha256(`${appSecret}|${refreshToken}`) },
   * });
   * ```
   */
  refreshAccessToken: (options: RefreshAccessTokenOptions, callback?: RequestCallback<Token>) => Promise<Token>;

  /**
   * Revokes an access token. Defaults to the client's own access token.
   *
   * @param options - {@link RevokeAccessTokenOptions} - Optional configuration options; `accessToken` revokes a different token
   * @param callback - {@link RequestCallback}\<{@link RevokeAccessTokenResponse}\> - Optional callback function
   * @returns Promise\<{@link RevokeAccessTokenResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `DELETE /token`
   *
   * @example
   * ```typescript
   * await client.tokens.revokeAccessToken();
   * ```
   */
  revokeAccessToken: (
    options?: RevokeAccessTokenOptions,
    callback?: RequestCallback<RevokeAccessTokenResponse>
  ) => Promise<RevokeAccessTokenResponse>;
}

export interface GetAccessTokenQueryParameters {
  /** The client Id for your app. */
  client_id: string;
  /** Authorization code returned during the authorization flow. */
  code: string;
  /** SHA-256 hash of your app secret concatenated with a pipe and the authorization code. */
  hash: string;
  /** Must be set if you want to bypass the hash requirement. */
  client_secret?: string;
  /** Redirect URL registered for your app. */
  redirect_url?: string;
}

export interface RefreshAccessTokenQueryParameters {
  /** The client Id for your app. */
  client_id: string;
  /** Refresh token previously obtained. */
  refresh_token: string;
  /** SHA-256 hash of your app secret concatenated with a pipe and the refresh token. */
  hash: string;
  /** Must be set if you want to bypass the hash requirement. */
  client_secret?: string;
  /** Redirect URL registered for your app. */
  redirect_url?: string;
}

export type GetAccessTokenOptions = RequestOptions<GetAccessTokenQueryParameters, undefined>;

export type RefreshAccessTokenOptions = RequestOptions<RefreshAccessTokenQueryParameters, undefined>;

export type RevokeAccessTokenOptions = RequestOptions<{ deleteAllForApiClient?: boolean }, undefined> & {
  /** Token to revoke; defaults to the client's access token. */
  accessToken?: string;
};

export type RevokeAccessTokenResponse = BaseResponseStatus;

export interface Token {
  /** A credential that can be used by a client to access the Smartsheet API. */
  access_token: string;
  /** How the access token is presented; Smartsheet uses `bearer`. */
  token_type: string;
  /** Number of seconds the token is valid once issued. */
  expires_in: number;
  /** Credential used to obtain a fresh access token with the same permissions. */
  refresh_token: string;
}
