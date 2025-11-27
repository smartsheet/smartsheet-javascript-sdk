import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_USER_ID,
    TEST_ALTERNATE_EMAIL_ID,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Users - getAlternateEmail endpoint tests', () => {
    const client = createClient();
    const TEST_EMAIL = 'alternate.email@smartsheet.com';
    const TEST_CONFIRMED = true;

    it('getAlternateEmail generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            alternateEmailId: TEST_ALTERNATE_EMAIL_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/alternate-emails/get-alternate-email/all-response-body-properties'
            }
        };
        await client.users.getAlternateEmail(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.url.includes(`/users/${TEST_USER_ID}/alternateemails/${TEST_ALTERNATE_EMAIL_ID}`)).toBeTruthy();
    });

    it('getAlternateEmail all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            alternateEmailId: TEST_ALTERNATE_EMAIL_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/alternate-emails/get-alternate-email/all-response-body-properties'
            }
        };
        const response = await client.users.getAlternateEmail(options);
        expect(response).toBeTruthy();
        expect(response.id).toBe(TEST_ALTERNATE_EMAIL_ID);
        expect(response.confirmed).toBe(TEST_CONFIRMED);
        expect(response.email).toBe(TEST_EMAIL);
    });

    it('getAlternateEmail error 500 response', async () => {
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
            await client.users.getAlternateEmail(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('getAlternateEmail error 400 response', async () => {
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
            await client.users.getAlternateEmail(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
