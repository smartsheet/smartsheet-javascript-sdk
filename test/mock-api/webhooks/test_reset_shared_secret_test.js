import assert from 'assert';
import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import {
    TEST_WEBHOOK_ID,
    TEST_SUCCESS_MESSAGE,
    TEST_SUCCESS_RESULT_CODE,
    TEST_VERSION,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Webhooks - resetSharedSecret endpoint tests', () => {
    let client = createClient();
    const newSharedSecret = 'new123secret456value789abc012def345ghi678jkl901mno234pqr';

    it('resetSharedSecret generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            webhookId: TEST_WEBHOOK_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/webhooks/reset-shared-secret/all-response-body-properties'
            }
        };
        await client.webhooks.resetSharedSecret(options);
        const matchedRequest = await findWireMockRequest(requestId);

        assert.ok(matchedRequest.url.includes(`/webhooks/${TEST_WEBHOOK_ID}/resetsharedsecret`));
    });

    it('resetSharedSecret all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            webhookId: TEST_WEBHOOK_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/webhooks/reset-shared-secret/all-response-body-properties'
            }
        };
        const response = await client.webhooks.resetSharedSecret(options);

        assert.ok(response);
        assert.strictEqual(response.message, TEST_SUCCESS_MESSAGE);
        assert.strictEqual(response.resultCode, TEST_SUCCESS_RESULT_CODE);
        assert.strictEqual(response.version, TEST_VERSION);
        assert.ok(response.failedItems);
        assert.ok(response.result);
        assert.strictEqual(response.result.sharedSecret, newSharedSecret);
    });

    it('resetSharedSecret error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            webhookId: TEST_WEBHOOK_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.webhooks.resetSharedSecret(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_500_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_500_MESSAGE);
        }
    });

    it('resetSharedSecret error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            webhookId: TEST_WEBHOOK_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.webhooks.resetSharedSecret(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_400_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_400_MESSAGE);
        }
    });
});
