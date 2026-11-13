import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';

/**
 * Options for a raw request. Covers every option the SDK's HTTP requestor reads.
 */
export interface RawRequestOptions<B = unknown> extends RequestOptions<object, B> {
  /** Path relative to the API base URL, e.g. `users/me`. */
  url: string;
  /** Optional id appended to the URL as `<url>/<id>`. */
  id?: string | number;
  /** Overrides the API base URL for this request. */
  baseUrl?: string;
  /** Overrides the access token for this request. */
  accessToken?: string;
  /** Appended to the SDK's `User-Agent` header. */
  userAgent?: string;
  /** `Accept` header; defaults to `application/json`. */
  accept?: string;
  /** `Content-Type` header; defaults to the type inferred from `fileName`, then `application/json`. */
  contentType?: string;
  /** Sent as the `Content-Disposition` header; overrides the one derived from `fileName`. */
  contentDisposition?: string;
  /** Response encoding passed to the HTTP client (`null` for binary responses). */
  encoding?: string | null;
  /** File upload: name used in `Content-Disposition`. */
  fileName?: string;
  /** File upload: path of a file to stream as the request body. */
  path?: string;
  /** File upload: stream used as the request body when `path` is not given. */
  fileStream?: NodeJS.ReadableStream;
  /** File upload: `Content-Length` when uploading from `fileStream`. */
  fileSize?: number;
  /** Maximum time to keep retrying rate-limited or server-error responses. */
  maxRetryDurationMillis?: number;
  /** Custom backoff calculation for retries. */
  calcRetryBackoff?: (retryCount: number, error?: unknown) => number;
}

/** A raw request method. `R` is the expected response type; `B` is the request body type. */
export type RawRequestMethod = <R = unknown, B = unknown>(
  options: RawRequestOptions<B>,
  callback?: RequestCallback<R>
) => Promise<R>;

/**
 * Low-level access to any Smartsheet API endpoint, for endpoints the SDK does not wrap yet.
 *
 * @example
 * ```typescript
 * const me = await client.request.get<{ email: string }>({ url: 'users/me' });
 * ```
 */
export interface RequestApi {
  /** Sends a `GET` request. */
  get: RawRequestMethod;
  /** Sends a `POST` request with `body` as JSON. */
  post: RawRequestMethod;
  /** Sends a `PUT` request with `body` as JSON. */
  put: RawRequestMethod;
  /** Sends a `POST` request with a file (`path` or `fileStream`) as the body. */
  postFile: RawRequestMethod;
  /** Sends a `DELETE` request. */
  delete: RawRequestMethod;
}
