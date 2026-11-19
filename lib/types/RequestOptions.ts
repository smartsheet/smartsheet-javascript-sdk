export interface RequestOptions<QP, B> {
  queryParameters?: QP;
  body?: B;
  customProperties?: Record<string, any>;
  /** Sent as the `Assume-User` header (URL-encoded): the email of the user to impersonate. */
  assumeUser?: string;
  /** Sent as the `Smartsheet-Change-Agent` header: identifies the integration making the change. */
  changeAgent?: string;
  /** Sent as the `Api-Scenario` header. */
  apiScenario?: string;
}
