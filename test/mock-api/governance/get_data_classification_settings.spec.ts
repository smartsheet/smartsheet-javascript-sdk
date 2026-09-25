import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import { AssetType } from '@smartsheet/sharing';
import {
  TEST_PLAN_ID,
  TEST_ASSET_ID,
  EXPECTED_SETTINGS_ALL_PROPERTIES,
  EXPECTED_SETTINGS_REQUIRED_PROPERTIES,
  EXPECTED_SETTINGS_DISABLED_PLAN,
  EXPECTED_SETTINGS_APPROVAL_NEEDED,
  ERROR_400_STATUS_CODE,
  ERROR_400_MESSAGE,
  ERROR_403_STATUS_CODE,
  ERROR_403_MESSAGE,
  ERROR_500_STATUS_CODE,
  ERROR_500_MESSAGE,
} from './common_test_constants';

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
