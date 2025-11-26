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
    let client = createClient();
    const TEST_ALTERNATE_EMAIL_ID_1 = TEST_ALTERNATE_EMAIL_ID;
    const TEST_EMAIL_1 = TEST_ALTERNATE_EMAIL;
    const TEST_CONFIRMED_1 = true;
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

        expect(matchedRequest.url.includes(`/users/${TEST_USER_ID}/alternateemails`)).toBeTruthy();
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
        expect(response).toBeTruthy();
        expect(response.pageNumber).toBe(TEST_PAGE_NUMBER);
        expect(response.pageSize).toBe(TEST_PAGE_SIZE);
        expect(response.totalPages).toBe(TEST_TOTAL_PAGES);
        expect(response.totalCount).toBe(TEST_TOTAL_COUNT);
        expect(response.data.length).toBe(1);
        expect(response.data[0].id).toBe(TEST_ALTERNATE_EMAIL_ID_1);
        expect(response.data[0].confirmed).toBe(TEST_CONFIRMED_1);
        expect(response.data[0].email).toBe(TEST_EMAIL_1);
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
