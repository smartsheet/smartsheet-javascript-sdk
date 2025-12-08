import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_SHEET_ID,
    TEST_FOLDER_ID,
    TEST_FAVORITE_TYPE_SHEET,
    TEST_SUCCESS_MESSAGE,
    TEST_SUCCESS_RESULT_CODE,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Favorites - removeMultipleFavorites endpoint tests', () => {
    const client = createClient();

    it('removeSheetsFromFavorites generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                objectIds: `${TEST_SHEET_ID},${TEST_FOLDER_ID}`
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/favorites/delete-multiple-favorites/all-response-body-properties'
            }
        };
        await client.favorites.removeSheetsFromFavorites(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.url.includes(`/2.0/favorites/${TEST_FAVORITE_TYPE_SHEET}`)).toBeTruthy();
        
        // Verify query parameters
        expect(matchedRequest.queryParams).toEqual({
            objectIds: {
                key: 'objectIds',
                values: [`${TEST_SHEET_ID},${TEST_FOLDER_ID}`]
            }
        });
    });

    it('removeSheetsFromFavorites all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                objectIds: `${TEST_SHEET_ID},${TEST_FOLDER_ID}`
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/favorites/delete-multiple-favorites/all-response-body-properties'
            }
        };
        const response = await client.favorites.removeSheetsFromFavorites(options);
        
        // Verify response
        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE
        });
    });

    it('removeSheetsFromFavorites with string array objectIds', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                objectIds: [TEST_SHEET_ID.toString(), TEST_FOLDER_ID.toString()]
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/favorites/delete-multiple-favorites/all-response-body-properties'
            }
        };
        const response = await client.favorites.removeSheetsFromFavorites(options);
        const matchedRequest = await findWireMockRequest(requestId);
        
        // Verify query parameters were transformed to comma-separated string
        expect(matchedRequest.queryParams).toEqual({
            objectIds: {
                key: 'objectIds',
                values: [`${TEST_SHEET_ID},${TEST_FOLDER_ID}`]
            }
        });
        
        // Verify response
        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE
        });
    });

    it('removeSheetsFromFavorites with number array objectIds', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                objectIds: [TEST_SHEET_ID, TEST_FOLDER_ID]
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/favorites/delete-multiple-favorites/all-response-body-properties'
            }
        };
        const response = await client.favorites.removeSheetsFromFavorites(options);
        const matchedRequest = await findWireMockRequest(requestId);
        
        // Verify query parameters were transformed to comma-separated string
        expect(matchedRequest.queryParams).toEqual({
            objectIds: {
                key: 'objectIds',
                values: [`${TEST_SHEET_ID},${TEST_FOLDER_ID}`]
            }
        });
        
        // Verify response
        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE
        });
    });

    it('removeSheetsFromFavorites with single number objectIds', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                objectIds: TEST_SHEET_ID
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/favorites/delete-multiple-favorites/all-response-body-properties'
            }
        };
        const response = await client.favorites.removeSheetsFromFavorites(options);
        const matchedRequest = await findWireMockRequest(requestId);
        
        // Verify query parameters
        expect(matchedRequest.queryParams).toEqual({
            objectIds: {
                key: 'objectIds',
                values: [`${TEST_SHEET_ID}`]
            }
        });
        
        // Verify response
        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE
        });
    });

    it('removeSheetsFromFavorites error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                objectIds: `${TEST_SHEET_ID},${TEST_FOLDER_ID}`
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.favorites.removeSheetsFromFavorites(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('removeSheetsFromFavorites error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                objectIds: `${TEST_SHEET_ID},${TEST_FOLDER_ID}`
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.favorites.removeSheetsFromFavorites(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
