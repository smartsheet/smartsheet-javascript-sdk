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
            operator: 'AND',
            criteria: [
                {
                    column: { title: 'Status', type: 'PICKLIST' },
                    operator: 'EQUAL',
                    values: ['Complete']
                },
                {
                    column: { title: 'Priority', type: 'TEXT_NUMBER' },
                    operator: 'IS_ONE_OF',
                    values: ['High', 'Critical']
                }
            ]
        }
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

    it('updateReportDefinition sets query parameters correctly', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            body: testFilterOnlyBody,
            updateFilters: true,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/update-report-definition/all-response-body-properties'
            }
        };
        await client.reports.updateReportDefinition(options);
        const matchedRequest = await findWireMockRequest(requestId);
        expect(matchedRequest.queryParams.updateFilters.values).toContain('true');
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
