import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_FOLDER_ID,
    TEST_CHILD_FOLDER_ID_1,
    TEST_SHEET_ID,
    TEST_REPORT_ID,
    TEST_SIGHT_ID,
    TEST_CHILD_FOLDER_NAME_1,
    TEST_SHEET_NAME,
    TEST_REPORT_NAME,
    TEST_SIGHT_NAME,
    TEST_CHILD_FOLDER_PERMALINK_1,
    TEST_SHEET_PERMALINK,
    TEST_REPORT_PERMALINK,
    TEST_SIGHT_PERMALINK,
    TEST_CREATED_AT,
    TEST_MODIFIED_AT,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Folders - getFolderChildren endpoint tests', () => {
    const client = createClient();

    it('getFolderChildren generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            queryParameters: {
                childrenResourceTypes: 'sheets,folders',
                include: 'source,ownerInfo',
                maxItems: 100
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/folders/list-folder-children/all-response-body-properties'
            }
        };
        await client.folders.getFolderChildren(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.url.includes(`/folders/${TEST_FOLDER_ID}/children`)).toBeTruthy();
        
        // Verify query parameters
        expect(matchedRequest.queryParams).toEqual({
            childrenResourceTypes: {
                key: 'childrenResourceTypes',
                values: ['sheets,folders']
            },
            include: {
                key: 'include',
                values: ['source,ownerInfo']
            },
            maxItems: {
                key: 'maxItems',
                values: ['100']
            }
        });
    });

    it('getFolderChildren all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/folders/list-folder-children/all-response-body-properties'
            }
        };
        const response = await client.folders.getFolderChildren(options);
        
        expect(response).toEqual({
            data: [
                {
                    id: TEST_CHILD_FOLDER_ID_1,
                    name: TEST_CHILD_FOLDER_NAME_1,
                    permalink: TEST_CHILD_FOLDER_PERMALINK_1,
                    createdAt: TEST_CREATED_AT,
                    modifiedAt: TEST_MODIFIED_AT,
                    accessLevel: 'OWNER',
                    resourceType: 'folder'
                },
                {
                    id: TEST_SHEET_ID,
                    name: TEST_SHEET_NAME,
                    permalink: TEST_SHEET_PERMALINK,
                    createdAt: TEST_CREATED_AT,
                    modifiedAt: TEST_MODIFIED_AT,
                    accessLevel: 'OWNER',
                    resourceType: 'sheet'
                },
                {
                    id: TEST_REPORT_ID,
                    name: TEST_REPORT_NAME,
                    permalink: TEST_REPORT_PERMALINK,
                    createdAt: TEST_CREATED_AT,
                    modifiedAt: TEST_MODIFIED_AT,
                    accessLevel: 'EDITOR',
                    resourceType: 'report'
                },
                {
                    id: TEST_SIGHT_ID,
                    name: TEST_SIGHT_NAME,
                    permalink: TEST_SIGHT_PERMALINK,
                    createdAt: TEST_CREATED_AT,
                    modifiedAt: TEST_MODIFIED_AT,
                    accessLevel: 'VIEWER',
                    resourceType: 'sight'
                }
            ],
            lastKey: 'next-page-token-12345'
        });
    });

    it('getFolderChildren required response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/folders/list-folder-children/required-response-body-properties'
            }
        };
        const response = await client.folders.getFolderChildren(options);
        
        expect(response).toEqual({
            data: [
                {
                    id: TEST_CHILD_FOLDER_ID_1,
                    name: TEST_CHILD_FOLDER_NAME_1,
                    permalink: TEST_CHILD_FOLDER_PERMALINK_1,
                    createdAt: TEST_CREATED_AT,
                    modifiedAt: TEST_MODIFIED_AT,
                    resourceType: 'folder'
                },
                {
                    id: TEST_SHEET_ID,
                    name: TEST_SHEET_NAME,
                    permalink: TEST_SHEET_PERMALINK,
                    createdAt: TEST_CREATED_AT,
                    modifiedAt: TEST_MODIFIED_AT,
                    resourceType: 'sheet',
                    accessLevel: 'OWNER'
                }
            ]
        });
    });

    it('getFolderChildren error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.folders.getFolderChildren(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('getFolderChildren error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.folders.getFolderChildren(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
