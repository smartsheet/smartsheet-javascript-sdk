const assert = require('assert');
const crypto = require('crypto');
const { createClient, findWireMockRequest } = require('../utils/utils.js');
const { TEST_USER_ID, TEST_PLAN_ID } = require('./common_test_constants.js');

describe('Users - removeUserFromPlan endpoint tests', function () {
    let client = createClient();

    it('removeUserFromPlan generated url is correct', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/remove-user-from-plan/all-response-body-properties'
            }
        };
        await client.users.removeUserFromPlan(options);
        const matchedRequest = await findWireMockRequest(requestId);

        assert.ok(matchedRequest.url.includes(`/users/${TEST_USER_ID}/plans/${TEST_PLAN_ID}`));
    });

    it('removeUserFromPlan all response body properties', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/remove-user-from-plan/all-response-body-properties'
            }
        };
        const response = await client.users.removeUserFromPlan(options);
        assert.ok(response);
        assert.strictEqual(response.message, 'SUCCESS');
        assert.strictEqual(response.resultCode, 0);
    });

    it('removeUserFromPlan error 500 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.users.removeUserFromPlan(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, 500);
            assert.strictEqual(error.message, 'Internal Server Error');
        }
    });

    it('removeUserFromPlan error 400 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.users.removeUserFromPlan(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, 400);
            assert.strictEqual(error.message, 'Malformed Request');
        }
    });
});
