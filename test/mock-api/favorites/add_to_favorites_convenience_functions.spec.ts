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
import type { Favorite } from '@smartsheet/favorites/types';

describe('Favorites - addToFavorites convenience endpoint tests', () => {
    const client = createClient();

    it('addSheetToFavorites generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            objectId: TEST_SHEET_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/favorites/add-sheet-to-favorites/all-response-body-properties'
            }
        };
        await client.favorites.addSheetToFavorites(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.url.includes('/2.0/favorites')).toBeTruthy();
    });

    it('addSheetToFavorites all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            objectId: TEST_SHEET_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/favorites/add-sheet-to-favorites/all-response-body-properties'
            }
        };
        const response = await client.favorites.addSheetToFavorites(options);
        const matchedRequest = await findWireMockRequest(requestId);
        
        // Verify request body
        const requestBody = JSON.parse(matchedRequest.body);
        expect(requestBody.type).toBe(TEST_FAVORITE_TYPE_SHEET);
        expect(requestBody.objectId).toBe(TEST_SHEET_ID);
        
        // Verify response
        expect(response).toBeTruthy();
        expect(response.message).toBe(TEST_SUCCESS_MESSAGE);
        expect(response.resultCode).toBe(TEST_SUCCESS_RESULT_CODE);
        expect(response.result).toBeTruthy();
        const result = response.result as Favorite;
        expect(result.type).toBe(TEST_FAVORITE_TYPE_SHEET);
        expect(result.objectId).toBe(TEST_SHEET_ID);
    });

    it('addFolderToFavorites generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            objectId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/favorites/add-folder-to-favorites/all-response-body-properties'
            }
        };
        await client.favorites.addFolderToFavorites(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.url.includes('/2.0/favorites')).toBeTruthy();
    });

    it('addFolderToFavorites all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            objectId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/favorites/add-folder-to-favorites/all-response-body-properties'
            }
        };
        const response = await client.favorites.addFolderToFavorites(options);
        const matchedRequest = await findWireMockRequest(requestId);
        
        // Verify request body
        const requestBody = JSON.parse(matchedRequest.body);
        expect(requestBody.type).toBe(TEST_FAVORITE_TYPE_FOLDER);
        expect(requestBody.objectId).toBe(TEST_FOLDER_ID);
        
        // Verify response
        expect(response).toBeTruthy();
        expect(response.message).toBe(TEST_SUCCESS_MESSAGE);
        expect(response.resultCode).toBe(TEST_SUCCESS_RESULT_CODE);
        expect(response.result).toBeTruthy();
        const result = response.result as Favorite;
        expect(result.type).toBe(TEST_FAVORITE_TYPE_FOLDER);
        expect(result.objectId).toBe(TEST_FOLDER_ID);
    });

    it('addSheetToFavorites error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            objectId: TEST_SHEET_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.favorites.addSheetToFavorites(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('addSheetToFavorites error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            objectId: TEST_SHEET_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.favorites.addSheetToFavorites(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });

    it('addFolderToFavorites error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            objectId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.favorites.addFolderToFavorites(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('addFolderToFavorites error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            objectId: TEST_FOLDER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.favorites.addFolderToFavorites(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
