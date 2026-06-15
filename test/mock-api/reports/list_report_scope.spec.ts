import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
  TEST_REPORT_ID,
  ERROR_500_STATUS_CODE,
  ERROR_500_MESSAGE,
  ERROR_400_STATUS_CODE,
  ERROR_400_MESSAGE,
} from './common_test_constants';
import { ReportAssetType } from '@smartsheet/reports/types';

describe('Reports - listReportScope endpoint tests', () => {
  const client = createClient();

  const TEST_LAST_KEY = 'someLastKey';
  const TEST_MAX_ITEMS = 50;

  const expectedAllResponseProperties = {
    data: [
      { assetType: ReportAssetType.SHEET, assetId: 2331373580117892 },
      { assetType: ReportAssetType.WORKSPACE, assetId: Number('7879278542455688') },
      { assetType: ReportAssetType.SHEET, assetId: 1234567890123456 },
    ],
    lastKey: null,
  };

  const expectedRequiredResponseProperties = {
    data: [
      { assetType: ReportAssetType.SHEET, assetId: 2331373580117892 },
    ],
  };

  it('listReportScope generated url is correct', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      queryParameters: {
        lastKey: TEST_LAST_KEY,
        maxItems: TEST_MAX_ITEMS,
      },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/reports/list-report-scope/all-response-body-properties',
      },
    };
    await client.reports.listReportScope(options);
    const matchedRequest = await findWireMockRequest(requestId);

    const parsedUrl = new URL(matchedRequest.absoluteUrl);
    expect(parsedUrl.pathname).toEqual(`/2.0/reports/${TEST_REPORT_ID}/scope`);
    expect(matchedRequest.method).toEqual('GET');
    const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
    expect(queryParamsObject).toEqual({
      lastKey: TEST_LAST_KEY,
      maxItems: TEST_MAX_ITEMS.toString(),
    });
  });

  it('listReportScope all response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/reports/list-report-scope/all-response-body-properties',
      },
    };
    const response = await client.reports.listReportScope(options);
    const matchedRequest = await findWireMockRequest(requestId);

    expect(response).toEqual(expectedAllResponseProperties);
    expect(matchedRequest.body).toEqual('');
  });

  it('listReportScope required response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/reports/list-report-scope/required-response-body-properties',
      },
    };
    const response = await client.reports.listReportScope(options);
    const matchedRequest = await findWireMockRequest(requestId);

    expect(response).toEqual(expectedRequiredResponseProperties);
    expect(matchedRequest.body).toEqual('');
  });

  it('listReportScope error 500 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/errors/500-response',
      },
    };
    try {
      await client.reports.listReportScope(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
      expect(error.message).toBe(ERROR_500_MESSAGE);
    }
  });

  it('listReportScope error 400 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/errors/400-response',
      },
    };
    try {
      await client.reports.listReportScope(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
      expect(error.message).toBe(ERROR_400_MESSAGE);
    }
  });
});
