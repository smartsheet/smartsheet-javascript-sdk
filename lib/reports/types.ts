import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';
import type { BaseResponseStatus } from '../types/BaseResponseStatus';
import type { FailedItem } from '../types/FailedItem';
import type { Attachment } from '../attachments/types';
import type { Column } from '../columns/types';
import type { Row } from '../rows/types';
import type { Discussion } from '../discussions/types';
import type { CrossSheetReference } from '../cross-sheet-references/types';
import type { SheetSummary } from '../sheet-summary/types';
import type { SheetUserSettings } from '../sheets/types';
import type { WorkspaceListing } from '../workspaces/types';

// ============================================================================
// Reports API Interface
// ============================================================================

export interface ReportsApi {
  /**
   * Gets a list of all Reports accessible to the user.
   *
   * @param options - {@link RequestOptions}\<{@link ListReportsQueryParameters}, undefined\> - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link ListReportsResponse}\> - Optional callback function
   * @returns Promise\<{@link ListReportsResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `GET /reports`
   *
   * For pagination guidance, refer to [Pagination](/api/smartsheet/guides/basics/pagination).
   *
   * @example
   * ```typescript
   * const reports = await client.reports.listReports({});
   * ```
   */
  listReports: (
    options: RequestOptions<ListReportsQueryParameters, undefined>,
    callback?: RequestCallback<ListReportsResponse>
  ) => Promise<ListReportsResponse>;

  /**
   * Gets a Report object.
   *
   * @param options - {@link GetReportOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link Report}\> - Optional callback function
   * @returns Promise\<{@link Report}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `GET /reports/{reportId}`
   *
   * @example
   * ```typescript
   * const report = await client.reports.getReport({
   *   reportId: 4583173393803140
   * });
   * ```
   */
  getReport: (options: GetReportOptions, callback?: RequestCallback<Report>) => Promise<Report>;

  /**
   * Sends a Report via email.
   *
   * @param options - {@link SendReportViaEmailOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link SendReportViaEmailResponse}\> - Optional callback function
   * @returns Promise\<{@link SendReportViaEmailResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `POST /reports/{reportId}/emails`
   *
   * @example
   * ```typescript
   * const result = await client.reports.sendReportViaEmail({
   *   reportId: 4583173393803140,
   *   body: {
   *     sendTo: [{ email: 'john.doe@smartsheet.com' }],
   *     subject: 'Check this report out!',
   *     message: 'Here is the report I mentioned',
   *     ccMe: false,
   *     format: 'PDF',
   *     formatDetails: { paperSize: 'A4' }
   *   }
   * });
   * ```
   */
  sendReportViaEmail: (
    options: SendReportViaEmailOptions,
    callback?: RequestCallback<SendReportViaEmailResponse>
  ) => Promise<SendReportViaEmailResponse>;

  /**
   * Gets a Report as an Excel file.
   *
   * @param options - {@link GetReportAsExcelOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<Buffer\> - Optional callback function
   * @returns Promise\<Buffer\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `GET /reports/{reportId}` with Accept header for Excel
   *
   * @example
   * ```typescript
   * const excelBuffer = await client.reports.getReportAsExcel({
   *   reportId: 4583173393803140
   * });
   * ```
   */
  getReportAsExcel: (options: GetReportAsExcelOptions, callback?: RequestCallback<Buffer>) => Promise<Buffer>;

  /**
   * Gets a Report as a CSV file.
   *
   * @param options - {@link GetReportAsCSVOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<string\> - Optional callback function
   * @returns Promise\<string\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `GET /reports/{reportId}` with Accept header for CSV
   *
   * @example
   * ```typescript
   * const csvData = await client.reports.getReportAsCSV({
   *   reportId: 4583173393803140
   * });
   * ```
   */
  getReportAsCSV: (options: GetReportAsCSVOptions, callback?: RequestCallback<string>) => Promise<string>;

  /**
   * Gets a Report's publish status.
   *
   * @param options - {@link GetReportPublishStatusOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link ReportPublish}\> - Optional callback function
   * @returns Promise\<{@link ReportPublish}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `GET /reports/{reportId}/publish`
   *
   * @example
   * ```typescript
   * const publishStatus = await client.reports.getReportPublishStatus({
   *   reportId: 4583173393803140
   * });
   * ```
   */
  getReportPublishStatus: (
    options: GetReportPublishStatusOptions,
    callback?: RequestCallback<ReportPublish>
  ) => Promise<ReportPublish>;

  /**
   * Sets a Report's publish status.
   *
   * @param options - {@link SetReportPublishStatusOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link SetReportPublishStatusResponse}\> - Optional callback function
   * @returns Promise\<{@link SetReportPublishStatusResponse}\>
   *
   * @remarks
   * **Who can use this operation:**
   * - **Permissions:** Admin on the report
   *
   * It mirrors to the following Smartsheet REST API method: `PUT /reports/{reportId}/publish`
   *
   * @example
   * ```typescript
   * const result = await client.reports.setReportPublishStatus({
   *   reportId: 4583173393803140,
   *   body: {
   *     readOnlyFullEnabled: true,
   *     readOnlyFullAccessibleBy: 'ALL'
   *   }
   * });
   * ```
   */
  setReportPublishStatus: (
    options: SetReportPublishStatusOptions,
    callback?: RequestCallback<SetReportPublishStatusResponse>
  ) => Promise<SetReportPublishStatusResponse>;
}

// ============================================================================
// Report Types (extends Sheet properties)
// ============================================================================

export interface Report {
  scope: ReportScope;
  /**
   * An array of Sheet objects (without rows), representing the sheets that rows in the report originated from. Only included in the Get Report response if the include parameter specifies sourceSheets.
   */
  sourceSheets?: SourceSheet[];
  /**
   * A boolean to represent whether the report is a sheet summary report or not. If this property is false, it is a row report.
   */
  isSummaryReport: boolean;
  /**
   * Sheet Id.
   */
  id: number;
  /**
   * The Id of the template from which to create the sheet. This attribute can be specified in a request, but is never present in a response.
   */
  fromId: number;
  /**
   * User Id of the sheet owner.
   */
  ownerId: number;
  accessLevel: string;
  /**
   * Array of Attachment objects. Only returned if the include query string parameter contains attachments.
   */
  attachments?: Attachment[];
  /**
   * The sheet is enabled for cell images to be uploaded.
   */
  cellImageUploadEnabled: boolean;
  /**
   * Array of Column objects
   */
  columns: Column[];
  /**
   * Report creation date
   */
  createdAt: string | number;
  /**
   * Array of CrossSheetReference objects. Only returned if the include query string parameter contains crossSheetReferences.
   */
  crossSheetReferences?: CrossSheetReference[];
  /**
   * Indicates whether dependencies are enabled.
   */
  dependenciesEnabled: boolean;
  /**
   * Array of Discussion objects Only returned if the include query string parameter contains discussions.
   */
  discussions?: Discussion[];
  /**
   * Array of enum strings
   */
  effectiveAttachmentOptions: string[];
  /**
   * Indicates whether "Gantt View" is enabled.
   */
  ganttEnabled: boolean;
  /**
   * Indicates whether a sheet summary is present.
   */
  hasSummaryFields: boolean;
  /**
   * Indicates whether multi-select is enabled.
   */
  isMultiPicklistEnabled: boolean;
  /**
   * Report modification date.
   */
  modifiedAt: string | number;
  /**
   * Sheet name
   */
  name: string;
  /**
   * Email address of the sheet owner.
   */
  owner: string;
  /**
   * URL that represents a direct link to the sheet in Smartsheet.
   */
  permalink: string;
  /**
   * Represents the project settings dependencies for a specific sheet. Project settings may be updated on sheets that the user has editor access.
   */
  projectSettings: ProjectSettings;
  /**
   * Returned only if the sheet belongs to an expired trial (value = true).
   */
  readOnly: boolean;
  /**
   * Indicates that resource management is enabled.
   */
  resourceManagementEnabled: boolean;
  /**
   * Resource Management type. Indicates the type of RM that is enabled.
   */
  resourceManagementType: string;
  /**
   * Array of Row objects.
   */
  rows: Row[];
  /**
   * Returned only if there are column filters on the sheet. Value = true if "show parent rows" is enabled for the filters.
   */
  showParentRowsForFilters: boolean;
  /**
   * The dashboard, report, sheet, or template from which the enclosing dashboard, report, sheet, or template was created.
   */
  source: Source;
  /**
   * Represents the entire summary, or a list of defined fields and values, for a specific sheet.
   */
  summary: SheetSummary;
  /**
   * The total number of rows in the sheet.
   */
  totalRowCount: number;
  /**
   * Describes the current user's editing permissions for a specific sheet.
   */
  userPermissions: UserPermissions;
  /**
   * Represents individual user settings for a specific sheet. User settings may be updated even on sheets where the current user only has read access (for example, viewer permissions or a read-only sheet).
   */
  userSettings: SheetUserSettings;
  /**
   * A number that is incremented every time a sheet is modified.
   */
  version: number;
  workspace: WorkspaceListing;
}

export interface UserPermissions {
  /**
   * One of:

ADMIN: full control over fields.
READ_DELETE: sheet is owned by an individual account that doesn't have summary capabilities. If a summary exists, the only possible operations are GET and DELETE fields.
READ_ONLY.
READ_WRITE: can edit values of existing fields, but not create or delete fields, nor modify field type.
   */
  summaryPermissions: string;
}

export interface ReportScope {
  /**
   * Array of Sheet objects (containing just the sheet Id) of any sheets that the requester has access to that make up the report.
   */
  sheets: SourceSheet[];
  /**
   * Array of Workspace objects (containing just the workspace Id) that the requester has access to that make up the report.
   */
  workspaces: WorkspaceListing[];
}

export interface SourceSheet {
  /**
   * Sheet Id.
   */
  id: number;
  /**
   * The Id of the template from which to create the sheet. This attribute can be specified in a request, but is never present in a response.
   */
  fromId: number;
  /**
   * User Id of the sheet owner.
   */
  ownerId: number;
  accessLevel: string;
  /**
   * Array of Attachment objects. Only returned if the include query string parameter contains attachments.
   */
  attachments?: Attachment[];
  /**
   * The sheet is enabled for cell images to be uploaded.
   */
  cellImageUploadEnabled: boolean;
  /**
   * Array of Column objects.
   */
  columns: Column[];
  /**
   * Source sheet creation date.
   */
  createdAt: string | number;
  /**
   * Array of CrossSheetReference objects. Only returned if the include query string parameter contains crossSheetReferences.
   */
  crossSheetReferences?: CrossSheetReference[];
  /**
   * Indicates whether dependencies are enabled.
   */
  dependenciesEnabled: boolean;
  /**
   * Array of Discussion objects Only returned if the include query string parameter contains discussions.
   */
  discussions?: Discussion[];
  /**
   * Array of enum strings (see Attachment.attachmentType indicating the allowable attachment options for the current user and sheet.
   */
  effectiveAttachmentOptions: string[];
  /**
   * Indicates whether "Gantt View" is enabled.
   */
  ganttEnabled: boolean;
  /**
   * Indicates whether a sheet summary is present.
   */
  hasSummaryFields: boolean;
  /**
   * Indicates whether multi-select is enabled.
   */
  isMultiPicklistEnabled: boolean;
  /**
   * Source sheet modification date.
   */
  modifiedAt: string | number;
  /**
   * Sheet name.
   */
  name: string;
  /**
   * Email address of the sheet owner.
   */
  owner: string;
  /**
   * URL that represents a direct link to the sheet in Smartsheet.
   */
  permalink: string;
  /**
   * Represents the project settings dependencies for a specific sheet. Project settings may be updated on sheets that the user has editor access.
   */
  projectSettings: ProjectSettings;
  /**
   * Returned only if the sheet belongs to an expired trial (value = true).
   */
  readOnly: boolean;
  /**
   * Indicates that resource management is enabled.
   */
  resourceManagementEnabled: boolean;
  /**
   * Resource Management type. Indicates the type of RM that is enabled.
   */
  resourceManagementType: string;
  /**
   * Array of Row objects.
   */
  rows: Row[];
  /**
   * Returned only if there are column filters on the sheet. Value = true if "show parent rows" is enabled for the filters.
   */
  showParentRowsForFilters: boolean;
  /**
   * The dashboard, report, sheet, or template from which the enclosing dashboard, report, sheet, or template was created.
   */
  source: Source;
  /**
   * Represents the entire summary, or a list of defined fields and values, for a specific sheet.
   */
  summary: SheetSummary;
  /**
   * The total number of rows in the sheet.
   */
  totalRowCount: number;
  /**
   * Describes the current user's editing permissions for a specific sheet.
   */
  userPermissions: UserPermissions;
  /**
   * Represents individual user settings for a specific sheet. User settings may be updated even on sheets where the current user only has read access (for example, viewer permissions or a read-only sheet).
   */
  userSettings: SheetUserSettings;
  /**
   * A number that is incremented every time a sheet is modified.
   */
  version: number;
  workspace: WorkspaceListing;
}

export interface ProjectSettings {
  /**
   * Length of a workday for a project sheet.
   */
  lengthOfDay: number;
  /**
   * Non-working days for a project sheet.
   */
  nonWorkingDays: string[];
  /**
   * Working days for a project sheet.
   */
  workingDays: string[];
}

export interface Source {
  /**
   * The Id of the dashboard, report, sheet, or template from which the enclosing dashboard, report, sheet, or template was created.
   */
  id: number;
  /**
   * Report, sheet, sight (aka dashboard), or template.
   */
  type: string;
}

export interface ReportPublish {
  /**
   * Indicates who can access the 'Read-Only Full' view of the published report:

If ALL, it is available to anyone who has the link.
If ORG, it is available only to members of the report owner's Smartsheet organization account.
If SHARED, it is available only to users shared to the item.
Only returned in a response if readOnlyFullEnabled = true.
   */
  readOnlyFullAccessibleBy?: string;
  /**
   * Indicates which view the user has set for a read-only, default view of the published report. Must be one of the following values: CALENDAR, CARD, or GRID.
   */
  readOnlyFullDefaultView: string;
  /**
   * (Required) If true, a rich version of the report is published with the ability to download row attachments and discussions.
   */
  readOnlyFullEnabled: boolean;
  /**
   * URL for 'Read-Only Full' view of the published report.

Only returned in a response if readOnlyFullEnabled = true.
   */
  readOnlyFullUrl?: string;
  /**
   * Deprecated Indicates whether the left nav toolbar is displayed. The default, or true, is to display the toolbar. If false, hides the toolbar.
   */
  readOnlyFullShowToolbar?: boolean;
}

// ============================================================================
// List Reports
// ============================================================================

export interface ListReportsQueryParameters {
  /**
   * When specified with a date and time value, response only includes the objects that are modified on or after the date and time specified. If you need to keep track of frequent changes, it may be more useful to use Get Sheet Version.
   */
  modifiedSince?: string;
}

export interface ReportSummary {
  /**
   * The report's unique identifier.
   */
  id: number;
  /**
   * The report's name.
   */
  name: string;
  accessLevel: string;
  /**
   * URL to the report in Smartsheet.
   */
  permalink: string;
  /**
   * It is true if the report is a sheet summary; otherwise it is a row report.
   */
  isSummaryReport: boolean;
}

export interface ListReportsResponse {
  /**
   * List of all accessible reports, referenced by their ID, name, access level, and summary report flag values.
   */
  data: ReportSummary[];
  /**
   * The current page in the full result set that the data array represents. NOTE when a page number greater than totalPages is requested, the last page is instead returned.
   */
  pageNumber?: number;
  /**
   * The number of items in a page. Omitted if there is no limit to page size (and hence, all results are included). Unless otherwise specified, this defaults to 100 for most endpoints.
   */
  pageSize?: number;
  /**
   * The total number of pages in the full result set.
   */
  totalPages?: number;
  /**
   * The total number of items in the full result set.
   */
  totalCount?: number;
}

// ============================================================================
// Get Report
// ============================================================================

export interface GetReportQueryParameters {
  /**
   * Allows COMMENTER access for inputs and return values. For backwards-compatibility, VIEWER is the default. For example, to see whether a user has COMMENTER access for a sheet, use accessApiLevel=1.
   */
  accessApiLevel?: number;
  /**
   * A comma-separated list of optional elements to include in the response
   */
  include?: string;
  /**
   * A comma-separated list of optional elements to not include in the response
   */
  exclude?: string;
  /**
   * The maximum number of items to return per page. Unless otherwise stated for a specific endpoint, defaults to 100. If only page is specified, defaults to a page size of 100. For reports, the default is 100 rows. If you need larger sets of data from your report, returns a maximum of 10,000 rows per request.
   */
  pageSize?: number;
  /**
   * Which page to return. Defaults to 1 if not specified. If you specify a value greater than the total number of pages, the last page of results is returned.
   */
  page?: number;
  /**
   * Specifies whether new functionality, such as multi-contact data is returned in a backwards-compatible, text format (level=0, default), multi-contact data (level=1), or multi-picklist data (level=3).
   */
  level?: number;
}

export interface GetReportOptions extends RequestOptions<GetReportQueryParameters, undefined> {
  /**
   * reportID of the report being accessed.
   */
  reportId?: number;
}

// ============================================================================
// Send Report Via Email
// ============================================================================

export interface Recipient {
  /**
   * The email address of an individual recipient.
   */
  email?: string;
  /**
   * The Id of a group recipient.
   */
  groupId?: number;
}

export interface SendReportViaEmailBody {
  /**
   * One of the following values: EXCEL, PDF, or PDF_GANTT.
   */
  format: string;
  /**
   * Email format details.
   */
  formatDetails?: string;
  /**
   * Indicates whether to send a copy of the email to the sender.
   */
  ccMe: boolean;
  /**
   * The message of the email.
   */
  message: string;
  /**
   * Array of recipients.
   */
  sendTo: Recipient[];
  /**
   * The subject of the email.
   */
  subject: string;
}

export interface SendReportViaEmailOptions extends RequestOptions<undefined, SendReportViaEmailBody> {
  /**
   * reportID of the report being accessed.
   */
  reportId: number;
}

export interface SendReportViaEmailResponse extends BaseResponseStatus {
  /**
   * New version of the sheet. Applicable only for operations which update sheet data.
   */
  version: number;
  /**
   * Array of BulkItemFailure objects which represents the items that failed to be added or updated. See Bulk operations \> Partial success for more information. Applicable only for bulk operations that support partial success.
   */
  failedItems?: FailedItem[];
}

// ============================================================================
// Get Report As Excel
// ============================================================================

export interface GetReportAsExcelOptions extends RequestOptions<undefined, undefined> {
  /**
   * reportID of the report being accessed.
   */
  reportId: number;
}

// ============================================================================
// Get Report As CSV
// ============================================================================

export interface GetReportAsCSVOptions extends RequestOptions<undefined, undefined> {
  /**
   * reportID of the report being accessed.
   */
  reportId: number;
}

// ============================================================================
// Get Report Publish Status
// ============================================================================

export interface GetReportPublishStatusOptions extends RequestOptions<undefined, undefined> {
  /**
   * reportID of the report being accessed.
   */
  reportId: number;
}

// ============================================================================
// Set Report Publish Status
// ============================================================================

export interface SetReportPublishStatusOptions extends RequestOptions<undefined, ReportPublish> {
  /**
   * reportID of the report being accessed.
   */
  reportId: number;
}

export interface SetReportPublishStatusResponse extends BaseResponseStatus {
  /**
   * Array of BulkItemFailure objects which represents the items that failed to be added or updated. See Bulk operations \> Partial success for more information. Applicable only for bulk operations that support partial success.
   */
  failedItems?: FailedItem[];
  result: ReportPublish;
}
