import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_PLAN_ID,
    TEST_EMAIL,
    TEST_FIRST_NAME,
    TEST_LAST_NAME,
    TEST_NAME,
    TEST_CUSTOM_WELCOME_SCREEN_VIEWED,
    TEST_LAST_LOGIN,
    TEST_SEAT_TYPE_LAST_CHANGED_AT,
    TEST_PAGE_NUMBER,
    TEST_PAGE_SIZE,
    TEST_SHEET_COUNT,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE,
    TEST_PROVISIONAL_EXPIRATION_DATE,
    TEST_INCLUDE_ALL,
    TEST_CONTRIBUTOR_USER_ID,
    TEST_CONTRIBUTOR_EMAIL,
    TEST_CONTRIBUTOR_FIRST_NAME,
    TEST_CONTRIBUTOR_LAST_NAME,
    TEST_CONTRIBUTOR_SEAT_TYPE_LAST_CHANGED_AT,
    TEST_CONTRIBUTOR_SHEET_COUNT
} from './common_test_constants';
import { SeatTypes, UserStatus } from '@smartsheet/users/types';

describe('Users - listAllUsers endpoint tests', () => {
    const client = createClient();

    it('listUsers generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                emails: TEST_EMAIL,
                planId: TEST_PLAN_ID,
                seatType: SeatTypes.MEMBER,
                includeAll: TEST_INCLUDE_ALL,
                page: TEST_PAGE_NUMBER,
                pageSize: TEST_PAGE_SIZE
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/list-users/required-response-body-properties'
            }
        };
        await client.users.listAllUsers(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual('/2.0/users');

        const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
        expect(queryParamsObject).toEqual({
            emails: TEST_EMAIL,
            planId: TEST_PLAN_ID.toString(),
            seatType: SeatTypes.MEMBER,
            includeAll: TEST_INCLUDE_ALL.toString(),
            page: TEST_PAGE_NUMBER.toString(),
            pageSize: TEST_PAGE_SIZE.toString()
        });
    });

    it('listUsers all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                planId: TEST_PLAN_ID
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/list-users/all-response-body-properties'
            }
        };
        const response = await client.users.listAllUsers(options);
        expect(response).toEqual({
            data: [
                {
                    seatType: SeatTypes.MEMBER,
                    seatTypeLastChangedAt: TEST_SEAT_TYPE_LAST_CHANGED_AT,
                    provisionalExpirationDate: TEST_PROVISIONAL_EXPIRATION_DATE,
                    isInternal: true,
                    firstName: TEST_FIRST_NAME,
                    lastName: TEST_LAST_NAME,
                    name: TEST_NAME,
                    email: TEST_EMAIL,
                    admin: true,
                    licensedSheetCreator: true,
                    resourceViewer: true,
                    groupAdmin: true,
                    status: UserStatus.ACTIVE,
                    sheetCount: TEST_SHEET_COUNT,
                    lastLogin: TEST_LAST_LOGIN,
                    customWelcomeScreenViewed: TEST_CUSTOM_WELCOME_SCREEN_VIEWED,
                    id: TEST_PLAN_ID,
                    profileImage: {
                        height: 1050,
                        imageId: 'u!1!nAtdn5RJB_o!k6_e_3h2R3w!wmYXPek-yVD',
                        width: 1050
                    }
                }
            ],
            pageNumber: 1,
            pageSize: 100,
            totalCount: 1,
            totalPages: 1
        });
    });

    it('listUsers required response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                planId: TEST_PLAN_ID
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/list-users/required-response-body-properties'
            }
        };
        const response = await client.users.listAllUsers(options);
        expect(response).toEqual({
            data: [
                {
                    seatType: SeatTypes.MEMBER,
                    isInternal: true,
                    firstName: TEST_FIRST_NAME,
                    lastName: TEST_LAST_NAME,
                    name: TEST_NAME,
                    email: TEST_EMAIL,
                    admin: true,
                    licensedSheetCreator: true,
                    resourceViewer: true,
                    groupAdmin: true,
                    status: UserStatus.ACTIVE,
                    sheetCount: TEST_SHEET_COUNT,
                    id: TEST_PLAN_ID
                }
            ],
            pageNumber: 1,
            pageSize: 100,
            totalCount: 1,
            totalPages: 1
        });
    });

    it('listUserPlans error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                planId: TEST_PLAN_ID
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.users.listAllUsers(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('listUserPlans error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                planId: TEST_PLAN_ID
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.users.listAllUsers(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });

    it('listUsers with CONTRIBUTOR seat type filter', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                seatType: SeatTypes.CONTRIBUTOR
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/list-users/contributor-seat-type-filter'
            }
        };
        const response = await client.users.listAllUsers(options);
        expect(response).toEqual({
            data: [
                {
                    id: TEST_CONTRIBUTOR_USER_ID,
                    planId: TEST_CONTRIBUTOR_USER_ID,
                    admin: false,
                    email: TEST_CONTRIBUTOR_EMAIL,
                    groupAdmin: false,
                    isInternal: true,
                    licensedSheetCreator: false,
                    resourceViewer: false,
                    seatType: SeatTypes.CONTRIBUTOR,
                    seatTypeLastChangedAt: TEST_CONTRIBUTOR_SEAT_TYPE_LAST_CHANGED_AT,
                    sheetCount: TEST_CONTRIBUTOR_SHEET_COUNT,
                    status: UserStatus.ACTIVE
                }
            ],
            pageNumber: 1,
            pageSize: 100,
            totalCount: 1,
            totalPages: 1
        });
    });

    it('listUsers with CONTRIBUTOR seat type in response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/list-users/contributor-seat-type-response'
            }
        };
        const response = await client.users.listAllUsers(options);
        expect(response).toEqual({
            data: [
                {
                    id: 123,
                    planId: 123,
                    admin: true,
                    email: 'user1@example.com',
                    firstName: 'User',
                    lastName: 'One',
                    groupAdmin: false,
                    isInternal: true,
                    licensedSheetCreator: true,
                    resourceViewer: false,
                    seatType: SeatTypes.MEMBER,
                    seatTypeLastChangedAt: '2025-08-01T10:30:45.123456Z',
                    sheetCount: 10,
                    status: UserStatus.ACTIVE
                },
                {
                    id: TEST_CONTRIBUTOR_USER_ID,
                    planId: TEST_CONTRIBUTOR_USER_ID,
                    admin: false,
                    email: TEST_CONTRIBUTOR_EMAIL,
                    firstName: TEST_CONTRIBUTOR_FIRST_NAME,
                    lastName: TEST_CONTRIBUTOR_LAST_NAME,
                    groupAdmin: false,
                    isInternal: true,
                    licensedSheetCreator: false,
                    resourceViewer: false,
                    seatType: SeatTypes.CONTRIBUTOR,
                    seatTypeLastChangedAt: TEST_CONTRIBUTOR_SEAT_TYPE_LAST_CHANGED_AT,
                    sheetCount: TEST_CONTRIBUTOR_SHEET_COUNT,
                    status: UserStatus.ACTIVE
                }
            ],
            pageNumber: 1,
            pageSize: 100,
            totalCount: 2,
            totalPages: 1
        });
    });
});
