import type { RequestOptions } from '../types/RequestOptions';
import type { RequestCallback } from '../types/RequestCallback';

// === Get Data Classification Settings ===

/**
 * Requires either planId, or both assetType + assetId.
 * assetType accepted values: 'sheet', 'report', 'sight' (dashboard).
 */
export interface GetDataClassificationSettingsQueryParameters {
  planId?: number;
  assetType?: string;
  assetId?: number;
}

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
