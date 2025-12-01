import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_SHEET_ID,
    TEST_FOLDER_ID,
    TEST_FAVORITE_TYPE_SHEET,
    TEST_FAVORITE_TYPE_FOLDER,
    TEST_SUCCESS_MESSAGE,
    TEST_SUCCESS_RESULT_CODE,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Favorites - removeFromFavorites convenience endpoint tests', () => {
    const client = createClient();

    it('removeSheetFromFavorites generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            favoriteId: TEST_SHEET_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/favorites/remove-from-favorites/all-response-body-properties'
            }
        };
        await client.favorites.removeSheetFromFavorites(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.url.includes(`/2.0/favorites/${TEST_FAVORITE_TYPE_SHEET}/${TEST_SHEET_ID}`)).toBeTruthy();
    });

    it('removeSheetFromFavorites all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            favoriteId: TEST_SHEET_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/favorites/remove-from-favorites/all-response-body-properties'
            }
        };
        const response = await client.favorites.removeSheetFromFavorites(options);
        const matchedRequest = await findWireMockRequest(requestId);
        
        // Verify URL contains the correct favorite type and ID
        expect(matchedRequest.url.includes(`/2.0/favorites/${TEST_FAVORITE_TYPE_SHEET}/${TEST_SHEET_ID}`)).toBeTruthy();
        
        // Verify response
        expect(response).toBeTruthy();
        expect(response.message).toBe(TEST_SUCCESS_MESSAGE);
        expect(response.resultCode).toBe(TEST_SUCCESS_RESULT_CODE);
    });

    it('removeFolderFromFavorites generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            favoriteId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/favorites/remove-from-favorites/all-response-body-properties'
            }
        };
        await client.favorites.removeFolderFromFavorites(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.url.includes(`/2.0/favorites/${TEST_FAVORITE_TYPE_FOLDER}/${TEST_FOLDER_ID}`)).toBeTruthy();
    });

    it('removeFolderFromFavorites all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            favoriteId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/favorites/remove-from-favorites/all-response-body-properties'
            }
        };
        const response = await client.favorites.removeFolderFromFavorites(options);
        const matchedRequest = await findWireMockRequest(requestId);
        
        // Verify URL contains the correct favorite type and ID
        expect(matchedRequest.url.includes(`/2.0/favorites/${TEST_FAVORITE_TYPE_FOLDER}/${TEST_FOLDER_ID}`)).toBeTruthy();
        
        // Verify response
        expect(response).toBeTruthy();
        expect(response.message).toBe(TEST_SUCCESS_MESSAGE);
        expect(response.resultCode).toBe(TEST_SUCCESS_RESULT_CODE);
    });

    it('removeSheetFromFavorites error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            favoriteId: TEST_SHEET_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.favorites.removeSheetFromFavorites(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('removeSheetFromFavorites error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            favoriteId: TEST_SHEET_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.favorites.removeSheetFromFavorites(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });

    it('removeFolderFromFavorites error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            favoriteId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.favorites.removeFolderFromFavorites(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('removeFolderFromFavorites error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            favoriteId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.favorites.removeFolderFromFavorites(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
