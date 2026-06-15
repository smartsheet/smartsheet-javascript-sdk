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
import { ReportColumnType, SystemColumnType } from '@smartsheet/reports/types';

describe('Reports - listReportColumns endpoint tests', () => {
  const client = createClient();

  const TEST_LAST_KEY = 'someLastKey';
  const TEST_MAX_ITEMS = 50;

  const expectedAllResponseProperties = {
    data: [
      {
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
      },
      {
        virtualId: 7002,
        index: 1,
        title: 'Status',
        type: ReportColumnType.PICKLIST,
        width: 120,
        hidden: false,
        validation: false,
        version: 0,
      },
      {
        virtualId: 7003,
        index: 2,
        title: 'Created By',
        type: ReportColumnType.CONTACT_LIST,
        systemColumnType: SystemColumnType.CREATED_BY,
        width: 150,
        hidden: false,
        validation: false,
        version: 1,
      },
      {
        virtualId: 7004,
        index: 3,
        title: 'Sheet Name',
        type: ReportColumnType.TEXT_NUMBER,
        sheetNameColumn: true,
        width: 200,
        hidden: false,
        validation: false,
        version: 0,
      },
    ],
    lastKey: null,
  };

  const expectedRequiredResponseProperties = {
    data: [
      {
        index: 0,
        title: 'Task Name',
        type: ReportColumnType.TEXT_NUMBER,
        primary: true,
      },
      {
        index: 1,
        type: ReportColumnType.DATETIME,
        systemColumnType: SystemColumnType.CREATED_DATE,
      },
    ],
  };

  it('listReportColumns generated url is correct', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      queryParameters: {
        lastKey: TEST_LAST_KEY,
        maxItems: TEST_MAX_ITEMS,
      },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/reports/list-report-columns/all-response-body-properties',
      },
    };
    await client.reports.listReportColumns(options);
    const matchedRequest = await findWireMockRequest(requestId);

    const parsedUrl = new URL(matchedRequest.absoluteUrl);
    expect(parsedUrl.pathname).toEqual(`/2.0/reports/${TEST_REPORT_ID}/columns`);
    expect(matchedRequest.method).toEqual('GET');
    const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
    expect(queryParamsObject).toEqual({
      lastKey: TEST_LAST_KEY,
      maxItems: TEST_MAX_ITEMS.toString(),
    });
  });

  it('listReportColumns all response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/reports/list-report-columns/all-response-body-properties',
      },
    };
    const response = await client.reports.listReportColumns(options);
    const matchedRequest = await findWireMockRequest(requestId);

    expect(response).toEqual(expectedAllResponseProperties);
    expect(matchedRequest.body).toEqual('');
  });

  it('listReportColumns required response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/reports/list-report-columns/required-response-body-properties',
      },
    };
    const response = await client.reports.listReportColumns(options);
    const matchedRequest = await findWireMockRequest(requestId);

    expect(response).toEqual(expectedRequiredResponseProperties);
    expect(matchedRequest.body).toEqual('');
  });

  it('listReportColumns error 500 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/errors/500-response',
      },
    };
    try {
      await client.reports.listReportColumns(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
      expect(error.message).toBe(ERROR_500_MESSAGE);
    }
  });

  it('listReportColumns error 400 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/errors/400-response',
      },
    };
    try {
      await client.reports.listReportColumns(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
      expect(error.message).toBe(ERROR_400_MESSAGE);
    }
  });
});
