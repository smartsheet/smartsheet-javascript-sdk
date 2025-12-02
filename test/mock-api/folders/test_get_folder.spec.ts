import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_FOLDER_ID,
    TEST_FOLDER_NAME,
    TEST_FOLDER_PERMALINK,
    TEST_CHILD_FOLDER_ID_1,
    TEST_CHILD_FOLDER_NAME_1,
    TEST_CHILD_FOLDER_PERMALINK_1,
    TEST_SHEET_ID,
    TEST_SHEET_NAME,
    TEST_SHEET_PERMALINK,
    TEST_REPORT_ID,
    TEST_REPORT_NAME,
    TEST_REPORT_PERMALINK,
    TEST_SIGHT_ID,
    TEST_SIGHT_NAME,
    TEST_SIGHT_PERMALINK,
    TEST_CREATED_AT,
    TEST_MODIFIED_AT,
    TEST_TEMPLATE_ID,
    TEST_TEMPLATE_NAME,
    TEST_TEMPLATE_PERMALINK,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Folders - getFolder endpoint tests', () => {
    const client = createClient();

    it('getFolder generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/folders/get-folder/all-response-body-properties'
            }
        };
        await client.folders.getFolder(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.url.includes(`/folders/${TEST_FOLDER_ID}`)).toBeTruthy();
    });

    it('getFolder all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/folders/get-folder/all-response-body-properties'
            }
        };
        const response = await client.folders.getFolder(options);
        
        expect(response).toBeTruthy();
        expect(response.id).toBe(TEST_FOLDER_ID);
        expect(response.name).toBe(TEST_FOLDER_NAME);
        expect(response.permalink).toBe(TEST_FOLDER_PERMALINK);
        
        // Check folders array
        expect(response.folders).toBeDefined();
        expect(response.folders?.length).toBe(1);
        expect(response.folders?.[0].id).toBe(TEST_CHILD_FOLDER_ID_1);
        expect(response.folders?.[0].name).toBe(TEST_CHILD_FOLDER_NAME_1);
        expect(response.folders?.[0].permalink).toBe(TEST_CHILD_FOLDER_PERMALINK_1);
        
        // Check sheets array
        expect(response.sheets).toBeDefined();
        expect(response.sheets?.length).toBe(1);
        expect(response.sheets?.[0].id).toBe(TEST_SHEET_ID);
        expect(response.sheets?.[0].name).toBe(TEST_SHEET_NAME);
        expect(response.sheets?.[0].permalink).toBe(TEST_SHEET_PERMALINK);
        
        // Check reports array
        expect(response.reports).toBeDefined();
        expect(response.reports?.length).toBe(1);
        expect(response.reports?.[0].id).toBe(TEST_REPORT_ID);
        expect(response.reports?.[0].name).toBe(TEST_REPORT_NAME);
        expect(response.reports?.[0].permalink).toBe(TEST_REPORT_PERMALINK);
        
        // Check sights array
        expect(response.sights).toBeDefined();
        expect(response.sights?.length).toBe(1);
        expect(response.sights?.[0].id).toBe(TEST_SIGHT_ID);
        expect(response.sights?.[0].name).toBe(TEST_SIGHT_NAME);
        expect(response.sights?.[0].permalink).toBe(TEST_SIGHT_PERMALINK);
        expect(response.sights?.[0].createdAt).toBe(TEST_CREATED_AT);
        expect(response.sights?.[0].modifiedAt).toBe(TEST_MODIFIED_AT);
        
        // Check templates array
        expect(response.templates).toBeDefined();
        expect(response.templates?.length).toBe(1);
        expect(response.templates?.[0].id).toBe(TEST_TEMPLATE_ID);
        expect(response.templates?.[0].name).toBe(TEST_TEMPLATE_NAME);
        expect(response.templates?.[0].permalink).toBe(TEST_TEMPLATE_PERMALINK);
    });

    it('getFolder required response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/folders/get-folder/required-response-body-properties'
            }
        };
        const response = await client.folders.getFolder(options);
        
        expect(response).toBeTruthy();
        expect(response.id).toBe(TEST_FOLDER_ID);
        expect(response.name).toBe(TEST_FOLDER_NAME);
        expect(response.permalink).toBe(TEST_FOLDER_PERMALINK);
        
        // Optional properties should be undefined
        expect(response.folders).toBeUndefined();
        expect(response.sheets).toBeUndefined();
        expect(response.reports).toBeUndefined();
        expect(response.sights).toBeUndefined();
        expect(response.templates).toBeUndefined();
    });

    it('getFolder error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.folders.getFolder(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('getFolder error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.folders.getFolder(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
