import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_FOLDER_ID,
    TEST_PATH_WORKSPACE_ID,
    TEST_PATH_WORKSPACE_NAME,
    TEST_PATH_WORKSPACE_PERMALINK,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE,
} from './common_test_constants';
import { APIAccessLevel } from '@smartsheet/types';
import { getLeafFolder, getLeafFolderPath } from '@smartsheet/folders/types';

describe('Folders - getFolderPath endpoint tests', () => {
    const client = createClient();

    it('getFolderPath generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/folders/get-nested-folder-path/all-response-body-properties',
            },
        };
        await client.folders.getFolderPath(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual(`/2.0/folders/${TEST_FOLDER_ID}/path`);
        expect(matchedRequest.method).toEqual('GET');
        const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
        expect(queryParamsObject).toEqual({});
    });

    it('getFolderPath all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/folders/get-nested-folder-path/all-response-body-properties',
            },
        };
        const response = await client.folders.getFolderPath(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.body).toEqual('');
        expect(response).toEqual({
            id: TEST_PATH_WORKSPACE_ID,
            name: TEST_PATH_WORKSPACE_NAME,
            permalink: TEST_PATH_WORKSPACE_PERMALINK,
            accessLevel: APIAccessLevel.owner,
            folders: [
                {
                    id: 1234567890123456,
                    name: 'Project Plans',
                    permalink: 'https://app.smartsheet.com/folders/1234567890123456',
                    folders: [
                        {
                            id: 2345678901234567,
                            name: 'Project Plans Subfolder',
                            permalink: 'https://app.smartsheet.com/folders/2345678901234567',
                            folders: [
                                {
                                    id: 3456789012345678,
                                    name: 'Project Plans Sub-Subfolder',
                                    permalink: 'https://app.smartsheet.com/folders/3456789012345678',
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    });

    it('getFolderPath root level response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/folders/get-root-folder-path/all-response-body-properties',
            },
        };
        const response = await client.folders.getFolderPath(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.body).toEqual('');
        expect(response).toEqual({
            id: TEST_PATH_WORKSPACE_ID,
            name: TEST_PATH_WORKSPACE_NAME,
            permalink: TEST_PATH_WORKSPACE_PERMALINK,
            accessLevel: APIAccessLevel.owner,
            folders: [
                {
                    id: 5678901234567890,
                    name: 'Root Level Folder',
                    permalink: 'https://app.smartsheet.com/folders/rootlevel',
                },
            ],
        });
    });

    it('getFolderPath returns FolderPathNode compatible with getLeafFolder and getLeafFolderPath', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/folders/get-nested-folder-path/all-response-body-properties',
            },
        };
        const response = await client.folders.getFolderPath(options);

        expect(getLeafFolder(response)).toEqual({
            id: 3456789012345678,
            name: 'Project Plans Sub-Subfolder',
            permalink: 'https://app.smartsheet.com/folders/3456789012345678',
        });
        expect(getLeafFolderPath(response)).toEqual(
            '/Sample Workspace/Project Plans/Project Plans Subfolder/Project Plans Sub-Subfolder'
        );
    });

    it('getFolderPath error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response',
            },
        };
        try {
            await client.folders.getFolderPath(options);
            expect(true).toBe(false);
        } catch (error: any) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('getFolderPath error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            folderId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response',
            },
        };
        try {
            await client.folders.getFolderPath(options);
            expect(true).toBe(false);
        } catch (error: any) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
