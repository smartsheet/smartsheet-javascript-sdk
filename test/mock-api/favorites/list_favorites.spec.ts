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
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Favorites - listFavorites endpoint tests', () => {
    const client = createClient();

    it('listFavorites generated url is correct', async () => {
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
        await client.favorites.listFavorites(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.url.includes('/2.0/favorites')).toBeTruthy();
        
        // Verify query parameters
        const queryParams = matchedRequest.queryParams;
        expect(queryParams.includeAll).toBeTruthy();
        expect(queryParams.includeAll.values[0]).toBe('true');
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
        
        // Verify response structure
        expect(response).toBeTruthy();
        expect(response.pageNumber).toBe(1);
        expect(response.pageSize).toBe(100);
        expect(response.totalPages).toBe(1);
        expect(response.totalCount).toBe(2);
        expect(response.data).toBeTruthy();
        expect(Array.isArray(response.data)).toBe(true);
        expect(response.data.length).toBe(2);
        
        // Verify first favorite (sheet)
        expect(response.data[0].type).toBe(TEST_FAVORITE_TYPE_SHEET);
        expect(response.data[0].objectId).toBe(TEST_SHEET_ID);
        
        // Verify second favorite (folder)
        expect(response.data[1].type).toBe(TEST_FAVORITE_TYPE_FOLDER);
        expect(response.data[1].objectId).toBe(TEST_FOLDER_ID);
    });

    it('listFavorites with pagination parameters', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                page: 1,
                pageSize: 50
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/favorites/list-favorites/all-response-body-properties'
            }
        };
        const response = await client.favorites.listFavorites(options);
        const matchedRequest = await findWireMockRequest(requestId);
        
        // Verify query parameters
        const queryParams = matchedRequest.queryParams;
        expect(queryParams.page).toBeTruthy();
        expect(queryParams.page.values[0]).toBe('1');
        expect(queryParams.pageSize).toBeTruthy();
        expect(queryParams.pageSize.values[0]).toBe('50');
        
        // Verify response
        expect(response).toBeTruthy();
        expect(response.data).toBeTruthy();
        expect(Array.isArray(response.data)).toBe(true);
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
