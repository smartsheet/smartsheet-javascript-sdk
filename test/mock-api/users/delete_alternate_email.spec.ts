import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_USER_ID,
    TEST_ALTERNATE_EMAIL_ID,
    TEST_SUCCESS_MESSAGE,
    TEST_SUCCESS_RESULT_CODE,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Users - deleteAlternateEmail endpoint tests', () => {
    const client = createClient();

    it('deleteAlternateEmail generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            alternateEmailId: TEST_ALTERNATE_EMAIL_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/alternate-emails/delete-alternate-email/all-response-body-properties'
            }
        };
        await client.users.deleteAlternateEmail(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.url.includes(`/users/${TEST_USER_ID}/alternateemails/${TEST_ALTERNATE_EMAIL_ID}`)).toBeTruthy();
    });

    it('deleteAlternateEmail all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            alternateEmailId: TEST_ALTERNATE_EMAIL_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/alternate-emails/delete-alternate-email/all-response-body-properties'
            }
        };
        const response = await client.users.deleteAlternateEmail(options);
        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE
        });
    });

    it('deleteAlternateEmail error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            alternateEmailId: TEST_ALTERNATE_EMAIL_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.users.deleteAlternateEmail(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('deleteAlternateEmail error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            alternateEmailId: TEST_ALTERNATE_EMAIL_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.users.deleteAlternateEmail(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
