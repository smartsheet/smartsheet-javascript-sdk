import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_SHEET_ID,
    TEST_FOLDER_ID,
    TEST_FAVORITE_TYPE_SHEET,
    TEST_FAVORITE_TYPE_FOLDER,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE,
    TEST_INCLUDE_ALL,
    TEST_PAGE,
    TEST_PAGE_SIZE
} from './common_test_constants';

describe('Favorites - listFavorites endpoint tests', () => {
    const client = createClient();

    it('listFavorites generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                includeAll: TEST_INCLUDE_ALL,
                page: TEST_PAGE,
                pageSize: TEST_PAGE_SIZE
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/favorites/list-favorites/all-response-body-properties'
            }
        };
        await client.favorites.listFavorites(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual('/2.0/favorites');

        const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
        expect(queryParamsObject).toEqual({
            includeAll: TEST_INCLUDE_ALL.toString(),
            page: TEST_PAGE.toString(),
            pageSize: TEST_PAGE_SIZE.toString()
        });
    });

    it('listFavorites all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                includeAll: true
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/favorites/list-favorites/all-response-body-properties'
            }
        };
        const response = await client.favorites.listFavorites(options);
        
        // Verify response
        expect(response).toEqual({
            pageNumber: 1,
            pageSize: 100,
            totalPages: 1,
            totalCount: 2,
            data: [
                {
                    type: TEST_FAVORITE_TYPE_SHEET,
                    objectId: TEST_SHEET_ID
                },
                {
                    type: TEST_FAVORITE_TYPE_FOLDER,
                    objectId: TEST_FOLDER_ID
                }
            ]
        });
    });

    it('listFavorites error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                includeAll: true
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.favorites.listFavorites(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('listFavorites error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                includeAll: true
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.favorites.listFavorites(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
