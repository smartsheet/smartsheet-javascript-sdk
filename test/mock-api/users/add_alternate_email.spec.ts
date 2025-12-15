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
    ERROR_400_MESSAGE,
    TEST_ALTERNATE_EMAIL,
    TEST_ALTERNATE_EMAIL_BODY
} from './common_test_constants';

describe('Users - addAlternateEmail endpoint tests', () => {
    const client = createClient();

    it('addAlternateEmail generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            body: TEST_ALTERNATE_EMAIL_BODY,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/alternate-emails/add-alternate-email/all-response-body-properties'
            }
        };
        await client.users.addAlternateEmail(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual(`/2.0/users/${TEST_USER_ID}/alternateemails`);
    });

    it('addAlternateEmail all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            body: TEST_ALTERNATE_EMAIL_BODY,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/alternate-emails/add-alternate-email/all-response-body-properties'
            }
        };
        const response = await client.users.addAlternateEmail(options);
        const matchedRequest = await findWireMockRequest(requestId);
        
        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE,
            data: [
                {
                    id: TEST_ALTERNATE_EMAIL_ID,
                    confirmed: false,
                    email: TEST_ALTERNATE_EMAIL
                }
            ]
        });
        
        const body = JSON.parse(matchedRequest.body);
        expect(body).toEqual(TEST_ALTERNATE_EMAIL_BODY);
    });

    it('addAlternateEmail error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            body: TEST_ALTERNATE_EMAIL_BODY,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.users.addAlternateEmail(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('addAlternateEmail error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            body: TEST_ALTERNATE_EMAIL_BODY,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.users.addAlternateEmail(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
