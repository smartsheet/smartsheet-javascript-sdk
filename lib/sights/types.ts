import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';
import type { BaseResponseStatus } from '../types/BaseResponseStatus';
import type { APIAccessLevel } from '../types/ApiAccessLevel';
import type { TokenPaginationQueryParameters } from '../types';

// ============================================================================
// Sights API Interface
// ============================================================================

export interface SightsApi {
  /**
   * Gets the specified Sight.
   *
   * @param options - {@link GetSightOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link Sight}\> - Optional callback function
   * @returns Promise\<{@link Sight}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `GET /sights/{sightId}`
   *
   * @example
   * ```typescript
   * const sight = await client.sights.getSight({
   *   sightId: 123456789
   * });
   * ```
   */
  getSight: (options: GetSightOptions, callback?: RequestCallback<Sight>) => Promise<Sight>;

  /**
   * Gets the list of all Sights that the user has access to.
   *
   * @param options - {@link RequestOptions}\<{@link ListSightQueryParameters}, undefined\> - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link ListSightsResponse}\> - Optional callback function
   * @returns Promise\<{@link ListSightsResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `GET /sights`
   *
   * @example
   * ```typescript
   * const sights = await client.sights.listSights({
   *   queryParameters: {
   *     pageSize: 50
   *   }
   * });
   * ```
   */
  listSights: (
    options: RequestOptions<ListSightQueryParameters, undefined>,
    callback?: RequestCallback<ListSightsResponse>
  ) => Promise<ListSightsResponse>;

  /**
   * Deletes the specified Sight.
   *
   * @param options - {@link DeleteSightOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link DeleteSightResponse}\> - Optional callback function
   * @returns Promise\<{@link DeleteSightResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `DELETE /sights/{sightId}`
   *
   * @example
   * ```typescript
   * const result = await client.sights.deleteSight({
   *   sightId: 123456789
   * });
   * ```
   */
  deleteSight: (
    options: DeleteSightOptions,
    callback?: RequestCallback<DeleteSightResponse>
  ) => Promise<DeleteSightResponse>;

  /**
   * Updates the specified Sight.
   *
   * @param options - {@link UpdateSightOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link UpdateSightResponse}\> - Optional callback function
   * @returns Promise\<{@link UpdateSightResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `PUT /sights/{sightId}`
   *
   * @example
   * ```typescript
   * const result = await client.sights.updateSight({
   *   sightId: 123456789,
   *   body: {
   *     name: 'Updated Sight Name'
   *   }
   * });
   * ```
   */
  updateSight: (
    options: UpdateSightOptions,
    callback?: RequestCallback<UpdateSightResponse>
  ) => Promise<UpdateSightResponse>;

  /**
   * Creates a copy of the specified Sight.
   *
   * @param options - {@link CopySightOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link CopySightResponse}\> - Optional callback function
   * @returns Promise\<{@link CopySightResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `POST /sights/{sightId}/copy`
   *
   * @example
   * ```typescript
   * const result = await client.sights.copySight({
   *   sightId: '123456789',
   *   body: {
   *     newName: 'Copy of My Sight',
   *     destinationId: 987654321,
   *     destinationType: 'folder'
   *   }
   * });
   * ```
   */
  copySight: (options: CopySightOptions, callback?: RequestCallback<CopySightResponse>) => Promise<CopySightResponse>;

  /**
   * Moves the specified Sight to a new location.
   *
   * @param options - {@link MoveSightOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link MoveSightResponse}\> - Optional callback function
   * @returns Promise\<{@link MoveSightResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `POST /sights/{sightId}/move`
   *
   * @example
   * ```typescript
   * const result = await client.sights.moveSight({
   *   sightId: 123456789,
   *   body: {
   *     destinationId: 987654321,
   *     destinationType: 'workspace'
   *   }
   * });
   * ```
   */
  moveSight: (options: MoveSightOptions, callback?: RequestCallback<MoveSightResponse>) => Promise<MoveSightResponse>;

  /**
   * Gets the publish status of the specified Sight.
   *
   * @param options - {@link GetSightPublishStatusOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link SightPublishStatus}\> - Optional callback function
   * @returns Promise\<{@link SightPublishStatus}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `GET /sights/{sightId}/publish`
   *
   * @example
   * ```typescript
   * const publishStatus = await client.sights.getSightPublishStatus({
   *   sightId: 123456789
   * });
   * ```
   */
  getSightPublishStatus: (
    options: GetSightPublishStatusOptions,
    callback?: RequestCallback<SightPublishStatus>
  ) => Promise<SightPublishStatus>;

  /**
   * Sets the publish status of the specified Sight.
   *
   * @param options - {@link SetSightPublishStatusOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link SetSightPublishStatusResponse}\> - Optional callback function
   * @returns Promise\<{@link SetSightPublishStatusResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `PUT /sights/{sightId}/publish`
   *
   * @example
   * ```typescript
   * const result = await client.sights.setSightPublishStatus({
   *   sightId: 123456789,
   *   body: {
   *     readOnlyFullEnabled: true,
   *     readOnlyFullAccessibleBy: 'ALL'
   *   }
   * });
   * ```
   */
  setSightPublishStatus: (
    options: SetSightPublishStatusOptions,
    callback?: RequestCallback<SetSightPublishStatusResponse>
  ) => Promise<SetSightPublishStatusResponse>;

  // Deprecated sharing methods
  getShare: any;
  listShares: any;
  share: any;
  deleteShare: any;
  updateShare: any;
}

// ============================================================================
// Sight Types
// ============================================================================

/**
 * Sight widget object
 */
export interface SightWidget {
  /**
   * Widget Id
   */
  id: number;
  /**
   * Widget type
   */
  type: string;
  /**
   * Widget contents
   */
  contents: any[];
  /**
   * X position of the widget
   */
  xPosition: number;
  /**
   * Y position of the widget
   */
  yPosition: number;
  /**
   * Width of the widget
   */
  width: number;
  /**
   * Height of the widget
   */
  height: number;
  /**
   * Widget title
   */
  title: string;
  /**
   * Whether to show the title icon
   */
  showTitleIcon: boolean;
  /**
   * Whether to show the title
   */
  showTitle: boolean;
  /**
   * Title format
   */
  titleFormat: string;
  /**
   * Title font color
   */
  titleFontColor: string;
  /**
   * Title background color
   */
  titleBackgroundColor: string;
  /**
   * Title font
   */
  titleFont: string;
  /**
   * Widget version
   */
  version: number;
}

export interface Source {
  /**
   * The Id of the dashboard, report, sheet, or template from which the enclosing dashboard, report, sheet, or template was created.
   */
  id: number;

  /**
   * Source Sight type (report, sheet, sight (aka dashboard), or template).
   */
  type: string;
}

/**
 * Base Sight object with common properties
 */
export interface BaseSight {
  /**
   * Sight Id
   */
  id: number;
  /**
   * Sight name
   */
  name: string;
  /**
   * User's access level to the Sight
   * @see ApiAccessLevel
   */
  accessLevel: APIAccessLevel;
  /**
   * Permalink to the Sight
   */
  permalink: string;
  /**
   * Timestamp when the Sight was created
   */
  createdAt?: string | number;
  /**
   * Timestamp when the Sight was last modified
   */
  modifiedAt?: string | number;
}

/**
 * Full Sight object with all properties
 */
export interface Sight extends BaseSight {
  /**
   * Number of columns in the Sight
   */
  columnCount: number;
  /**
   * Background color of the Sight
   */
  backgroundColor: string;
  /**
   * Default background color for widgets
   */
  defaultWidgetBackgroundColor: string;
  /**
   * Array of widgets in the Sight
   * @see SightWidget
   */
  widgets: SightWidget[];
  /**
   * Workspace containing the Sight
   */
  workspace: {
    /**
     * Workspace Id
     */
    id: number;
    /**
     * Workspace name
     */
    name: string;
  };

  source?: Source;
}

/**
 * Dashboard parent type enum
 */
export enum DashboardParentType {
  FOLDER = 'folder',
  WORKSPACE = 'workspace',
}

/**
 * Dashboard destination for copy/move operations
 */
export interface DashboardDestination {
  /**
   * Id of the folder or workspace the Sight will be copied/moved to
   */
  destinationId: number;
  /**
   * Type of destination (folder or workspace)
   * @see DashboardParentType
   */
  destinationType?: DashboardParentType;
}

/**
 * Settable Sight publish status properties
 */
export interface SettableSightPublishStatus {
  /**
   * If true, a rich version of the dashboard is published with the ability to use shortcuts and widget interactions.
   */
  readOnlyFullEnabled: boolean;
  /**
   * Indicates who can access the 'Read-Only Full' view of the published dashboard.
   * Only returned in the response if readOnlyFullEnabled = true.
   * - ALL: available to anyone who has the link
   * - ORG: available only to members of the dashboard owner's Smartsheet organization account
   * - SHARED: available only to users shared to the item
   */
  readOnlyFullAccessibleBy?: 'ALL' | 'ORG' | 'SHARED';
}

/**
 * Sight publish status
 */
export interface SightPublishStatus extends SettableSightPublishStatus {
  /**
   * URL for 'Read-Only Full' view of the published dashboard.
   * Only returned in a response if readOnlyFullEnabled = true.
   */
  readOnlyFullUrl?: string;
}

// ============================================================================
// Get Sight
// ============================================================================

export interface GetSightQueryParameters {
  /**
   * Determines which variant of accessLevel is returned for
   * "VIEWER" or "COMMENTER". When 1 is passed "COMMENTER" will
   * be returned and when 0 is passed "VIEWER" will be returned.
   * 0 is the default.
   */
  accessApiLevel?: 1 | 0;

  /**
   * A comma-separated list of optional elements to include in the response
   * objectValue - when used in combination with a level query parameter,
   *               includes the email addresses for multi-contact data
   * source - the source object for any Sight that was created from another Sight, if any
   * ex: "objectValue,source"
   */
  include?: string;

  /**
   * Specifies whether new functionality, such as multi-contact data is returned in a backwards-compatible, text format
   *
   * multi-contact data (level=2)
   * multi-picklist data (level=3)
   * metric widget with sheet summary (level=4).
   *
   * level=0 is the default
   */
  level?: 0 | 2 | 3 | 4;

  /**
   * You can optionally choose to receive and send dates/times in numeric format
   * as milliseconds since the UNIX epoch (midnight on January 1, 1970 in UTC time).
   *
   * false is the default.
   */
  numericDates?: boolean;
}

export interface GetSightOptions extends RequestOptions<GetSightQueryParameters, undefined> {
  /**
   * Sight Id
   */
  sightId: number;
}

// ============================================================================
// List Sights
// ============================================================================

export interface ListSightQueryParameters extends TokenPaginationQueryParameters {
  /**
   * Specifies the type of pagination to use. When set to 'token', enables token-based pagination.
   */
  paginationType?: string;

  /**
   * @deprecated
   * Include all results in the first page. page and page size
   * will be ignored if includeAll is set to true.
   *
   * default false
   */
  includeAll?: boolean;

  /**
   * @deprecated
   * When specified with a date and time value,
   * response only includes the objects that are modified on
   * or after the date and time specified.
   */
  modifiedSince?: string | number;

  /**
   * If true, dates/times are sent and received as milliseconds since
   * the UNIX epoch (midnight on January 1, 1970 in UTC time).
   * @defaultValue false
   */
  numericDates?: boolean;

  /**
   * @deprecated
   * Page of results to return.
   *
   * @defaultValue 1
   */
  page?: number;

  /**
   * @deprecated
   * Number of results per page.
   * Maximum page size is 10,000.
   *
   * @defaultValue 100
   */
  pageSize?: number;
}

export interface ListSightsResponse extends TokenPaginationQueryParameters {
  /**
   * Specifies the type of pagination to use. When set to 'token', enables token-based pagination.
   */
  paginationType?: string;
  /**
   * Current page number
   */
  pageNumber?: number;
  /**
   * Number of items per page
   */
  pageSize?: number;
  /**
   * Total number of pages
   */
  totalPages?: number;
  /**
   * Total number of Sights
   */
  totalCount?: number;
  /**
   * Array of Sight objects
   * @see Sight
   */
  data: Sight[];
}

// ============================================================================
// Delete Sight
// ============================================================================

export interface DeleteSightOptions extends RequestOptions<undefined, undefined> {
  /**
   * Sight Id
   */
  sightId: number;
}

export type DeleteSightResponse = BaseResponseStatus;

// ============================================================================
// Update Sight
// ============================================================================

export interface UpdateSightQueryParameters {
  /**
   * You can optionally choose to receive and send dates/times in numeric format
   * as milliseconds since the UNIX epoch (midnight on January 1, 1970 in UTC time).
   *
   * false is the default.
   */
  numericDates?: boolean;
}

export interface UpdateSightBody {
  /**
   * New name for the Sight
   */
  name: string;
}

export interface UpdateSightOptions extends RequestOptions<UpdateSightQueryParameters, UpdateSightBody> {
  /**
   * Sight Id
   */
  sightId: number;
}

export interface UpdateSightResponse extends BaseResponseStatus {
  /**
   * The updated Sight object
   * @see Sight
   */
  result: Sight;
}

// ============================================================================
// Copy Sight
// ============================================================================

export interface CopySightBody extends DashboardDestination {
  /**
   * Name of the new Sight
   */
  newName: string;
}

export interface CopySightOptions extends RequestOptions<undefined, CopySightBody> {
  /**
   * Sight Id
   */
  sightId: string;
}

export interface CopySightResponse extends BaseResponseStatus {
  /**
   * The copied Sight object
   * @see BaseSight
   */
  result: BaseSight;
}

// ============================================================================
// Move Sight
// ============================================================================

export interface MoveSightOptions extends RequestOptions<undefined, DashboardDestination> {
  /**
   * Sight Id
   */
  sightId: number;
}

export interface MoveSightResponse extends BaseResponseStatus {
  /**
   * The moved Sight object
   * @see BaseSight
   */
  result: BaseSight;
}

// ============================================================================
// Get Sight Publish Status
// ============================================================================

export interface GetSightPublishStatusOptions extends RequestOptions<undefined, undefined> {
  /**
   * Sight Id
   */
  sightId: number;
}

// ============================================================================
// Set Sight Publish Status
// ============================================================================

export interface SetSightPublishStatusOptions extends RequestOptions<undefined, SettableSightPublishStatus> {
  /**
   * Sight Id
   */
  sightId: number;
}

export interface SetSightPublishStatusResponse extends BaseResponseStatus {
  /**
   * The Sight publish status
   * @see SightPublishStatus
   */
  result: SightPublishStatus;
}
