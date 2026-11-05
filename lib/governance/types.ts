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

export enum ApproverType {
  GROUPS = 'GROUPS',
  USERS = 'USERS',
  WORKSPACE_ADMINS = 'WORKSPACE_ADMINS',
}

export enum DowngradeApprovalMode {
  NONE = 'NONE',
  APPROVAL_NEEDED = 'APPROVAL_NEEDED',
  CUSTOM = 'CUSTOM',
}

export interface ApproverEntry {
  type: ApproverType;
  ids: number[];
}

export interface LabelApproverEntry {
  labelId: string;
  approvers: ApproverEntry[];
}

export interface DowngradeApprovalSettings {
  mode: DowngradeApprovalMode;
  approvers?: ApproverEntry[];
  labelApprovers?: LabelApproverEntry[];
}

export interface ClassificationLabel {
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
  labels: ClassificationLabel[];
  downgradeApprovalSettings?: DowngradeApprovalSettings;
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
