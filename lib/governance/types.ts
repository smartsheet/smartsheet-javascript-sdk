import type { RequestOptions } from '../types/RequestOptions';
import type { RequestCallback } from '../types/RequestCallback';
import type { AssetType } from '../sharing';

// ============================================================================
// Get Data Classification Settings
// ============================================================================

/**
 * Query parameters for {@link GovernanceApi.getDataClassificationSettings}.
 *
 * Provide either `planId`, or both `assetType` and `assetId`:
 * - To get the settings for a plan, send `planId`.
 * - When your request relates to a specific sheet, report, or dashboard, send `assetType` and `assetId`.
 */
export interface GetDataClassificationSettingsQueryParameters {
  /**
   * The ID of the plan whose classification settings to return. Required unless
   * `assetType` and `assetId` are provided. If all three are provided, `assetType`
   * and `assetId` take precedence.
   */
  planId?: number;
  /**
   * The type of the asset: {@link AssetType.SHEET}, {@link AssetType.REPORT}, or
   * {@link AssetType.SIGHT} (dashboard). Must be provided together with `assetId`.
   */
  assetType?: AssetType;
  /**
   * The ID of the sheet, report, or dashboard. Must be provided together with `assetType`.
   */
  assetId?: number;
}

/**
 * Options for {@link GovernanceApi.getDataClassificationSettings}.
 */
export type GetDataClassificationSettingsOptions = RequestOptions<
  GetDataClassificationSettingsQueryParameters,
  undefined
>;

/**
 * The type of approver in a {@link DataClassificationApproverEntry}.
 */
export enum DataClassificationApproverType {
  GROUPS = 'GROUPS',
  USERS = 'USERS',
  WORKSPACE_ADMINS = 'WORKSPACE_ADMINS',
}

/**
 * The approval mode for classification downgrades.
 */
export enum DataClassificationDowngradeApprovalMode {
  /**
   * No approval required.
   */
  NONE = 'NONE',
  /**
   * Approval is required from designated approvers.
   */
  APPROVAL_NEEDED = 'APPROVAL_NEEDED',
  /**
   * Per-label approver configuration applies.
   */
  CUSTOM = 'CUSTOM',
}

/**
 * An approver entry identifying a set of users or groups who can approve classification downgrades.
 */
export interface DataClassificationApproverEntry {
  /**
   * The type of approver.
   * @see DataClassificationApproverType
   */
  type: DataClassificationApproverType;
  /**
   * The IDs of the groups or users who are approvers.
   */
  ids: number[];
}

/**
 * Per-label approver configuration for classification downgrades in
 * {@link DataClassificationDowngradeApprovalMode.CUSTOM} mode.
 */
export interface DataClassificationLabelApproverEntry {
  /**
   * The classification label ID this approver entry applies to.
   */
  labelId: string;
  /**
   * The approvers for downgrades to this label.
   */
  approvers: DataClassificationApproverEntry[];
}

/**
 * Configuration for approval workflows when a classification label is downgraded to a less sensitive level.
 */
export interface DataClassificationDowngradeApprovalSettings {
  /**
   * The approval mode for classification downgrades.
   * @see DataClassificationDowngradeApprovalMode
   */
  mode: DataClassificationDowngradeApprovalMode;
  /**
   * The list of approvers when mode is {@link DataClassificationDowngradeApprovalMode.APPROVAL_NEEDED}.
   * Empty or absent when mode is `NONE` or `CUSTOM`.
   */
  approvers?: DataClassificationApproverEntry[];
  /**
   * Per-label approver overrides when mode is {@link DataClassificationDowngradeApprovalMode.CUSTOM}.
   * Empty or absent otherwise.
   */
  labelApprovers?: DataClassificationLabelApproverEntry[];
}

/**
 * A classification label published by the plan administrator.
 */
export interface DataClassificationLabel {
  /**
   * The unique identifier of this label.
   */
  id: string;
  /**
   * The display name of the label (for example, "Confidential", "Internal").
   */
  name: string;
  /**
   * An optional description of what this classification level means.
   */
  description?: string;
  /**
   * The hex color of this label (for example, `#ffe0e3`). Values are always lowercase 6-digit hex codes.
   */
  color: string;
  /**
   * The ordinal ranking of this label's sensitivity, where 1 is the most sensitive.
   */
  sensitivityOrder: number;
  /**
   * Whether this label is the default classification applied to new items.
   */
  isDefault: boolean;
}

/**
 * Classification settings for a plan, including published classification labels, guidelines,
 * manual change permissions, and downgrade approval configuration.
 */
export interface DataClassificationSettings {
  /**
   * The organization ID that owns this plan.
   */
  orgId: number;
  /**
   * The plan ID these settings apply to.
   */
  planId: number;
  /**
   * Whether data classification is disabled for this plan.
   */
  isDisabled: boolean;
  /**
   * URL to the organization's classification guidelines document.
   */
  guidelinesUrl?: string;
  /**
   * Whether users are allowed to manually change the classification label on items.
   */
  allowManualChange?: boolean;
  /**
   * The list of published classification labels for this plan, ordered by sensitivity.
   */
  labels: DataClassificationLabel[];
  /**
   * Configuration for approvals when a label is downgraded to a less sensitive level.
   */
  downgradeApprovalSettings?: DataClassificationDowngradeApprovalSettings;
}

export type GetDataClassificationSettingsResponse = DataClassificationSettings;

// ============================================================================
// Governance API
// ============================================================================

export interface GovernanceApi {
  /**
   * Gets the classification settings for a plan, including published classification labels,
   * guidelines, manual change permissions, and downgrade approval configuration.
   *
   * @param options - {@link GetDataClassificationSettingsOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link GetDataClassificationSettingsResponse}\> - Optional callback function
   * @returns Promise\<{@link GetDataClassificationSettingsResponse}\>
   *
   * @remarks
   * Provide either `planId`, or both `assetType` and `assetId`. The caller must belong to an
   * organization with data classification enabled on the specified plan.
   *
   * It mirrors to the following Smartsheet REST API method: `GET /governance/data-classification/settings`
   *
   * @example
   * ```typescript
   * // By plan
   * const settings = await client.governance.getDataClassificationSettings({
   *   queryParameters: { planId: 1148023251199876 }
   * });
   *
   * // By the sheet, report, or dashboard the request relates to
   * const sheetSettings = await client.governance.getDataClassificationSettings({
   *   queryParameters: { assetType: AssetType.SHEET, assetId: 4583173393803140 }
   * });
   * ```
   */
  getDataClassificationSettings: (
    options: GetDataClassificationSettingsOptions,
    callback?: RequestCallback<GetDataClassificationSettingsResponse>
  ) => Promise<GetDataClassificationSettingsResponse>;
}
