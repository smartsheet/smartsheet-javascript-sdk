import assert from 'assert';
import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils.js';
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
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants.js';

describe('Webhooks - listWebhooks endpoint tests', function () {
    let client = createClient();
    const pageNumber = 1;
    const pageSize = 100;
    const totalPages = 1;
    const totalCount = 2;
    const includeAll = false;

    it('listWebhooks generated url is correct', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                includeAll: includeAll,
                page: pageNumber,
                pageSize: pageSize
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/webhooks/list-webhooks/all-response-body-properties'
            }
        };
        await client.webhooks.listWebhooks(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const queryParams = matchedRequest.queryParams;
        const includeAllActual = queryParams.includeAll.values[0];
        const pageActual = queryParams.page.values[0];
        const pageSizeActual = queryParams.pageSize.values[0];
        
        assert.ok(matchedRequest.url.includes('/2.0/webhooks'));
        assert.strictEqual(includeAllActual, includeAll.toString());
        assert.strictEqual(parseInt(pageActual), pageNumber);
        assert.strictEqual(parseInt(pageSizeActual), pageSize);
    });

    it('listWebhooks all response body properties', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/webhooks/list-webhooks/all-response-body-properties'
            }
        };
        const response = await client.webhooks.listWebhooks(options);
        
        assert.ok(response);
        assert.strictEqual(response.pageNumber, pageNumber);
        assert.strictEqual(response.pageSize, pageSize);
        assert.strictEqual(response.totalPages, totalPages);
        assert.strictEqual(response.totalCount, totalCount);
        assert.ok(Array.isArray(response.data));
        assert.strictEqual(response.data.length, 2);
        
        // Verify first webhook (sheet webhook with all properties)
        const sheetWebhook = response.data[0];
        assert.strictEqual(sheetWebhook.id, TEST_WEBHOOK_ID);
        assert.strictEqual(sheetWebhook.name, TEST_WEBHOOK_NAME);
        assert.strictEqual(sheetWebhook.callbackUrl, TEST_CALLBACK_URL);
        assert.strictEqual(sheetWebhook.scope, TEST_SCOPE_SHEET);
        assert.strictEqual(sheetWebhook.scopeObjectId, TEST_SCOPE_OBJECT_ID);
        assert.deepStrictEqual(sheetWebhook.events, TEST_EVENTS);
        assert.strictEqual(sheetWebhook.version, TEST_VERSION);
        assert.ok(sheetWebhook.subscope);
        assert.deepStrictEqual(sheetWebhook.subscope.columnIds, TEST_COLUMN_IDS);
        assert.strictEqual(sheetWebhook.enabled, TEST_ENABLED);
        assert.strictEqual(sheetWebhook.status, TEST_STATUS);
        assert.strictEqual(sheetWebhook.sharedSecret, TEST_SHARED_SECRET);
        assert.strictEqual(sheetWebhook.createdAt, TEST_CREATED_AT);
        assert.strictEqual(sheetWebhook.modifiedAt, TEST_MODIFIED_AT);
        assert.strictEqual(sheetWebhook.disabledDetails, TEST_DISABLED_DETAILS);
        assert.strictEqual(sheetWebhook.apiClientId, TEST_API_CLIENT_ID);
        assert.strictEqual(sheetWebhook.apiClientName, TEST_API_CLIENT_NAME);
        assert.ok(sheetWebhook.stats);
        assert.strictEqual(sheetWebhook.stats.lastCallbackAttempt, TEST_LAST_CALLBACK_ATTEMPT);
        assert.strictEqual(sheetWebhook.stats.lastCallbackAttemptRetryCount, TEST_LAST_CALLBACK_ATTEMPT_RETRY_COUNT);
        assert.strictEqual(sheetWebhook.stats.lastSuccessfulCallback, TEST_LAST_SUCCESSFUL_CALLBACK);
        
        // Verify second webhook (plan webhook with custom headers)
        const planWebhook = response.data[1];
        assert.strictEqual(planWebhook.id, TEST_WEBHOOK_ID + 1);
        assert.strictEqual(planWebhook.name, 'Test Plan Webhook');
        assert.strictEqual(planWebhook.scope, TEST_SCOPE_PLAN);
        assert.ok(planWebhook.customHeaders);
        assert.deepStrictEqual(planWebhook.customHeaders, TEST_CUSTOM_HEADERS);
    });

    it('listWebhooks required response body properties', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/webhooks/list-webhooks/required-response-body-properties'
            }
        };
        const response = await client.webhooks.listWebhooks(options);
        
        assert.ok(response);
        assert.strictEqual(response.pageNumber, pageNumber);
        assert.strictEqual(response.pageSize, pageSize);
        assert.strictEqual(response.totalPages, totalPages);
        assert.strictEqual(response.totalCount, 1);
        assert.ok(Array.isArray(response.data));
        assert.strictEqual(response.data.length, 1);
        
        // Verify webhook has only required properties
        const webhook = response.data[0];
        assert.strictEqual(webhook.id, TEST_WEBHOOK_ID);
        assert.strictEqual(webhook.name, TEST_WEBHOOK_NAME);
        assert.strictEqual(webhook.callbackUrl, TEST_CALLBACK_URL);
        assert.strictEqual(webhook.scope, TEST_SCOPE_SHEET);
        assert.strictEqual(webhook.scopeObjectId, TEST_SCOPE_OBJECT_ID);
        assert.deepStrictEqual(webhook.events, TEST_EVENTS);
        assert.strictEqual(webhook.version, TEST_VERSION);
        
        // Verify optional properties are not present
        assert.strictEqual(webhook.subscope, undefined);
        assert.strictEqual(webhook.enabled, undefined);
        assert.strictEqual(webhook.status, undefined);
        assert.strictEqual(webhook.sharedSecret, undefined);
        assert.strictEqual(webhook.createdAt, undefined);
        assert.strictEqual(webhook.modifiedAt, undefined);
        assert.strictEqual(webhook.disabledDetails, undefined);
        assert.strictEqual(webhook.apiClientId, undefined);
        assert.strictEqual(webhook.apiClientName, undefined);
        assert.strictEqual(webhook.stats, undefined);
        assert.strictEqual(webhook.customHeaders, undefined);
    });

    it('listWebhooks error 500 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.webhooks.listWebhooks(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_500_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_500_MESSAGE);
        }
    });

    it('listWebhooks error 400 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.webhooks.listWebhooks(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_400_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_400_MESSAGE);
        }
    });
});
