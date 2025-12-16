import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_SHEET_ID,
    TEST_ROW_ID,
    TEST_ROW_ID_2,
    TEST_DISCUSSION_ID,
    TEST_ATTACHMENT_ID,
    TEST_PROJECT_SHEET_NAME,
    TEST_QUERY,
    TEST_TOTAL_COUNT_SHEET,
    TEST_TOTAL_COUNT_SHEET_REQUIRED,
    TEST_ROW_CONTEXT_1,
    TEST_ROW_CONTEXT_2,
    TEST_DISCUSSION_CONTEXT,
    TEST_ATTACHMENT_CONTEXT,
    TEST_ROW_NAME_1,
    TEST_ROW_NAME_2,
    TEST_DISCUSSION_NAME,
    TEST_ATTACHMENT_NAME,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Search - searchSheet endpoint tests', () => {
    const client = createClient();

    it('searchSheet generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            sheetId: TEST_SHEET_ID.toString(),
            queryParameters: {
                query: TEST_QUERY
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/search/search-sheet/all-response-body-properties'
            }
        };
        await client.search.searchSheet(options);
        const matchedRequest = await findWireMockRequest(requestId);

        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual(`/2.0/search/sheets/${TEST_SHEET_ID}`);

        const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
        expect(queryParamsObject).toEqual({
            query: TEST_QUERY
        });
    });

    it('searchSheet all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            sheetId: TEST_SHEET_ID.toString(),
            queryParameters: {
                query: TEST_QUERY
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/search/search-sheet/all-response-body-properties'
            }
        };
        const response = await client.search.searchSheet(options);

        expect(response).toEqual({
            results: [
                {
                    contextData: [
                        TEST_ROW_CONTEXT_1
                    ],
                    favorite: false,
                    objectId: TEST_ROW_ID,
                    objectType: 'row',
                    parentObjectFavorite: true,
                    parentObjectId: TEST_SHEET_ID,
                    parentObjectName: TEST_PROJECT_SHEET_NAME,
                    parentObjectType: 'sheet',
                    text: TEST_ROW_NAME_1
                },
                {
                    contextData: [
                        TEST_ROW_CONTEXT_2
                    ],
                    favorite: false,
                    objectId: TEST_ROW_ID_2,
                    objectType: 'row',
                    parentObjectFavorite: true,
                    parentObjectId: TEST_SHEET_ID,
                    parentObjectName: TEST_PROJECT_SHEET_NAME,
                    parentObjectType: 'sheet',
                    text: TEST_ROW_NAME_2
                },
                {
                    contextData: [
                        TEST_DISCUSSION_CONTEXT
                    ],
                    favorite: true,
                    objectId: TEST_DISCUSSION_ID,
                    objectType: 'discussion',
                    parentObjectFavorite: true,
                    parentObjectId: TEST_SHEET_ID,
                    parentObjectName: TEST_PROJECT_SHEET_NAME,
                    parentObjectType: 'sheet',
                    text: TEST_DISCUSSION_NAME
                },
                {
                    contextData: [
                        TEST_ATTACHMENT_CONTEXT
                    ],
                    favorite: false,
                    objectId: TEST_ATTACHMENT_ID,
                    objectType: 'attachment',
                    parentObjectFavorite: true,
                    parentObjectId: TEST_SHEET_ID,
                    parentObjectName: TEST_PROJECT_SHEET_NAME,
                    parentObjectType: 'sheet',
                    text: TEST_ATTACHMENT_NAME
                }
            ],
            totalCount: TEST_TOTAL_COUNT_SHEET
        });
    });

    it('searchSheet required response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            sheetId: TEST_SHEET_ID.toString(),
            queryParameters: {
                query: TEST_QUERY
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/search/search-sheet/required-response-body-properties'
            }
        };
        const response = await client.search.searchSheet(options);

        expect(response).toEqual({
            results: [
                {
                    contextData: [
                        TEST_ROW_CONTEXT_1
                    ],
                    objectId: TEST_ROW_ID,
                    objectType: 'row',
                    text: TEST_ROW_NAME_1
                },
                {
                    contextData: [
                        TEST_ROW_CONTEXT_2
                    ],
                    objectId: TEST_ROW_ID_2,
                    objectType: 'row',
                    text: TEST_ROW_NAME_2
                }
            ],
            totalCount: TEST_TOTAL_COUNT_SHEET_REQUIRED
        });
    });

    it('searchSheet error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            sheetId: TEST_SHEET_ID.toString(),
            queryParameters: {
                query: TEST_QUERY
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.search.searchSheet(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('searchSheet error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            sheetId: TEST_SHEET_ID.toString(),
            queryParameters: {
                query: TEST_QUERY
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.search.searchSheet(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
