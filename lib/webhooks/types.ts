import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';
import type { BaseResponseStatus } from '../types/BaseResponseStatus';
import type { FailedItem } from '../types/FailedItem';

// ============================================================================
// Webhooks API Interface
// ============================================================================

export interface WebhooksApi {
  /**
   * Creates a new webhook.
   *
   * On creation, a webhook is inactive by default. You can activate the webhook by calling
   * the Update webhook operation on it with `enabled` set to `true`.
   *
   * @param options - {@link CreateWebhookOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link CreateWebhookResponse}\> - Optional callback function
   * @returns Promise\<{@link CreateWebhookResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `POST /webhooks`
   *
   * @example
   * ```typescript
   * const webhook = await client.webhooks.createWebhook({
   *   body: {
   *     name: 'Webhook #4',
   *     callbackUrl: 'https://www.myApp.com/webhooks',
   *     scope: 'sheet',
   *     scopeObjectId: 3285357287499652,
   *     events: ['*.*'],
   *     version: 1
   *   }
   * });
   * ```
   */
  createWebhook: (
    options: RequestOptions<undefined, CreateWebhookBody>,
    callback?: RequestCallback<CreateWebhookResponse>
  ) => Promise<CreateWebhookResponse>;

  /**
   * Gets the specified webhook.
   *
   * @param options - {@link GetWebhookOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link GetWebhookResponse}\> - Optional callback function
   * @returns Promise\<{@link GetWebhookResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `GET /webhooks/{webhookId}`
   *
   * @example
   * ```typescript
   * const webhook = await client.webhooks.getWebhook({
   *   webhookId: 401090454808452
   * });
   * ```
   */
  getWebhook: (options: GetWebhookOptions, callback?: RequestCallback<Webhook>) => Promise<Webhook>;

  /**
   * Gets a list of all webhooks that the user owns.
   *
   * @param options - {@link ListWebhooksOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link ListWebhooksResponse}\> - Optional callback function
   * @returns Promise\<{@link ListWebhooksResponse}\>
   *
   * @remarks
   * **DEPRECATION - As early as the sunset date specified in the Changelog, webhooks will be sorted by
   * creation date (most recent first) instead of name.**
   *
   * **Note: In the response, each webhook's `events` field defaults to `["*.*"]`, regardless of its actual value.**
   * Alternatively, call GET /webhook/\{webhookId\} on an individual webhook to get its `events` value.
   *
   * It mirrors to the following Smartsheet REST API method: `GET /webhooks`
   *
   * @example
   * ```typescript
   * const webhooks = await client.webhooks.listWebhooks({});
   * ```
   */
  listWebhooks: (
    options: RequestOptions<ListWebhooksQueryParameters, undefined>,
    callback?: RequestCallback<ListWebhooksResponse>
  ) => Promise<ListWebhooksResponse>;

  /**
   * Updates the specified webhook.
   *
   * If you set `enabled` to `true`, the behavior and result depend on the webhook's `status`
   * and may trigger a webhook verification or, in some cases, cause an error.
   *
   * @param options - {@link UpdateWebhookOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link UpdateWebhookResponse}\> - Optional callback function
   * @returns Promise\<{@link UpdateWebhookResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `PUT /webhooks/{webhookId}`
   *
   * @example
   * ```typescript
   * const result = await client.webhooks.updateWebhook({
   *   webhookId: 8444254503626628,
   *   body: {
   *     enabled: true
   *   }
   * });
   * ```
   */
  updateWebhook: (
    options: UpdateWebhookOptions,
    callback?: RequestCallback<UpdateWebhookResponse>
  ) => Promise<UpdateWebhookResponse>;

  /**
   * Permanently deletes the specified webhook.
   *
   * This operation permanently deletes the webhook. Alternatively, to temporarily disable the webhook,
   * use the Update webhook operation with `enabled` set to `false`.
   *
   * @param options - {@link DeleteWebhookOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link BaseResponseStatus}\> - Optional callback function
   * @returns Promise\<{@link BaseResponseStatus}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `DELETE /webhooks/{webhookId}`
   *
   * @example
   * ```typescript
   * const result = await client.webhooks.deleteWebhook({
   *   webhookId: 401090454808452
   * });
   * ```
   */
  deleteWebhook: (
    options: DeleteWebhookOptions,
    callback?: RequestCallback<DeleteWebhookResponse>
  ) => Promise<DeleteWebhookResponse>;

  /**
   * Resets the shared secret for the specified webhook.
   *
   * You can improve security by using this operation to rotate an API client webhooks' shared secrets
   * at periodic intervals.
   *
   * @param options - {@link ResetSharedSecretOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link ResetSharedSecretResponse}\> - Optional callback function
   * @returns Promise\<{@link ResetSharedSecretResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `POST /webhooks/{webhookId}/resetsharedsecret`
   *
   * @example
   * ```typescript
   * const result = await client.webhooks.resetSharedSecret({
   *   webhookId: 401090454808452
   * });
   * ```
   */
  resetSharedSecret: (
    options: ResetSharedSecretOptions,
    callback?: RequestCallback<ResetSharedSecretResponse>
  ) => Promise<ResetSharedSecretResponse>;
}

// ============================================================================
// Webhook Types
// ============================================================================

/**
 * Webhook scope types
 */
export enum WebhookScope {
  SHEET = 'sheet',
  PLAN = 'plan',
}

/**
 * Webhook status types
 */
export enum WebhookStatus {
  DISABLED_ADMINISTRATIVE = 'DISABLED_ADMINISTRATIVE',
  DISABLED_APP_REVOKED = 'DISABLED_APP_REVOKED',
  DISABLED_BY_OWNER = 'DISABLED_BY_OWNER',
  DISABLED_CALLBACK_FAILED = 'DISABLED_CALLBACK_FAILED',
  DISABLED_EXCEEDED_GRID_LIMITS = 'DISABLED_EXCEEDED_GRID_LIMITS',
  DISABLED_SCOPE_INACCESSIBLE = 'DISABLED_SCOPE_INACCESSIBLE',
  DISABLED_VERIFICATION_FAILED = 'DISABLED_VERIFICATION_FAILED',
  ENABLED = 'ENABLED',
  NEW_NOT_VERIFIED = 'NEW_NOT_VERIFIED',
}

/**
 * Webhook statistics
 */
export interface WebhookStats {
  /**
   * Timestamp of the last callback attempt
   */
  lastCallbackAttempt?: Date | string;
  /**
   * The number of retries the webhook had performed as of the last callback attempt
   */
  lastCallbackAttemptRetryCount?: number;
  /**
   * Timestamp of the last successful callback
   */
  lastSuccessfulCallback?: Date | string;
}

/**
 * Webhook subscope for sheet-level webhooks
 */
export interface WebhookSubscope {
  /**
   * Array of IDs of the sheet columns to monitor
   */
  columnIds?: number[];
}

/**
 * Webhook object
 */
export interface Webhook {
  /**
   * Webhook Id
   */
  id?: number;
  /**
   * Webhook name
   */
  name: string;
  /**
   * The HTTPS URL where callbacks are sent
   */
  callbackUrl: string;
  /**
   * The scope of the webhook (sheet or plan)
   */
  scope: WebhookScope;
  /**
   * The Id of the object that is subscribed to (sheet Id or plan Id)
   */
  scopeObjectId: number;
  /**
   * Array of events to subscribe to. Use ['*.*'] to subscribe to all events.
   */
  events: string[];
  /**
   * Webhook version (currently only version 1 is supported)
   */
  version: number;
  /**
   * Subscope for sheet-level webhooks (limits the webhook to monitor specific columns)
   * @see WebhookSubscope
   */
  subscope?: WebhookSubscope;
  /**
   * Whether the webhook is enabled. If true, the webhook is activated; Otherwise, it's inactive or deactivated.
   */
  enabled?: boolean;
  /**
   * Webhook statistics
   * @see WebhookStats
   */
  stats?: WebhookStats;
  /**
   * Timestamp when the webhook was created
   */
  createdAt?: Date | string;
  /**
   * Timestamp when the webhook was last modified
   */
  modifiedAt?: Date | string;
  /**
   * The shared secret for verifying webhook callbacks
   */
  sharedSecret?: string;
  /**
   * Status of the webhook
   * @see WebhookStatus
   */
  status?: WebhookStatus | string;
  /**
   * Details about the reason the webhook was disabled. Only present when enabled=false.
   */
  disabledDetails?: string;
  /**
   * ID of the corresponding third-party app that created the webhook. Only present if created by a third-party app.
   */
  apiClientId?: string;
  /**
   * API client name corresponding to third-party app that created the webhook. Only present if created by a third-party app.
   */
  apiClientName?: string;
  /**
   * Custom headers for plan-level webhooks. A set of custom headers that your webhook sends in all requests to your callback URL.
   */
  customHeaders?: Record<string, string>;
}

/**
 * Shared secret object returned when resetting shared secret
 */
export interface SharedSecret {
  /**
   * The new shared secret value
   */
  sharedSecret: string;
}

// ============================================================================
// Create Webhook
// ============================================================================

export interface CreateWebhookBody {
  /**
   * Webhook name
   */
  name: string;
  /**
   * The HTTPS URL where callbacks are sent
   */
  callbackUrl: string;
  /**
   * The scope of the webhook (sheet or plan)
   */
  scope: WebhookScope;
  /**
   * The Id of the object that is subscribed to (sheet Id or plan Id)
   */
  scopeObjectId: number;
  /**
   * Array of events to subscribe to. Use ['*.*'] to subscribe to all events.
   */
  events: string[];
  /**
   * Webhook version (currently only version 1 is supported)
   */
  version: number;
  /**
   * Subscope for sheet-level webhooks (limits the webhook to monitor specific columns)
   * @see WebhookSubscope
   */
  subscope?: WebhookSubscope;
  /**
   * Custom headers for plan-level webhooks
   */
  customHeaders?: Record<string, string>;
}

export interface CreateWebhookResponse extends BaseResponseStatus {
  /**
   * Version number
   */
  version?: number;
  /**
   * Array of failed items (if any)
   * @see FailedItem
   */
  failedItems?: FailedItem[];
  /**
   * The created webhook object
   * @see Webhook
   */
  result: Webhook;
}

// ============================================================================
// Get Webhook
// ============================================================================

export interface GetWebhookOptions extends RequestOptions<undefined, undefined> {
  /**
   * Webhook Id
   */
  webhookId: number;
}

// ============================================================================
// List Webhooks
// ============================================================================

export interface ListWebhooksQueryParameters {
  /**
   * @defaultValue false
   * @deprecated As early as the sunset date specified in the Changelog, this parameter will be discontinued
   * If true, include all results (do not paginate)
   */
  includeAll?: boolean;
  /**
   * @defaultValue 1
   * Which page to return
   */
  page?: number;
  /**
   * @defaultValue 100
   * The maximum number of items to return per page
   */
  pageSize?: number;
}

export interface ListWebhooksResponse {
  /**
   * @defaultValue 1
   * The current page number
   */
  pageNumber?: number;
  /**
   * @defaultValue 100
   * The number of items per page
   */
  pageSize?: number;
  /**
   * @deprecated As early as the sunset date specified in the Changelog, this response property value will be `-1`
   * The total number of pages
   */
  totalPages?: number;
  /**
   * @deprecated As early as the sunset date specified in the Changelog, this response property value will be `-1`
   * The total number of webhooks
   */
  totalCount?: number;
  /**
   * Array of Webhook objects
   * @see Webhook
   */
  data: Webhook[];
}

// ============================================================================
// Update Webhook
// ============================================================================

export interface UpdateWebhookBody {
  /**
   * Webhook name
   */
  name?: string;
  /**
   * If `true`, the webhook is activated; Otherwise, it's inactive or deactivated.
   */
  enabled?: boolean;
  /**
   * Array of events to subscribe to
   */
  events?: string[];
  /**
   * The HTTPS URL where callbacks are sent
   */
  callbackUrl?: string;
  /**
   * Webhook version
   */
  version?: number;
  /**
   * Custom headers for plan-level webhooks
   */
  customHeaders?: Record<string, string>;
}

export interface UpdateWebhookOptions extends RequestOptions<undefined, UpdateWebhookBody> {
  /**
   * Webhook Id
   */
  webhookId: number;
}

export interface UpdateWebhookResponse extends BaseResponseStatus {
  /**
   * Version number
   */
  version?: number;
  /**
   * Array of failed items (if any)
   * @see FailedItem
   */
  failedItems?: FailedItem[];
  /**
   * The updated webhook object
   * @see Webhook
   */
  result: Webhook;
}

// ============================================================================
// Delete Webhook
// ============================================================================

export interface DeleteWebhookOptions extends RequestOptions<undefined, undefined> {
  /**
   * Webhook Id
   */
  webhookId: number;
}

export interface DeleteWebhookResponse extends BaseResponseStatus {
  /**
   * Version number
   */
  version?: number;
  /**
   * Array of failed items (if any)
   * @see FailedItem
   */
  failedItems?: FailedItem[];
}

// ============================================================================
// Reset Shared Secret
// ============================================================================

export interface ResetSharedSecretOptions extends RequestOptions<undefined, undefined> {
  /**
   * Webhook Id
   */
  webhookId: number;
}

export interface ResetSharedSecretResponse extends BaseResponseStatus {
  /**
   * Version number
   */
  version?: number;
  /**
   * Array of failed items (if any)
   * @see FailedItem
   */
  failedItems?: FailedItem[];
  /**
   * The shared secret object with the new shared secret
   * @see SharedSecret
   */
  result: SharedSecret;
}
