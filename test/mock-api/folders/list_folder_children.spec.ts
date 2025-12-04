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
        
        expect(response).toBeTruthy();
        expect(response.data).toBeTruthy();
        expect(Array.isArray(response.data)).toBe(true);
        expect(response.data.length).toBe(4);
        
        // Verify first child (folder)
        expect(response.data[0].id).toBe(TEST_CHILD_FOLDER_ID_1);
        expect(response.data[0].name).toBe(TEST_CHILD_FOLDER_NAME_1);
        expect(response.data[0].permalink).toBe(TEST_CHILD_FOLDER_PERMALINK_1);
        expect(response.data[0].createdAt).toBe(TEST_CREATED_AT);
        expect(response.data[0].modifiedAt).toBe(TEST_MODIFIED_AT);
        expect(response.data[0].accessLevel).toBe('OWNER');
        expect(response.data[0].resourceType).toBe('folder');
        
        // Verify second child (sheet)
        expect(response.data[1].id).toBe(TEST_SHEET_ID);
        expect(response.data[1].name).toBe(TEST_SHEET_NAME);
        expect(response.data[1].permalink).toBe(TEST_SHEET_PERMALINK);
        expect(response.data[1].createdAt).toBe(TEST_CREATED_AT);
        expect(response.data[1].modifiedAt).toBe(TEST_MODIFIED_AT);
        expect(response.data[1].accessLevel).toBe('OWNER');
        expect(response.data[1].resourceType).toBe('sheet');
        
        // Verify third child (report)
        expect(response.data[2].id).toBe(TEST_REPORT_ID);
        expect(response.data[2].name).toBe(TEST_REPORT_NAME);
        expect(response.data[2].permalink).toBe(TEST_REPORT_PERMALINK);
        expect(response.data[2].createdAt).toBe(TEST_CREATED_AT);
        expect(response.data[2].modifiedAt).toBe(TEST_MODIFIED_AT);
        expect(response.data[2].accessLevel).toBe('EDITOR');
        expect(response.data[2].resourceType).toBe('report');
        
        // Verify fourth child (sight/dashboard)
        expect(response.data[3].id).toBe(TEST_SIGHT_ID);
        expect(response.data[3].name).toBe(TEST_SIGHT_NAME);
        expect(response.data[3].permalink).toBe(TEST_SIGHT_PERMALINK);
        expect(response.data[3].createdAt).toBe(TEST_CREATED_AT);
        expect(response.data[3].modifiedAt).toBe(TEST_MODIFIED_AT);
        expect(response.data[3].accessLevel).toBe('VIEWER');
        expect(response.data[3].resourceType).toBe('sight');
        
        // Verify pagination token
        expect(response.lastKey).toBe('next-page-token-12345');
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
        
        expect(response).toBeTruthy();
        expect(response.data).toBeTruthy();
        expect(Array.isArray(response.data)).toBe(true);
        expect(response.data.length).toBe(2);
        
        // Verify first child (folder) - required properties only
        expect(response.data[0].id).toBe(TEST_CHILD_FOLDER_ID_1);
        expect(response.data[0].name).toBe(TEST_CHILD_FOLDER_NAME_1);
        expect(response.data[0].permalink).toBe(TEST_CHILD_FOLDER_PERMALINK_1);
        expect(response.data[0].createdAt).toBe(TEST_CREATED_AT);
        expect(response.data[0].modifiedAt).toBe(TEST_MODIFIED_AT);
        expect(response.data[0].resourceType).toBe('folder');
        expect(response.data[0].accessLevel).toBeUndefined();
        
        // Verify second child (sheet) - required properties only
        expect(response.data[1].id).toBe(TEST_SHEET_ID);
        expect(response.data[1].name).toBe(TEST_SHEET_NAME);
        expect(response.data[1].permalink).toBe(TEST_SHEET_PERMALINK);
        expect(response.data[1].createdAt).toBe(TEST_CREATED_AT);
        expect(response.data[1].modifiedAt).toBe(TEST_MODIFIED_AT);
        expect(response.data[1].resourceType).toBe('sheet');
        expect(response.data[1].accessLevel).toBe('OWNER');
        
        // Verify pagination token is not present
        expect(response.lastKey).toBeUndefined();
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
