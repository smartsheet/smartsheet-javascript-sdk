import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_FOLDER_ID,
    TEST_FOLDER_NAME,
    TEST_FOLDER_PERMALINK,
    TEST_CREATED_AT,
    TEST_MODIFIED_AT,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE,
    TEST_GET_METADATA_INCLUDE
} from './common_test_constants';

describe('Folders - getFolderMetadata endpoint tests', () => {
    const client = createClient();

    it('getFolderMetadata generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            queryParameters: {
                include: TEST_GET_METADATA_INCLUDE
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/folders/get-folder-metadata/all-response-body-properties'
            }
        };
        await client.folders.getFolderMetadata(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual(`/2.0/folders/${TEST_FOLDER_ID}/metadata`);

        const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
        expect(queryParamsObject).toEqual({
            include: TEST_GET_METADATA_INCLUDE
        });
    });

    it('getFolderMetadata all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/folders/get-folder-metadata/all-response-body-properties'
            }
        };
        const response = await client.folders.getFolderMetadata(options);
        
        expect(response).toEqual({
            id: TEST_FOLDER_ID,
            name: TEST_FOLDER_NAME,
            permalink: TEST_FOLDER_PERMALINK,
            createdAt: TEST_CREATED_AT,
            modifiedAt: TEST_MODIFIED_AT
        });
    });

    it('getFolderMetadata error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.folders.getFolderMetadata(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('getFolderMetadata error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.folders.getFolderMetadata(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
