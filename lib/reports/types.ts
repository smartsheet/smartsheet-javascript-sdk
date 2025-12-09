import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';
import type { BaseResponseStatus } from '../types/BaseResponseStatus';
import type { FailedItem } from '../webhooks/types';

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
  columns: Column[];
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
  rows: Row[];
  /**
   * Returned only if there are column filters on the sheet. Value = true if "show parent rows" is enabled for the filters.
   */
  showParentRowsForFilters: boolean;
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
  summaryPermissions: string;
}

export interface ReportScope {
  sheets: SourceSheet[];
  workspaces: WorkspaceListing[];
}

export interface SourceSheet {
  id: number;
  fromId: number;
  ownerId: number;
  accessLevel: string;
  attachments?: Attachment[];
  cellImageUploadEnabled: boolean;
  columns: Column[];
  createdAt: string | number;
  crossSheetReferences?: CrossSheetReference[];
  dependenciesEnabled: boolean;
  discussions?: Discussion[];
  effectiveAttachmentOptions: string[];
  ganttEnabled: boolean;
  hasSummaryFields: boolean;
  isMultiPicklistEnabled: boolean;
  modifiedAt: string | number;
  name: string;
  owner: string;
  permalink: string;
  projectSettings: ProjectSettings;
  readOnly: boolean;
  resourceManagementEnabled: boolean;
  resourceManagementType: string;
  rows: Row[];
  showParentRowsForFilters: boolean;
  source: Source;
  summary: SheetSummary;
  totalRowCount: number;
  userPermissions: UserPermissions;
  userSettings: SheetUserSettings;
  version: number;
  workspace: WorkspaceListing;
}

export interface Column {
  autoNumberFormat: AutoNumberFormat;
  contactOptions: ContactOption[];
  description: string;
  format?: string;
  formula: string;
  hidden: boolean;
  id: number;
  index: number;
  locked: boolean;
  lockedForUser: boolean;
  options: string[];
  primary?: boolean;
  symbol?: string;
  systemColumnType: string;
  tags: string[];
  title: string;
  type: string;
  validation: boolean;
  version: number;
  width: number;
}

export interface AutoNumberFormat {
  fill: string;
  prefix: string;
  startingNumber: number;
  suffix: string;
}

export interface ContactOption {
  email: string;
  name: string;
}

export interface Row {
  id: number;
  sheetId: number;
  siblingId: number;
  accessLevel: string;
  attachments?: Attachment[];
  cells: Cell[];
  columns: Column[];
  conditionalFormat?: string;
  createdAt: string | number;
  createdBy: User;
  discussions?: Discussion[];
  proof: Proof;
  expanded: boolean;
  filteredOut?: boolean;
  format?: string;
  inCriticalPath?: boolean;
  locked: boolean;
  lockedForUser: boolean;
  modifiedAt: string | number;
  modifiedBy: User;
  permaLink?: string;
  rowNumber: number;
  version: number;
}

export interface Cell {
  columnId: number;
  rowId: number;
  columnType?: string;
  conditionalFormat?: string;
  displayValue: string;
  format?: string;
  formula: string;
  hyperlink: Hyperlink;
  image?: CellImage;
  linkInFromCell?: CellLink;
  linksOutToCells?: CellLink[];
  objectValue: ObjectValue;
  overrideValidation?: boolean;
  strict: boolean;
  value?: string | number | boolean | null;
}

export interface Hyperlink {
  reportId?: number;
  sheetId?: number;
  sightId?: number;
  url?: string;
}

export interface CellImage {
  altText: string;
  height: number;
  id: string;
  width: number;
}

export interface CellLink {
  columnId: number;
  rowId: number;
  sheetId: number;
  sheetName: string;
  status: string;
}

export interface ObjectValue {
  objectType: string;
  value: string;
}

export interface Proof {
  id: number;
  originalId: number;
  name?: string;
  type: string;
  documentType: string;
  proofRequestUrl: string;
  version: number;
  lastUpdatedAt: string | number;
  lastUpdatedBy: User;
  isCompleted: boolean;
  attachments?: Attachment[];
  discussions?: Discussion[];
}

export interface Attachment {
  id: number;
  parentId: number;
  attachmentType: string;
  attachmentSubType: string;
  mimeType: string;
  parentType: string;
  createdAt: string | number;
  createdBy: User;
  name: string;
  sizeInKb: number;
  url: string;
  urlExpiresInMillis: number;
}

export interface Discussion {
  accessLevel: string;
  id: number;
  comments?: Comment[];
  commentAttachments?: Attachment[];
  commentCount: number;
  createdBy: User;
  lastCommentedAt: string | number;
  lastCommentedUser: User;
  parentId: number;
  parentType: string;
  readOnly: boolean;
  title: string;
}

export interface Comment {
  attachments: Attachment[];
  createdAt: string | number;
  createdBy: User;
  discussionId: number;
  id: number;
  modifiedAt: string | number;
  text: string;
}

export interface User {
  email: string;
  name: string;
}

export interface CrossSheetReference {
  endColumnId?: number;
  endRowId?: number;
  id: number;
  name: string;
  startColumnId?: number;
  startRowId?: number;
  status: string;
  sourceSheetId: number;
}

export interface ProjectSettings {
  lengthOfDay: number;
  nonWorkingDays: string[];
  workingDays: string[];
}

export interface Source {
  id: number;
  type: string;
}

export interface SheetSummary {
  fields: SummaryField[];
}

export interface SummaryField {
  id: number;
  contactOptions: ContactOption[];
  createdAt: string | number;
  createdBy: User;
  displayValue: string;
  format?: string;
  formula?: string;
  hyperlink?: Hyperlink;
  image?: CellImage;
  index: number;
  locked: boolean;
  lockedForUser: boolean;
  modifiedAt: string | number;
  modifiedBy: User;
  objectValue: ObjectValue;
  options?: string[];
  symbol?: string;
  title: string;
  type: string;
  validation: boolean;
}

export interface SheetUserSettings {
  criticalPathEnabled: boolean;
  displaySummaryTasks: boolean;
}

export interface WorkspaceListing {
  id: number;
  name: string;
  accessLevel: string;
  permalink: string;
}

export interface ReportPublish {
  readOnlyFullAccessibleBy?: string;
  readOnlyFullDefaultView: string;
  readOnlyFullEnabled: boolean;
  readOnlyFullUrl?: string;
  readOnlyFullShowToolbar?: boolean;
}

// ============================================================================
// List Reports
// ============================================================================

export interface ListReportsQueryParameters {
  modifiedSince?: string;
}

export interface ReportSummary {
  id: number;
  name: string;
  accessLevel: string;
  permalink: string;
  isSummaryReport: boolean;
}

export interface ListReportsResponse {
  data: ReportSummary[];
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
  totalCount?: number;
}

// ============================================================================
// Get Report
// ============================================================================

export interface GetReportQueryParameters {
  accessApiLevel?: number;
  include?: string;
  exclude?: string;
  pageSize?: number;
  page?: number;
  level?: number;
}

export interface GetReportOptions extends RequestOptions<GetReportQueryParameters, undefined> {
  reportId?: number;
}

// ============================================================================
// Send Report Via Email
// ============================================================================

export interface Recipient {
  email?: string;
  groupId?: number;
}

export interface SendReportViaEmailBody {
  format: string;
  formatDetails?: string;
  ccMe: boolean;
  message: string;
  sendTo: Recipient[];
  subject: string;
}

export interface SendReportViaEmailOptions extends RequestOptions<undefined, SendReportViaEmailBody> {
  reportId: number;
}

export interface SendReportViaEmailResponse extends BaseResponseStatus {
  version: number;
  failedItems?: FailedItem[];
}

// ============================================================================
// Get Report As Excel
// ============================================================================

export interface GetReportAsExcelOptions extends RequestOptions<undefined, undefined> {
  reportId: number;
}

// ============================================================================
// Get Report As CSV
// ============================================================================

export interface GetReportAsCSVOptions extends RequestOptions<undefined, undefined> {
  reportId: number;
}

// ============================================================================
// Get Report Publish Status
// ============================================================================

export interface GetReportPublishStatusOptions extends RequestOptions<undefined, undefined> {
  reportId: number;
}

// ============================================================================
// Set Report Publish Status
// ============================================================================

export interface SetReportPublishStatusOptions extends RequestOptions<undefined, ReportPublish> {
  reportId: number;
}

export interface SetReportPublishStatusResponse extends BaseResponseStatus {
  failedItems?: FailedItem[];
  result: ReportPublish;
}
