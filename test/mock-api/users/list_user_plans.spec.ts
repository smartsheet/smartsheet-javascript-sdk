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
    TEST_PROVISIONAL_EXPIRATION_DATE,
    TEST_LAST_KEY,
    TEST_MAX_ITEMS,
    TEST_CONTRIBUTOR_PLAN_ID,
    TEST_INCLUDE_PLAN_NAME,
    TEST_PLAN_NAME
} from './common_test_constants';
import { SeatTypes } from '@smartsheet/users/types';

describe('Users - listUserPlans endpoint tests', () => {
    const client = createClient();

    it('listUserPlans generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            queryParameters: {
                lastKey: TEST_LAST_KEY,
                maxItems: TEST_MAX_ITEMS,
                displayContributorSeatType: true,
                include: TEST_INCLUDE_PLAN_NAME
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/list-user-plans/all-response-body-properties'
            }
        };
        await client.users.listUserPlans(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual(`/2.0/users/${TEST_USER_ID}/plans`);

        const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
        expect(queryParamsObject).toEqual({
            lastKey: TEST_LAST_KEY,
            maxItems: TEST_MAX_ITEMS.toString(),
            displayContributorSeatType: 'true',
            include: TEST_INCLUDE_PLAN_NAME
        });
    });

    it('listUserPlans all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            queryParameters: {
                lastKey: TEST_LAST_KEY,
                maxItems: TEST_MAX_ITEMS,
                include: TEST_INCLUDE_PLAN_NAME
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/list-user-plans/all-response-body-properties'
            }
        };
        const response = await client.users.listUserPlans(options);

        expect(response).toEqual({
            lastKey: TEST_LAST_KEY,
            data: [
                {
                    planId: TEST_PLAN_ID,
                    planName: TEST_PLAN_NAME,
                    seatType: SeatTypes.MEMBER,
                    seatTypeLastChangedAt: TEST_SEAT_TYPE_LAST_CHANGED_AT,
                    provisionalExpirationDate: TEST_PROVISIONAL_EXPIRATION_DATE,
                    isInternal: false
                },
                {
                    // Omits the optional planName, as a plan whose owning
                    // organization has no name does.
                    planId: TEST_CONTRIBUTOR_PLAN_ID,
                    seatType: SeatTypes.CONTRIBUTOR,
                    seatTypeLastChangedAt: TEST_SEAT_TYPE_LAST_CHANGED_AT,
                    provisionalExpirationDate: TEST_PROVISIONAL_EXPIRATION_DATE,
                    isInternal: false
                }
            ]
        });
        expect(response.data[1].planName).toBeUndefined();
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

        expect(response).toEqual({
            data: [
                {
                    planId: TEST_PLAN_ID,
                    seatType: SeatTypes.MEMBER,
                    isInternal: false
                }
            ]
        });
        expect(response.data[0].planName).toBeUndefined();
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
