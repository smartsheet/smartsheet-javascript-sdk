import assert from 'assert';
import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import {
    TEST_WEBHOOK_ID,
    TEST_SCOPE_OBJECT_ID,
    TEST_WEBHOOK_NAME,
    TEST_CALLBACK_URL,
    TEST_SCOPE_SHEET,
    TEST_SCOPE_PLAN,
    TEST_EVENTS,
    TEST_VERSION,
    TEST_ENABLED,
    TEST_STATUS,
    TEST_SHARED_SECRET,
    TEST_DISABLED_DETAILS,
    TEST_API_CLIENT_ID,
    TEST_API_CLIENT_NAME,
    TEST_CREATED_AT,
    TEST_MODIFIED_AT,
    TEST_LAST_CALLBACK_ATTEMPT,
    TEST_LAST_SUCCESSFUL_CALLBACK,
    TEST_LAST_CALLBACK_ATTEMPT_RETRY_COUNT,
    TEST_COLUMN_IDS,
    TEST_CUSTOM_HEADERS,
    TEST_SHEET_WEBHOOK_REQUEST_BODY,
    TEST_PLAN_WEBHOOK_REQUEST_BODY,
    TEST_SUCCESS_MESSAGE,
    TEST_SUCCESS_RESULT_CODE,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Webhooks - createWebhook endpoint tests', () => {
    let client = createClient();

    it('createWebhook generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            body: TEST_SHEET_WEBHOOK_REQUEST_BODY,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/webhooks/create-sheet-webhook/all-response-body-properties'
            }
        };
        await client.webhooks.createWebhook(options);
        const matchedRequest = await findWireMockRequest(requestId);

        assert.ok(matchedRequest.url.includes('/2.0/webhooks'));
    });

    it(
        'createWebhook sheet webhook all response body properties',
        async () => {
            const requestId = crypto.randomUUID();
            const options = {
                body: TEST_SHEET_WEBHOOK_REQUEST_BODY,
                customProperties: {
                    'x-request-id': requestId,
                    'x-test-name': '/webhooks/create-sheet-webhook/all-response-body-properties'
                }
            };
            const response = await client.webhooks.createWebhook(options);
            const matchedRequest = await findWireMockRequest(requestId);

            assert.ok(response);
            assert.strictEqual(response.message, TEST_SUCCESS_MESSAGE);
            assert.strictEqual(response.resultCode, TEST_SUCCESS_RESULT_CODE);
            assert.strictEqual(response.version, TEST_VERSION);
            assert.strictEqual(response.result.id, TEST_WEBHOOK_ID);
            assert.strictEqual(response.result.name, TEST_WEBHOOK_NAME);
            assert.strictEqual(response.result.callbackUrl, TEST_CALLBACK_URL);
            assert.strictEqual(response.result.scope, TEST_SCOPE_SHEET);
            assert.strictEqual(response.result.scopeObjectId, TEST_SCOPE_OBJECT_ID);
            assert.deepStrictEqual(response.result.events, TEST_EVENTS);
            assert.strictEqual(response.result.version, TEST_VERSION);
            assert.ok(response.result.subscope);
            assert.deepStrictEqual(response.result.subscope.columnIds, TEST_COLUMN_IDS);
            assert.strictEqual(response.result.enabled, TEST_ENABLED);
            assert.strictEqual(response.result.status, TEST_STATUS);
            assert.strictEqual(response.result.sharedSecret, TEST_SHARED_SECRET);
            assert.strictEqual(response.result.createdAt, TEST_CREATED_AT);
            assert.strictEqual(response.result.modifiedAt, TEST_MODIFIED_AT);
            assert.strictEqual(response.result.disabledDetails, TEST_DISABLED_DETAILS);
            assert.strictEqual(response.result.apiClientId, TEST_API_CLIENT_ID);
            assert.strictEqual(response.result.apiClientName, TEST_API_CLIENT_NAME);
            assert.ok(response.result.stats);
            assert.strictEqual(response.result.stats.lastCallbackAttempt, TEST_LAST_CALLBACK_ATTEMPT);
            assert.strictEqual(response.result.stats.lastCallbackAttemptRetryCount, TEST_LAST_CALLBACK_ATTEMPT_RETRY_COUNT);
            assert.strictEqual(response.result.stats.lastSuccessfulCallback, TEST_LAST_SUCCESSFUL_CALLBACK);

            let body = JSON.parse(matchedRequest.body);
            assert.deepStrictEqual(body, TEST_SHEET_WEBHOOK_REQUEST_BODY);
        }
    );

    it(
        'createWebhook plan webhook all response body properties',
        async () => {
            const requestId = crypto.randomUUID();
            const options = {
                body: TEST_PLAN_WEBHOOK_REQUEST_BODY,
                customProperties: {
                    'x-request-id': requestId,
                    'x-test-name': '/webhooks/create-plan-webhook/all-response-body-properties'
                }
            };
            const response = await client.webhooks.createWebhook(options);
            const matchedRequest = await findWireMockRequest(requestId);

            assert.ok(response);
            assert.strictEqual(response.message, TEST_SUCCESS_MESSAGE);
            assert.strictEqual(response.resultCode, TEST_SUCCESS_RESULT_CODE);
            assert.strictEqual(response.version, TEST_VERSION);
            assert.strictEqual(response.result.id, TEST_WEBHOOK_ID);
            assert.strictEqual(response.result.name, TEST_WEBHOOK_NAME);
            assert.strictEqual(response.result.callbackUrl, TEST_CALLBACK_URL);
            assert.strictEqual(response.result.scope, TEST_SCOPE_PLAN);
            assert.strictEqual(response.result.scopeObjectId, TEST_SCOPE_OBJECT_ID);
            assert.deepStrictEqual(response.result.events, TEST_EVENTS);
            assert.strictEqual(response.result.version, TEST_VERSION);
            assert.ok(response.result.customHeaders);
            assert.deepStrictEqual(response.result.customHeaders, TEST_CUSTOM_HEADERS);
            assert.strictEqual(response.result.enabled, TEST_ENABLED);
            assert.strictEqual(response.result.status, TEST_STATUS);
            assert.strictEqual(response.result.sharedSecret, TEST_SHARED_SECRET);
            assert.strictEqual(response.result.createdAt, TEST_CREATED_AT);
            assert.strictEqual(response.result.modifiedAt, TEST_MODIFIED_AT);
            assert.strictEqual(response.result.disabledDetails, TEST_DISABLED_DETAILS);
            assert.strictEqual(response.result.apiClientId, TEST_API_CLIENT_ID);
            assert.strictEqual(response.result.apiClientName, TEST_API_CLIENT_NAME);
            assert.ok(response.result.stats);
            assert.strictEqual(response.result.stats.lastCallbackAttempt, TEST_LAST_CALLBACK_ATTEMPT);
            assert.strictEqual(response.result.stats.lastCallbackAttemptRetryCount, TEST_LAST_CALLBACK_ATTEMPT_RETRY_COUNT);
            assert.strictEqual(response.result.stats.lastSuccessfulCallback, TEST_LAST_SUCCESSFUL_CALLBACK);

            let body = JSON.parse(matchedRequest.body);
            assert.deepStrictEqual(body, TEST_PLAN_WEBHOOK_REQUEST_BODY);
        }
    );

    it('createWebhook error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            body: TEST_SHEET_WEBHOOK_REQUEST_BODY,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.webhooks.createWebhook(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_500_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_500_MESSAGE);
        }
    });

    it('createWebhook error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            body: TEST_SHEET_WEBHOOK_REQUEST_BODY,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.webhooks.createWebhook(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_400_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_400_MESSAGE);
        }
    });
});
