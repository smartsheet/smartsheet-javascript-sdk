import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_USER_ID,
    TEST_PLAN_ID,
    TEST_LAST_KEY,
    TEST_MAX_ITEMS,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE,
} from './common_test_constants';
import { SeatTypes } from '@smartsheet/users/types';

describe('Users - displayContributorSeatType query parameter tests', () => {
    const client = createClient();

    describe('GET /users - listAllUsers with displayContributorSeatType', () => {
        it('listAllUsers with displayContributorSeatType=true returns CONTRIBUTOR', async () => {
            const requestId = crypto.randomUUID();
            const options = {
                queryParameters: {
                    displayContributorSeatType: true
                },
                customProperties: {
                    'x-request-id': requestId,
                    'x-test-name': '/users/list-users/display-contributor-seat-type-true'
                }
            };
            const response = await client.users.listAllUsers(options);

            // Verify the query parameter was sent correctly
            const matchedRequest = await findWireMockRequest(requestId);
            const parsedUrl = new URL(matchedRequest.absoluteUrl);
            const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
            expect(queryParamsObject.displayContributorSeatType).toEqual('true');

            // Verify response contains CONTRIBUTOR seat type
            expect(response.data).toHaveLength(1);
            expect(response.data[0].seatType).toBe(SeatTypes.CONTRIBUTOR);
            expect(response.data[0].email).toBe('viewer.user@smartsheet.com');
        });

        it('listAllUsers with displayContributorSeatType=false returns VIEWER', async () => {
            const requestId = crypto.randomUUID();
            const options = {
                queryParameters: {
                    displayContributorSeatType: false
                },
                customProperties: {
                    'x-request-id': requestId,
                    'x-test-name': '/users/list-users/display-contributor-seat-type-false'
                }
            };
            const response = await client.users.listAllUsers(options);

            // Verify the query parameter was sent correctly
            const matchedRequest = await findWireMockRequest(requestId);
            const parsedUrl = new URL(matchedRequest.absoluteUrl);
            const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
            expect(queryParamsObject.displayContributorSeatType).toEqual('false');

            // Verify response contains VIEWER seat type (CONTRIBUTOR re-written to VIEWER)
            expect(response.data).toHaveLength(1);
            expect(response.data[0].seatType).toBe(SeatTypes.VIEWER);
            expect(response.data[0].email).toBe('contributor.user@smartsheet.com');
        });

        it('listAllUsers without displayContributorSeatType parameter', async () => {
            const requestId = crypto.randomUUID();
            const options = {
                queryParameters: {},
                customProperties: {
                    'x-request-id': requestId,
                    'x-test-name': '/users/list-users/all-response-body-properties'
                }
            };
            const response = await client.users.listAllUsers(options);

            // Verify the query parameter was not sent
            const matchedRequest = await findWireMockRequest(requestId);
            const parsedUrl = new URL(matchedRequest.absoluteUrl);
            const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
            expect(queryParamsObject.displayContributorSeatType).toBeUndefined();

            // Verify response structure
            expect(response.data).toBeDefined();
            expect(Array.isArray(response.data)).toBe(true);
        });
    });

    describe('GET /users/{userId}/plans - listUserPlans with displayContributorSeatType', () => {
        it('listUserPlans with displayContributorSeatType=true returns CONTRIBUTOR', async () => {
            const requestId = crypto.randomUUID();
            const options = {
                userId: TEST_USER_ID,
                queryParameters: {
                    displayContributorSeatType: true,
                    lastKey: TEST_LAST_KEY,
                    maxItems: TEST_MAX_ITEMS
                },
                customProperties: {
                    'x-request-id': requestId,
                    'x-test-name': '/users/list-user-plans/display-contributor-seat-type-true'
                }
            };
            const response = await client.users.listUserPlans(options);

            // Verify the query parameter was sent correctly
            const matchedRequest = await findWireMockRequest(requestId);
            const parsedUrl = new URL(matchedRequest.absoluteUrl);
            expect(parsedUrl.pathname).toEqual(`/2.0/users/${TEST_USER_ID}/plans`);

            const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
            expect(queryParamsObject.displayContributorSeatType).toEqual('true');
            expect(queryParamsObject.lastKey).toEqual(TEST_LAST_KEY);
            expect(queryParamsObject.maxItems).toEqual(TEST_MAX_ITEMS.toString());

            // Verify response contains CONTRIBUTOR seat type
            expect(response.data).toHaveLength(1);
            expect(response.data[0].seatType).toBe(SeatTypes.CONTRIBUTOR);
            expect(response.data[0].planId).toBe(TEST_PLAN_ID);
            expect(response.lastKey).toBe(TEST_LAST_KEY);
        });

        it('listUserPlans with displayContributorSeatType=false returns VIEWER', async () => {
            const requestId = crypto.randomUUID();
            const options = {
                userId: TEST_USER_ID,
                queryParameters: {
                    displayContributorSeatType: false,
                    lastKey: '12345678901234570',
                    maxItems: TEST_MAX_ITEMS
                },
                customProperties: {
                    'x-request-id': requestId,
                    'x-test-name': '/users/list-user-plans/display-contributor-seat-type-false'
                }
            };
            const response = await client.users.listUserPlans(options);

            // Verify the query parameter was sent correctly
            const matchedRequest = await findWireMockRequest(requestId);
            const parsedUrl = new URL(matchedRequest.absoluteUrl);
            const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
            expect(queryParamsObject.displayContributorSeatType).toEqual('false');

            // Verify response contains VIEWER seat type (CONTRIBUTOR re-written to VIEWER)
            expect(response.data).toHaveLength(1);
            expect(response.data[0].seatType).toBe(SeatTypes.VIEWER);
            expect(response.data[0].planId).toBe(1234567890123457);
        });

        it('listUserPlans without displayContributorSeatType parameter', async () => {
            const requestId = crypto.randomUUID();
            const options = {
                userId: TEST_USER_ID,
                queryParameters: {
                    lastKey: TEST_LAST_KEY,
                    maxItems: TEST_MAX_ITEMS
                },
                customProperties: {
                    'x-request-id': requestId,
                    'x-test-name': '/users/list-user-plans/all-response-body-properties'
                }
            };
            const response = await client.users.listUserPlans(options);

            // Verify the query parameter was not sent
            const matchedRequest = await findWireMockRequest(requestId);
            const parsedUrl = new URL(matchedRequest.absoluteUrl);
            const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
            expect(queryParamsObject.displayContributorSeatType).toBeUndefined();

            // Verify response structure
            expect(response.data).toBeDefined();
            expect(Array.isArray(response.data)).toBe(true);
        });

        it('listUserPlans displayContributorSeatType with error 500 response', async () => {
            const requestId = crypto.randomUUID();
            const options = {
                userId: TEST_USER_ID,
                queryParameters: {
                    displayContributorSeatType: true
                },
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

        it('listUserPlans displayContributorSeatType with error 400 response', async () => {
            const requestId = crypto.randomUUID();
            const options = {
                userId: TEST_USER_ID,
                queryParameters: {
                    displayContributorSeatType: true
                },
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

    describe('Behavior verification - CONTRIBUTOR seat type re-writing rules', () => {
        it('verifies VIEWER is re-written to CONTRIBUTOR when displayContributorSeatType=true', async () => {
            const requestId = crypto.randomUUID();
            const options = {
                queryParameters: {
                    displayContributorSeatType: true
                },
                customProperties: {
                    'x-request-id': requestId,
                    'x-test-name': '/users/list-users/display-contributor-seat-type-true'
                }
            };
            const response = await client.users.listAllUsers(options);

            // The user with a VIEWER seat type should be displayed as CONTRIBUTOR
            const user = response.data[0];
            expect(user.seatType).toBe(SeatTypes.CONTRIBUTOR);
            expect(user.seatTypeLastChangedAt).toBe('2025-01-01T00:00:00.123456789Z');
        });

        it('verifies CONTRIBUTOR is re-written to VIEWER when displayContributorSeatType=false', async () => {
            const requestId = crypto.randomUUID();
            const options = {
                queryParameters: {
                    displayContributorSeatType: false
                },
                customProperties: {
                    'x-request-id': requestId,
                    'x-test-name': '/users/list-users/display-contributor-seat-type-false'
                }
            };
            const response = await client.users.listAllUsers(options);

            // The user with a CONTRIBUTOR seat type should be displayed as VIEWER
            const user = response.data[0];
            expect(user.seatType).toBe(SeatTypes.VIEWER);
            expect(user.seatTypeLastChangedAt).toBe('2025-10-15T08:22:13.456789Z');
        });
    });
});
