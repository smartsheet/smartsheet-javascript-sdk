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
        const queryParams = matchedRequest.queryParams;
        const emailsActual = queryParams.emails.values[0];
        const planIdActual = parseInt(queryParams.planId.values[0]);
        const seatTypeActual = queryParams.seatType.values[0];
        const includeAllActual = queryParams.includeAll.values[0];
        const pageActual = queryParams.page.values[0];
        const pageSizeActual = queryParams.pageSize.values[0];
        expect(matchedRequest.url.includes(`/2.0/users`)).toBeTruthy();
        expect(emailsActual).toBe(emails);
        expect(planIdActual).toBe(TEST_PLAN_ID);
        expect(seatTypeActual).toBe(seatType);
        expect(includeAllActual).toBe(includeAll.toString());
        expect(parseInt(pageActual)).toBe(page);
        expect(parseInt(pageSizeActual)).toBe(pageSize);
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
    expect(response).toBeTruthy();
    expect(response.data[0].seatType).toBe(seatType);
    expect(response.data[0].seatTypeLastChangedAt).toBe(seatTypeLastChangedAt);
    expect(response.data[0].provisionalExpirationDate).toBe(provisionalExpirationDate);
    expect(response.data[0].isInternal).toBe(isInternal);
    expect(response.data[0].firstName).toBe(firstName);
    expect(response.data[0].lastName).toBe(lastName);
    expect(response.data[0].name).toBe(name);
    expect(response.data[0].email).toBe(email);
    expect(response.data[0].admin).toBe(admin);
    expect(response.data[0].licensedSheetCreator).toBe(licensedSheetCreator);
    expect(response.data[0].resourceViewer).toBe(resourceViewer);
    expect(response.data[0].groupAdmin).toBe(groupAdmin);
    expect(response.data[0].status).toBe(status);
    expect(response.data[0].sheetCount).toBe(sheetCount);
    expect(response.data[0].lastLogin).toBe(lastLogin);
    expect(response.data[0].customWelcomeScreenViewed).toBe(customWelcomeScreenViewed);
    expect(response.data[0].id).toBe(TEST_PLAN_ID);
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
    expect(response).toBeTruthy();
    expect(response.data[0].seatType).toBe(seatType);
    expect(response.data[0].seatTypeLastChangedAt).toBe(undefined);
    expect(response.data[0].provisionalExpirationDate).toBe(undefined);
    expect(response.data[0].isInternal).toBe(isInternal);
    expect(response.data[0].firstName).toBe(firstName);
    expect(response.data[0].lastName).toBe(lastName);
    expect(response.data[0].name).toBe(name);
    expect(response.data[0].email).toBe(email);
    expect(response.data[0].admin).toBe(admin);
    expect(response.data[0].licensedSheetCreator).toBe(licensedSheetCreator);
    expect(response.data[0].resourceViewer).toBe(resourceViewer);
    expect(response.data[0].groupAdmin).toBe(groupAdmin);
    expect(response.data[0].status).toBe(status);
    expect(response.data[0].sheetCount).toBe(sheetCount);
    expect(response.data[0].lastLogin).toBe(undefined);
    expect(response.data[0].customWelcomeScreenViewed).toBe(undefined);
    expect(response.data[0].id).toBe(TEST_PLAN_ID);
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
