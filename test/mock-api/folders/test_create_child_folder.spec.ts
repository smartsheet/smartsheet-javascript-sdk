import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_FOLDER_ID,
    TEST_NEW_FOLDER_ID,
    TEST_NEW_FOLDER_NAME,
    TEST_NEW_FOLDER_PERMALINK,
    TEST_SUCCESS_MESSAGE,
    TEST_SUCCESS_RESULT_CODE,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Folders - createChildFolder endpoint tests', () => {
    const client = createClient();

    it('createChildFolder generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const includeParam = 'data';
        const options = {
            folderId: TEST_FOLDER_ID,
            body: {
                name: TEST_NEW_FOLDER_NAME
            },
            queryParameters: {
                include: includeParam
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/folders/create-child-folder/required-response-body-properties'
            }
        };
        await client.folders.createChildFolder(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.url.includes(`/folders/${TEST_FOLDER_ID}/folders`)).toBeTruthy();
        
        // Check query parameters
        expect(matchedRequest.queryParams).toEqual({
            include: {
                key: 'include',
                values: [includeParam]
            }
        });
    });

    it('createChildFolder all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const folderName = TEST_NEW_FOLDER_NAME;
        const options = {
            folderId: TEST_FOLDER_ID,
            body: {
                name: folderName
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/folders/create-child-folder/all-response-body-properties'
            }
        };
        const response = await client.folders.createChildFolder(options);
        const matchedRequest = await findWireMockRequest(requestId);
        
        expect(response).toBeTruthy();
        expect(response.message).toBe(TEST_SUCCESS_MESSAGE);
        expect(response.resultCode).toBe(TEST_SUCCESS_RESULT_CODE);
        expect(response.result).toBeDefined();
        expect(response.result.id).toBe(TEST_NEW_FOLDER_ID);
        expect(response.result.name).toBe(TEST_NEW_FOLDER_NAME);
        expect(response.result.permalink).toBe(TEST_NEW_FOLDER_PERMALINK);
        
        // Check optional arrays
        expect(response.result.folders).toBeDefined();
        expect(response.result.sheets).toBeDefined();
        expect(response.result.reports).toBeDefined();
        expect(response.result.sights).toBeDefined();
        expect(response.result.templates).toBeDefined();
        
        // Validate request body
        const body = JSON.parse(matchedRequest.body);
        expect(body).toEqual({ name: folderName });
    });

    it('createChildFolder required response body properties', async () => {
        const requestId = crypto.randomUUID();
        const folderName = TEST_NEW_FOLDER_NAME;
        const options = {
            folderId: TEST_FOLDER_ID,
            body: {
                name: folderName
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/folders/create-child-folder/required-response-body-properties'
            }
        };
        const response = await client.folders.createChildFolder(options);
        const matchedRequest = await findWireMockRequest(requestId);
        
        expect(response).toBeTruthy();
        expect(response.message).toBe(TEST_SUCCESS_MESSAGE);
        expect(response.resultCode).toBe(TEST_SUCCESS_RESULT_CODE);
        expect(response.result).toBeDefined();
        expect(response.result.id).toBe(TEST_NEW_FOLDER_ID);
        expect(response.result.name).toBe(TEST_NEW_FOLDER_NAME);
        expect(response.result.permalink).toBe(TEST_NEW_FOLDER_PERMALINK);
        
        // Optional arrays should be undefined
        expect(response.result.folders).toBeUndefined();
        expect(response.result.sheets).toBeUndefined();
        expect(response.result.reports).toBeUndefined();
        expect(response.result.sights).toBeUndefined();
        expect(response.result.templates).toBeUndefined();
        
        // Validate request body
        const body = JSON.parse(matchedRequest.body);
        expect(body).toEqual({ name: folderName });
    });

    it('createChildFolder error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            body: {
                name: TEST_NEW_FOLDER_NAME
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.folders.createChildFolder(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('createChildFolder error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            body: {
                name: TEST_NEW_FOLDER_NAME
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.folders.createChildFolder(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
