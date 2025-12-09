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
    const client = createClient();

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
        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual(`/2.0/webhooks/${TEST_WEBHOOK_ID}`);
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

            expect(response).toEqual({
                message: TEST_SUCCESS_MESSAGE,
                resultCode: TEST_SUCCESS_RESULT_CODE,
                version: TEST_VERSION,
                result: {
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
                }
            });

            const body = JSON.parse(matchedRequest.body);
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

            expect(response).toEqual({
                message: TEST_SUCCESS_MESSAGE,
                resultCode: TEST_SUCCESS_RESULT_CODE,
                version: TEST_VERSION,
                result: {
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
                }
            });

            const body = JSON.parse(matchedRequest.body);
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

        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE,
            result: {
                name: TEST_WEBHOOK_NAME,
                callbackUrl: TEST_CALLBACK_URL,
                scope: TEST_SCOPE_SHEET,
                scopeObjectId: TEST_SCOPE_OBJECT_ID,
                events: TEST_EVENTS,
                version: TEST_VERSION
            }
        });
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
