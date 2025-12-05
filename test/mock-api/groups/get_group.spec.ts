import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_GROUP_ID,
    TEST_GROUP_NAME,
    TEST_GROUP_DESCRIPTION,
    TEST_GROUP_OWNER,
    TEST_GROUP_OWNER_ID,
    TEST_GROUP_CREATED_AT,
    TEST_GROUP_MODIFIED_AT,
    TEST_MEMBER_ID,
    TEST_MEMBER_EMAIL,
    TEST_MEMBER_FIRST_NAME,
    TEST_MEMBER_LAST_NAME,
    TEST_MEMBER_NAME,
    TEST_MEMBER_ID_2,
    TEST_MEMBER_EMAIL_2,
    TEST_MEMBER_FIRST_NAME_2,
    TEST_MEMBER_LAST_NAME_2,
    TEST_MEMBER_NAME_2,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Groups - getGroup endpoint tests', () => {
    const client = createClient();

    it('getGroup generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            groupId: TEST_GROUP_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/groups/get-group/all-response-body-properties'
            }
        };
        await client.groups.getGroup(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.url.includes(`/groups/${TEST_GROUP_ID}`)).toBeTruthy();
    });

    it('getGroup all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            groupId: TEST_GROUP_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/groups/get-group/all-response-body-properties'
            }
        };
        const response = await client.groups.getGroup(options);
        expect(response).toBeTruthy();
        expect(response.id).toBe(TEST_GROUP_ID);
        expect(response.name).toBe(TEST_GROUP_NAME);
        expect(response.description).toBe(TEST_GROUP_DESCRIPTION);
        expect(response.owner).toBe(TEST_GROUP_OWNER);
        expect(response.ownerId).toBe(TEST_GROUP_OWNER_ID);
        expect(response.createdAt).toBe(TEST_GROUP_CREATED_AT);
        expect(response.modifiedAt).toBe(TEST_GROUP_MODIFIED_AT);
        expect(response.members).toHaveLength(2);
        expect(response.members[0].id).toBe(TEST_MEMBER_ID);
        expect(response.members[0].email).toBe(TEST_MEMBER_EMAIL);
        expect(response.members[0].firstName).toBe(TEST_MEMBER_FIRST_NAME);
        expect(response.members[0].lastName).toBe(TEST_MEMBER_LAST_NAME);
        expect(response.members[0].name).toBe(TEST_MEMBER_NAME);
        expect(response.members[1].id).toBe(TEST_MEMBER_ID_2);
        expect(response.members[1].email).toBe(TEST_MEMBER_EMAIL_2);
        expect(response.members[1].firstName).toBe(TEST_MEMBER_FIRST_NAME_2);
        expect(response.members[1].lastName).toBe(TEST_MEMBER_LAST_NAME_2);
        expect(response.members[1].name).toBe(TEST_MEMBER_NAME_2);
    });

    it('getGroup error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            groupId: TEST_GROUP_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.groups.getGroup(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('getGroup error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            groupId: TEST_GROUP_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.groups.getGroup(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
