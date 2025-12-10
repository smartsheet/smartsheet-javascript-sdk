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
import type { FavoriteType } from '@smartsheet/favorites/types';

describe('Favorites - addItemsToFavorites endpoint tests', () => {
    const client = createClient();

    it('addMultipleToFavorites generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            body: [
                {
                    type: TEST_FAVORITE_TYPE_SHEET as FavoriteType,
                    objectId: TEST_SHEET_ID
                },
                {
                    type: TEST_FAVORITE_TYPE_FOLDER as FavoriteType,
                    objectId: TEST_FOLDER_ID
                }
            ],
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/favorites/add-multiple-favorites/all-response-body-properties'
            }
        };
        await client.favorites.addMultipleToFavorites(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual('/2.0/favorites');
    });

    it('addMultipleToFavorites all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            body: [
                {
                    type: TEST_FAVORITE_TYPE_SHEET as FavoriteType,
                    objectId: TEST_SHEET_ID
                },
                {
                    type: TEST_FAVORITE_TYPE_FOLDER as FavoriteType,
                    objectId: TEST_FOLDER_ID
                }
            ],
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/favorites/add-multiple-favorites/all-response-body-properties'
            }
        };
        const response = await client.favorites.addMultipleToFavorites(options);
        const matchedRequest = await findWireMockRequest(requestId);
        
        // Verify request body
        const requestBody = JSON.parse(matchedRequest.body);
        expect(requestBody).toEqual([
            {
                type: TEST_FAVORITE_TYPE_SHEET,
                objectId: TEST_SHEET_ID
            },
            {
                type: TEST_FAVORITE_TYPE_FOLDER,
                objectId: TEST_FOLDER_ID
            }
        ]);
        
        // Verify response
        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE,
            result: [
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

    it('addMultipleToFavorites error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            body: [
                {
                    type: TEST_FAVORITE_TYPE_SHEET as FavoriteType,
                    objectId: TEST_SHEET_ID
                },
                {
                    type: TEST_FAVORITE_TYPE_FOLDER as FavoriteType,
                    objectId: TEST_FOLDER_ID
                }
            ],
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.favorites.addMultipleToFavorites(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('addMultipleToFavorites error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            body: [
                {
                    type: TEST_FAVORITE_TYPE_SHEET as FavoriteType,
                    objectId: TEST_SHEET_ID
                },
                {
                    type: TEST_FAVORITE_TYPE_FOLDER as FavoriteType,
                    objectId: TEST_FOLDER_ID
                }
            ],
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.favorites.addMultipleToFavorites(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
