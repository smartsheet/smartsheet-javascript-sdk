const assert = require('assert');
const crypto = require('crypto');
const { createClient, findWireMockRequest } = require('../utils/utils.js');
const { TEST_USER_ID, TEST_PLAN_ID } = require('./common_test_constants.js');

describe('Users - upgradeUser & downgradeUser endpoint tests', function () {
    let client = createClient();
    const TEST_UPGRADE_SEAT_TYPE = 'MEMBER';
    const TEST_DOWNGRADE_SEAT_TYPE = 'VIEWER';

    it('upgradeUser generated url is correct', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            body: { 
                seatType: TEST_UPGRADE_SEAT_TYPE
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/upgrade-user/all-response-body-properties'
            }
        };
        await client.users.upgradeUser(options);
        const matchedRequest = await findWireMockRequest(requestId);

        assert.ok(matchedRequest.url.includes(`/users/${TEST_USER_ID}/plans/${TEST_PLAN_ID}/upgrade`));
        let body = JSON.parse(matchedRequest.body);
        assert.strictEqual(body.seatType, TEST_UPGRADE_SEAT_TYPE);
    });

    it('upgradeUser all response body properties', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            body: { seatType: TEST_UPGRADE_SEAT_TYPE },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/upgrade-user/all-response-body-properties'
            }
        };
        const response = await client.users.upgradeUser(options);
        assert.ok(response);
        assert.strictEqual(response.message, 'SUCCESS');
        assert.strictEqual(response.resultCode, 0);
    });

    it('upgradeUser no seat type passed', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            body: { },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/upgrade-user/all-response-body-properties'
            }
        };
        const response = await client.users.upgradeUser(options);
        assert.ok(response);
        assert.strictEqual(response.message, 'SUCCESS');
        assert.strictEqual(response.resultCode, 0);
    });

    it('upgradeUser error 500 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            body: { seatType: TEST_UPGRADE_SEAT_TYPE },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.users.upgradeUser(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, 500);
            assert.strictEqual(error.message, 'Internal Server Error');
        }
    });

    it('upgradeUser error 400 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            body: { seatType: TEST_UPGRADE_SEAT_TYPE },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.users.upgradeUser(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, 400);
            assert.strictEqual(error.message, 'Malformed Request');
        }
    });

    it('downgradeUser generated url is correct', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            body: { seatType: TEST_DOWNGRADE_SEAT_TYPE },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/downgrade-user/all-response-body-properties'
            }
        };
        await client.users.downgradeUser(options);
        const matchedRequest = await findWireMockRequest(requestId);
        assert.ok(matchedRequest.url.includes(`/users/${TEST_USER_ID}/plans/${TEST_PLAN_ID}/downgrade`));
        let body = JSON.parse(matchedRequest.body);
        assert.strictEqual(body.seatType, TEST_DOWNGRADE_SEAT_TYPE);
    });

    it('downgradeUser all response body properties', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            body: { seatType: TEST_DOWNGRADE_SEAT_TYPE },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/downgrade-user/all-response-body-properties'
            }
        };
        const response = await client.users.downgradeUser(options);
        assert.ok(response);
        assert.strictEqual(response.message, 'SUCCESS');
        assert.strictEqual(response.resultCode, 0);
    });

    it('downgradeUser error 500 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            body: { seatType: TEST_DOWNGRADE_SEAT_TYPE },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.users.downgradeUser(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, 500);
            assert.strictEqual(error.message, 'Internal Server Error');
        }
    });

    it('downgradeUser error 400 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            body: { seatType: TEST_DOWNGRADE_SEAT_TYPE },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.users.downgradeUser(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, 400);
            assert.strictEqual(error.message, 'Malformed Request');
        }
    });
});
