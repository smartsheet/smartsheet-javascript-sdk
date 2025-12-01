import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
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
} from './common_test_constants';

describe('Webhooks - getWebhook endpoint tests', () => {
    const client = createClient();

    it('getWebhook generated url is correct', async () => {
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

        expect(matchedRequest.url.includes(`/webhooks/${TEST_WEBHOOK_ID}`)).toBeTruthy();
    });

    it(
        'getWebhook sheet webhook all response body properties',
        async () => {
            const requestId = crypto.randomUUID();
            const options = {
                webhookId: TEST_WEBHOOK_ID,
                customProperties: {
                    'x-request-id': requestId,
                    'x-test-name': '/webhooks/get-sheet-webhook/all-response-body-properties'
                }
            };
            const response = await client.webhooks.getWebhook(options);

            expect(response).toBeTruthy();
            expect(response.id).toBe(TEST_WEBHOOK_ID);
            expect(response.name).toBe(TEST_WEBHOOK_NAME);
            expect(response.callbackUrl).toBe(TEST_CALLBACK_URL);
            expect(response.scope).toBe(TEST_SCOPE_SHEET);
            expect(response.scopeObjectId).toBe(TEST_SCOPE_OBJECT_ID);
            expect(response.events).toEqual(TEST_EVENTS);
            expect(response.version).toBe(TEST_VERSION);
            expect(response.subscope).toBeTruthy();
            expect(response.subscope.columnIds).toEqual(TEST_COLUMN_IDS);
            expect(response.enabled).toBe(TEST_ENABLED);
            expect(response.status).toBe(TEST_STATUS);
            expect(response.sharedSecret).toBe(TEST_SHARED_SECRET);
            expect(response.createdAt).toBe(TEST_CREATED_AT);
            expect(response.modifiedAt).toBe(TEST_MODIFIED_AT);
            expect(response.disabledDetails).toBe(TEST_DISABLED_DETAILS);
            expect(response.apiClientId).toBe(TEST_API_CLIENT_ID);
            expect(response.apiClientName).toBe(TEST_API_CLIENT_NAME);
            expect(response.stats).toBeTruthy();
            expect(response.stats.lastCallbackAttempt).toBe(TEST_LAST_CALLBACK_ATTEMPT);
            expect(response.stats.lastCallbackAttemptRetryCount).toBe(TEST_LAST_CALLBACK_ATTEMPT_RETRY_COUNT);
            expect(response.stats.lastSuccessfulCallback).toBe(TEST_LAST_SUCCESSFUL_CALLBACK);
        }
    );

    it(
        'getWebhook plan webhook all response body properties',
        async () => {
            const requestId = crypto.randomUUID();
            const options = {
                webhookId: TEST_WEBHOOK_ID,
                customProperties: {
                    'x-request-id': requestId,
                    'x-test-name': '/webhooks/get-plan-webhook/all-response-body-properties'
                }
            };
            const response = await client.webhooks.getWebhook(options);

            expect(response).toBeTruthy();
            expect(response.id).toBe(TEST_WEBHOOK_ID);
            expect(response.name).toBe(TEST_WEBHOOK_NAME);
            expect(response.callbackUrl).toBe(TEST_CALLBACK_URL);
            expect(response.scope).toBe(TEST_SCOPE_PLAN);
            expect(response.scopeObjectId).toBe(TEST_SCOPE_OBJECT_ID);
            expect(response.events).toEqual(TEST_EVENTS);
            expect(response.version).toBe(TEST_VERSION);
            expect(response.customHeaders).toBeTruthy();
            expect(response.customHeaders).toEqual(TEST_CUSTOM_HEADERS);
            expect(response.enabled).toBe(TEST_ENABLED);
            expect(response.status).toBe(TEST_STATUS);
            expect(response.sharedSecret).toBe(TEST_SHARED_SECRET);
            expect(response.createdAt).toBe(TEST_CREATED_AT);
            expect(response.modifiedAt).toBe(TEST_MODIFIED_AT);
            expect(response.disabledDetails).toBe(TEST_DISABLED_DETAILS);
            expect(response.apiClientId).toBe(TEST_API_CLIENT_ID);
            expect(response.apiClientName).toBe(TEST_API_CLIENT_NAME);
            expect(response.stats).toBeTruthy();
            expect(response.stats.lastCallbackAttempt).toBe(TEST_LAST_CALLBACK_ATTEMPT);
            expect(response.stats.lastCallbackAttemptRetryCount).toBe(TEST_LAST_CALLBACK_ATTEMPT_RETRY_COUNT);
            expect(response.stats.lastSuccessfulCallback).toBe(TEST_LAST_SUCCESSFUL_CALLBACK);
        }
    );

    it('getWebhook required response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            webhookId: TEST_WEBHOOK_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/webhooks/get-webhook/required-response-body-properties'
            }
        };
        const response = await client.webhooks.getWebhook(options);

        expect(response).toBeTruthy();
        expect(response.name).toBe(TEST_WEBHOOK_NAME);
        expect(response.callbackUrl).toBe(TEST_CALLBACK_URL);
        expect(response.scope).toBe(TEST_SCOPE_SHEET);
        expect(response.scopeObjectId).toBe(TEST_SCOPE_OBJECT_ID);
        expect(response.events).toEqual(TEST_EVENTS);
        expect(response.version).toBe(TEST_VERSION);
        expect(response.id).toBe(undefined);
        expect(response.subscope).toBe(undefined);
        expect(response.customHeaders).toBe(undefined);
        expect(response.enabled).toBe(undefined);
        expect(response.status).toBe(undefined);
        expect(response.sharedSecret).toBe(undefined);
        expect(response.createdAt).toBe(undefined);
        expect(response.modifiedAt).toBe(undefined);
        expect(response.disabledDetails).toBe(undefined);
        expect(response.apiClientId).toBe(undefined);
        expect(response.apiClientName).toBe(undefined);
        expect(response.stats).toBe(undefined);
    });

    it('getWebhook error 500 response', async () => {
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
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('getWebhook error 400 response', async () => {
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
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
