import type { RequestOptions } from '../types/RequestOptions';
import type { RequestCallback } from '../types/RequestCallback';

// === Get Data Classification Settings ===

export interface GetDataClassificationSettingsQueryParameters {
  planId: number;
}

export interface ApproverEntry {
  type: 'GROUPS' | 'USERS' | 'WORKSPACE_ADMINS';
  ids: number[];
}

export interface LabelApproverEntry {
  labelId: string;
  approvers: ApproverEntry[];
}

export interface DowngradeApprovalSettings {
  mode: 'NONE' | 'APPROVAL_NEEDED' | 'CUSTOM';
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
