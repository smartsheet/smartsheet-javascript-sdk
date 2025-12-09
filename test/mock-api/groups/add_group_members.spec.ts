import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_GROUP_ID,
    TEST_MEMBER_ID,
    TEST_MEMBER_EMAIL,
    TEST_MEMBER_FIRST_NAME,
    TEST_MEMBER_LAST_NAME,
    TEST_MEMBER_NAME,
    TEST_SUCCESS_MESSAGE,
    TEST_SUCCESS_RESULT_CODE,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Groups - addGroupMembers endpoint tests', () => {
    const client = createClient();

    it('addGroupMembers generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            groupId: TEST_GROUP_ID,
            body: [{ email: TEST_MEMBER_EMAIL }],
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/groups/add-group-members/all-response-body-properties'
            }
        };
        await client.groups.addGroupMembers(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual(`/2.0/groups/${TEST_GROUP_ID}/members`);
    });

    it('addGroupMembers multiple members all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            groupId: TEST_GROUP_ID,
            body: [{ email: TEST_MEMBER_EMAIL }],
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/groups/add-group-members/all-response-body-properties'
            }
        };
        const response = await client.groups.addGroupMembers(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE,
            result: [
                {
                    id: TEST_MEMBER_ID,
                    email: TEST_MEMBER_EMAIL,
                    firstName: TEST_MEMBER_FIRST_NAME,
                    lastName: TEST_MEMBER_LAST_NAME,
                    name: TEST_MEMBER_NAME
                }
            ]
        });

        const body = JSON.parse(matchedRequest.body);
        expect(body).toEqual([{ email: TEST_MEMBER_EMAIL }]);
    });

    it('addGroupMembers single member all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            groupId: TEST_GROUP_ID,
            body: { email: TEST_MEMBER_EMAIL },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/groups/add-group-members/single-member-all-response-body-properties'
            }
        };
        const response = await client.groups.addGroupMembers(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE,
            result: {
                id: TEST_MEMBER_ID,
                email: TEST_MEMBER_EMAIL,
                firstName: TEST_MEMBER_FIRST_NAME,
                lastName: TEST_MEMBER_LAST_NAME,
                name: TEST_MEMBER_NAME
            }
        });

        const body = JSON.parse(matchedRequest.body);
        expect(body).toEqual({ email: TEST_MEMBER_EMAIL });
    });

    it('addGroupMembers error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            groupId: TEST_GROUP_ID,
            body: [{ email: TEST_MEMBER_EMAIL }],
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.groups.addGroupMembers(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('addGroupMembers error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            groupId: TEST_GROUP_ID,
            body: [{ email: TEST_MEMBER_EMAIL }],
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.groups.addGroupMembers(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
