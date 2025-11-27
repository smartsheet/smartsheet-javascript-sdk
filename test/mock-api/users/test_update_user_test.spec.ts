import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_USER_ID,
    TEST_EMAIL,
    TEST_FIRST_NAME,
    TEST_LAST_NAME,
    TEST_NAME,
    TEST_PROFILE_IMAGE_ID,
    TEST_PROFILE_IMAGE_HEIGHT,
    TEST_PROFILE_IMAGE_WIDTH,
    TEST_SUCCESS_MESSAGE,
    TEST_SUCCESS_RESULT_CODE,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Users - updateUser endpoint tests', () => {
    const client = createClient();
    const email = TEST_EMAIL;
    const firstName = TEST_FIRST_NAME;
    const lastName = TEST_LAST_NAME;
    const name = TEST_NAME;
    const admin = true;
    const licensedSheetCreator = true;
    const groupAdmin = false;
    const resourceViewer = true;
    const profileImageId = TEST_PROFILE_IMAGE_ID;
    const profileImageHeight = TEST_PROFILE_IMAGE_HEIGHT;
    const profileImageWidth = TEST_PROFILE_IMAGE_WIDTH;

    const testUpdateBody = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        admin: admin,
        licensedSheetCreator: licensedSheetCreator,
        groupAdmin: groupAdmin,
        resourceViewer: resourceViewer
    };

    it('updateUser generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            body: testUpdateBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/update-user/all-response-body-properties'
            }
        };
        await client.users.updateUser(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.url.includes(`/2.0/users/${TEST_USER_ID}`)).toBeTruthy();
    });

    it('updateUser all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            body: testUpdateBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/update-user/all-response-body-properties'
            }
        };
        const response = await client.users.updateUser(options);
        const matchedRequest = await findWireMockRequest(requestId);
        
        expect(response).toBeTruthy();
        expect(response.message).toBe(TEST_SUCCESS_MESSAGE);
        expect(response.resultCode).toBe(TEST_SUCCESS_RESULT_CODE);
        expect(response.data[0].id).toBe(TEST_USER_ID);
        expect(response.data[0].email).toBe(email);
        expect(response.data[0].firstName).toBe(firstName);
        expect(response.data[0].lastName).toBe(lastName);
        expect(response.data[0].name).toBe(name);
        expect(response.data[0].profileImage.imageId).toBe(profileImageId);
        expect(response.data[0].profileImage.height).toBe(profileImageHeight);
        expect(response.data[0].profileImage.width).toBe(profileImageWidth);
        
        const body = JSON.parse(matchedRequest.body);
        expect(body.email).toBe(email);
        expect(body.firstName).toBe(firstName);
        expect(body.lastName).toBe(lastName);
        expect(body.admin).toBe(admin);
        expect(body.licensedSheetCreator).toBe(licensedSheetCreator);
        expect(body.groupAdmin).toBe(groupAdmin);
        expect(body.resourceViewer).toBe(resourceViewer);
    });

    it('updateUser required response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            body: testUpdateBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/update-user/required-response-body-properties'
            }
        };
        const response = await client.users.updateUser(options);
        const matchedRequest = await findWireMockRequest(requestId);
        
        expect(response).toBeTruthy();
        expect(response.message).toBe(TEST_SUCCESS_MESSAGE);
        expect(response.resultCode).toBe(TEST_SUCCESS_RESULT_CODE);
        expect(response.data[0].id).toBe(TEST_USER_ID);
        expect(response.data[0].email).toBe(email);
        expect(response.data[0].firstName).toBe(firstName);
        expect(response.data[0].lastName).toBe(lastName);
        expect(response.data[0].name).toBe(name);
        expect(response.data[0].profileImage).toBe(undefined);
        
        const body = JSON.parse(matchedRequest.body);
        expect(body.email).toBe(email);
        expect(body.firstName).toBe(firstName);
        expect(body.lastName).toBe(lastName);
        expect(body.admin).toBe(admin);
        expect(body.licensedSheetCreator).toBe(licensedSheetCreator);
        expect(body.groupAdmin).toBe(groupAdmin);
        expect(body.resourceViewer).toBe(resourceViewer);
    });

    it('updateUser error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            body: testUpdateBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.users.updateUser(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('updateUser error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            body: testUpdateBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.users.updateUser(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
