import assert from 'assert';
import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils.js';
import {
    TEST_USER_ID,
    TEST_PLAN_ID,
    TEST_SUCCESS_MESSAGE,
    TEST_SUCCESS_RESULT_CODE,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants.js';

describe('Users - upgradeUser & downgradeUser endpoint tests', function () {
    let client = createClient();
    const TEST_UPGRADE_SEAT_TYPE = 'MEMBER';
    const TEST_DOWNGRADE_SEAT_TYPE = 'VIEWER';
    const TEST_UPGRADE_BODY = { seatType: TEST_UPGRADE_SEAT_TYPE };
    const TEST_DOWNGRADE_BODY = { seatType: TEST_DOWNGRADE_SEAT_TYPE };

    it('upgradeUser generated url is correct', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            body: TEST_UPGRADE_BODY,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/upgrade-user/all-response-body-properties'
            }
        };
        await client.users.upgradeUser(options);
        const matchedRequest = await findWireMockRequest(requestId);

        assert.ok(matchedRequest.url.includes(`/users/${TEST_USER_ID}/plans/${TEST_PLAN_ID}/upgrade`));
    });

    it('upgradeUser all response body properties', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            body: TEST_UPGRADE_BODY,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/upgrade-user/all-response-body-properties'
            }
        };
        const response = await client.users.upgradeUser(options);
        const matchedRequest = await findWireMockRequest(requestId);
        
        assert.ok(response);
        assert.strictEqual(response.message, TEST_SUCCESS_MESSAGE);
        assert.strictEqual(response.resultCode, TEST_SUCCESS_RESULT_CODE);
        
        let body = JSON.parse(matchedRequest.body);
        assert.deepStrictEqual(body, TEST_UPGRADE_BODY);
    });

    it('upgradeUser no seat type passed', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/upgrade-user/all-response-body-properties'
            }
        };
        const response = await client.users.upgradeUser(options);
        assert.ok(response);
        assert.strictEqual(response.message, TEST_SUCCESS_MESSAGE);
        assert.strictEqual(response.resultCode, TEST_SUCCESS_RESULT_CODE);
    });

    it('upgradeUser error 500 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            body: TEST_UPGRADE_BODY,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.users.upgradeUser(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_500_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_500_MESSAGE);
        }
    });

    it('upgradeUser error 400 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            body: TEST_UPGRADE_BODY,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.users.upgradeUser(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_400_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_400_MESSAGE);
        }
    });

    it('downgradeUser generated url is correct', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            body: TEST_DOWNGRADE_BODY,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/downgrade-user/all-response-body-properties'
            }
        };
        await client.users.downgradeUser(options);
        const matchedRequest = await findWireMockRequest(requestId);
        assert.ok(matchedRequest.url.includes(`/users/${TEST_USER_ID}/plans/${TEST_PLAN_ID}/downgrade`));
    });

    it('downgradeUser all response body properties', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            body: TEST_DOWNGRADE_BODY,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/downgrade-user/all-response-body-properties'
            }
        };
        const response = await client.users.downgradeUser(options);
        const matchedRequest = await findWireMockRequest(requestId);
        
        assert.ok(response);
        assert.strictEqual(response.message, TEST_SUCCESS_MESSAGE);
        assert.strictEqual(response.resultCode, TEST_SUCCESS_RESULT_CODE);
        
        let body = JSON.parse(matchedRequest.body);
        assert.deepStrictEqual(body, TEST_DOWNGRADE_BODY);
    });

    it('downgradeUser error 500 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            body: TEST_DOWNGRADE_BODY,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.users.downgradeUser(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_500_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_500_MESSAGE);
        }
    });

    it('downgradeUser error 400 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            body: TEST_DOWNGRADE_BODY,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.users.downgradeUser(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_400_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_400_MESSAGE);
        }
    });
});
