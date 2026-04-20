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

describe('Reports - updateReportDefinition endpoint tests', () => {
    const client = createClient();

    const testFilterOnlyBody = {
        filters: {
            operator: 'OR',
            criteria: [
                {
                    column: { title: 'Status', type: 'PICKLIST' },
                    operator: 'EQUAL',
                    values: ['Complete']
                },
                {
                    column: { title: 'Priority', type: 'TEXT_NUMBER' },
                    operator: 'GREATER_THAN',
                    values: [5]
                },
                {
                    column: { title: 'Due Date', type: 'DATE' },
                    operator: 'GREATER_THAN',
                    values: [{ objectType: 'DATE', value: '2024-01-01' }]
                },
                {
                    column: { title: 'Assigned To', type: 'CONTACT_LIST' },
                    operator: 'EQUAL',
                    values: [{ objectType: 'CURRENT_USER', value: '' }]
                },
                {
                    column: { primary: true, type: 'TEXT_NUMBER' },
                    operator: 'CONTAINS',
                    values: ['PROJ-1']
                },
                {
                    column: { systemColumnType: 'CREATED_BY', type: 'TEXT_NUMBER' },
                    operator: 'NOT_EQUAL',
                    values: ['System']
                },
                {
                    column: { sheetNameColumn: true, type: 'TEXT_NUMBER' },
                    operator: 'IS_ONE_OF',
                    values: ['Project A', 'Project B']
                }
            ],
            nestedCriteria: [
                {
                    operator: 'AND',
                    criteria: [
                        {
                            column: { title: 'Start Date', type: 'DATE' },
                            operator: 'LAST_N_DAYS',
                            values: [30]
                        },
                        {
                            column: { title: 'Completed', type: 'CHECKBOX' },
                            operator: 'IS_CHECKED',
                            values: []
                        }
                    ]
                }
            ]
        },
        groupingCriteria: [
            {
                column: { title: 'Department', type: 'PICKLIST' },
                sortingDirection: 'ASCENDING',
                isExpanded: true
            },
            {
                column: { title: 'Priority', type: 'TEXT_NUMBER' },
                sortingDirection: 'DESCENDING',
                isExpanded: false
            }
        ],
        summarizingCriteria: [
            {
                column: { title: 'Cost', type: 'TEXT_NUMBER' },
                aggregationType: 'SUM'
            },
            {
                column: { title: 'Duration', type: 'DURATION' },
                aggregationType: 'AVG'
            },
            {
                column: { title: 'Task Count', type: 'TEXT_NUMBER' },
                aggregationType: 'COUNT'
            }
        ],
        sortingCriteria: [
            {
                column: { title: 'Due Date', type: 'DATE' },
                sortingDirection: 'ASCENDING'
            },
            {
                column: { title: 'Priority', type: 'TEXT_NUMBER' },
                sortingDirection: 'DESCENDING'
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
