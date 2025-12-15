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
        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual(`/2.0/groups/${TEST_GROUP_ID}`);
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
        expect(response).toEqual({
            id: TEST_GROUP_ID,
            name: TEST_GROUP_NAME,
            description: TEST_GROUP_DESCRIPTION,
            owner: TEST_GROUP_OWNER,
            ownerId: TEST_GROUP_OWNER_ID,
            createdAt: TEST_GROUP_CREATED_AT,
            modifiedAt: TEST_GROUP_MODIFIED_AT,
            members: [
                {
                    id: TEST_MEMBER_ID,
                    email: TEST_MEMBER_EMAIL,
                    firstName: TEST_MEMBER_FIRST_NAME,
                    lastName: TEST_MEMBER_LAST_NAME,
                    name: TEST_MEMBER_NAME
                },
                {
                    id: TEST_MEMBER_ID_2,
                    email: TEST_MEMBER_EMAIL_2,
                    firstName: TEST_MEMBER_FIRST_NAME_2,
                    lastName: TEST_MEMBER_LAST_NAME_2,
                    name: TEST_MEMBER_NAME_2
                }
            ]
        });
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
