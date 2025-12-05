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
    const client = createClient();
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

        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE,
            data: [
                {
                    id: TEST_USER_ID,
                    email: email,
                    name: name,
                    firstName: firstName,
                    lastName: lastName,
                    profileImage: {
                        imageId: imageId,
                        height: height,
                        width: width
                    }
                }
            ]
        });
        
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
