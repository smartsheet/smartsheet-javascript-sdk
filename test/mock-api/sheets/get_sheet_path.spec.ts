import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import { APIAccessLevel } from '@smartsheet/types';
import { getLeafSheet, getLeafSheetPath } from '@smartsheet/sheets/types';
import {
    TEST_SHEET_ID,
    TEST_SHEET_CREATED_AT,
    TEST_SHEET_MODIFIED_AT,
    TEST_PATH_WORKSPACE_ID,
    TEST_PATH_WORKSPACE_NAME,
    TEST_PATH_WORKSPACE_PERMALINK,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE,
} from './common_test_constants';

describe('Sheets - getSheetPath endpoint tests', () => {
    const client = createClient();

    it('getSheetPath generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            sheetId: TEST_SHEET_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/sheets/get-nested-sheet-path/all-response-body-properties',
            },
        };
        await client.sheets.getSheetPath(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual(`/2.0/sheets/${TEST_SHEET_ID}/path`);
        expect(matchedRequest.method).toEqual('GET');
        const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
        expect(queryParamsObject).toEqual({});
    });

    it('getSheetPath all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            sheetId: TEST_SHEET_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/sheets/get-nested-sheet-path/all-response-body-properties',
            },
        };
        const response = await client.sheets.getSheetPath(options);
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
                            sheets: [
                                {
                                    id: 3456789012345678,
                                    name: 'Project Plan',
                                    permalink: 'https://app.smartsheet.com/sheets/3456789012345678',
                                    accessLevel: APIAccessLevel.admin,
                                    createdAt: TEST_SHEET_CREATED_AT,
                                    modifiedAt: TEST_SHEET_MODIFIED_AT,
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    });

    it('getSheetPath root level response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            sheetId: TEST_SHEET_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/sheets/get-root-sheet-path/all-response-body-properties',
            },
        };
        const response = await client.sheets.getSheetPath(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.body).toEqual('');
        expect(response).toEqual({
            id: TEST_PATH_WORKSPACE_ID,
            name: TEST_PATH_WORKSPACE_NAME,
            permalink: TEST_PATH_WORKSPACE_PERMALINK,
            accessLevel: APIAccessLevel.owner,
            sheets: [
                {
                    id: 5678901234567890,
                    name: 'Root Level Sheet',
                    permalink: 'https://app.smartsheet.com/sheets/rootlevel',
                    accessLevel: APIAccessLevel.admin,
                    createdAt: TEST_SHEET_CREATED_AT,
                    modifiedAt: TEST_SHEET_MODIFIED_AT,
                },
            ],
        });
    });

    it('getSheetPath returns SheetPathNode compatible with getLeafSheet and getLeafSheetPath', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            sheetId: TEST_SHEET_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/sheets/get-nested-sheet-path/all-response-body-properties',
            },
        };
        const response = await client.sheets.getSheetPath(options);

        expect(getLeafSheet(response)).toEqual({
            id: 3456789012345678,
            name: 'Project Plan',
            permalink: 'https://app.smartsheet.com/sheets/3456789012345678',
            accessLevel: APIAccessLevel.admin,
            createdAt: TEST_SHEET_CREATED_AT,
            modifiedAt: TEST_SHEET_MODIFIED_AT,
        });
        expect(getLeafSheetPath(response)).toEqual('/Sample Workspace/Project Plans/Project Plan');
    });

    it('getSheetPath error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            sheetId: TEST_SHEET_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response',
            },
        };
        try {
            await client.sheets.getSheetPath(options);
            expect(true).toBe(false);
        } catch (error: any) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('getSheetPath error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            sheetId: TEST_SHEET_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response',
            },
        };
        try {
            await client.sheets.getSheetPath(options);
            expect(true).toBe(false);
        } catch (error: any) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
