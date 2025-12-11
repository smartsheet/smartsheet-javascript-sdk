import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_USER_ID,
    TEST_ALTERNATE_EMAIL_ID,
    TEST_ALTERNATE_EMAIL,
    TEST_PAGE_NUMBER,
    TEST_PAGE_SIZE,
    TEST_TOTAL_PAGES,
    TEST_TOTAL_COUNT,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Users - listAlternateEmails endpoint tests', () => {
    const client = createClient();
    it('listAlternateEmails generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/alternate-emails/list-alternate-emails/all-response-body-properties'
            }
        };
        await client.users.listAlternateEmails(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual(`/2.0/users/${TEST_USER_ID}/alternateemails`);
    });

    it('listAlternateEmails all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/alternate-emails/list-alternate-emails/all-response-body-properties'
            }
        };
        const response = await client.users.listAlternateEmails(options);
        expect(response).toEqual({
            pageNumber: TEST_PAGE_NUMBER,
            pageSize: TEST_PAGE_SIZE,
            totalPages: TEST_TOTAL_PAGES,
            totalCount: TEST_TOTAL_COUNT,
            data: [
                {
                    id: TEST_ALTERNATE_EMAIL_ID,
                    confirmed: true,
                    email: TEST_ALTERNATE_EMAIL
                }
            ]
        });
    });

    it('listAlternateEmails error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.users.listAlternateEmails(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('listAlternateEmails error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.users.listAlternateEmails(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
