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
import { ReportColumnType } from '@smartsheet/reports/types';

describe('Reports - updateReportColumn endpoint tests', () => {
  const client = createClient();

  const TEST_COLUMN_VIRTUAL_ID = 7001;

  const testRequestBody = {
    index: 2,
    title: 'Updated Task Name',
    width: 200,
    hidden: false,
  };

  const expectedAllResponseProperties = {
    message: TEST_SUCCESS_MESSAGE,
    resultCode: TEST_SUCCESS_RESULT_CODE,
    result: {
      virtualId: 7001,
      index: 2,
      title: 'Updated Task Name',
      type: ReportColumnType.TEXT_NUMBER,
      primary: true,
      width: 200,
      hidden: false,
      validation: true,
      version: 0,
      autoNumberFormat: {
        fill: '0001',
        prefix: 'TASK-',
        startingNumber: 1,
        suffix: '',
      },
    },
  };

  const expectedRequiredResponseProperties = {
    message: TEST_SUCCESS_MESSAGE,
    resultCode: TEST_SUCCESS_RESULT_CODE,
    result: {
      index: 1,
      title: 'Updated Column',
      type: ReportColumnType.TEXT_NUMBER,
      primary: true,
    },
  };

  it('updateReportColumn generated url is correct', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      columnVirtualId: TEST_COLUMN_VIRTUAL_ID,
      body: testRequestBody,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/reports/update-report-column/all-response-body-properties',
      },
    };
    await client.reports.updateReportColumn(options);
    const matchedRequest = await findWireMockRequest(requestId);

    const parsedUrl = new URL(matchedRequest.absoluteUrl);
    expect(parsedUrl.pathname).toEqual(`/2.0/reports/${TEST_REPORT_ID}/columns/${TEST_COLUMN_VIRTUAL_ID}`);
    expect(matchedRequest.method).toEqual('PUT');
    const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
    expect(queryParamsObject).toEqual({});
  });

  it('updateReportColumn all response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      columnVirtualId: TEST_COLUMN_VIRTUAL_ID,
      body: testRequestBody,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/reports/update-report-column/all-response-body-properties',
      },
    };
    const response = await client.reports.updateReportColumn(options);
    const matchedRequest = await findWireMockRequest(requestId);

    expect(response).toEqual(expectedAllResponseProperties);

    const body = JSON.parse(matchedRequest.body);
    expect(body).toEqual(testRequestBody);
  });

  it('updateReportColumn required response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      columnVirtualId: TEST_COLUMN_VIRTUAL_ID,
      body: testRequestBody,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/reports/update-report-column/required-response-body-properties',
      },
    };
    const response = await client.reports.updateReportColumn(options);
    const matchedRequest = await findWireMockRequest(requestId);

    expect(response).toEqual(expectedRequiredResponseProperties);

    const body = JSON.parse(matchedRequest.body);
    expect(body).toEqual(testRequestBody);
  });

  it('updateReportColumn error 500 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      columnVirtualId: TEST_COLUMN_VIRTUAL_ID,
      body: testRequestBody,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/errors/500-response',
      },
    };
    try {
      await client.reports.updateReportColumn(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
      expect(error.message).toBe(ERROR_500_MESSAGE);
    }
  });

  it('updateReportColumn error 400 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      columnVirtualId: TEST_COLUMN_VIRTUAL_ID,
      body: testRequestBody,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/errors/400-response',
      },
    };
    try {
      await client.reports.updateReportColumn(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
      expect(error.message).toBe(ERROR_400_MESSAGE);
    }
  });
});
