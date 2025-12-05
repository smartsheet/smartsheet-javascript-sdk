import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_USER_ID,
    TEST_PLAN_ID,
    TEST_SUCCESS_MESSAGE,
    TEST_SUCCESS_RESULT_CODE,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Users - removeUserFromPlan endpoint tests', () => {
    const client = createClient();

    it('removeUserFromPlan generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/remove-user-from-plan/all-response-body-properties'
            }
        };
        await client.users.removeUserFromPlan(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.url.includes(`/users/${TEST_USER_ID}/plans/${TEST_PLAN_ID}`)).toBeTruthy();
    });

    it('removeUserFromPlan all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/remove-user-from-plan/all-response-body-properties'
            }
        };
        const response = await client.users.removeUserFromPlan(options);
        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE
        });
    });

    it('removeUserFromPlan error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.users.removeUserFromPlan(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('removeUserFromPlan error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.users.removeUserFromPlan(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
