import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_EMAIL,
    TEST_FIRST_NAME,
    TEST_LAST_NAME,
    TEST_NAME,
    TEST_CUSTOM_WELCOME_SCREEN_VIEWED,
    TEST_LAST_LOGIN,
    TEST_PROVISIONAL_EXPIRATION_DATE,
    TEST_SEAT_TYPE_LAST_CHANGED_AT,
    TEST_SHEET_COUNT,
    TEST_PROFILE_IMAGE_ID,
    TEST_PROFILE_IMAGE_HEIGHT,
    TEST_PROFILE_IMAGE_WIDTH,
    TEST_SUCCESS_MESSAGE,
    TEST_SUCCESS_RESULT_CODE,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE,
    TEST_USER_ID
} from './common_test_constants';
import { SeatTypes, UserStatus } from '@smartsheet/users/types';

describe('Users - addUser endpoint tests', () => {
    const client = createClient();
    const newUserId = TEST_USER_ID;
    const email = TEST_EMAIL;
    const firstName = TEST_FIRST_NAME;
    const lastName = TEST_LAST_NAME;
    const name = TEST_NAME;
    const admin = false;
    const licensedSheetCreator = true;
    const groupAdmin = false;
    const resourceViewer = false;
    const status = UserStatus.ACTIVE;
    const customWelcomeScreenViewed = TEST_CUSTOM_WELCOME_SCREEN_VIEWED;
    const lastLogin = TEST_LAST_LOGIN;
    const isInternal = true;
    const profileImageId = TEST_PROFILE_IMAGE_ID;
    const profileImageHeight = TEST_PROFILE_IMAGE_HEIGHT;
    const profileImageWidth = TEST_PROFILE_IMAGE_WIDTH;
    const provisionalExpirationDate = TEST_PROVISIONAL_EXPIRATION_DATE;
    const seatType = SeatTypes.MEMBER;
    const seatTypeLastChangedAt = TEST_SEAT_TYPE_LAST_CHANGED_AT;
    const sheetCount = TEST_SHEET_COUNT;

    const testUserBody = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        admin: admin,
        licensedSheetCreator: licensedSheetCreator,
        groupAdmin: groupAdmin,
        resourceViewer: resourceViewer,
        status: status
    };

    it('addUser generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            body: testUserBody,
            queryParameters: {
                sendEmail: true
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/add-user/all-response-body-properties'
            }
        };
        await client.users.addUser(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.url.includes('/2.0/users')).toBeTruthy();
    });
    
    it('addUserAndSendEmail generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            body: testUserBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/add-user/all-response-body-properties'
            }
        };
        await client.users.addUserAndSendEmail(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.url.includes('/2.0/users')).toBeTruthy();
        expect(matchedRequest.queryParams).toEqual({
            sendEmail: {
                key: 'sendEmail',
                values: ['true']
            }
        });
    });


    it('addUser all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            body: testUserBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/add-user/all-response-body-properties'
            }
        };
        const response = await client.users.addUser(options);
        const matchedRequest = await findWireMockRequest(requestId);
        
        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE,
            result: {
                id: newUserId,
                admin: admin,
                customWelcomeScreenViewed: customWelcomeScreenViewed,
                email: email,
                firstName: firstName,
                groupAdmin: groupAdmin,
                isInternal: isInternal,
                lastLogin: lastLogin,
                lastName: lastName,
                licensedSheetCreator: licensedSheetCreator,
                name: name,
                profileImage: {
                    imageId: profileImageId,
                    height: profileImageHeight,
                    width: profileImageWidth
                },
                provisionalExpirationDate: provisionalExpirationDate,
                resourceViewer: resourceViewer,
                seatType: seatType,
                seatTypeLastChangedAt: seatTypeLastChangedAt,
                sheetCount: sheetCount,
                status: status
            }
        });
        
        const body = JSON.parse(matchedRequest.body);
        expect(body).toEqual({
            email: email,
            firstName: firstName,
            lastName: lastName,
            admin: admin,
            licensedSheetCreator: licensedSheetCreator,
            groupAdmin: groupAdmin,
            resourceViewer: resourceViewer,
            status: status
        });
    });

    it('addUser required response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            body: testUserBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/add-user/required-response-body-properties'
            }
        };
        const response = await client.users.addUser(options);
        const matchedRequest = await findWireMockRequest(requestId);
        
        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE,
            result: {
                id: newUserId,
                email: email,
                firstName: firstName,
                lastName: lastName,
                name: name,
                status: status
            }
        });
        
        const body = JSON.parse(matchedRequest.body);
        expect(body).toEqual({
            email: email,
            firstName: firstName,
            lastName: lastName,
            admin: admin,
            licensedSheetCreator: licensedSheetCreator,
            groupAdmin: groupAdmin,
            resourceViewer: resourceViewer,
            status: status
        });
    });

    it('addUser error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            body: testUserBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.users.addUser(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('addUser error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            body: testUserBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.users.addUser(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
