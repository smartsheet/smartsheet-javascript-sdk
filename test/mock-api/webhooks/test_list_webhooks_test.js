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
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Webhooks - listWebhooks endpoint tests', () => {
    let client = createClient();
    const pageNumber = 1;
    const pageSize = 100;
    const totalPages = 1;
    const totalCount = 2;
    const includeAll = false;

    it('listWebhooks generated url is correct', async () => {
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
        
        expect(matchedRequest.url.includes('/2.0/webhooks')).toBeTruthy();
        expect(includeAllActual).toBe(includeAll.toString());
        expect(parseInt(pageActual)).toBe(pageNumber);
        expect(parseInt(pageSizeActual)).toBe(pageSize);
    });

    it('listWebhooks all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/webhooks/list-webhooks/all-response-body-properties'
            }
        };
        const response = await client.webhooks.listWebhooks(options);
        
        expect(response).toBeTruthy();
        expect(response.pageNumber).toBe(pageNumber);
        expect(response.pageSize).toBe(pageSize);
        expect(response.totalPages).toBe(totalPages);
        expect(response.totalCount).toBe(totalCount);
        expect(Array.isArray(response.data)).toBeTruthy();
        expect(response.data.length).toBe(2);
        
        // Verify first webhook (sheet webhook with all properties)
        const sheetWebhook = response.data[0];
        expect(sheetWebhook.id).toBe(TEST_WEBHOOK_ID);
        expect(sheetWebhook.name).toBe(TEST_WEBHOOK_NAME);
        expect(sheetWebhook.callbackUrl).toBe(TEST_CALLBACK_URL);
        expect(sheetWebhook.scope).toBe(TEST_SCOPE_SHEET);
        expect(sheetWebhook.scopeObjectId).toBe(TEST_SCOPE_OBJECT_ID);
        expect(sheetWebhook.events).toEqual(TEST_EVENTS);
        expect(sheetWebhook.version).toBe(TEST_VERSION);
        expect(sheetWebhook.subscope).toBeTruthy();
        expect(sheetWebhook.subscope.columnIds).toEqual(TEST_COLUMN_IDS);
        expect(sheetWebhook.enabled).toBe(TEST_ENABLED);
        expect(sheetWebhook.status).toBe(TEST_STATUS);
        expect(sheetWebhook.sharedSecret).toBe(TEST_SHARED_SECRET);
        expect(sheetWebhook.createdAt).toBe(TEST_CREATED_AT);
        expect(sheetWebhook.modifiedAt).toBe(TEST_MODIFIED_AT);
        expect(sheetWebhook.disabledDetails).toBe(TEST_DISABLED_DETAILS);
        expect(sheetWebhook.apiClientId).toBe(TEST_API_CLIENT_ID);
        expect(sheetWebhook.apiClientName).toBe(TEST_API_CLIENT_NAME);
        expect(sheetWebhook.stats).toBeTruthy();
        expect(sheetWebhook.stats.lastCallbackAttempt).toBe(TEST_LAST_CALLBACK_ATTEMPT);
        expect(sheetWebhook.stats.lastCallbackAttemptRetryCount).toBe(TEST_LAST_CALLBACK_ATTEMPT_RETRY_COUNT);
        expect(sheetWebhook.stats.lastSuccessfulCallback).toBe(TEST_LAST_SUCCESSFUL_CALLBACK);
        
        // Verify second webhook (plan webhook with custom headers)
        const planWebhook = response.data[1];
        expect(planWebhook.id).toBe(TEST_WEBHOOK_ID + 1);
        expect(planWebhook.name).toBe('Test Plan Webhook');
        expect(planWebhook.scope).toBe(TEST_SCOPE_PLAN);
        expect(planWebhook.customHeaders).toBeTruthy();
        expect(planWebhook.customHeaders).toEqual(TEST_CUSTOM_HEADERS);
    });

    it('listWebhooks required response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/webhooks/list-webhooks/required-response-body-properties'
            }
        };
        const response = await client.webhooks.listWebhooks(options);
        
        expect(response).toBeTruthy();
        expect(response.pageNumber).toBe(pageNumber);
        expect(response.pageSize).toBe(pageSize);
        expect(response.totalPages).toBe(totalPages);
        expect(response.totalCount).toBe(1);
        expect(Array.isArray(response.data)).toBeTruthy();
        expect(response.data.length).toBe(1);
        
        // Verify webhook has only required properties
        const webhook = response.data[0];
        expect(webhook.id).toBe(TEST_WEBHOOK_ID);
        expect(webhook.name).toBe(TEST_WEBHOOK_NAME);
        expect(webhook.callbackUrl).toBe(TEST_CALLBACK_URL);
        expect(webhook.scope).toBe(TEST_SCOPE_SHEET);
        expect(webhook.scopeObjectId).toBe(TEST_SCOPE_OBJECT_ID);
        expect(webhook.events).toEqual(TEST_EVENTS);
        expect(webhook.version).toBe(TEST_VERSION);
        
        // Verify optional properties are not present
        expect(webhook.subscope).toBe(undefined);
        expect(webhook.enabled).toBe(undefined);
        expect(webhook.status).toBe(undefined);
        expect(webhook.sharedSecret).toBe(undefined);
        expect(webhook.createdAt).toBe(undefined);
        expect(webhook.modifiedAt).toBe(undefined);
        expect(webhook.disabledDetails).toBe(undefined);
        expect(webhook.apiClientId).toBe(undefined);
        expect(webhook.apiClientName).toBe(undefined);
        expect(webhook.stats).toBe(undefined);
        expect(webhook.customHeaders).toBe(undefined);
    });

    it('listWebhooks error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.webhooks.listWebhooks(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('listWebhooks error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.webhooks.listWebhooks(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
