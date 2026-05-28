import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
  TEST_SUCCESS_MESSAGE,
  TEST_SUCCESS_RESULT_CODE,
  ERROR_500_STATUS_CODE,
  ERROR_500_MESSAGE,
  ERROR_400_STATUS_CODE,
  ERROR_400_MESSAGE,
} from './common_test_constants';
import { ReportColumnType, SystemColumnType, ReportAssetType, ReportDestinationType } from '@smartsheet/reports/types';

describe('Reports - createReport endpoint tests', () => {
  const client = createClient();

  const testCreateReportRequired = {
    name: 'Q2 Earnings Report',
    destination: {
      destinationType: ReportDestinationType.FOLDER,
      destinationId: 1234567890,
    },
    columns: [
      {
        title: 'Primary',
        type: ReportColumnType.TEXT_NUMBER,
        primary: true,
        index: 0,
      },
    ],
    scope: [
      {
        assetType: ReportAssetType.SHEET,
        assetId: 9876543210,
      },
    ],
  };

  const testCreateReportAllProperties = {
    name: 'Q2 Project Status',
    destination: {
      destinationType: ReportDestinationType.WORKSPACE,
      destinationId: 5555555555,
    },
    columns: [
      {
        title: 'Primary',
        type: ReportColumnType.TEXT_NUMBER,
        primary: true,
        index: 0,
      },
      {
        title: 'Status',
        type: ReportColumnType.PICKLIST,
        index: 1,
        hidden: false,
        width: 150,
      },
      {
        title: 'Created By',
        type: ReportColumnType.CONTACT_LIST,
        systemColumnType: SystemColumnType.CREATED_BY,
        index: 2,
      },
    ],
    scope: [
      {
        assetType: ReportAssetType.SHEET,
        assetId: 9876543210,
      },
      {
        assetType: ReportAssetType.WORKSPACE,
        assetId: 1122334455,
      },
    ],
    reportDefinition: {
      filters: {
        operator: 'AND',
        criteria: [
          {
            column: {
              title: 'Status',
              type: ReportColumnType.PICKLIST,
            },
            operator: 'EQUAL',
            values: ['In Progress'],
          },
        ],
      },
      sortingCriteria: [
        {
          column: {
            title: 'Primary',
            type: ReportColumnType.TEXT_NUMBER,
            primary: true,
          },
          sortingDirection: 'ASCENDING',
        },
      ],
    },
    isSummaryReport: false,
  };

  const expectedRequiredResponseProperties = {
    message: TEST_SUCCESS_MESSAGE,
    resultCode: TEST_SUCCESS_RESULT_CODE,
    result: {
      id: 987654321,
      name: 'Q2 Earnings Report',
      accessLevel: 'OWNER',
      permalink: 'https://app.smartsheet.com/reports/c8gJxw87cXpRCvCC5PPw6jFhFRrf5r8PxCrxvW21',
    },
  };

  const expectedAllResponseProperties = {
    message: TEST_SUCCESS_MESSAGE,
    resultCode: TEST_SUCCESS_RESULT_CODE,
    result: {
      id: 987654321,
      name: 'Q2 Earnings Report',
      accessLevel: 'OWNER',
      permalink: 'https://app.smartsheet.com/reports/c8gJxw87cXpRCvCC5PPw6jFhFRrf5r8PxCrxvW21',
      isSummaryReport: false,
      columns: [
        {
          virtualId: 1234567890123456,
          index: 0,
          title: 'Primary column',
          type: ReportColumnType.TEXT_NUMBER,
          primary: true,
          hidden: false,
          version: 0,
          width: 200,
          validation: false,
        },
        {
          virtualId: 2345678901234567,
          index: 1,
          title: 'Sheet name',
          type: ReportColumnType.TEXT_NUMBER,
          sheetNameColumn: true,
          hidden: false,
          version: 0,
          width: 150,
          validation: false,
        },
        {
          virtualId: 3456789012345678,
          index: 2,
          title: 'Created at',
          type: ReportColumnType.DATETIME,
          systemColumnType: SystemColumnType.CREATED_DATE,
          hidden: false,
          version: 0,
          width: 150,
          validation: false,
        },
        {
          virtualId: 4567890123456789,
          index: 3,
          title: 'Selected item',
          type: ReportColumnType.PICKLIST,
          hidden: false,
          version: 0,
          width: 150,
          validation: false,
        },
      ],
    },
  };

  it('createReport generated url is correct', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      body: testCreateReportRequired,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/reports/create-report/required-response-body-properties',
      },
    };
    await client.reports.createReport(options);
    const matchedRequest = await findWireMockRequest(requestId);

    const parsedUrl = new URL(matchedRequest.absoluteUrl);
    expect(parsedUrl.pathname).toEqual('/2.0/reports');
    expect(matchedRequest.method).toEqual('POST');
    const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
    expect(queryParamsObject).toEqual({});
  });

  it('createReport all response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      body: testCreateReportAllProperties,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/reports/create-report/all-response-body-properties',
      },
    };
    const response = await client.reports.createReport(options);
    const matchedRequest = await findWireMockRequest(requestId);

    expect(response).toEqual(expectedAllResponseProperties);

    const body = JSON.parse(matchedRequest.body);
    expect(body).toEqual(testCreateReportAllProperties);
  });

  it('createReport required response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      body: testCreateReportRequired,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/reports/create-report/required-response-body-properties',
      },
    };
    const response = await client.reports.createReport(options);
    const matchedRequest = await findWireMockRequest(requestId);

    expect(response).toEqual(expectedRequiredResponseProperties);

    const body = JSON.parse(matchedRequest.body);
    expect(body).toEqual(testCreateReportRequired);
  });

  it('createReport error 500 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      body: testCreateReportRequired,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/errors/500-response',
      },
    };
    try {
      await client.reports.createReport(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
      expect(error.message).toBe(ERROR_500_MESSAGE);
    }
  });

  it('createReport error 400 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      body: testCreateReportRequired,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/errors/400-response',
      },
    };
    try {
      await client.reports.createReport(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
      expect(error.message).toBe(ERROR_400_MESSAGE);
    }
  });
});
