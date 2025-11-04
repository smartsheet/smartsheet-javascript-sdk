const assert = require('assert');
const crypto = require('crypto');
const { createClient, findWireMockRequest } = require('../utils/utils.js');
const { TEST_USER_ID, TEST_PLAN_ID } = require('./common_test_constants.js');

describe('Users - listUserPlans endpoint tests', function () {
    const client = createClient();
    const lastKey = '12345678901234569';
    const maxItems = 100;
    const seatType = 'MEMBER';
    const seatTypeLastChangedAt = '2025-01-01T00:00:00.123456789Z';
    const provisionalExpirationDate = '2026-12-13T12:17:52.525696Z';
    const isInternalTrue = false;

    it('listUserPlans generated url is correct', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            queryParameters: {
                lastKey: lastKey,
                maxItems: maxItems
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/list-user-plans/all-response-body-properties'
            }
        };
        await client.users.listUserPlans(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const queryParams = matchedRequest.queryParams;
        const lastKeyActual = queryParams.lastKey.values[0];
        const maxItemsActual = parseInt(queryParams.maxItems.values[0]);
        
        assert.ok(matchedRequest.url.includes(`/users/${TEST_USER_ID}/plans`));
        assert.strictEqual(lastKeyActual, lastKey);
        assert.strictEqual(maxItemsActual, maxItems);
    });

    it('listUserPlans all response body properties', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            queryParameters: {
                lastKey: lastKey,
                maxItems: maxItems
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/list-user-plans/all-response-body-properties'
            }
        };
        const response = await client.users.listUserPlans(options);
        
        assert.ok(response);
        assert.strictEqual(response.lastKey, lastKey);
        assert.strictEqual(response.data[0].planId, TEST_PLAN_ID);
        assert.strictEqual(response.data[0].seatType, seatType);
        assert.strictEqual(response.data[0].seatTypeLastChangedAt, seatTypeLastChangedAt);
        assert.strictEqual(response.data[0].provisionalExpirationDate, provisionalExpirationDate);
        assert.strictEqual(response.data[0].isInternal, isInternalTrue);
    });

    it('listUserPlans required response body properties', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/list-user-plans/required-response-body-properties'
            }
        };
        const response = await client.users.listUserPlans(options);
        
        assert.ok(response);
        assert.strictEqual(response.data[0].planId, TEST_PLAN_ID);
        assert.strictEqual(response.data[0].seatType, seatType);
        assert.strictEqual(response.data[0].seatTypeLastChangedAt, undefined);
        assert.strictEqual(response.data[0].provisionalExpirationDate, undefined);
        assert.strictEqual(response.data[0].isInternal, isInternalTrue);
    });

    it('listUserPlans error 500 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.users.listUserPlans(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, 500);
            assert.strictEqual(error.message, 'Internal Server Error');
        }
    });

    it('listUserPlans error 400 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.users.listUserPlans(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, 400);
            assert.strictEqual(error.message, 'Malformed Request');
        }
    });
});
