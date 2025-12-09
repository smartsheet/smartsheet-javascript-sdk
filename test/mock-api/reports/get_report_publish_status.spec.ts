import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_REPORT_ID,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Reports - getReportPublishStatus endpoint tests', () => {
    const client = createClient();

    it('getReportPublishStatus generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/get-report-publish-status/all-response-body-properties'
            }
        };
        await client.reports.getReportPublishStatus(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.url.includes(`/reports/${TEST_REPORT_ID}/publish`)).toBeTruthy();
    });

    it('getReportPublishStatus all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/get-report-publish-status/all-response-body-properties'
            }
        };
        const response = await client.reports.getReportPublishStatus(options);
        
        expect(response).toEqual({
            readOnlyFullAccessibleBy: 'ALL',
            readOnlyFullDefaultView: 'GRID',
            readOnlyFullEnabled: true,
            readOnlyFullUrl: 'https://publish.smartsheet.com/12345abcde',
            readOnlyFullShowToolbar: true
        });
    });

    it('getReportPublishStatus required response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/get-report-publish-status/required-response-body-properties'
            }
        };
        const response = await client.reports.getReportPublishStatus(options);
        
        expect(response).toEqual({
            readOnlyFullDefaultView: 'GRID',
            readOnlyFullEnabled: false
        });
    });

    it('getReportPublishStatus error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.reports.getReportPublishStatus(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('getReportPublishStatus error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.reports.getReportPublishStatus(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
