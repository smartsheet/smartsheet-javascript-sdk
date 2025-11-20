import assert from 'assert';
import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import {
    TEST_USER_ID,
    TEST_SUCCESS_MESSAGE,
    TEST_SUCCESS_RESULT_CODE,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Users - removeUser endpoint tests', function () {
    let client = createClient();
    const transferToUserId = 9876543210987654;
    const transferSheets = true;
    const removeFromSharing = true;

    it('removeUser generated url is correct', async function () {
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

        assert.ok(matchedRequest.url.includes(`/2.0/users/${TEST_USER_ID}`));
    });

    it('removeUser with query parameters generated url is correct', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            queryParameters: {
                transferTo: transferToUserId,
                transferSheets: transferSheets,
                removeFromSharing: removeFromSharing
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/remove-user/all-response-body-properties'
            }
        };
        await client.users.removeUser(options);
        const matchedRequest = await findWireMockRequest(requestId);

        assert.ok(matchedRequest.url.includes(`/2.0/users/${TEST_USER_ID}`));
        const queryParams = matchedRequest.queryParams;
        const transferToActual = parseInt(queryParams.transferTo.values[0]);
        const transferSheetsActual = queryParams.transferSheets.values[0];
        const removeFromSharingActual = queryParams.removeFromSharing.values[0];
        assert.strictEqual(transferToActual, transferToUserId);
        assert.strictEqual(transferSheetsActual, transferSheets.toString());
        assert.strictEqual(removeFromSharingActual, removeFromSharing.toString());
    });

    it('removeUser all response body properties', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/remove-user/all-response-body-properties'
            }
        };
        const response = await client.users.removeUser(options);
        assert.ok(response);
        assert.strictEqual(response.message, TEST_SUCCESS_MESSAGE);
        assert.strictEqual(response.resultCode, TEST_SUCCESS_RESULT_CODE);
    });

    it('removeUser with transferTo all response body properties', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            queryParameters: {
                transferTo: transferToUserId,
                transferSheets: transferSheets
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/remove-user/all-response-body-properties'
            }
        };
        const response = await client.users.removeUser(options);
        assert.ok(response);
        assert.strictEqual(response.message, TEST_SUCCESS_MESSAGE);
        assert.strictEqual(response.resultCode, TEST_SUCCESS_RESULT_CODE);
    });

    it('removeUser error 500 response', async function () {
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
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_500_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_500_MESSAGE);
        }
    });

    it('removeUser error 400 response', async function () {
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
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_400_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_400_MESSAGE);
        }
    });
});
