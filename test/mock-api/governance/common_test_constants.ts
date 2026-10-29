import { ApproverType, DowngradeApprovalMode } from '@smartsheet/governance/types';

// Plan / organization identifiers (match governance WireMock mappings)
export const TEST_PLAN_ID = 1148023251199876;
export const TEST_ORG_ID = 1556806293055364;

// Asset used to resolve the plan
export const TEST_ASSET_ID = 112398785741;

// Label identifiers
export const TEST_LABEL_ID = '3fa85f64-5717-4562-b3fc-2c963f66afa6';
export const TEST_LABEL_ID_2 = '4aa85f64-5717-4562-b3fc-2c963f66afa7';

// Approver identifiers
export const TEST_GROUP_ID_1 = 5129226945881988;
export const TEST_GROUP_ID_2 = 2877427132196740;
export const TEST_USER_ID = 5448085317937028;

export const TEST_GUIDELINES_URL = 'https://wiki.example.com/classification-guide';

// Error responses
export const ERROR_400_STATUS_CODE = 400;
export const ERROR_400_MESSAGE = 'Malformed Request';
export const ERROR_403_STATUS_CODE = 403;
export const ERROR_403_MESSAGE = 'You are not authorized to perform this action.';
export const ERROR_500_STATUS_CODE = 500;
export const ERROR_500_MESSAGE = 'Internal Server Error';

const CONFIDENTIAL_LABEL_REQUIRED_PROPERTIES = {
  id: TEST_LABEL_ID,
  name: 'Confidential',
  color: '#ffe0e3',
  sensitivityOrder: 1,
  isDefault: false,
};

// Settings with all properties present (CUSTOM mode: only labelApprovers, no top-level approvers)
export const EXPECTED_SETTINGS_ALL_PROPERTIES = {
  orgId: TEST_ORG_ID,
  planId: TEST_PLAN_ID,
  isDisabled: false,
  guidelinesUrl: TEST_GUIDELINES_URL,
  allowManualChange: true,
  labels: [
    {
      ...CONFIDENTIAL_LABEL_REQUIRED_PROPERTIES,
      description: 'Highly sensitive information',
    },
    {
      id: TEST_LABEL_ID_2,
      name: 'Internal',
      description: 'For internal use only',
      color: '#b9f4c3',
      sensitivityOrder: 2,
      isDefault: true,
    },
  ],
  downgradeApprovalSettings: {
    mode: DowngradeApprovalMode.CUSTOM,
    labelApprovers: [
      {
        labelId: TEST_LABEL_ID_2,
        approvers: [
          { type: ApproverType.USERS, ids: [TEST_USER_ID] },
          { type: ApproverType.WORKSPACE_ADMINS, ids: [] },
        ],
      },
    ],
  },
};

// Settings with only required properties (NONE mode)
export const EXPECTED_SETTINGS_REQUIRED_PROPERTIES = {
  orgId: TEST_ORG_ID,
  planId: TEST_PLAN_ID,
  isDisabled: false,
  labels: [CONFIDENTIAL_LABEL_REQUIRED_PROPERTIES],
  downgradeApprovalSettings: { mode: DowngradeApprovalMode.NONE },
};

// Settings for a plan with data classification disabled
export const EXPECTED_SETTINGS_DISABLED_PLAN = {
  orgId: TEST_ORG_ID,
  planId: TEST_PLAN_ID,
  isDisabled: true,
  labels: [],
  downgradeApprovalSettings: { mode: DowngradeApprovalMode.NONE },
};

// Settings in APPROVAL_NEEDED mode (top-level approvers, no labelApprovers)
export const EXPECTED_SETTINGS_APPROVAL_NEEDED = {
  orgId: TEST_ORG_ID,
  planId: TEST_PLAN_ID,
  isDisabled: false,
  allowManualChange: true,
  labels: [CONFIDENTIAL_LABEL_REQUIRED_PROPERTIES],
  downgradeApprovalSettings: {
    mode: DowngradeApprovalMode.APPROVAL_NEEDED,
    approvers: [
      { type: ApproverType.GROUPS, ids: [TEST_GROUP_ID_1, TEST_GROUP_ID_2] },
      { type: ApproverType.USERS, ids: [TEST_USER_ID] },
    ],
  },
};
