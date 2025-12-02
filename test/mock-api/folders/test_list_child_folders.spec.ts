import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_FOLDER_ID,
    TEST_CHILD_FOLDER_ID_1,
    TEST_CHILD_FOLDER_ID_2,
    TEST_CHILD_FOLDER_NAME_1,
    TEST_CHILD_FOLDER_NAME_2,
    TEST_CHILD_FOLDER_PERMALINK_1,
    TEST_CHILD_FOLDER_PERMALINK_2,
    TEST_PAGE_NUMBER,
    TEST_PAGE_SIZE,
    TEST_TOTAL_PAGES,
    TEST_TOTAL_COUNT,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Folders - listChildFolders endpoint tests', () => {
    const client = createClient();

    it('listChildFolders generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const page = 1;
        const pageSize = 50;
        const options = {
            folderId: TEST_FOLDER_ID,
            queryParameters: {
                page: page,
                pageSize: pageSize,
                includeAll: false
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/folders/list-child-folders/all-response-body-properties'
            }
        };
        await client.folders.listChildFolders(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.url.includes(`/folders/${TEST_FOLDER_ID}/folders`)).toBeTruthy();
        
        // Verify query parameters
        expect(matchedRequest.queryParams).toEqual({
            page: {
                key: 'page',
                values: [page.toString()]
            },
            pageSize: {
                key: 'pageSize',
                values: [pageSize.toString()]
            },
            includeAll: {
                key: 'includeAll',
                values: ['false']
            }
        });
    });

    it('listChildFolders all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/folders/list-child-folders/all-response-body-properties'
            }
        };
        const response = await client.folders.listChildFolders(options);
        
        expect(response).toBeTruthy();
        expect(response.pageNumber).toBe(TEST_PAGE_NUMBER);
        expect(response.pageSize).toBe(TEST_PAGE_SIZE);
        expect(response.totalPages).toBe(TEST_TOTAL_PAGES);
        expect(response.totalCount).toBe(TEST_TOTAL_COUNT);
        
        // Check result array
        expect(response.result).toBeDefined();
        expect(response.result.length).toBe(2);
        
        // Check first folder
        expect(response.result[0].id).toBe(TEST_CHILD_FOLDER_ID_1);
        expect(response.result[0].name).toBe(TEST_CHILD_FOLDER_NAME_1);
        expect(response.result[0].permalink).toBe(TEST_CHILD_FOLDER_PERMALINK_1);
        
        // Check second folder
        expect(response.result[1].id).toBe(TEST_CHILD_FOLDER_ID_2);
        expect(response.result[1].name).toBe(TEST_CHILD_FOLDER_NAME_2);
        expect(response.result[1].permalink).toBe(TEST_CHILD_FOLDER_PERMALINK_2);
    });

    it('listChildFolders required response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/folders/list-child-folders/required-response-body-properties'
            }
        };
        const response = await client.folders.listChildFolders(options);
        
        expect(response).toBeTruthy();
        
        // Check result array
        expect(response.result).toBeDefined();
        expect(response.result.length).toBe(2);
        
        // Check first folder
        expect(response.result[0].id).toBe(TEST_CHILD_FOLDER_ID_1);
        expect(response.result[0].name).toBe(TEST_CHILD_FOLDER_NAME_1);
        expect(response.result[0].permalink).toBe(TEST_CHILD_FOLDER_PERMALINK_1);
        
        // Check second folder
        expect(response.result[1].id).toBe(TEST_CHILD_FOLDER_ID_2);
        expect(response.result[1].name).toBe(TEST_CHILD_FOLDER_NAME_2);
        expect(response.result[1].permalink).toBe(TEST_CHILD_FOLDER_PERMALINK_2);
        
        // Optional pagination properties should be undefined
        expect(response.pageNumber).toBeUndefined();
        expect(response.pageSize).toBeUndefined();
        expect(response.totalPages).toBeUndefined();
        expect(response.totalCount).toBeUndefined();
    });

    it('listChildFolders error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.folders.listChildFolders(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('listChildFolders error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.folders.listChildFolders(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
