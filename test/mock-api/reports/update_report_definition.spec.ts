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
    ERROR_400_MESSAGE
} from './common_test_constants';
import {
    ReportColumnType,
    SystemColumnType,
    ReportFilterOperator,
    ReportFilterConditionOperator,
    ReportSortingDirection,
    ReportAggregationType
} from '../../../lib/reports/types';

describe('Reports - updateReportDefinition endpoint tests', () => {
    const client = createClient();

    const testFilterOnlyBody = {
        filters: {
            operator: ReportFilterOperator.OR,
            criteria: [
                {
                    column: { title: 'Status', type: ReportColumnType.PICKLIST },
                    operator: ReportFilterConditionOperator.EQUAL,
                    values: ['Complete']
                },
                {
                    column: { title: 'Priority', type: ReportColumnType.TEXT_NUMBER },
                    operator: ReportFilterConditionOperator.GREATER_THAN,
                    values: [5]
                },
                {
                    column: { title: 'Due Date', type: ReportColumnType.DATE },
                    operator: ReportFilterConditionOperator.GREATER_THAN,
                    values: [{ objectType: 'DATE', value: '2024-01-01' }]
                },
                {
                    column: { title: 'Assigned To', type: ReportColumnType.CONTACT_LIST },
                    operator: ReportFilterConditionOperator.EQUAL,
                    values: [{ objectType: 'CURRENT_USER', value: '' }]
                },
                {
                    column: { primary: true, type: ReportColumnType.TEXT_NUMBER },
                    operator: ReportFilterConditionOperator.CONTAINS,
                    values: ['PROJ-1']
                },
                {
                    column: { systemColumnType: SystemColumnType.CREATED_BY, type: ReportColumnType.TEXT_NUMBER },
                    operator: ReportFilterConditionOperator.NOT_EQUAL,
                    values: ['System']
                },
                {
                    column: { sheetNameColumn: true, type: ReportColumnType.TEXT_NUMBER },
                    operator: ReportFilterConditionOperator.IS_ONE_OF,
                    values: ['Project A', 'Project B']
                }
            ],
            nestedCriteria: [
                {
                    operator: ReportFilterOperator.AND,
                    criteria: [
                        {
                            column: { title: 'Start Date', type: ReportColumnType.DATE },
                            operator: ReportFilterConditionOperator.LAST_N_DAYS,
                            values: [30]
                        },
                        {
                            column: { title: 'Completed', type: ReportColumnType.CHECKBOX },
                            operator: ReportFilterConditionOperator.IS_CHECKED,
                            values: []
                        }
                    ]
                }
            ]
        },
        groupingCriteria: [
            {
                column: { title: 'Department', type: ReportColumnType.PICKLIST },
                sortingDirection: ReportSortingDirection.ASCENDING,
                isExpanded: true
            },
            {
                column: { title: 'Priority', type: ReportColumnType.TEXT_NUMBER },
                sortingDirection: ReportSortingDirection.DESCENDING,
                isExpanded: false
            }
        ],
        summarizingCriteria: [
            {
                column: { title: 'Cost', type: ReportColumnType.TEXT_NUMBER },
                aggregationType: ReportAggregationType.SUM
            },
            {
                column: { title: 'Duration', type: ReportColumnType.DURATION },
                aggregationType: ReportAggregationType.AVG
            },
            {
                column: { title: 'Task Count', type: ReportColumnType.TEXT_NUMBER },
                aggregationType: ReportAggregationType.COUNT
            }
        ],
        sortingCriteria: [
            {
                column: { title: 'Due Date', type: ReportColumnType.DATE },
                sortingDirection: ReportSortingDirection.ASCENDING
            },
            {
                column: { title: 'Priority', type: ReportColumnType.TEXT_NUMBER },
                sortingDirection: ReportSortingDirection.DESCENDING
            }
        ]
    };

    it('updateReportDefinition generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            body: testFilterOnlyBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/update-report-definition/all-response-body-properties'
            }
        };
        await client.reports.updateReportDefinition(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual(`/2.0/reports/${TEST_REPORT_ID}/definition`);
    });

    it('updateReportDefinition uses PUT method', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            body: testFilterOnlyBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/update-report-definition/all-response-body-properties'
            }
        };
        await client.reports.updateReportDefinition(options);
        const matchedRequest = await findWireMockRequest(requestId);
        expect(matchedRequest.method).toEqual('PUT');
    });


    it('updateReportDefinition all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            body: testFilterOnlyBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/update-report-definition/all-response-body-properties'
            }
        };
        const response = await client.reports.updateReportDefinition(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE,
        });

        const body = JSON.parse(matchedRequest.body);
        expect(body).toEqual(testFilterOnlyBody);
    });

    it('updateReportDefinition error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            body: testFilterOnlyBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.reports.updateReportDefinition(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('updateReportDefinition error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            body: testFilterOnlyBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.reports.updateReportDefinition(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
