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

            expect(response).toEqual({
                id: TEST_WEBHOOK_ID,
                name: TEST_WEBHOOK_NAME,
                callbackUrl: TEST_CALLBACK_URL,
                scope: TEST_SCOPE_SHEET,
                scopeObjectId: TEST_SCOPE_OBJECT_ID,
                events: TEST_EVENTS,
                version: TEST_VERSION,
                subscope: {
                    columnIds: TEST_COLUMN_IDS
                },
                enabled: TEST_ENABLED,
                status: TEST_STATUS,
                sharedSecret: TEST_SHARED_SECRET,
                createdAt: TEST_CREATED_AT,
                modifiedAt: TEST_MODIFIED_AT,
                disabledDetails: TEST_DISABLED_DETAILS,
                apiClientId: TEST_API_CLIENT_ID,
                apiClientName: TEST_API_CLIENT_NAME,
                stats: {
                    lastCallbackAttempt: TEST_LAST_CALLBACK_ATTEMPT,
                    lastCallbackAttemptRetryCount: TEST_LAST_CALLBACK_ATTEMPT_RETRY_COUNT,
                    lastSuccessfulCallback: TEST_LAST_SUCCESSFUL_CALLBACK
                }
            });
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

            expect(response).toEqual({
                id: TEST_WEBHOOK_ID,
                name: TEST_WEBHOOK_NAME,
                callbackUrl: TEST_CALLBACK_URL,
                scope: TEST_SCOPE_PLAN,
                scopeObjectId: TEST_SCOPE_OBJECT_ID,
                events: TEST_EVENTS,
                version: TEST_VERSION,
                customHeaders: TEST_CUSTOM_HEADERS,
                enabled: TEST_ENABLED,
                status: TEST_STATUS,
                sharedSecret: TEST_SHARED_SECRET,
                createdAt: TEST_CREATED_AT,
                modifiedAt: TEST_MODIFIED_AT,
                disabledDetails: TEST_DISABLED_DETAILS,
                apiClientId: TEST_API_CLIENT_ID,
                apiClientName: TEST_API_CLIENT_NAME,
                stats: {
                    lastCallbackAttempt: TEST_LAST_CALLBACK_ATTEMPT,
                    lastCallbackAttemptRetryCount: TEST_LAST_CALLBACK_ATTEMPT_RETRY_COUNT,
                    lastSuccessfulCallback: TEST_LAST_SUCCESSFUL_CALLBACK
                }
            });
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

        expect(response).toEqual({
            name: TEST_WEBHOOK_NAME,
            callbackUrl: TEST_CALLBACK_URL,
            scope: TEST_SCOPE_SHEET,
            scopeObjectId: TEST_SCOPE_OBJECT_ID,
            events: TEST_EVENTS,
            version: TEST_VERSION
        });
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
