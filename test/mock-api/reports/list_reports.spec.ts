import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_REPORT_ID,
    TEST_REPORT_NAME,
    TEST_REPORT_PERMALINK,
    TEST_REPORT_ACCESS_LEVEL,
    TEST_MODIFIED_SINCE,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Reports - listReports endpoint tests', () => {
    const client = createClient();

    it('listReports generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                modifiedSince: TEST_MODIFIED_SINCE
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/list-reports/all-response-body-properties'
            }
        };
        await client.reports.listReports(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual('/2.0/reports');

        const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
        expect(queryParamsObject).toEqual({
            modifiedSince: TEST_MODIFIED_SINCE
        });
    });

    it('listReports all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/list-reports/all-response-body-properties'
            }
        };
        const response = await client.reports.listReports(options);
        
        expect(response).toEqual({
            data: [
                {
                    id: TEST_REPORT_ID,
                    name: TEST_REPORT_NAME,
                    accessLevel: TEST_REPORT_ACCESS_LEVEL,
                    permalink: TEST_REPORT_PERMALINK,
                    isSummaryReport: true
                }
            ],
            pageNumber: 1,
            pageSize: 100,
            totalPages: 1,
            totalCount: 1
        });
    });

    it('listReports error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.reports.listReports(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('listReports error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.reports.listReports(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
