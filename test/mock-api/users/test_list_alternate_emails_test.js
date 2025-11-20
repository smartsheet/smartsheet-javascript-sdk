import assert from 'assert';
import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import {
    TEST_USER_ID,
    TEST_ALTERNATE_EMAIL_ID,
    TEST_ALTERNATE_EMAIL,
    TEST_PAGE_NUMBER,
    TEST_PAGE_SIZE,
    TEST_TOTAL_PAGES,
    TEST_TOTAL_COUNT,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Users - listAlternateEmails endpoint tests', function () {
    let client = createClient();
    const TEST_ALTERNATE_EMAIL_ID_1 = TEST_ALTERNATE_EMAIL_ID;
    const TEST_EMAIL_1 = TEST_ALTERNATE_EMAIL;
    const TEST_CONFIRMED_1 = true;
    it('listAlternateEmails generated url is correct', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/alternate-emails/list-alternate-emails/all-response-body-properties'
            }
        };
        await client.users.listAlternateEmails(options);
        const matchedRequest = await findWireMockRequest(requestId);

        assert.ok(matchedRequest.url.includes(`/users/${TEST_USER_ID}/alternateemails`));
    });

    it('listAlternateEmails all response body properties', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/alternate-emails/list-alternate-emails/all-response-body-properties'
            }
        };
        const response = await client.users.listAlternateEmails(options);
        assert.ok(response);
        assert.strictEqual(response.pageNumber, TEST_PAGE_NUMBER);
        assert.strictEqual(response.pageSize, TEST_PAGE_SIZE);
        assert.strictEqual(response.totalPages, TEST_TOTAL_PAGES);
        assert.strictEqual(response.totalCount, TEST_TOTAL_COUNT);
        assert.strictEqual(response.data.length, 1);
        assert.strictEqual(response.data[0].id, TEST_ALTERNATE_EMAIL_ID_1);
        assert.strictEqual(response.data[0].confirmed, TEST_CONFIRMED_1);
        assert.strictEqual(response.data[0].email, TEST_EMAIL_1);
    });

    it('listAlternateEmails error 500 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.users.listAlternateEmails(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_500_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_500_MESSAGE);
        }
    });

    it('listAlternateEmails error 400 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.users.listAlternateEmails(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_400_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_400_MESSAGE);
        }
    });
});
