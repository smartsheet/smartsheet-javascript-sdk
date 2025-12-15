import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_USER_ID,
    TEST_SUCCESS_MESSAGE,
    TEST_SUCCESS_RESULT_CODE,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE,
    TEST_TRANSFER_TO_USER_ID,
    TEST_TRANSFER_SHEETS,
    TEST_REMOVE_FROM_SHARING
} from './common_test_constants';

describe('Users - removeUser endpoint tests', () => {
    const client = createClient();

    it('removeUser generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/remove-user/all-response-body-properties'
            }
        };
        await client.users.removeUser(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual(`/2.0/users/${TEST_USER_ID}`);
    });

    it(
        'removeUser with query parameters generated url is correct',
        async () => {
            const requestId = crypto.randomUUID();
            const options = {
                userId: TEST_USER_ID,
                queryParameters: {
                    transferTo: TEST_TRANSFER_TO_USER_ID,
                    transferSheets: TEST_TRANSFER_SHEETS,
                    removeFromSharing: TEST_REMOVE_FROM_SHARING
                },
                customProperties: {
                    'x-request-id': requestId,
                    'x-test-name': '/users/remove-user/all-response-body-properties'
                }
            };
            await client.users.removeUser(options);
            const matchedRequest = await findWireMockRequest(requestId);
            const parsedUrl = new URL(matchedRequest.absoluteUrl);
            expect(parsedUrl.pathname).toEqual(`/2.0/users/${TEST_USER_ID}`);

            const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
            expect(queryParamsObject).toEqual({
                transferTo: TEST_TRANSFER_TO_USER_ID.toString(),
                transferSheets: TEST_TRANSFER_SHEETS.toString(),
                removeFromSharing: TEST_REMOVE_FROM_SHARING.toString()
            });
        }
    );

    it('removeUser all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/remove-user/all-response-body-properties'
            }
        };
        const response = await client.users.removeUser(options);
        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE
        });
    });

    it(
        'removeUser with transferTo all response body properties',
        async () => {
            const requestId = crypto.randomUUID();
            const options = {
                userId: TEST_USER_ID,
                queryParameters: {
                    transferTo: TEST_TRANSFER_TO_USER_ID,
                    transferSheets: TEST_TRANSFER_SHEETS
                },
                customProperties: {
                    'x-request-id': requestId,
                    'x-test-name': '/users/remove-user/all-response-body-properties'
                }
            };
            const response = await client.users.removeUser(options);
            expect(response).toEqual({
                message: TEST_SUCCESS_MESSAGE,
                resultCode: TEST_SUCCESS_RESULT_CODE
            });
        }
    );

    it('removeUser error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.users.removeUser(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('removeUser error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.users.removeUser(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
