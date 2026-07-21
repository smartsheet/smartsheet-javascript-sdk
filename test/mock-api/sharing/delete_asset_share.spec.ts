import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import { AssetType } from '@smartsheet/sharing';
import {
  TEST_SHARE_ID,
  TEST_ASSET_ID,
  EXPECTED_SHEET_ASSET_QUERY,
  TEST_SUCCESS_MESSAGE,
  TEST_SUCCESS_RESULT_CODE,
  ERROR_500_STATUS_CODE,
  ERROR_500_MESSAGE,
  ERROR_400_STATUS_CODE,
  ERROR_400_MESSAGE,
} from './common_test_constants';

describe('Sharing - deleteAssetShare endpoint tests', () => {
  const client = createClient();

  const expectedAllResponseProperties = {
    message: TEST_SUCCESS_MESSAGE,
    resultCode: TEST_SUCCESS_RESULT_CODE,
  };

  it('deleteAssetShare generated url is correct', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      shareId: TEST_SHARE_ID,
      queryParameters: {
        assetType: AssetType.SHEET,
        assetId: TEST_ASSET_ID,
      },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/sharing/delete-asset-share/all-response-body-properties',
      },
    };
    await client.sharing.deleteAssetShare(options);
    const matchedRequest = await findWireMockRequest(requestId);

    const parsedUrl = new URL(matchedRequest.absoluteUrl);
    expect(parsedUrl.pathname).toEqual(`/2.0/shares/${TEST_SHARE_ID}`);
    expect(matchedRequest.method).toEqual('DELETE');

    expect(parsedUrl.searchParams).toEqual(EXPECTED_SHEET_ASSET_QUERY);
  });

  it('deleteAssetShare all response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      shareId: TEST_SHARE_ID,
      queryParameters: {
        assetType: AssetType.SHEET,
        assetId: TEST_ASSET_ID,
      },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/sharing/delete-asset-share/all-response-body-properties',
      },
    };
    const response = await client.sharing.deleteAssetShare(options);
    const matchedRequest = await findWireMockRequest(requestId);

    expect(matchedRequest.body).toEqual('');
    expect(response).toEqual(expectedAllResponseProperties);
  });

  it('deleteAssetShare error 400 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      shareId: TEST_SHARE_ID,
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
      await client.sharing.deleteAssetShare(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
      expect(error.message).toBe(ERROR_400_MESSAGE);
    }
  });

  it('deleteAssetShare error 500 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      shareId: TEST_SHARE_ID,
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
      await client.sharing.deleteAssetShare(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
      expect(error.message).toBe(ERROR_500_MESSAGE);
    }
  });
});
