import assert from 'assert';
import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import {
    TEST_USER_ID,
    TEST_ALTERNATE_EMAIL_ID,
    TEST_SUCCESS_MESSAGE,
    TEST_SUCCESS_RESULT_CODE,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Users - makeAlternateEmailPrimary endpoint tests', () => {
    let client = createClient();
    const TEST_EMAIL = 'alternate.email@smartsheet.com';
    const TEST_CONFIRMED = true;

    it('makeAlternateEmailPrimary generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            alternateEmailId: TEST_ALTERNATE_EMAIL_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/alternate-emails/make-alternate-email-primary/all-response-body-properties'
            }
        };
        await client.users.makeAlternateEmailPrimary(options);
        const matchedRequest = await findWireMockRequest(requestId);

        assert.ok(matchedRequest.url.includes(`/users/${TEST_USER_ID}/alternateemails/${TEST_ALTERNATE_EMAIL_ID}/makeprimary`));
    });

    it(
        'makeAlternateEmailPrimary all response body properties',
        async () => {
            const requestId = crypto.randomUUID();
            const options = {
                userId: TEST_USER_ID,
                alternateEmailId: TEST_ALTERNATE_EMAIL_ID,
                customProperties: {
                    'x-request-id': requestId,
                    'x-test-name': '/users/alternate-emails/make-alternate-email-primary/all-response-body-properties'
                }
            };
            const response = await client.users.makeAlternateEmailPrimary(options);
            assert.ok(response);
            assert.strictEqual(response.message, TEST_SUCCESS_MESSAGE);
            assert.strictEqual(response.resultCode, TEST_SUCCESS_RESULT_CODE);
            assert.ok(Array.isArray(response.data));
            assert.strictEqual(response.data.length, 1);
            assert.strictEqual(response.data[0].id, TEST_ALTERNATE_EMAIL_ID);
            assert.strictEqual(response.data[0].confirmed, TEST_CONFIRMED);
            assert.strictEqual(response.data[0].email, TEST_EMAIL);
        }
    );

    it('makeAlternateEmailPrimary error 500 response', async () => {
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
            await client.users.makeAlternateEmailPrimary(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_500_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_500_MESSAGE);
        }
    });

    it('makeAlternateEmailPrimary error 400 response', async () => {
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
            await client.users.makeAlternateEmailPrimary(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_400_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_400_MESSAGE);
        }
    });
});
