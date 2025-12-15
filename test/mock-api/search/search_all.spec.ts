import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import { SearchResultType } from '@smartsheet/search/types';
import {
    TEST_SHEET_ID,
    TEST_WORKSPACE_ID,
    TEST_FOLDER_ID,
    TEST_REPORT_ID,
    TEST_TEMPLATE_ID,
    TEST_DASHBOARD_ID,
    TEST_SHEET_NAME,
    TEST_WORKSPACE_NAME,
    TEST_FOLDER_NAME,
    TEST_REPORT_NAME,
    TEST_TEMPLATE_NAME,
    TEST_DASHBOARD_NAME,
    TEST_QUERY,
    TEST_TOTAL_COUNT,
    TEST_TOTAL_COUNT_REQUIRED,
    TEST_CONTEXT_DATA_1,
    TEST_CONTEXT_DATA_2,
    TEST_FOLDER_CONTEXT,
    TEST_REPORT_CONTEXT,
    TEST_TEMPLATE_CONTEXT,
    TEST_DASHBOARD_CONTEXT,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Search - searchAll endpoint tests', () => {
    const client = createClient();

    const TEST_LOCATION = 'personalWorkspace';
    const TEST_MODIFIED_SINCE = '2024-01-01T00:00:00Z';
    const TEST_INCLUDE = 'favoriteFlag';
    const TEST_SCOPES = [SearchResultType.Sheet, SearchResultType.Folder, SearchResultType.Report].join(',');

    it('searchAll generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                query: TEST_QUERY,
                location: TEST_LOCATION,
                modifiedSince: TEST_MODIFIED_SINCE,
                include: TEST_INCLUDE,
                scopes: TEST_SCOPES
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/search/search-all/all-response-body-properties'
            }
        };
        await client.search.searchAll(options);
        const matchedRequest = await findWireMockRequest(requestId);

        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual('/2.0/search');

        const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
        expect(queryParamsObject).toEqual({
            query: TEST_QUERY,
            location: TEST_LOCATION,
            modifiedSince: TEST_MODIFIED_SINCE,
            include: TEST_INCLUDE,
            scopes: TEST_SCOPES
        });
    });

    it('searchAll all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                query: TEST_QUERY
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/search/search-all/all-response-body-properties'
            }
        };
        const response = await client.search.searchAll(options);

        expect(response).toEqual({
            results: [
                {
                    contextData: [
                        TEST_CONTEXT_DATA_1,
                        TEST_CONTEXT_DATA_2
                    ],
                    favorite: true,
                    objectId: TEST_SHEET_ID,
                    objectType: 'sheet',
                    parentObjectFavorite: false,
                    parentObjectId: TEST_WORKSPACE_ID,
                    parentObjectName: TEST_WORKSPACE_NAME,
                    parentObjectType: 'workspace',
                    text: TEST_SHEET_NAME
                },
                {
                    contextData: [
                        TEST_FOLDER_CONTEXT
                    ],
                    favorite: false,
                    objectId: TEST_FOLDER_ID,
                    objectType: 'folder',
                    parentObjectFavorite: true,
                    parentObjectId: TEST_WORKSPACE_ID,
                    parentObjectName: TEST_WORKSPACE_NAME,
                    parentObjectType: 'workspace',
                    text: TEST_FOLDER_NAME
                },
                {
                    contextData: [
                        TEST_REPORT_CONTEXT
                    ],
                    favorite: true,
                    objectId: TEST_REPORT_ID,
                    objectType: 'report',
                    parentObjectFavorite: false,
                    parentObjectId: TEST_SHEET_ID,
                    parentObjectName: TEST_SHEET_NAME,
                    parentObjectType: 'sheet',
                    text: TEST_REPORT_NAME
                },
                {
                    contextData: [
                        TEST_TEMPLATE_CONTEXT
                    ],
                    favorite: false,
                    objectId: TEST_TEMPLATE_ID,
                    objectType: 'template',
                    text: TEST_TEMPLATE_NAME
                },
                {
                    contextData: [
                        TEST_DASHBOARD_CONTEXT
                    ],
                    favorite: true,
                    objectId: TEST_DASHBOARD_ID,
                    objectType: 'dashboard',
                    parentObjectFavorite: true,
                    parentObjectId: TEST_WORKSPACE_ID,
                    parentObjectName: TEST_WORKSPACE_NAME,
                    parentObjectType: 'workspace',
                    text: TEST_DASHBOARD_NAME
                }
            ],
            totalCount: TEST_TOTAL_COUNT
        });
    });

    it('searchAll required response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                query: TEST_QUERY
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/search/search-all/required-response-body-properties'
            }
        };
        const response = await client.search.searchAll(options);

        expect(response).toEqual({
            results: [
                {
                    contextData: [
                        'Sample context data'
                    ],
                    objectId: TEST_SHEET_ID,
                    objectType: 'sheet',
                    text: TEST_SHEET_NAME
                },
                {
                    contextData: [
                        TEST_FOLDER_CONTEXT
                    ],
                    objectId: TEST_FOLDER_ID,
                    objectType: 'folder',
                    text: TEST_FOLDER_NAME
                }
            ],
            totalCount: TEST_TOTAL_COUNT_REQUIRED
        });
    });

    it('searchAll error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                query: TEST_QUERY
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.search.searchAll(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('searchAll error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                query: TEST_QUERY
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.search.searchAll(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
