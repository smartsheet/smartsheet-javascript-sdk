import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
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
    const client = createClient();

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

        expect(matchedRequest.url.includes('/2.0/webhooks')).toBeTruthy();
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

            expect(response).toBeTruthy();
            expect(response.message).toBe(TEST_SUCCESS_MESSAGE);
            expect(response.resultCode).toBe(TEST_SUCCESS_RESULT_CODE);
            expect(response.version).toBe(TEST_VERSION);
            expect(response.result.id).toBe(TEST_WEBHOOK_ID);
            expect(response.result.name).toBe(TEST_WEBHOOK_NAME);
            expect(response.result.callbackUrl).toBe(TEST_CALLBACK_URL);
            expect(response.result.scope).toBe(TEST_SCOPE_SHEET);
            expect(response.result.scopeObjectId).toBe(TEST_SCOPE_OBJECT_ID);
            expect(response.result.events).toEqual(TEST_EVENTS);
            expect(response.result.version).toBe(TEST_VERSION);
            expect(response.result.subscope).toBeTruthy();
            expect(response.result.subscope.columnIds).toEqual(TEST_COLUMN_IDS);
            expect(response.result.enabled).toBe(TEST_ENABLED);
            expect(response.result.status).toBe(TEST_STATUS);
            expect(response.result.sharedSecret).toBe(TEST_SHARED_SECRET);
            expect(response.result.createdAt).toBe(TEST_CREATED_AT);
            expect(response.result.modifiedAt).toBe(TEST_MODIFIED_AT);
            expect(response.result.disabledDetails).toBe(TEST_DISABLED_DETAILS);
            expect(response.result.apiClientId).toBe(TEST_API_CLIENT_ID);
            expect(response.result.apiClientName).toBe(TEST_API_CLIENT_NAME);
            expect(response.result.stats).toBeTruthy();
            expect(response.result.stats.lastCallbackAttempt).toBe(TEST_LAST_CALLBACK_ATTEMPT);
            expect(response.result.stats.lastCallbackAttemptRetryCount).toBe(TEST_LAST_CALLBACK_ATTEMPT_RETRY_COUNT);
            expect(response.result.stats.lastSuccessfulCallback).toBe(TEST_LAST_SUCCESSFUL_CALLBACK);

            const body = JSON.parse(matchedRequest.body);
            expect(body).toEqual(TEST_SHEET_WEBHOOK_REQUEST_BODY);
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

            expect(response).toBeTruthy();
            expect(response.message).toBe(TEST_SUCCESS_MESSAGE);
            expect(response.resultCode).toBe(TEST_SUCCESS_RESULT_CODE);
            expect(response.version).toBe(TEST_VERSION);
            expect(response.result.id).toBe(TEST_WEBHOOK_ID);
            expect(response.result.name).toBe(TEST_WEBHOOK_NAME);
            expect(response.result.callbackUrl).toBe(TEST_CALLBACK_URL);
            expect(response.result.scope).toBe(TEST_SCOPE_PLAN);
            expect(response.result.scopeObjectId).toBe(TEST_SCOPE_OBJECT_ID);
            expect(response.result.events).toEqual(TEST_EVENTS);
            expect(response.result.version).toBe(TEST_VERSION);
            expect(response.result.customHeaders).toBeTruthy();
            expect(response.result.customHeaders).toEqual(TEST_CUSTOM_HEADERS);
            expect(response.result.enabled).toBe(TEST_ENABLED);
            expect(response.result.status).toBe(TEST_STATUS);
            expect(response.result.sharedSecret).toBe(TEST_SHARED_SECRET);
            expect(response.result.createdAt).toBe(TEST_CREATED_AT);
            expect(response.result.modifiedAt).toBe(TEST_MODIFIED_AT);
            expect(response.result.disabledDetails).toBe(TEST_DISABLED_DETAILS);
            expect(response.result.apiClientId).toBe(TEST_API_CLIENT_ID);
            expect(response.result.apiClientName).toBe(TEST_API_CLIENT_NAME);
            expect(response.result.stats).toBeTruthy();
            expect(response.result.stats.lastCallbackAttempt).toBe(TEST_LAST_CALLBACK_ATTEMPT);
            expect(response.result.stats.lastCallbackAttemptRetryCount).toBe(TEST_LAST_CALLBACK_ATTEMPT_RETRY_COUNT);
            expect(response.result.stats.lastSuccessfulCallback).toBe(TEST_LAST_SUCCESSFUL_CALLBACK);

            const body = JSON.parse(matchedRequest.body);
            expect(body).toEqual(TEST_PLAN_WEBHOOK_REQUEST_BODY);
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
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
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
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
