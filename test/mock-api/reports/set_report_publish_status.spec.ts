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

describe('Reports - setReportPublishStatus endpoint tests', () => {
  const client = createClient();

  const expectedAllResponseProperties = {
    message: TEST_SUCCESS_MESSAGE,
    resultCode: TEST_SUCCESS_RESULT_CODE,
    result: {
      readOnlyFullAccessibleBy: 'ALL',
      readOnlyFullDefaultView: 'GRID',
      readOnlyFullEnabled: true,
      readOnlyFullUrl: 'https://publish.smartsheet.com/abc123readonly',
      readOnlyFullShowToolbar: true,
    },
  };

  const expectedRequiredResponseProperties = {
    message: TEST_SUCCESS_MESSAGE,
    resultCode: TEST_SUCCESS_RESULT_CODE,
    result: {
      readOnlyFullDefaultView: 'GRID',
      readOnlyFullEnabled: false,
    },
  };

  it('setReportPublishStatus generated url is correct', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      body: {
        readOnlyFullEnabled: true,
        readOnlyFullAccessibleBy: 'ALL',
      },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/reports/set-report-publish-status/all-response-body-properties',
      },
    };
    await client.reports.setReportPublishStatus(options);
    const matchedRequest = await findWireMockRequest(requestId);
    const parsedUrl = new URL(matchedRequest.absoluteUrl);
    expect(parsedUrl.pathname).toEqual(`/2.0/reports/${TEST_REPORT_ID}/publish`);
    expect(matchedRequest.method).toEqual('PUT');
    const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
    expect(queryParamsObject).toEqual({});
  });

  it('setReportPublishStatus all response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      body: {
        readOnlyFullEnabled: true,
        readOnlyFullAccessibleBy: 'ALL',
        readOnlyFullShowToolbar: true,
      },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/reports/set-report-publish-status/all-response-body-properties',
      },
    };
    const response = await client.reports.setReportPublishStatus(options);
    const matchedRequest = await findWireMockRequest(requestId);

    const body = JSON.parse(matchedRequest.body);
    expect(body).toEqual({
      readOnlyFullEnabled: true,
      readOnlyFullAccessibleBy: 'ALL',
      readOnlyFullShowToolbar: true,
    });
    expect(response).toEqual(expectedAllResponseProperties);
  });

  it('setReportPublishStatus required response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      body: {
        readOnlyFullEnabled: false,
      },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/reports/set-report-publish-status/required-response-body-properties',
      },
    };
    const response = await client.reports.setReportPublishStatus(options);
    const matchedRequest = await findWireMockRequest(requestId);

    const body = JSON.parse(matchedRequest.body);
    expect(body).toEqual({
      readOnlyFullEnabled: false,
    });
    expect(response).toEqual(expectedRequiredResponseProperties);
  });

  it('setReportPublishStatus error 500 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      body: {
        readOnlyFullEnabled: true,
      },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/errors/500-response',
      },
    };
    try {
      await client.reports.setReportPublishStatus(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
      expect(error.message).toBe(ERROR_500_MESSAGE);
    }
  });

  it('setReportPublishStatus error 400 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      body: {
        readOnlyFullEnabled: true,
      },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/errors/400-response',
      },
    };
    try {
      await client.reports.setReportPublishStatus(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
      expect(error.message).toBe(ERROR_400_MESSAGE);
    }
  });
});
