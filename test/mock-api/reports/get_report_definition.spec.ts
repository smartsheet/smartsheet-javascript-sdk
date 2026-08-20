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
import {
  ReportFilterOperator,
  ReportFilterConditionOperator,
  ReportColumnType,
  ReportSortingDirection,
  ReportAggregationType,
  SystemColumnType,
} from '@smartsheet/reports/types';

describe('Reports - getReportDefinition endpoint tests', () => {
  const client = createClient();

  const expectedAllResponseProperties = {
    filters: {
      operator: ReportFilterOperator.AND,
      criteria: [
        {
          column: {
            title: 'Primary Column',
            type: ReportColumnType.TEXT_NUMBER,
            primary: true,
          },
          operator: ReportFilterConditionOperator.EQUAL,
          values: ['Test Value'],
        },
        {
          column: {
            title: 'Status',
            type: ReportColumnType.PICKLIST,
          },
          operator: ReportFilterConditionOperator.NOT_EQUAL,
          values: ['Complete'],
        },
        {
          column: {
            title: 'Amount',
            type: ReportColumnType.TEXT_NUMBER,
          },
          operator: ReportFilterConditionOperator.GREATER_THAN,
          values: [42],
        },
        {
          column: {
            type: ReportColumnType.DATETIME,
            systemColumnType: SystemColumnType.MODIFIED_DATE,
          },
          operator: ReportFilterConditionOperator.LESS_THAN,
          values: [{ objectType: 'DATE', value: '2025-01-14' }],
        },
        {
          column: {
            title: 'Assigned To',
            type: ReportColumnType.CONTACT_LIST,
          },
          operator: ReportFilterConditionOperator.EQUAL,
          values: [{ objectType: 'CURRENT_USER' }],
        },
        {
          column: {
            title: 'Notes',
            type: ReportColumnType.TEXT_NUMBER,
          },
          operator: ReportFilterConditionOperator.EQUAL,
          values: [null],
        },
      ],
    },
    groupingCriteria: [
      {
        column: {
          title: 'Primary Column',
          type: ReportColumnType.TEXT_NUMBER,
          primary: true,
        },
        sortingDirection: ReportSortingDirection.ASCENDING,
        isExpanded: true,
      },
      {
        column: {
          title: 'Category',
          type: ReportColumnType.TEXT_NUMBER,
        },
        sortingDirection: ReportSortingDirection.DESCENDING,
        isExpanded: false,
      },
    ],
    summarizingCriteria: [
      {
        column: {
          title: 'Primary Column',
          type: ReportColumnType.TEXT_NUMBER,
          primary: true,
        },
        aggregationType: ReportAggregationType.COUNT,
      },
      {
        column: {
          title: 'Amount',
          type: ReportColumnType.TEXT_NUMBER,
        },
        aggregationType: ReportAggregationType.SUM,
      },
    ],
    sortingCriteria: [
      {
        column: {
          title: 'Primary Column',
          type: ReportColumnType.TEXT_NUMBER,
          primary: true,
        },
        sortingDirection: ReportSortingDirection.ASCENDING,
      },
      {
        column: {
          type: ReportColumnType.DATETIME,
          systemColumnType: SystemColumnType.MODIFIED_DATE,
        },
        sortingDirection: ReportSortingDirection.DESCENDING,
      },
    ],
  };

  it('getReportDefinition generated url is correct', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/reports/get-report-definition/all-response-body-properties',
      },
    };
    await client.reports.getReportDefinition(options);
    const matchedRequest = await findWireMockRequest(requestId);

    const parsedUrl = new URL(matchedRequest.absoluteUrl);
    expect(parsedUrl.pathname).toEqual(`/2.0/reports/${TEST_REPORT_ID}/definition`);
    expect(matchedRequest.method).toEqual('GET');
    const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
    expect(queryParamsObject).toEqual({});
  });

  it('getReportDefinition all response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/reports/get-report-definition/all-response-body-properties',
      },
    };
    const response = await client.reports.getReportDefinition(options);
    const matchedRequest = await findWireMockRequest(requestId);

    expect(response).toEqual(expectedAllResponseProperties);
    expect(matchedRequest.body).toEqual('');
  });

  it('getReportDefinition required response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/reports/get-report-definition/required-response-body-properties',
      },
    };
    const response = await client.reports.getReportDefinition(options);
    const matchedRequest = await findWireMockRequest(requestId);

    expect(response).toEqual({});
    expect(matchedRequest.body).toEqual('');
  });

  it('getReportDefinition error 400 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/errors/400-response',
      },
    };
    try {
      await client.reports.getReportDefinition(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
      expect(error.message).toBe(ERROR_400_MESSAGE);
    }
  });

  it('getReportDefinition error 500 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      reportId: TEST_REPORT_ID,
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/errors/500-response',
      },
    };
    try {
      await client.reports.getReportDefinition(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
      expect(error.message).toBe(ERROR_500_MESSAGE);
    }
  });
});
