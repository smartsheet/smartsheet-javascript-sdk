import assert from 'assert';
import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils.js';
import {
    TEST_USER_ID,
    TEST_ALTERNATE_EMAIL_ID,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants.js';

describe('Users - getAlternateEmail endpoint tests', function () {
    let client = createClient();
    const TEST_EMAIL = 'alternate.email@smartsheet.com';
    const TEST_CONFIRMED = true;

    it('getAlternateEmail generated url is correct', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            alternateEmailId: TEST_ALTERNATE_EMAIL_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/alternate-emails/get-alternate-email/all-response-body-properties'
            }
        };
        await client.users.getAlternateEmail(options);
        const matchedRequest = await findWireMockRequest(requestId);

        assert.ok(matchedRequest.url.includes(`/users/${TEST_USER_ID}/alternateemails/${TEST_ALTERNATE_EMAIL_ID}`));
    });

    it('getAlternateEmail all response body properties', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            alternateEmailId: TEST_ALTERNATE_EMAIL_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/alternate-emails/get-alternate-email/all-response-body-properties'
            }
        };
        const response = await client.users.getAlternateEmail(options);
        assert.ok(response);
        assert.strictEqual(response.id, TEST_ALTERNATE_EMAIL_ID);
        assert.strictEqual(response.confirmed, TEST_CONFIRMED);
        assert.strictEqual(response.email, TEST_EMAIL);
    });

    it('getAlternateEmail error 500 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            alternateEmailId: TEST_ALTERNATE_EMAIL_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.users.getAlternateEmail(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_500_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_500_MESSAGE);
        }
    });

    it('getAlternateEmail error 400 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            alternateEmailId: TEST_ALTERNATE_EMAIL_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.users.getAlternateEmail(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_400_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_400_MESSAGE);
        }
    });
});
