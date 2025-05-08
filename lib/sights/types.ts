import { BaseResponseStatus, RequestCallback, RequestOptions } from '../types';
import { APIAccessLevel } from '../types/ApiAccessLevel';

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
  sightId: number;
}

export interface SightWidget {
  id: number;
  type: string;
  contents: any[];
  xPosition: number;
  yPosition: number;
  width: number;
  height: number;
  title: string;
  showTitleIcon: boolean;
  showTitle: boolean;
  titleFormat: string;
  titleFontColor: string;
  titleBackgroundColor: string;
  titleFont: string;
  version: number;
}

export interface BaseSight {
  id: number;
  name: string;
  accessLevel: APIAccessLevel;
  permalink: string;
  createdAt?: string | number;
  modifiedAt?: string | number;
}

export interface Sight extends BaseSight {
  columnCount: number;
  backgroundColor: string;
  defaultWidgetBackgroundColor: string;
  widgets: SightWidget[];
  workspace: {
    id: number;
    name: string;
  };
}

export interface ListSightQueryParameters {
  /**
   * Determines which variant of accessLevel is returned for
   * "VIEWER" or "COMMENTER". When 1 is passed "COMMENTER" will
   * be returned and when 0 is passed "VIEWER" will be returned.
   * 0 is the default.
   */
  accessApiLevel?: 1 | 0;

  /**
   * Include all results in the first page. page and page size
   * will be ignored if includeAll is set to true.
   *
   * default false
   */
  includeAll?: boolean;

  /**
   * When specified with a date and time value,
   * response only includes the objects that are modified on
   * or after the date and time specified.
   */
  modifiedSince?: string | number;

  /**
   * You can optionally choose to receive and send dates/times in numeric format
   * as milliseconds since the UNIX epoch (midnight on January 1, 1970 in UTC time).
   *
   * false is the default.
   */
  numericDates?: boolean;

  /**
   * Page of results to return.
   *
   * default 1
   */
  page?: number;

  /**
   * Number of results per page.
   * Maximum page size is 10,000.
   *
   * default 100.
   */
  pageSize?: number;
}

export type ListSightsOptions = RequestOptions<ListSightQueryParameters, undefined>;

export interface ListSightsResponse {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalCount: number;
  data: Sight[];
}

export interface DeleteSightOptions {
  sightId: number;
}

export type DeleteSightResponse = BaseResponseStatus;

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
   * new name for the sight
   */
  name: string;
}

export interface UpdateSightOptions extends RequestOptions<UpdateSightQueryParameters, UpdateSightBody> {
  sightId: number;
}

export interface UpdateSightResponse extends BaseResponseStatus {
  result: Sight;
}

export enum DashboardParentType {
  folder = 'folder',
  workspace = 'workspace',
}

export interface DashboardDestination {
  /**
   * id of the folder or workspace the new sight will be copied to.
   */
  destinationId: number;

  /**
   * Type of asset you are saving the dashboard copy in.
   * "workspace" or "folder"
   */
  destinationType: DashboardParentType;
}

export interface CopySightBody extends DashboardDestination {
  /**
   * Name of the new dashboard.
   */
  newName: string;
}

export interface CopySightOptions extends RequestOptions<undefined, CopySightBody> {
  sightId: string;
}

export interface CopySightResponse extends BaseResponseStatus {
  result: BaseSight;
}

export interface MoveSightOptions extends RequestOptions<undefined, DashboardDestination> {
  sightId: number;
}

export type MoveSightResponse = CopySightResponse;

export interface GetSightPublishStatusOptions {
  sightId: number;
}

export interface SettableSightPublishStatus {
  /**
   * If true, a rich version of the dashboard is published with the ability to use shortcuts and widget interactions.
   * If this is true readOnlyFullUrl and readOnlyFullAccessibility will be defined.
   */
  readOnlyFullEnabled: boolean;

  /**
   * Indicates who can access the 'Read-Only Full' view of the published dashboard.
   * Only returned in the response if readOnlyFullEnabled = true.
   * ALL - available to anyone who has the link.
   * ORG - available only to members of the dashboard owner's Smartsheet organization account.
   * SHARED - available only to users shared to the item.
   */
  readOnlyFullAccessibleBy?: 'ALL' | 'ORG' | 'SHARED';
}

export interface SightPublishStatus extends SettableSightPublishStatus {
  /**
   * URL for 'Read-Only Full' view of the published dashboard. Only returned in a response if readOnlyFullEnabled = true.
   */
  readOnlyFullUrl?: string;
}

export interface SetSightPublishStatusOptions extends RequestOptions<undefined, SettableSightPublishStatus> {
  sightId: number;
}

export interface SetSightPublishStatusResponse extends BaseResponseStatus {
  result: SightPublishStatus;
}

export type GetSight = (options: GetSightOptions, callback: RequestCallback<Sight>) => Promise<Sight>;
export type ListSights = (
  options: ListSightsOptions,
  callback: RequestCallback<ListSightsResponse>
) => Promise<ListSightsResponse>;
export type DeleteSight = (
  options: DeleteSightOptions,
  callback: RequestCallback<DeleteSightResponse>
) => Promise<DeleteSightResponse>;
export type UpdateSight = (
  options: UpdateSightOptions,
  callback: RequestCallback<UpdateSightResponse>
) => Promise<UpdateSightResponse>;
export type CopySight = (
  options: CopySightOptions,
  callback: RequestCallback<CopySightResponse>
) => Promise<CopySightResponse>;
export type MoveSight = (
  options: MoveSightOptions,
  callback: RequestCallback<MoveSightResponse>
) => Promise<MoveSightResponse>;
export type GetSightPublishStatus = (
  options: GetSightPublishStatusOptions,
  callback: RequestCallback<SightPublishStatus>
) => Promise<SightPublishStatus>;
export type SetSightPublishStatus = (
  options: SetSightPublishStatusOptions,
  callback: RequestCallback<SetSightPublishStatusResponse>
) => Promise<SetSightPublishStatusResponse>;

export interface SightApi {
  listSights: ListSights;
  getSight: GetSight;
  deleteSight: DeleteSight;
  updateSight: UpdateSight;
  copySight: CopySight;
  moveSight: MoveSight;
  getSightPublshStatus: GetSightPublishStatus;
  setSightPublishStatus: SetSightPublishStatus;
  // TODO -> the sharing method will be exposed as part of the sharing module work
  getShare: any;
  listShares: any;
  share: any;
  deleteShare: any;
  updateShare: any;
}
