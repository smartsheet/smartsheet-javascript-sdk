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

    const testUpdateBody = {
        email: TEST_EMAIL,
        firstName: TEST_FIRST_NAME,
        lastName: TEST_LAST_NAME,
        admin: true,
        licensedSheetCreator: true,
        groupAdmin: false,
        resourceViewer: true
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
        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual(`/2.0/users/${TEST_USER_ID}`);
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
        
        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE,
            data: [
                {
                    id: TEST_USER_ID,
                    email: TEST_EMAIL,
                    firstName: TEST_FIRST_NAME,
                    lastName: TEST_LAST_NAME,
                    name: TEST_NAME,
                    profileImage: {
                        imageId: TEST_PROFILE_IMAGE_ID,
                        height: TEST_PROFILE_IMAGE_HEIGHT,
                        width: TEST_PROFILE_IMAGE_WIDTH
                    }
                }
            ]
        });
        
        const body = JSON.parse(matchedRequest.body);
        expect(body).toEqual(testUpdateBody);
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
        
        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE,
            data: [
                {
                    id: TEST_USER_ID,
                    email: TEST_EMAIL,
                    firstName: TEST_FIRST_NAME,
                    lastName: TEST_LAST_NAME,
                    name: TEST_NAME
                }
            ]
        });
        
        const body = JSON.parse(matchedRequest.body);
        expect(body).toEqual(testUpdateBody);
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
