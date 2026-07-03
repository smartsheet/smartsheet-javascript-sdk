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
import { ReportColumnType } from '@smartsheet/reports/types';

describe('Reports - getReportColumn endpoint tests', () => {
  const client = createClient();

  const TEST_COLUMN_VIRTUAL_ID = 7001;

  const expectedAllResponseProperties = {
    virtualId: 7001,
    index: 0,
    title: 'Task Name',
    type: ReportColumnType.TEXT_NUMBER,
    primary: true,
    width: 150,
    hidden: false,
    validation: true,
    version: 0,
    autoNumberFormat: {
      fill: '0001',
      prefix: 'TASK-',
      startingNumber: 1,
      suffix: '',
    },
  };

  const expectedRequiredResponseProperties = {
    index: 0,
    title: 'Task Name',
    type: ReportColumnType.TEXT_NUMBER,
    primary: true,
  };

  it('getReportColumn generated url is correct', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      columnVirtualId: TEST_COLUMN_VIRTUAL_ID,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/reports/get-report-column/all-response-body-properties',
      },
    };
    await client.reports.getReportColumn(options);
    const matchedRequest = await findWireMockRequest(requestId);

    const parsedUrl = new URL(matchedRequest.absoluteUrl);
    expect(parsedUrl.pathname).toEqual(`/2.0/reports/${TEST_REPORT_ID}/columns/${TEST_COLUMN_VIRTUAL_ID}`);
    expect(matchedRequest.method).toEqual('GET');
    const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
    expect(queryParamsObject).toEqual({});
  });

  it('getReportColumn with level generated url is correct', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      columnVirtualId: TEST_COLUMN_VIRTUAL_ID,
      queryParameters: {
        level: 3
      },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/reports/get-report-column/all-response-body-properties',
      },
    };
    await client.reports.getReportColumn(options);
    const matchedRequest = await findWireMockRequest(requestId);

    const parsedUrl = new URL(matchedRequest.absoluteUrl);
    expect(parsedUrl.pathname).toEqual(`/2.0/reports/${TEST_REPORT_ID}/columns/${TEST_COLUMN_VIRTUAL_ID}`);
    expect(matchedRequest.method).toEqual('GET');
    const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
    expect(queryParamsObject).toEqual({
      level: '3'
    });
  });

  it('getReportColumn all response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      columnVirtualId: TEST_COLUMN_VIRTUAL_ID,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/reports/get-report-column/all-response-body-properties',
      },
    };
    const response = await client.reports.getReportColumn(options);
    const matchedRequest = await findWireMockRequest(requestId);

    expect(response).toEqual(expectedAllResponseProperties);
    expect(matchedRequest.body).toEqual('');
  });

  it('getReportColumn required response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      columnVirtualId: TEST_COLUMN_VIRTUAL_ID,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/reports/get-report-column/required-response-body-properties',
      },
    };
    const response = await client.reports.getReportColumn(options);
    const matchedRequest = await findWireMockRequest(requestId);

    expect(response).toEqual(expectedRequiredResponseProperties);
    expect(matchedRequest.body).toEqual('');
  });

  it('getReportColumn error 400 response', async () => {
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
      await client.reports.getReportColumn(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
      expect(error.message).toBe(ERROR_400_MESSAGE);
    }
  });

  it('getReportColumn error 500 response', async () => {
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
      await client.reports.getReportColumn(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
      expect(error.message).toBe(ERROR_500_MESSAGE);
    }
  });
});
