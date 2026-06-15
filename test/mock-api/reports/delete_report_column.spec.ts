import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
  TEST_REPORT_ID,
  TEST_SUCCESS_MESSAGE,
  TEST_SUCCESS_RESULT_CODE,
  ERROR_500_STATUS_CODE,
  ERROR_500_MESSAGE,
  ERROR_400_STATUS_CODE,
  ERROR_400_MESSAGE,
} from './common_test_constants';

describe('Reports - deleteReportColumn endpoint tests', () => {
  const client = createClient();

  const TEST_COLUMN_VIRTUAL_ID = 7001;

  const expectedAllResponseProperties = {
    message: TEST_SUCCESS_MESSAGE,
    resultCode: TEST_SUCCESS_RESULT_CODE,
  };

  it('deleteReportColumn generated url is correct', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      columnVirtualId: TEST_COLUMN_VIRTUAL_ID,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/reports/delete-report-column/all-response-body-properties',
      },
    };
    await client.reports.deleteReportColumn(options);
    const matchedRequest = await findWireMockRequest(requestId);

    const parsedUrl = new URL(matchedRequest.absoluteUrl);
    expect(parsedUrl.pathname).toEqual(`/2.0/reports/${TEST_REPORT_ID}/columns/${TEST_COLUMN_VIRTUAL_ID}`);
    expect(matchedRequest.method).toEqual('DELETE');
    const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
    expect(queryParamsObject).toEqual({});
  });

  it('deleteReportColumn all response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      columnVirtualId: TEST_COLUMN_VIRTUAL_ID,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/reports/delete-report-column/all-response-body-properties',
      },
    };
    const response = await client.reports.deleteReportColumn(options);
    const matchedRequest = await findWireMockRequest(requestId);

    expect(response).toEqual(expectedAllResponseProperties);
    expect(matchedRequest.body).toEqual('');
  });

  it('deleteReportColumn error 500 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      columnVirtualId: TEST_COLUMN_VIRTUAL_ID,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/errors/500-response',
      },
    };
    try {
      await client.reports.deleteReportColumn(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
      expect(error.message).toBe(ERROR_500_MESSAGE);
    }
  });

  it('deleteReportColumn error 400 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      columnVirtualId: TEST_COLUMN_VIRTUAL_ID,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/errors/400-response',
      },
    };
    try {
      await client.reports.deleteReportColumn(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
      expect(error.message).toBe(ERROR_400_MESSAGE);
    }
  });
});
