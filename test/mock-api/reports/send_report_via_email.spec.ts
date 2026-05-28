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

describe('Reports - sendReportViaEmail endpoint tests', () => {
  const client = createClient();

  const testEmailBody = {
    sendTo: [{ email: 'john.doe@smartsheet.com' }],
    subject: 'Check this report out!',
    message: 'Here is the report I mentioned',
    ccMe: false,
    format: 'PDF',
    formatDetails: { paperSize: 'A4' },
  };

  const expectedAllResponseProperties = {
    message: TEST_SUCCESS_MESSAGE,
    resultCode: TEST_SUCCESS_RESULT_CODE,
    version: 1,
  };

  it('sendReportViaEmail generated url is correct', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      body: testEmailBody,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/reports/send-report-via-email/success-response',
      },
    };
    await client.reports.sendReportViaEmail(options);
    const matchedRequest = await findWireMockRequest(requestId);
    const parsedUrl = new URL(matchedRequest.absoluteUrl);
    expect(parsedUrl.pathname).toEqual(`/2.0/reports/${TEST_REPORT_ID}/emails`);
    expect(matchedRequest.method).toEqual('POST');
    const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
    expect(queryParamsObject).toEqual({});
  });

  it('sendReportViaEmail all response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      body: testEmailBody,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/reports/send-report-via-email/success-response',
      },
    };
    const response = await client.reports.sendReportViaEmail(options);
    const matchedRequest = await findWireMockRequest(requestId);

    expect(response).toEqual(expectedAllResponseProperties);

    const body = JSON.parse(matchedRequest.body);
    expect(body).toEqual(testEmailBody);
  });

  it('sendReportViaEmail error 500 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      body: testEmailBody,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/errors/500-response',
      },
    };
    try {
      await client.reports.sendReportViaEmail(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
      expect(error.message).toBe(ERROR_500_MESSAGE);
    }
  });

  it('sendReportViaEmail error 400 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      body: testEmailBody,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/errors/400-response',
      },
    };
    try {
      await client.reports.sendReportViaEmail(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
      expect(error.message).toBe(ERROR_400_MESSAGE);
    }
  });
});
