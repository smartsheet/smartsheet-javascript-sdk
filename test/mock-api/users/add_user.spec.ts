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
    TEST_USER_ID,
    TEST_SEND_EMAIL
} from './common_test_constants';
import { SeatTypes, UserStatus } from '@smartsheet/users/types';

describe('Users - addUser endpoint tests', () => {
    const client = createClient();

    const testUserBody = {
        email: TEST_EMAIL,
        firstName: TEST_FIRST_NAME,
        lastName: TEST_LAST_NAME,
        admin: false,
        licensedSheetCreator: true,
        groupAdmin: false,
        resourceViewer: false,
        status: UserStatus.ACTIVE
    };

    it('addUser generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            body: testUserBody,
            queryParameters: {
                sendEmail: TEST_SEND_EMAIL
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/add-user/all-response-body-properties'
            }
        };
        await client.users.addUser(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual('/2.0/users');
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
        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual('/2.0/users');

        const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
        expect(queryParamsObject).toEqual({
            sendEmail: TEST_SEND_EMAIL.toString()
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
                id: TEST_USER_ID,
                admin: false,
                customWelcomeScreenViewed: TEST_CUSTOM_WELCOME_SCREEN_VIEWED,
                email: TEST_EMAIL,
                firstName: TEST_FIRST_NAME,
                groupAdmin: false,
                isInternal: true,
                lastLogin: TEST_LAST_LOGIN,
                lastName: TEST_LAST_NAME,
                licensedSheetCreator: true,
                name: TEST_NAME,
                profileImage: {
                    imageId: TEST_PROFILE_IMAGE_ID,
                    height: TEST_PROFILE_IMAGE_HEIGHT,
                    width: TEST_PROFILE_IMAGE_WIDTH
                },
                provisionalExpirationDate: TEST_PROVISIONAL_EXPIRATION_DATE,
                resourceViewer: false,
                seatType: SeatTypes.MEMBER,
                seatTypeLastChangedAt: TEST_SEAT_TYPE_LAST_CHANGED_AT,
                sheetCount: TEST_SHEET_COUNT,
                status: UserStatus.ACTIVE
            }
        });
        
        const body = JSON.parse(matchedRequest.body);
        expect(body).toEqual(testUserBody);
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
                id: TEST_USER_ID,
                email: TEST_EMAIL,
                firstName: TEST_FIRST_NAME,
                lastName: TEST_LAST_NAME,
                name: TEST_NAME,
                status: UserStatus.ACTIVE
            }
        });
        
        const body = JSON.parse(matchedRequest.body);
        expect(body).toEqual(testUserBody);
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
