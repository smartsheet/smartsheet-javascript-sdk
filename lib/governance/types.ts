import type { RequestOptions } from '../types/RequestOptions';
import type { RequestCallback } from '../types/RequestCallback';
import type { AssetType } from '../sharing';

// === Get Data Classification Settings ===

/**
 * Provide either `planId`, or both `assetType` and `assetId`:
 * - To get the settings for a plan, send `planId`.
 * - When your request relates to a specific sheet, report, or dashboard, send `assetType` and `assetId`.
 *
 * `assetType` accepted values: AssetType.SHEET, AssetType.REPORT, AssetType.SIGHT (dashboard).
 * `assetType` and `assetId` must be provided together.
 */
export type GetDataClassificationSettingsQueryParameters =
  | { planId: number; assetType?: never; assetId?: never }
  | { planId?: never; assetType: AssetType; assetId: number };

export enum DataClassificationApproverType {
  GROUPS = 'GROUPS',
  USERS = 'USERS',
  WORKSPACE_ADMINS = 'WORKSPACE_ADMINS',
}

export enum DataClassificationDowngradeApprovalMode {
  NONE = 'NONE',
  APPROVAL_NEEDED = 'APPROVAL_NEEDED',
  CUSTOM = 'CUSTOM',
}

export interface DataClassificationApproverEntry {
  type: DataClassificationApproverType;
  ids: number[];
}

export interface DataClassificationLabelApproverEntry {
  labelId: string;
  approvers: DataClassificationApproverEntry[];
}

export interface DataClassificationDowngradeApprovalSettings {
  mode: DataClassificationDowngradeApprovalMode;
  approvers?: DataClassificationApproverEntry[];
  labelApprovers?: DataClassificationLabelApproverEntry[];
}

export interface DataClassificationLabel {
  id: string;
  name: string;
  description?: string;
  color: string;
  sensitivityOrder: number;
  isDefault: boolean;
}

export interface DataClassificationSettings {
  orgId: number;
  planId: number;
  isDisabled: boolean;
  guidelinesUrl?: string;
  allowManualChange?: boolean;
  labels: DataClassificationLabel[];
  downgradeApprovalSettings?: DataClassificationDowngradeApprovalSettings;
}

export type GetDataClassificationSettingsResponse = DataClassificationSettings;

// === GovernanceApi ===

export interface GovernanceApi {
  /**
   * Gets the data classification settings for a plan.
   * GET /2.0/governance/data-classification/settings
   */
  getDataClassificationSettings(
    options: RequestOptions<GetDataClassificationSettingsQueryParameters, undefined>,
    callback?: RequestCallback<GetDataClassificationSettingsResponse>
  ): Promise<GetDataClassificationSettingsResponse>;
}
