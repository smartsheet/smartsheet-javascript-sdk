import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import { AssetType } from '@smartsheet/sharing';
import { DataClassificationApproverType, DataClassificationDowngradeApprovalMode } from '@smartsheet/governance/types';
import {
  TEST_PLAN_ID,
  TEST_ORG_ID,
  TEST_ASSET_ID,
  TEST_LABEL_ID,
  TEST_LABEL_ID_2,
  TEST_GROUP_ID_1,
  TEST_GROUP_ID_2,
  TEST_USER_ID,
  TEST_GUIDELINES_URL,
  ERROR_400_STATUS_CODE,
  ERROR_400_MESSAGE,
  ERROR_403_STATUS_CODE,
  ERROR_403_MESSAGE,
  ERROR_500_STATUS_CODE,
  ERROR_500_MESSAGE,
} from './common_test_constants';

const CONFIDENTIAL_LABEL_REQUIRED_PROPERTIES = {
  id: TEST_LABEL_ID,
  name: 'Confidential',
  color: '#ffe0e3',
  sensitivityOrder: 1,
  isDefault: false,
};

// Settings with all properties present (CUSTOM mode: only labelApprovers, no top-level approvers)
const EXPECTED_SETTINGS_ALL_PROPERTIES = {
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
    mode: DataClassificationDowngradeApprovalMode.CUSTOM,
    labelApprovers: [
      {
        labelId: TEST_LABEL_ID_2,
        approvers: [
          { type: DataClassificationApproverType.USERS, ids: [TEST_USER_ID] },
          { type: DataClassificationApproverType.WORKSPACE_ADMINS, ids: [] },
        ],
      },
    ],
  },
};

// Settings with only the required properties
const EXPECTED_SETTINGS_REQUIRED_PROPERTIES = {
  orgId: TEST_ORG_ID,
  planId: TEST_PLAN_ID,
  isDisabled: false,
  labels: [CONFIDENTIAL_LABEL_REQUIRED_PROPERTIES],
};

// Settings for a plan with data classification disabled
const EXPECTED_SETTINGS_DISABLED_PLAN = {
  orgId: TEST_ORG_ID,
  planId: TEST_PLAN_ID,
  isDisabled: true,
  labels: [],
  downgradeApprovalSettings: { mode: DataClassificationDowngradeApprovalMode.NONE },
};

// Settings in APPROVAL_NEEDED mode (top-level approvers, no labelApprovers)
const EXPECTED_SETTINGS_APPROVAL_NEEDED = {
  orgId: TEST_ORG_ID,
  planId: TEST_PLAN_ID,
  isDisabled: false,
  allowManualChange: true,
  labels: [CONFIDENTIAL_LABEL_REQUIRED_PROPERTIES],
  downgradeApprovalSettings: {
    mode: DataClassificationDowngradeApprovalMode.APPROVAL_NEEDED,
    approvers: [
      { type: DataClassificationApproverType.GROUPS, ids: [TEST_GROUP_ID_1, TEST_GROUP_ID_2] },
      { type: DataClassificationApproverType.USERS, ids: [TEST_USER_ID] },
    ],
  },
};

describe('Governance - getDataClassificationSettings endpoint tests', () => {
  const client = createClient();

  it('getDataClassificationSettings generated url is correct', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      queryParameters: { planId: TEST_PLAN_ID },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/governance/get-data-classification-settings/all-response-body-properties',
      },
    };
    await client.governance.getDataClassificationSettings(options);
    const matchedRequest = await findWireMockRequest(requestId);

    const parsedUrl = new URL(matchedRequest.absoluteUrl);
    expect(parsedUrl.pathname).toEqual('/2.0/governance/data-classification/settings');
    expect(matchedRequest.method).toEqual('GET');
    expect(Object.fromEntries(parsedUrl.searchParams)).toEqual({ planId: String(TEST_PLAN_ID) });
  });

  it('getDataClassificationSettings all response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      queryParameters: { planId: TEST_PLAN_ID },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/governance/get-data-classification-settings/all-response-body-properties',
      },
    };
    const response = await client.governance.getDataClassificationSettings(options);
    const matchedRequest = await findWireMockRequest(requestId);

    expect(matchedRequest.body).toEqual('');
    expect(response).toEqual(EXPECTED_SETTINGS_ALL_PROPERTIES);
  });

  it('getDataClassificationSettings required response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      queryParameters: { planId: TEST_PLAN_ID },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/governance/get-data-classification-settings/required-response-body-properties',
      },
    };
    const response = await client.governance.getDataClassificationSettings(options);
    const matchedRequest = await findWireMockRequest(requestId);

    expect(matchedRequest.body).toEqual('');
    expect(response).toEqual(EXPECTED_SETTINGS_REQUIRED_PROPERTIES);
  });

  it('getDataClassificationSettings error 400 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      queryParameters: { planId: TEST_PLAN_ID },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/errors/400-response',
      },
    };
    try {
      await client.governance.getDataClassificationSettings(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
      expect(error.message).toBe(ERROR_400_MESSAGE);
    }
  });

  it('getDataClassificationSettings error 500 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      queryParameters: { planId: TEST_PLAN_ID },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/errors/500-response',
      },
    };
    try {
      await client.governance.getDataClassificationSettings(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
      expect(error.message).toBe(ERROR_500_MESSAGE);
    }
  });

  // --- Endpoint-specific tests ---

  it('getDataClassificationSettings disabled plan', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      queryParameters: { planId: TEST_PLAN_ID },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/governance/get-data-classification-settings/disabled-plan',
      },
    };
    const response = await client.governance.getDataClassificationSettings(options);
    const matchedRequest = await findWireMockRequest(requestId);

    expect(matchedRequest.body).toEqual('');
    expect(response).toEqual(EXPECTED_SETTINGS_DISABLED_PLAN);
  });

  it('getDataClassificationSettings downgrade approval mode APPROVAL_NEEDED', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      queryParameters: { planId: TEST_PLAN_ID },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/governance/get-data-classification-settings/downgrade-approval-mode-approval-needed',
      },
    };
    const response = await client.governance.getDataClassificationSettings(options);
    const matchedRequest = await findWireMockRequest(requestId);

    expect(matchedRequest.body).toEqual('');
    expect(response).toEqual(EXPECTED_SETTINGS_APPROVAL_NEEDED);
  });

  it.each([AssetType.SHEET, AssetType.REPORT, AssetType.SIGHT])(
    'getDataClassificationSettings with assetType %s generated url is correct',
    async (assetType) => {
      const requestId = crypto.randomUUID();
      const options = {
        queryParameters: { assetType, assetId: TEST_ASSET_ID },
        customProperties: {
          'x-request-id': requestId,
          'x-test-name': '/governance/get-data-classification-settings/all-response-body-properties',
        },
      };
      await client.governance.getDataClassificationSettings(options);
      const matchedRequest = await findWireMockRequest(requestId);

      const parsedUrl = new URL(matchedRequest.absoluteUrl);
      expect(parsedUrl.pathname).toEqual('/2.0/governance/data-classification/settings');
      expect(matchedRequest.method).toEqual('GET');
      expect(Object.fromEntries(parsedUrl.searchParams)).toEqual({
        assetType,
        assetId: String(TEST_ASSET_ID),
      });
    }
  );

  it('getDataClassificationSettings with assetType and assetId all response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      queryParameters: { assetType: AssetType.SHEET, assetId: TEST_ASSET_ID },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/governance/get-data-classification-settings/all-response-body-properties',
      },
    };
    const response = await client.governance.getDataClassificationSettings(options);
    const matchedRequest = await findWireMockRequest(requestId);

    expect(matchedRequest.body).toEqual('');
    expect(response).toEqual(EXPECTED_SETTINGS_ALL_PROPERTIES);
  });

  it('getDataClassificationSettings error 403 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      queryParameters: { planId: TEST_PLAN_ID },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/errors/403-response',
      },
    };
    try {
      await client.governance.getDataClassificationSettings(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_403_STATUS_CODE);
      expect(error.message).toBe(ERROR_403_MESSAGE);
    }
  });
});
