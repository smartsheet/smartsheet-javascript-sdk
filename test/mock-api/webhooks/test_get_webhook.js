const assert = require('assert');
const crypto = require('crypto');
const { createClient, findWireMockRequest } = require('../utils/utils.js');
const {
    TEST_WEBHOOK_ID,
    TEST_WEBHOOK_NAME,
    TEST_CALLBACK_URL,
    TEST_SCOPE_SHEET,
    TEST_SCOPE_PLAN,
    TEST_SCOPE_OBJECT_ID,
    TEST_EVENTS,
    TEST_VERSION,
    TEST_ENABLED,
    TEST_STATUS,
    TEST_SHARED_SECRET,
    TEST_CREATED_AT,
    TEST_MODIFIED_AT,
    TEST_DISABLED_DETAILS,
    TEST_API_CLIENT_ID,
    TEST_API_CLIENT_NAME,
    TEST_LAST_CALLBACK_ATTEMPT,
    TEST_LAST_SUCCESSFUL_CALLBACK,
    TEST_LAST_CALLBACK_ATTEMPT_RETRY_COUNT,
    TEST_COLUMN_IDS,
    TEST_CUSTOM_HEADERS,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} = require('./common_test_constants.js');

describe('Webhooks - getWebhook endpoint tests', function () {
    let client = createClient();

    it('getWebhook generated url is correct', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            webhookId: TEST_WEBHOOK_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/webhooks/get-sheet-webhook/all-response-body-properties'
            }
        };
        await client.webhooks.getWebhook(options);
        const matchedRequest = await findWireMockRequest(requestId);

        assert.ok(matchedRequest.url.includes(`/webhooks/${TEST_WEBHOOK_ID}`));
    });

    it('getWebhook sheet webhook all response body properties', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            webhookId: TEST_WEBHOOK_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/webhooks/get-sheet-webhook/all-response-body-properties'
            }
        };
        const response = await client.webhooks.getWebhook(options);

        assert.ok(response);
        assert.strictEqual(response.id, TEST_WEBHOOK_ID);
        assert.strictEqual(response.name, TEST_WEBHOOK_NAME);
        assert.strictEqual(response.callbackUrl, TEST_CALLBACK_URL);
        assert.strictEqual(response.scope, TEST_SCOPE_SHEET);
        assert.strictEqual(response.scopeObjectId, TEST_SCOPE_OBJECT_ID);
        assert.deepStrictEqual(response.events, TEST_EVENTS);
        assert.strictEqual(response.version, TEST_VERSION);
        assert.ok(response.subscope);
        assert.deepStrictEqual(response.subscope.columnIds, TEST_COLUMN_IDS);
        assert.strictEqual(response.enabled, TEST_ENABLED);
        assert.strictEqual(response.status, TEST_STATUS);
        assert.strictEqual(response.sharedSecret, TEST_SHARED_SECRET);
        assert.strictEqual(response.createdAt, TEST_CREATED_AT);
        assert.strictEqual(response.modifiedAt, TEST_MODIFIED_AT);
        assert.strictEqual(response.disabledDetails, TEST_DISABLED_DETAILS);
        assert.strictEqual(response.apiClientId, TEST_API_CLIENT_ID);
        assert.strictEqual(response.apiClientName, TEST_API_CLIENT_NAME);
        assert.ok(response.stats);
        assert.strictEqual(response.stats.lastCallbackAttempt, TEST_LAST_CALLBACK_ATTEMPT);
        assert.strictEqual(response.stats.lastCallbackAttemptRetryCount, TEST_LAST_CALLBACK_ATTEMPT_RETRY_COUNT);
        assert.strictEqual(response.stats.lastSuccessfulCallback, TEST_LAST_SUCCESSFUL_CALLBACK);
    });

    it('getWebhook plan webhook all response body properties', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            webhookId: TEST_WEBHOOK_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/webhooks/get-plan-webhook/all-response-body-properties'
            }
        };
        const response = await client.webhooks.getWebhook(options);

        assert.ok(response);
        assert.strictEqual(response.id, TEST_WEBHOOK_ID);
        assert.strictEqual(response.name, TEST_WEBHOOK_NAME);
        assert.strictEqual(response.callbackUrl, TEST_CALLBACK_URL);
        assert.strictEqual(response.scope, TEST_SCOPE_PLAN);
        assert.strictEqual(response.scopeObjectId, TEST_SCOPE_OBJECT_ID);
        assert.deepStrictEqual(response.events, TEST_EVENTS);
        assert.strictEqual(response.version, TEST_VERSION);
        assert.ok(response.customHeaders);
        assert.deepStrictEqual(response.customHeaders, TEST_CUSTOM_HEADERS);
        assert.strictEqual(response.enabled, TEST_ENABLED);
        assert.strictEqual(response.status, TEST_STATUS);
        assert.strictEqual(response.sharedSecret, TEST_SHARED_SECRET);
        assert.strictEqual(response.createdAt, TEST_CREATED_AT);
        assert.strictEqual(response.modifiedAt, TEST_MODIFIED_AT);
        assert.strictEqual(response.disabledDetails, TEST_DISABLED_DETAILS);
        assert.strictEqual(response.apiClientId, TEST_API_CLIENT_ID);
        assert.strictEqual(response.apiClientName, TEST_API_CLIENT_NAME);
        assert.ok(response.stats);
        assert.strictEqual(response.stats.lastCallbackAttempt, TEST_LAST_CALLBACK_ATTEMPT);
        assert.strictEqual(response.stats.lastCallbackAttemptRetryCount, TEST_LAST_CALLBACK_ATTEMPT_RETRY_COUNT);
        assert.strictEqual(response.stats.lastSuccessfulCallback, TEST_LAST_SUCCESSFUL_CALLBACK);
    });

    it('getWebhook required response body properties', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            webhookId: TEST_WEBHOOK_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/webhooks/get-webhook/required-response-body-properties'
            }
        };
        const response = await client.webhooks.getWebhook(options);

        assert.ok(response);
        assert.strictEqual(response.name, TEST_WEBHOOK_NAME);
        assert.strictEqual(response.callbackUrl, TEST_CALLBACK_URL);
        assert.strictEqual(response.scope, TEST_SCOPE_SHEET);
        assert.strictEqual(response.scopeObjectId, TEST_SCOPE_OBJECT_ID);
        assert.deepStrictEqual(response.events, TEST_EVENTS);
        assert.strictEqual(response.version, TEST_VERSION);
        assert.strictEqual(response.id, undefined);
        assert.strictEqual(response.subscope, undefined);
        assert.strictEqual(response.customHeaders, undefined);
        assert.strictEqual(response.enabled, undefined);
        assert.strictEqual(response.status, undefined);
        assert.strictEqual(response.sharedSecret, undefined);
        assert.strictEqual(response.createdAt, undefined);
        assert.strictEqual(response.modifiedAt, undefined);
        assert.strictEqual(response.disabledDetails, undefined);
        assert.strictEqual(response.apiClientId, undefined);
        assert.strictEqual(response.apiClientName, undefined);
        assert.strictEqual(response.stats, undefined);
    });

    it('getWebhook error 500 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            webhookId: TEST_WEBHOOK_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.webhooks.getWebhook(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_500_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_500_MESSAGE);
        }
    });

    it('getWebhook error 400 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            webhookId: TEST_WEBHOOK_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.webhooks.getWebhook(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_400_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_400_MESSAGE);
        }
    });
});
