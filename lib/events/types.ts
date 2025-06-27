import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';

export interface GetEventsOptions {
  /**
   * The earliest time from which events are included in the response. Events before this time are excluded.
   * This parameter is intended for use when backfilling data at client startup or recovery--don't use it
   * for fine-grained date-based queries. Therefore, resolution is limited to the nearest hour. The value
   * is interpreted as ISO-8601 format, unless numericDates is specified (see details about numericDates below).
   *
   * You must pass in a value for either "since" or "streamPosition" and never both.
   */
  since?: string;

  /**
   * The latest time up to which events are included in the response. Events after this time are excluded.
   * The to parameter requires using the since query parameter (above). This parameter is intended for use
   * when backfilling data at client startup or recovery--don't use it for fine-grained date-based queries.
   * Therefore, resolution is limited to the nearest hour. The value is interpreted as ISO-8601 format,
   * unless numericDates is specified (see details about numericDates below).
   *
   * If "to" is a future time, the current time is used.
   * If "to" equals the "since" time, an empty data value is returned.
   * If "to" is before the "since" time, an error is returned.
   */
  to?: string;

  /**
   * Indicates next set of events to return. Use value of "nextStreamPosition" returned from the previous call.
   * You must pass in a value for either "since" or "streamPosition" and never both.
   *
   * Example: streamPosition=XyzAb1234cdefghijklmnofpq
   */
  streamPosition?: string;

  /**
   * Maximum number of events to return as response to this call. Must be between 1 through 10,000 (inclusive).
   * Defaults to 1,000 if not specified.
   */
  maxCount?: number;

  /**
   * If true, dates are accepted and returned in Unix epoch time (milliseconds since midnight on January 1, 1970 in UTC time).
   * Default is false, which means ISO-8601 format.
   */
  numericDates?: boolean;

  /**
   * The target managed plan for which to list events. Authorized if the caller is a system administrator on
   * either the target managed plan or the main plan in EPM hierarchy.
   */
  managedPlanId?: number;
}

export interface Event {
  /**
   * Unique event identifier.
   */
  eventId: string;

  /**
   * The Smartsheet resource impacted by the event, such as, SHEET or WORKSPACE.
   * Enum: "SHEET" "WORKSPACE"
   */
  objectType: string;

  /**
   * The action applied to the specified object, such as CREATE or DELETE.
   */
  action: string;

  /**
   * The identifier of the object impacted by the event.
   */
  objectId: string;

  /**
   * Date and time of the event. Defaults to ISO-8601 format.
   * See dates and times for more information.
   */
  eventTimeStamp: string;

  /**
   * User assumed as the one who initiated the event. Usually the userId property and the requestUserId
   * property (below) have the same value. However, if the request is an API call with Assume-User header
   * then the userId property identifies the user whose email matches the value in the Assume-User header.
   */
  userId: string;

  /**
   * User whose authentication credential is embedded in the request that initiated the event. For example,
   * if the request is an API call with an access token then requestUserId identifies the user whose data
   * can be accessed via the access token (i.e., the user who authorized the creation of the access token).
   * On the other hand, if the request comes from a UI session, then requestUserId identifies the user
   * logged-in to the UI.
   */
  requestUserId: string;

  /**
   * Name of the access token embedded in the request. This property is omitted if there's no access token
   * in the request (i.e., it isn't an API call) or if the access token wasn't given a name when created
   * (only access tokens generated via the Smartsheet desktop UI can be given a name at creation time).
   */
  accessTokenName?: string;

  /**
   * Identifies the type of action that triggered the event.
   */
  source: string;

  /**
   * Container object for additional event-specific properties. Properties depend upon the event type.
   * See Event Reporting reference documentation for details on each event type.
   * https://smartsheet-platform.github.io/event-reporting-docs/
   */
  additionalDetails?: Record<string, any>;
}

export interface GetEventsResponse {
  /**
   * This string should be passed back to the next GET events call to obtain subsequent events.
   */
  nextStreamPosition: string;

  /**
   * True if more results are available. This is typically due to event counts exceeding the maxCount
   * parameter passed in.
   */
  moreAvailable: boolean;

  /**
   * List of Events
   */
  data: Event[];
}

export interface EventsApi {
  getEvents: (
    options: RequestOptions<GetEventsOptions, undefined>,
    callback?: RequestCallback<GetEventsResponse>
  ) => Promise<GetEventsResponse>;
}
