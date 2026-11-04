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

/**
 * Proves the request comes from your app: send either `hash` (recommended) or `client_secret`, not both.
 */
export type OAuthAppVerification =
  | {
      /** SHA-256 hash of your app secret, a pipe, and the authorization code or refresh token. */
      hash: string;
      client_secret?: never;
    }
  | {
      /** Your app secret; use instead of `hash`. */
      client_secret: string;
      hash?: never;
    };

export type GetAccessTokenQueryParameters = {
  /** The client Id for your app. */
  client_id: string;
  /** Authorization code returned during the authorization flow. */
  code: string;
  /** Redirect URL registered for your app. */
  redirect_url?: string;
} & OAuthAppVerification;

export type RefreshAccessTokenQueryParameters = {
  /** The client Id for your app. */
  client_id: string;
  /** Refresh token previously obtained. */
  refresh_token: string;
  /** Redirect URL registered for your app. */
  redirect_url?: string;
} & OAuthAppVerification;

export type GetAccessTokenOptions = RequestOptions<GetAccessTokenQueryParameters, undefined> & {
  /** `Content-Type` header, e.g. `application/x-www-form-urlencoded`. */
  contentType?: string;
};

export type RefreshAccessTokenOptions = RequestOptions<RefreshAccessTokenQueryParameters, undefined> & {
  /** `Content-Type` header, e.g. `application/x-www-form-urlencoded`. */
  contentType?: string;
};

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
