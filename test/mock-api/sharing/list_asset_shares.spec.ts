import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import { AssetType } from '@smartsheet/sharing';
import {
  TEST_ASSET_ID,
  TEST_MAX_ITEMS,
  TEST_SHARING_INCLUDE,
  TEST_LAST_KEY,
  EXPECTED_SHARE_ALL_PROPERTIES,
  EXPECTED_SHARE_REQUIRED_PROPERTIES,
  ERROR_500_STATUS_CODE,
  ERROR_500_MESSAGE,
  ERROR_400_STATUS_CODE,
  ERROR_400_MESSAGE,
} from './common_test_constants';

describe('Sharing - listAssetShares endpoint tests', () => {
  const client = createClient();

  const expectedAllResponseProperties = {
    lastKey: TEST_LAST_KEY,
    items: [EXPECTED_SHARE_ALL_PROPERTIES],
  };

  const expectedRequiredResponseProperties = {
    items: [EXPECTED_SHARE_REQUIRED_PROPERTIES],
  };

  it('listAssetShares generated url is correct', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      queryParameters: {
        assetType: AssetType.SHEET,
        assetId: TEST_ASSET_ID,
        maxItems: TEST_MAX_ITEMS,
        sharingInclude: TEST_SHARING_INCLUDE,
      },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/sharing/list-asset-shares/all-response-body-properties',
      },
    };
    await client.sharing.listAssetShares(options);
    const matchedRequest = await findWireMockRequest(requestId);

    const parsedUrl = new URL(matchedRequest.absoluteUrl);
    expect(parsedUrl.pathname).toEqual('/2.0/shares');
    expect(matchedRequest.method).toEqual('GET');

    const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
    expect(queryParamsObject).toEqual({
      assetType: AssetType.SHEET,
      assetId: TEST_ASSET_ID.toString(),
      maxItems: TEST_MAX_ITEMS.toString(),
      sharingInclude: TEST_SHARING_INCLUDE,
    });
  });

  it('listAssetShares all response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      queryParameters: {
        assetType: AssetType.SHEET,
        assetId: TEST_ASSET_ID,
      },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/sharing/list-asset-shares/all-response-body-properties',
      },
    };
    const response = await client.sharing.listAssetShares(options);
    const matchedRequest = await findWireMockRequest(requestId);

    expect(matchedRequest.body).toEqual('');
    expect(response).toEqual(expectedAllResponseProperties);
  });

  it('listAssetShares required response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      queryParameters: {
        assetType: AssetType.SHEET,
        assetId: TEST_ASSET_ID,
      },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/sharing/list-asset-shares/required-response-body-properties',
      },
    };
    const response = await client.sharing.listAssetShares(options);
    const matchedRequest = await findWireMockRequest(requestId);

    expect(matchedRequest.body).toEqual('');
    expect(response).toEqual(expectedRequiredResponseProperties);
  });

  it('listAssetShares error 400 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
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
      await client.sharing.listAssetShares(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
      expect(error.message).toBe(ERROR_400_MESSAGE);
    }
  });

  it('listAssetShares error 500 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
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
      await client.sharing.listAssetShares(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
      expect(error.message).toBe(ERROR_500_MESSAGE);
    }
  });
});
