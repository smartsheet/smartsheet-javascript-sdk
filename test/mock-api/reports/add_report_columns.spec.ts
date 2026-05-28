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
import { ReportColumnType, SystemColumnType } from '@smartsheet/reports/types';

describe('Reports - addReportColumns endpoint tests', () => {
  const client = createClient();

  const testRequestBody = [
    {
      index: 4,
      title: 'Status Column',
      type: ReportColumnType.PICKLIST,
      hidden: false,
      width: 150,
    },
    {
      index: 4,
      title: 'Task Name',
      type: ReportColumnType.TEXT_NUMBER,
      primary: true,
      hidden: false,
      width: 200,
    },
    {
      index: 4,
      title: 'Created By',
      type: ReportColumnType.CONTACT_LIST,
      systemColumnType: SystemColumnType.CREATED_BY,
      hidden: false,
      width: 120,
    },
    {
      index: 4,
      title: 'Modified Date',
      type: ReportColumnType.DATETIME,
      systemColumnType: SystemColumnType.MODIFIED_DATE,
      hidden: true,
      width: 100,
    },
    {
      index: 4,
      title: 'Sheet Name',
      type: ReportColumnType.TEXT_NUMBER,
      sheetNameColumn: true,
      hidden: false,
      width: 180,
    },
  ];

  const expectedAllResponseProperties = {
    message: TEST_SUCCESS_MESSAGE,
    resultCode: TEST_SUCCESS_RESULT_CODE,
    result: [
      {
        virtualId: 12345,
        index: 4,
        title: 'Item selected',
        type: ReportColumnType.CHECKBOX,
        hidden: false,
        validation: false,
        version: 0,
        width: 150,
      },
      {
        virtualId: 12346,
        index: 5,
        title: 'Sheet name',
        type: ReportColumnType.TEXT_NUMBER,
        sheetNameColumn: true,
        hidden: false,
        validation: false,
        version: 0,
        width: 150,
      },
      {
        virtualId: 12347,
        index: 6,
        title: 'Created By',
        type: ReportColumnType.CONTACT_LIST,
        systemColumnType: SystemColumnType.CREATED_BY,
        hidden: false,
        validation: false,
        version: 0,
        width: 150,
      },
      {
        virtualId: 12348,
        index: 7,
        title: 'Primary',
        type: ReportColumnType.TEXT_NUMBER,
        primary: true,
        hidden: false,
        validation: false,
        version: 0,
        width: 200,
      },
      {
        virtualId: 12349,
        index: 8,
        title: 'Row Number',
        type: ReportColumnType.TEXT_NUMBER,
        systemColumnType: SystemColumnType.AUTO_NUMBER,
        hidden: false,
        validation: false,
        version: 0,
        width: 100,
        autoNumberFormat: {
          fill: '000',
          prefix: 'TASK-',
          startingNumber: 1,
          suffix: '',
        },
      },
    ],
  };

  const expectedRequiredResponseProperties = {
    message: TEST_SUCCESS_MESSAGE,
    resultCode: TEST_SUCCESS_RESULT_CODE,
    result: [
      {
        virtualId: 12345,
        index: 4,
        title: 'Item selected',
        type: ReportColumnType.CHECKBOX,
        version: 0,
      },
      {
        virtualId: 12346,
        index: 5,
        title: 'Sheet name',
        type: ReportColumnType.TEXT_NUMBER,
        sheetNameColumn: true,
        version: 0,
      },
      {
        virtualId: 12347,
        index: 6,
        title: 'Created By',
        type: ReportColumnType.CONTACT_LIST,
        systemColumnType: SystemColumnType.CREATED_BY,
        version: 0,
      },
      {
        virtualId: 12348,
        index: 7,
        title: 'Primary',
        type: ReportColumnType.TEXT_NUMBER,
        primary: true,
        version: 0,
      },
      {
        virtualId: 12349,
        index: 8,
        title: 'Row Number',
        type: ReportColumnType.TEXT_NUMBER,
        systemColumnType: SystemColumnType.AUTO_NUMBER,
        version: 0,
        autoNumberFormat: {
          fill: '000',
          prefix: 'TASK-',
          startingNumber: 1,
          suffix: '',
        },
      },
    ],
  };

  it('addReportColumns generated url is correct', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      body: testRequestBody,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/reports/add-report-columns/all-response-body-properties',
      },
    };
    await client.reports.addReportColumns(options);
    const matchedRequest = await findWireMockRequest(requestId);

    const parsedUrl = new URL(matchedRequest.absoluteUrl);
    expect(parsedUrl.pathname).toEqual(`/2.0/reports/${TEST_REPORT_ID}/columns`);
    expect(matchedRequest.method).toEqual('POST');
    const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
    expect(queryParamsObject).toEqual({});
  });

  it('addReportColumns all response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      body: testRequestBody,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/reports/add-report-columns/all-response-body-properties',
      },
    };
    const response = await client.reports.addReportColumns(options);
    const matchedRequest = await findWireMockRequest(requestId);

    expect(response).toEqual(expectedAllResponseProperties);

    const body = JSON.parse(matchedRequest.body);
    expect(body).toEqual(testRequestBody);
  });

  it('addReportColumns required response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      body: testRequestBody,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/reports/add-report-columns/required-response-body-properties',
      },
    };
    const response = await client.reports.addReportColumns(options);
    const matchedRequest = await findWireMockRequest(requestId);

    expect(response).toEqual(expectedRequiredResponseProperties);

    const body = JSON.parse(matchedRequest.body);
    expect(body).toEqual(testRequestBody);
  });

  it('addReportColumns error 500 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      body: testRequestBody,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/errors/500-response',
      },
    };
    try {
      await client.reports.addReportColumns(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
      expect(error.message).toBe(ERROR_500_MESSAGE);
    }
  });

  it('addReportColumns error 400 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      body: testRequestBody,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/errors/400-response',
      },
    };
    try {
      await client.reports.addReportColumns(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
      expect(error.message).toBe(ERROR_400_MESSAGE);
    }
  });
});
