import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_SHEET_ID,
    TEST_SUCCESS_MESSAGE,
    TEST_SUCCESS_RESULT_CODE,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Sheets - deleteDataClassification endpoint tests', () => {
    const client = createClient();

    it('deleteDataClassification generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            sheetId: TEST_SHEET_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/sheets/delete-data-classification/all-response-body-properties'
            }
        };
        await client.sheets.deleteDataClassification(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual(`/2.0/sheets/${TEST_SHEET_ID}/dataclassification`);
    });

    it('deleteDataClassification all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            sheetId: TEST_SHEET_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/sheets/delete-data-classification/all-response-body-properties'
            }
        };
        const response = await client.sheets.deleteDataClassification(options);

        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE
        });
    });

    it('deleteDataClassification error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            sheetId: TEST_SHEET_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.sheets.deleteDataClassification(options);
            expect(true).toBe(false);
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('deleteDataClassification error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            sheetId: TEST_SHEET_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.sheets.deleteDataClassification(options);
            expect(true).toBe(false);
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
