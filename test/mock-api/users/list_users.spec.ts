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
    TEST_PROVISIONAL_EXPIRATION_DATE
} from './common_test_constants';
import { SeatTypes, UserStatus } from '@smartsheet/users/types';

describe('Users - listAllUsers endpoint tests', () => {
    const client = createClient();
    const emails = TEST_EMAIL;
    const seatType = SeatTypes.MEMBER;
    const page = TEST_PAGE_NUMBER;
    const pageSize = TEST_PAGE_SIZE;
    const includeAll = false;
    const seatTypeLastChangedAt = TEST_SEAT_TYPE_LAST_CHANGED_AT;
    const provisionalExpirationDate = TEST_PROVISIONAL_EXPIRATION_DATE;
    const isInternal = true;
    const firstName = TEST_FIRST_NAME;
    const lastName = TEST_LAST_NAME;
    const name = TEST_NAME;
    const email = TEST_EMAIL;
    const admin = true;
    const licensedSheetCreator = true;
    const resourceViewer = true;
    const groupAdmin = true;
    const status = UserStatus.ACTIVE;
    const sheetCount = TEST_SHEET_COUNT;
    const lastLogin = TEST_LAST_LOGIN;
    const customWelcomeScreenViewed = TEST_CUSTOM_WELCOME_SCREEN_VIEWED;

    it('listUsers generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                emails: emails,
                planId: TEST_PLAN_ID,
                seatType: seatType,
                includeAll: includeAll,
                page: page,
                pageSize: pageSize
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/list-users/required-response-body-properties'
            }
        };
        await client.users.listAllUsers(options);
        const matchedRequest = await findWireMockRequest(requestId);
        expect(matchedRequest.url.includes(`/2.0/users`)).toBeTruthy();
        expect(matchedRequest.queryParams).toEqual({
            emails: {
                key: 'emails',
                values: [emails]
            },
            planId: {
                key: 'planId',
                values: [TEST_PLAN_ID.toString()]
            },
            seatType: {
                key: 'seatType',
                values: [seatType]
            },
            includeAll: {
                key: 'includeAll',
                values: [includeAll.toString()]
            },
            page: {
                key: 'page',
                values: [page.toString()]
            },
            pageSize: {
                key: 'pageSize',
                values: [pageSize.toString()]
            }
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
                    seatType: seatType,
                    seatTypeLastChangedAt: seatTypeLastChangedAt,
                    provisionalExpirationDate: provisionalExpirationDate,
                    isInternal: isInternal,
                    firstName: firstName,
                    lastName: lastName,
                    name: name,
                    email: email,
                    admin: admin,
                    licensedSheetCreator: licensedSheetCreator,
                    resourceViewer: resourceViewer,
                    groupAdmin: groupAdmin,
                    status: status,
                    sheetCount: sheetCount,
                    lastLogin: lastLogin,
                    customWelcomeScreenViewed: customWelcomeScreenViewed,
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
                    seatType: seatType,
                    isInternal: isInternal,
                    firstName: firstName,
                    lastName: lastName,
                    name: name,
                    email: email,
                    admin: admin,
                    licensedSheetCreator: licensedSheetCreator,
                    resourceViewer: resourceViewer,
                    groupAdmin: groupAdmin,
                    status: status,
                    sheetCount: sheetCount,
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
});
