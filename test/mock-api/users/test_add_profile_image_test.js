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
    ERROR_400_MESSAGE,
    ADD_PROFILE_IMAGE_REQUEST_BODY
} from './common_test_constants';

describe('Users - addProfileImage endpoint tests', () => {
    let client = createClient();
    const imageId = TEST_PROFILE_IMAGE_ID;
    const height = TEST_PROFILE_IMAGE_HEIGHT;
    const width = TEST_PROFILE_IMAGE_WIDTH;
    const email = TEST_EMAIL;
    const name = TEST_NAME;
    const firstName = TEST_FIRST_NAME;
    const lastName = TEST_LAST_NAME;

    it('addProfileImage generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            fileStream: ADD_PROFILE_IMAGE_REQUEST_BODY,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/add-profile-image/all-response-body-properties'
            }
        };
        await client.users.addProfileImage(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.url.includes(`/users/${TEST_USER_ID}/profileimage`)).toBeTruthy();
    });

    it('addProfileImage all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            fileStream: ADD_PROFILE_IMAGE_REQUEST_BODY,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/add-profile-image/all-response-body-properties'
            }
        };
        const response = await client.users.addProfileImage(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(response).toBeTruthy();
        expect(response.message).toBe(TEST_SUCCESS_MESSAGE);
        expect(response.resultCode).toBe(TEST_SUCCESS_RESULT_CODE);
        expect(response.data).toBeTruthy();
        expect(response.data.length).toBe(1);
        expect(response.data[0].id).toBe(TEST_USER_ID);
        expect(response.data[0].email).toBe(email);
        expect(response.data[0].name).toBe(name);
        expect(response.data[0].firstName).toBe(firstName);
        expect(response.data[0].lastName).toBe(lastName);
        expect(response.data[0].profileImage).toBeTruthy();
        expect(response.data[0].profileImage.imageId).toBe(imageId);
        expect(response.data[0].profileImage.height).toBe(height);
        expect(response.data[0].profileImage.width).toBe(width);
        
        const expectedBody = ADD_PROFILE_IMAGE_REQUEST_BODY.toString();
        expect(matchedRequest.body).toEqual(expectedBody);
    });

    it('addProfileImage error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            fileStream: ADD_PROFILE_IMAGE_REQUEST_BODY,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.users.addProfileImage(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('addProfileImage error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            fileStream: ADD_PROFILE_IMAGE_REQUEST_BODY,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.users.addProfileImage(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
