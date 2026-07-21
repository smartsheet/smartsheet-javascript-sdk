import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import { AccessLevel, AssetType } from '@smartsheet/sharing';
import {
  TEST_SHARE_ID,
  TEST_ASSET_ID,
  EXPECTED_SHARE_ALL_PROPERTIES,
  EXPECTED_SHARE_REQUIRED_PROPERTIES,
  EXPECTED_SHEET_ASSET_QUERY,
  ERROR_500_STATUS_CODE,
  ERROR_500_MESSAGE,
  ERROR_400_STATUS_CODE,
  ERROR_400_MESSAGE,
} from './common_test_constants';

describe('Sharing - updateAssetShare endpoint tests', () => {
  const client = createClient();

  const testUpdateRequestBody = {
    accessLevel: AccessLevel.EDITOR,
  };

  it('updateAssetShare generated url is correct', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      shareId: TEST_SHARE_ID,
      body: testUpdateRequestBody,
      queryParameters: {
        assetType: AssetType.SHEET,
        assetId: TEST_ASSET_ID,
      },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/sharing/update-asset-share/all-response-body-properties',
      },
    };
    await client.sharing.updateAssetShare(options);
    const matchedRequest = await findWireMockRequest(requestId);

    const parsedUrl = new URL(matchedRequest.absoluteUrl);
    expect(parsedUrl.pathname).toEqual(`/2.0/shares/${TEST_SHARE_ID}`);
    expect(matchedRequest.method).toEqual('PATCH');

    const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
    expect(queryParamsObject).toEqual(EXPECTED_SHEET_ASSET_QUERY);
  });

  it('updateAssetShare all response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      shareId: TEST_SHARE_ID,
      body: testUpdateRequestBody,
      queryParameters: {
        assetType: AssetType.SHEET,
        assetId: TEST_ASSET_ID,
      },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/sharing/update-asset-share/all-response-body-properties',
      },
    };
    const response = await client.sharing.updateAssetShare(options);
    const matchedRequest = await findWireMockRequest(requestId);

    const body = JSON.parse(matchedRequest.body);
    expect(body).toEqual(testUpdateRequestBody);
    expect(response).toEqual(EXPECTED_SHARE_ALL_PROPERTIES);
  });

  it('updateAssetShare required response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      shareId: TEST_SHARE_ID,
      body: testUpdateRequestBody,
      queryParameters: {
        assetType: AssetType.SHEET,
        assetId: TEST_ASSET_ID,
      },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/sharing/update-asset-share/required-response-body-properties',
      },
    };
    const response = await client.sharing.updateAssetShare(options);
    const matchedRequest = await findWireMockRequest(requestId);

    const body = JSON.parse(matchedRequest.body);
    expect(body).toEqual(testUpdateRequestBody);
    expect(response).toEqual(EXPECTED_SHARE_REQUIRED_PROPERTIES);
  });

  it('updateAssetShare error 400 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      shareId: TEST_SHARE_ID,
      body: testUpdateRequestBody,
      queryParameters: {
        assetType: AssetType.SHEET,
        assetId: TEST_ASSET_ID,
      },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/errors/400-response',
      },
    };
    try {
      await client.sharing.updateAssetShare(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
      expect(error.message).toBe(ERROR_400_MESSAGE);
    }
  });

  it('updateAssetShare error 500 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      shareId: TEST_SHARE_ID,
      body: testUpdateRequestBody,
      queryParameters: {
        assetType: AssetType.SHEET,
        assetId: TEST_ASSET_ID,
      },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/errors/500-response',
      },
    };
    try {
      await client.sharing.updateAssetShare(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
      expect(error.message).toBe(ERROR_500_MESSAGE);
    }
  });
});
