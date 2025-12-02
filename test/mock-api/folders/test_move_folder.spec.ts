import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_FOLDER_ID,
    TEST_DESTINATION_FOLDER_ID,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE,
    TEST_SUCCESS_RESULT_CODE,
    TEST_SUCCESS_MESSAGE,
    TEST_FOLDER_NAME,
    TEST_FOLDER_PERMALINK
} from './common_test_constants';
import { DestinationType } from '@smartsheet/folders/types';

describe('Folders - moveFolder endpoint tests', () => {
    const client = createClient();

    it('moveFolder generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            body: {
                destinationId: TEST_DESTINATION_FOLDER_ID,
                destinationType: DestinationType.FOLDER
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/folders/move-folder/all-response-body-properties'
            }
        };
        await client.folders.moveFolder(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.url.includes(`/folders/${TEST_FOLDER_ID}/move`)).toBeTruthy();
    });

    it('moveFolder all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            body: {
                destinationId: TEST_DESTINATION_FOLDER_ID,
                destinationType: DestinationType.FOLDER
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/folders/move-folder/all-response-body-properties'
            }
        };
        const response = await client.folders.moveFolder(options);
        const matchedRequest = await findWireMockRequest(requestId);
        
        // Verify request body
        const requestBody = JSON.parse(matchedRequest.body);
        expect(requestBody).toEqual({
            destinationId: TEST_DESTINATION_FOLDER_ID,
            destinationType: DestinationType.FOLDER
        });
        
        // Verify response
        expect(response).toBeTruthy();
        expect(response.message).toBe(TEST_SUCCESS_MESSAGE);
        expect(response.resultCode).toBe(TEST_SUCCESS_RESULT_CODE);
        expect(response.result.id).toBe(TEST_FOLDER_ID);
        expect(response.result.name).toBe(TEST_FOLDER_NAME);
        expect(response.result.permalink).toBe(TEST_FOLDER_PERMALINK);
    });

    it('moveFolder error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            body: {
                destinationId: TEST_DESTINATION_FOLDER_ID,
                destinationType: DestinationType.FOLDER
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.folders.moveFolder(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('moveFolder error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            body: {
                destinationId: TEST_DESTINATION_FOLDER_ID,
                destinationType: DestinationType.FOLDER
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.folders.moveFolder(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
