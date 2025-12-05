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

        expect(matchedRequest.url.includes(`/groups/${TEST_GROUP_ID}/members`)).toBeTruthy();
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

        expect(response).toBeTruthy();
        expect(response.message).toBe(TEST_SUCCESS_MESSAGE);
        expect(response.resultCode).toBe(TEST_SUCCESS_RESULT_CODE);
        expect(Array.isArray(response.result)).toBe(true);
        expect(response.result[0].id).toBe(TEST_MEMBER_ID);
        expect(response.result[0].email).toBe(TEST_MEMBER_EMAIL);
        expect(response.result[0].firstName).toBe(TEST_MEMBER_FIRST_NAME);
        expect(response.result[0].lastName).toBe(TEST_MEMBER_LAST_NAME);
        expect(response.result[0].name).toBe(TEST_MEMBER_NAME);

        const body = JSON.parse(matchedRequest.body);
        expect(Array.isArray(body)).toBe(true);
        expect(body[0].email).toBe(TEST_MEMBER_EMAIL);
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

        expect(response).toBeTruthy();
        expect(response.message).toBe(TEST_SUCCESS_MESSAGE);
        expect(response.resultCode).toBe(TEST_SUCCESS_RESULT_CODE);
        expect(Array.isArray(response.result)).toBe(false);
        expect(response.result.id).toBe(TEST_MEMBER_ID);
        expect(response.result.email).toBe(TEST_MEMBER_EMAIL);
        expect(response.result.firstName).toBe(TEST_MEMBER_FIRST_NAME);
        expect(response.result.lastName).toBe(TEST_MEMBER_LAST_NAME);
        expect(response.result.name).toBe(TEST_MEMBER_NAME);

        const body = JSON.parse(matchedRequest.body);
        expect(body.email).toBe(TEST_MEMBER_EMAIL);
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
