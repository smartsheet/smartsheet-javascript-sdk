import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_USER_ID,
    TEST_PLAN_ID,
    TEST_SEAT_TYPE_LAST_CHANGED_AT,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE,
    TEST_PROVISIONAL_EXPIRATION_DATE
} from './common_test_constants';

describe('Users - listUserPlans endpoint tests', () => {
    const client = createClient();
    const lastKey = '12345678901234569';
    const maxItems = 100;
    const seatType = 'MEMBER';
    const seatTypeLastChangedAt = TEST_SEAT_TYPE_LAST_CHANGED_AT;
    const provisionalExpirationDate = TEST_PROVISIONAL_EXPIRATION_DATE;
    const isInternalTrue = false;

    it('listUserPlans generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            queryParameters: {
                lastKey: lastKey,
                maxItems: maxItems
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/list-user-plans/all-response-body-properties'
            }
        };
        await client.users.listUserPlans(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const queryParams = matchedRequest.queryParams;
        const lastKeyActual = queryParams.lastKey.values[0];
        const maxItemsActual = parseInt(queryParams.maxItems.values[0]);
        
        expect(matchedRequest.url.includes(`/users/${TEST_USER_ID}/plans`)).toBeTruthy();
        expect(lastKeyActual).toBe(lastKey);
        expect(maxItemsActual).toBe(maxItems);
    });

    it('listUserPlans all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            queryParameters: {
                lastKey: lastKey,
                maxItems: maxItems
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/list-user-plans/all-response-body-properties'
            }
        };
        const response = await client.users.listUserPlans(options);
        
        expect(response).toBeTruthy();
        expect(response.lastKey).toBe(lastKey);
        expect(response.data[0].planId).toBe(TEST_PLAN_ID);
        expect(response.data[0].seatType).toBe(seatType);
        expect(response.data[0].seatTypeLastChangedAt).toBe(seatTypeLastChangedAt);
        expect(response.data[0].provisionalExpirationDate).toBe(provisionalExpirationDate);
        expect(response.data[0].isInternal).toBe(isInternalTrue);
    });

    it('listUserPlans required response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/list-user-plans/required-response-body-properties'
            }
        };
        const response = await client.users.listUserPlans(options);
        
        expect(response).toBeTruthy();
        expect(response.data[0].planId).toBe(TEST_PLAN_ID);
        expect(response.data[0].seatType).toBe(seatType);
        expect(response.data[0].seatTypeLastChangedAt).toBe(undefined);
        expect(response.data[0].provisionalExpirationDate).toBe(undefined);
        expect(response.data[0].isInternal).toBe(isInternalTrue);
    });

    it('listUserPlans error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.users.listUserPlans(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('listUserPlans error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.users.listUserPlans(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
