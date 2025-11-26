import { expect } from '@jest/globals';
import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
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
    TEST_UPDATE_WEBHOOK_REQUEST_BODY_MINIMAL,
    TEST_UPDATE_SHEET_WEBHOOK_REQUEST_BODY,
    TEST_UPDATE_PLAN_WEBHOOK_REQUEST_BODY,
    TEST_SUCCESS_MESSAGE,
    TEST_SUCCESS_RESULT_CODE,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Webhooks - updateWebhook endpoint tests', () => {
    let client = createClient();

    it('updateWebhook generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            webhookId: TEST_WEBHOOK_ID,
            body: TEST_UPDATE_WEBHOOK_REQUEST_BODY_MINIMAL,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/webhooks/update-sheet-webhook/all-response-body-properties'
            }
        };
        await client.webhooks.updateWebhook(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.url.includes(`/webhooks/${TEST_WEBHOOK_ID}`)).toBeTruthy();
    });

    it(
        'updateWebhook sheet webhook all response body properties',
        async () => {
            const requestId = crypto.randomUUID();
            const options = {
                webhookId: TEST_WEBHOOK_ID,
                body: TEST_UPDATE_SHEET_WEBHOOK_REQUEST_BODY,
                customProperties: {
                    'x-request-id': requestId,
                    'x-test-name': '/webhooks/update-sheet-webhook/all-response-body-properties'
                }
            };
            const response = await client.webhooks.updateWebhook(options);
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

            let body = JSON.parse(matchedRequest.body);
            expect(body).toEqual(TEST_UPDATE_SHEET_WEBHOOK_REQUEST_BODY);
        }
    );

    it(
        'updateWebhook plan webhook all response body properties',
        async () => {
            const requestId = crypto.randomUUID();
            const options = {
                webhookId: TEST_WEBHOOK_ID,
                body: TEST_UPDATE_PLAN_WEBHOOK_REQUEST_BODY,
                customProperties: {
                    'x-request-id': requestId,
                    'x-test-name': '/webhooks/update-plan-webhook/all-response-body-properties'
                }
            };
            const response = await client.webhooks.updateWebhook(options);
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

            let body = JSON.parse(matchedRequest.body);
            expect(body).toEqual(TEST_UPDATE_PLAN_WEBHOOK_REQUEST_BODY);
        }
    );

    it('updateWebhook required response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            webhookId: TEST_WEBHOOK_ID,
            body: TEST_UPDATE_WEBHOOK_REQUEST_BODY_MINIMAL,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/webhooks/update-webhook/required-response-body-properties'
            }
        };
        const response = await client.webhooks.updateWebhook(options);

        expect(response).toBeTruthy();
        expect(response.message).toBe(TEST_SUCCESS_MESSAGE);
        expect(response.resultCode).toBe(TEST_SUCCESS_RESULT_CODE);
        expect(response.result.name).toBe(TEST_WEBHOOK_NAME);
        expect(response.result.callbackUrl).toBe(TEST_CALLBACK_URL);
        expect(response.result.scope).toBe(TEST_SCOPE_SHEET);
        expect(response.result.scopeObjectId).toBe(TEST_SCOPE_OBJECT_ID);
        expect(response.result.events).toEqual(TEST_EVENTS);
        expect(response.result.version).toBe(TEST_VERSION);
        expect(response.result.id).toBe(undefined);
        expect(response.result.subscope).toBe(undefined);
        expect(response.result.customHeaders).toBe(undefined);
        expect(response.result.enabled).toBe(undefined);
        expect(response.result.status).toBe(undefined);
        expect(response.result.sharedSecret).toBe(undefined);
        expect(response.result.createdAt).toBe(undefined);
        expect(response.result.modifiedAt).toBe(undefined);
        expect(response.result.disabledDetails).toBe(undefined);
        expect(response.result.apiClientId).toBe(undefined);
        expect(response.result.apiClientName).toBe(undefined);
        expect(response.result.stats).toBe(undefined);
    });

    it('updateWebhook error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            webhookId: TEST_WEBHOOK_ID,
            body: TEST_UPDATE_WEBHOOK_REQUEST_BODY_MINIMAL,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.webhooks.updateWebhook(options);
            expect(true).toBe(false);
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('updateWebhook error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            webhookId: TEST_WEBHOOK_ID,
            body: TEST_UPDATE_WEBHOOK_REQUEST_BODY_MINIMAL,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.webhooks.updateWebhook(options);
            expect(true).toBe(false);
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
