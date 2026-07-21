import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import { AccessLevel, AssetType } from '@smartsheet/sharing';
import {
  TEST_ASSET_ID,
  TEST_SHARE_EMAIL,
  TEST_SHARE_GROUP_ID,
  EXPECTED_SHARE_ALL_PROPERTIES,
  EXPECTED_SHARE_REQUIRED_PROPERTIES,
  TEST_SUCCESS_MESSAGE,
  TEST_SUCCESS_RESULT_CODE,
  ERROR_500_STATUS_CODE,
  ERROR_500_MESSAGE,
  ERROR_400_STATUS_CODE,
  ERROR_400_MESSAGE,
} from './common_test_constants';

describe('Sharing - shareAsset endpoint tests', () => {
  const client = createClient();

  const testShareRequestBody = [
    {
      email: TEST_SHARE_EMAIL,
      accessLevel: AccessLevel.ADMIN,
      subject: 'Shared with you',
      message: 'Please review this asset',
      ccMe: true,
    },
    {
      groupId: Number(TEST_SHARE_GROUP_ID),
      accessLevel: AccessLevel.VIEWER,
    },
  ];

  const expectedAllResponseProperties = {
    message: TEST_SUCCESS_MESSAGE,
    resultCode: TEST_SUCCESS_RESULT_CODE,
    result: [EXPECTED_SHARE_ALL_PROPERTIES],
  };

  const expectedRequiredResponseProperties = {
    message: TEST_SUCCESS_MESSAGE,
    resultCode: TEST_SUCCESS_RESULT_CODE,
    result: [EXPECTED_SHARE_REQUIRED_PROPERTIES],
  };

  it('shareAsset generated url is correct', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      body: testShareRequestBody,
      queryParameters: {
        assetType: AssetType.SHEET,
        assetId: TEST_ASSET_ID,
        sendEmail: true,
      },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/sharing/share-asset/all-response-body-properties',
      },
    };
    await client.sharing.shareAsset(options);
    const matchedRequest = await findWireMockRequest(requestId);

    const parsedUrl = new URL(matchedRequest.absoluteUrl);
    expect(parsedUrl.pathname).toEqual('/2.0/shares');
    expect(matchedRequest.method).toEqual('POST');

    const expectedQueryParams = new URLSearchParams({
      assetType: AssetType.SHEET,
      assetId: TEST_ASSET_ID.toString(),
      sendEmail: 'true',
    });
    expect(parsedUrl.searchParams).toEqual(expectedQueryParams);
  });

  it('shareAsset all response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      body: testShareRequestBody,
      queryParameters: {
        assetType: AssetType.SHEET,
        assetId: TEST_ASSET_ID,
      },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/sharing/share-asset/all-response-body-properties',
      },
    };
    const response = await client.sharing.shareAsset(options);
    const matchedRequest = await findWireMockRequest(requestId);

    const body = JSON.parse(matchedRequest.body);
    expect(body).toEqual(testShareRequestBody);
    expect(response).toEqual(expectedAllResponseProperties);
  });

  it('shareAsset required response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      body: testShareRequestBody,
      queryParameters: {
        assetType: AssetType.SHEET,
        assetId: TEST_ASSET_ID,
      },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/sharing/share-asset/required-response-body-properties',
      },
    };
    const response = await client.sharing.shareAsset(options);
    const matchedRequest = await findWireMockRequest(requestId);

    const body = JSON.parse(matchedRequest.body);
    expect(body).toEqual(testShareRequestBody);
    expect(response).toEqual(expectedRequiredResponseProperties);
  });

  it('shareAsset error 400 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      body: testShareRequestBody,
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
      await client.sharing.shareAsset(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
      expect(error.message).toBe(ERROR_400_MESSAGE);
    }
  });

  it('shareAsset error 500 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      body: testShareRequestBody,
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
      await client.sharing.shareAsset(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
      expect(error.message).toBe(ERROR_500_MESSAGE);
    }
  });
});
