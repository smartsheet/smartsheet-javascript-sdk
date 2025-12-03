import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_FOLDER_ID,
    TEST_UPDATED_FOLDER_NAME,
    TEST_FOLDER_PERMALINK,
    TEST_SUCCESS_MESSAGE,
    TEST_SUCCESS_RESULT_CODE,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Folders - updateFolder endpoint tests', () => {
    const client = createClient();

    it('updateFolder generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            body: {
                name: TEST_UPDATED_FOLDER_NAME
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/folders/update-folder/all-response-body-properties'
            }
        };
        await client.folders.updateFolder(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.url.includes(`/folders/${TEST_FOLDER_ID}`)).toBeTruthy();
    });

    it('updateFolder all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const updatedName = TEST_UPDATED_FOLDER_NAME;
        const options = {
            folderId: TEST_FOLDER_ID,
            body: {
                name: updatedName
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/folders/update-folder/all-response-body-properties'
            }
        };
        const response = await client.folders.updateFolder(options);
        const matchedRequest = await findWireMockRequest(requestId);
        
        expect(response).toBeTruthy();
        expect(response.message).toBe(TEST_SUCCESS_MESSAGE);
        expect(response.resultCode).toBe(TEST_SUCCESS_RESULT_CODE);
        expect(response.failedItems).toBeDefined();
        expect(response.failedItems.length).toBe(0);
        expect(response.version).toBeDefined();
        expect(response.version).toBe(2);
        
        expect(response.result).toBeDefined();
        expect(response.result.id).toBe(TEST_FOLDER_ID);
        expect(response.result.name).toBe(TEST_UPDATED_FOLDER_NAME);
        expect(response.result.permalink).toBe(TEST_FOLDER_PERMALINK);
        
        // Validate request body
        const body = JSON.parse(matchedRequest.body);
        expect(body).toEqual({ name: updatedName });
    });

    it('updateFolder error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            body: {
                name: TEST_UPDATED_FOLDER_NAME
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.folders.updateFolder(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('updateFolder error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            body: {
                name: TEST_UPDATED_FOLDER_NAME
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.folders.updateFolder(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
