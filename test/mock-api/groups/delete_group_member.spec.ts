import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_GROUP_ID,
    TEST_MEMBER_ID,
    TEST_SUCCESS_MESSAGE,
    TEST_SUCCESS_RESULT_CODE,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Groups - removeGroupMember endpoint tests', () => {
    const client = createClient();

    it('removeGroupMember generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            groupId: TEST_GROUP_ID,
            userId: TEST_MEMBER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/groups/delete-group-member/all-response-body-properties'
            }
        };
        await client.groups.removeGroupMember(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.url.includes(`/groups/${TEST_GROUP_ID}/members/${TEST_MEMBER_ID}`)).toBeTruthy();
    });

    it('removeGroupMember all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            groupId: TEST_GROUP_ID,
            userId: TEST_MEMBER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/groups/delete-group-member/all-response-body-properties'
            }
        };
        const response = await client.groups.removeGroupMember(options);
        expect(response).toBeTruthy();
        expect(response.message).toBe(TEST_SUCCESS_MESSAGE);
        expect(response.resultCode).toBe(TEST_SUCCESS_RESULT_CODE);
    });

    it('removeGroupMember error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            groupId: TEST_GROUP_ID,
            userId: TEST_MEMBER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.groups.removeGroupMember(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('removeGroupMember error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            groupId: TEST_GROUP_ID,
            userId: TEST_MEMBER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.groups.removeGroupMember(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
