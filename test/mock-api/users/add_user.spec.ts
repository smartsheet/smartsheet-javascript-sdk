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
        const queryParams = matchedRequest.queryParams;
        const sendEmailActual = queryParams.sendEmail.values[0];
        expect(sendEmailActual).toBe('true');
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
        
        expect(response).toBeTruthy();
        expect(response.message).toBe(TEST_SUCCESS_MESSAGE);
        expect(response.resultCode).toBe(TEST_SUCCESS_RESULT_CODE);
        expect(response.result.id).toBe(newUserId);
        expect(response.result.admin).toBe(admin);
        expect(response.result.customWelcomeScreenViewed).toBe(customWelcomeScreenViewed);
        expect(response.result.email).toBe(email);
        expect(response.result.firstName).toBe(firstName);
        expect(response.result.groupAdmin).toBe(groupAdmin);
        expect(response.result.isInternal).toBe(isInternal);
        expect(response.result.lastLogin).toBe(lastLogin);
        expect(response.result.lastName).toBe(lastName);
        expect(response.result.licensedSheetCreator).toBe(licensedSheetCreator);
        expect(response.result.name).toBe(name);
        expect(response.result.profileImage.imageId).toBe(profileImageId);
        expect(response.result.profileImage.height).toBe(profileImageHeight);
        expect(response.result.profileImage.width).toBe(profileImageWidth);
        expect(response.result.provisionalExpirationDate).toBe(provisionalExpirationDate);
        expect(response.result.resourceViewer).toBe(resourceViewer);
        expect(response.result.seatType).toBe(seatType);
        expect(response.result.seatTypeLastChangedAt).toBe(seatTypeLastChangedAt);
        expect(response.result.sheetCount).toBe(sheetCount);
        expect(response.result.status).toBe(status);
        
        const body = JSON.parse(matchedRequest.body);
        expect(body.email).toBe(email);
        expect(body.firstName).toBe(firstName);
        expect(body.lastName).toBe(lastName);
        expect(body.admin).toBe(admin);
        expect(body.licensedSheetCreator).toBe(licensedSheetCreator);
        expect(body.groupAdmin).toBe(groupAdmin);
        expect(body.resourceViewer).toBe(resourceViewer);
        expect(body.status).toBe(status);
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
        
        expect(response).toBeTruthy();
        expect(response.message).toBe(TEST_SUCCESS_MESSAGE);
        expect(response.resultCode).toBe(TEST_SUCCESS_RESULT_CODE);
        expect(response.result.id).toBe(newUserId);
        expect(response.result.admin).toBe(undefined);
        expect(response.result.customWelcomeScreenViewed).toBe(undefined);
        expect(response.result.email).toBe(email);
        expect(response.result.firstName).toBe(firstName);
        expect(response.result.groupAdmin).toBe(undefined);
        expect(response.result.isInternal).toBe(undefined);
        expect(response.result.lastLogin).toBe(undefined);
        expect(response.result.lastName).toBe(lastName);
        expect(response.result.licensedSheetCreator).toBe(undefined);
        expect(response.result.name).toBe(name);
        expect(response.result.profileImage).toBe(undefined);
        expect(response.result.provisionalExpirationDate).toBe(undefined);
        expect(response.result.resourceViewer).toBe(undefined);
        expect(response.result.seatType).toBe(undefined);
        expect(response.result.seatTypeLastChangedAt).toBe(undefined);
        expect(response.result.sheetCount).toBe(undefined);
        expect(response.result.status).toBe(status);
        
        const body = JSON.parse(matchedRequest.body);
        expect(body.email).toBe(email);
        expect(body.firstName).toBe(firstName);
        expect(body.lastName).toBe(lastName);
        expect(body.admin).toBe(admin);
        expect(body.licensedSheetCreator).toBe(licensedSheetCreator);
        expect(body.groupAdmin).toBe(groupAdmin);
        expect(body.resourceViewer).toBe(resourceViewer);
        expect(body.status).toBe(status);
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
