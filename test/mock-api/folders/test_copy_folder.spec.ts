import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_FOLDER_ID,
    TEST_DESTINATION_FOLDER_ID,
    TEST_COPIED_FOLDER_NAME,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';
import { DestinationType } from '@smartsheet/folders/types';

describe('Folders - copyFolder endpoint tests', () => {
    const client = createClient();

    it('copyFolder generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            queryParameters: {
                include: 'data,attachments',
                exclude: 'sheetHyperlinks',
                skipRemap: 'cellLinks'
            },
            body: {
                destinationType: DestinationType.FOLDER,
                destinationId: TEST_DESTINATION_FOLDER_ID,
                newName: TEST_COPIED_FOLDER_NAME
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/folders/copy-folder/all-response-body-properties'
            }
        };
        await client.folders.copyFolder(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.url.includes(`/folders/${TEST_FOLDER_ID}/copy`)).toBeTruthy();
        
        // Verify query parameters
        expect(matchedRequest.queryParams).toEqual({
            include: {
                key: 'include',
                values: ['data,attachments']
            },
            exclude: {
                key: 'exclude',
                values: ['sheetHyperlinks']
            },
            skipRemap: {
                key: 'skipRemap',
                values: ['cellLinks']
            }
        });
    });

    it('copyFolder all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            body: {
                destinationType: DestinationType.FOLDER,
                destinationId: TEST_DESTINATION_FOLDER_ID,
                newName: TEST_COPIED_FOLDER_NAME
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/folders/copy-folder/all-response-body-properties'
            }
        };
        const response = await client.folders.copyFolder(options);
        const matchedRequest = await findWireMockRequest(requestId);
        
        // Verify request body
        const requestBody = JSON.parse(matchedRequest.body);
        expect(requestBody).toEqual({
            destinationType: DestinationType.FOLDER,
            destinationId: TEST_DESTINATION_FOLDER_ID,
            newName: TEST_COPIED_FOLDER_NAME
        });
        
        // Verify response
        expect(response).toBeTruthy();
        expect(response.destinationType).toBe(DestinationType.FOLDER);
        expect(response.destinationId).toBe(TEST_DESTINATION_FOLDER_ID);
        expect(response.newName).toBe(TEST_COPIED_FOLDER_NAME);
    });

    it('copyFolder required response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            body: {
                destinationType: DestinationType.FOLDER,
                destinationId: TEST_DESTINATION_FOLDER_ID
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/folders/copy-folder/required-response-body-properties'
            }
        };
        const response = await client.folders.copyFolder(options);
        const matchedRequest = await findWireMockRequest(requestId);
        
        // Verify request body
        const requestBody = JSON.parse(matchedRequest.body);
        expect(requestBody).toEqual({
            destinationType: DestinationType.FOLDER,
            destinationId: TEST_DESTINATION_FOLDER_ID
        });
        
        // Verify response
        expect(response).toBeTruthy();
        expect(response.destinationType).toBe(DestinationType.FOLDER);
        expect(response.destinationId).toBe(TEST_DESTINATION_FOLDER_ID);
        
        // Optional property should be undefined
        expect(response.newName).toBeUndefined();
    });

    it('copyFolder error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            body: {
                destinationType: DestinationType.FOLDER,
                destinationId: TEST_DESTINATION_FOLDER_ID,
                newName: TEST_COPIED_FOLDER_NAME
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.folders.copyFolder(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('copyFolder error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            body: {
                destinationType: DestinationType.FOLDER,
                destinationId: TEST_DESTINATION_FOLDER_ID,
                newName: TEST_COPIED_FOLDER_NAME
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.folders.copyFolder(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
