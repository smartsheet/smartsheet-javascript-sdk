import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_REPORT_ID,
    TEST_SHEET_ID,
    TEST_WORKSPACE_ID,
    TEST_ASSET_TYPE_SHEET,
    TEST_ASSET_TYPE_WORKSPACE,
    TEST_SUCCESS_MESSAGE,
    TEST_SUCCESS_RESULT_CODE,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';
import { ReportAssetType } from '@smartsheet/reports/types';

describe('Reports - addReportScope endpoint tests', () => {
    const client = createClient();

    it('addReportScope generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            body: [
                { assetType: ReportAssetType.SHEET, assetId: TEST_SHEET_ID }
            ],
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/add-report-scope/all-response-body-properties'
            }
        };
        await client.reports.addReportScope(options);
        const matchedRequest = await findWireMockRequest(requestId);

        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual(`/2.0/reports/${TEST_REPORT_ID}/scope`);
    });

    it('addReportScope all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const testBody = [
            { assetType: ReportAssetType.SHEET, assetId: TEST_SHEET_ID },
            { assetType: ReportAssetType.WORKSPACE, assetId: TEST_WORKSPACE_ID }
        ];
        const options = {
            reportId: TEST_REPORT_ID,
            body: testBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/add-report-scope/all-response-body-properties'
            }
        };
        const response = await client.reports.addReportScope(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE
        });

        const body = JSON.parse(matchedRequest.body);
        expect(body).toEqual([
            { assetType: TEST_ASSET_TYPE_SHEET, assetId: TEST_SHEET_ID },
            { assetType: TEST_ASSET_TYPE_WORKSPACE, assetId: TEST_WORKSPACE_ID }
        ]);
    });

    it('addReportScope error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            body: [
                { assetType: ReportAssetType.SHEET, assetId: TEST_SHEET_ID }
            ],
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.reports.addReportScope(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('addReportScope error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            body: [
                { assetType: ReportAssetType.SHEET, assetId: TEST_SHEET_ID }
            ],
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.reports.addReportScope(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
