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
    TEST_SUCCESS_MESSAGE,
    TEST_SUCCESS_RESULT_CODE,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Groups - createGroup endpoint tests', () => {
    const client = createClient();

    it('createGroup generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            body: {
                name: TEST_GROUP_NAME,
                description: TEST_GROUP_DESCRIPTION
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/groups/add-group/all-response-body-properties'
            }
        };
        await client.groups.createGroup(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.url.includes('/2.0/groups')).toBeTruthy();
    });

    it('createGroup all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            body: {
                name: TEST_GROUP_NAME,
                description: TEST_GROUP_DESCRIPTION
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/groups/add-group/all-response-body-properties'
            }
        };
        const response = await client.groups.createGroup(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(response).toBeTruthy();
        expect(response.message).toBe(TEST_SUCCESS_MESSAGE);
        expect(response.resultCode).toBe(TEST_SUCCESS_RESULT_CODE);
        expect(response.result).toBeTruthy();
        expect(response.result.id).toBe(TEST_GROUP_ID);
        expect(response.result.name).toBe(TEST_GROUP_NAME);
        expect(response.result.description).toBe(TEST_GROUP_DESCRIPTION);
        expect(response.result.owner).toBe(TEST_GROUP_OWNER);
        expect(response.result.ownerId).toBe(TEST_GROUP_OWNER_ID);
        expect(response.result.createdAt).toBe(TEST_GROUP_CREATED_AT);
        expect(response.result.modifiedAt).toBe(TEST_GROUP_MODIFIED_AT);

        const body = JSON.parse(matchedRequest.body);
        expect(body.name).toBe(TEST_GROUP_NAME);
        expect(body.description).toBe(TEST_GROUP_DESCRIPTION);
    });

    it('createGroup error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            body: {
                name: TEST_GROUP_NAME,
                description: TEST_GROUP_DESCRIPTION
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.groups.createGroup(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('createGroup error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            body: {
                name: TEST_GROUP_NAME,
                description: TEST_GROUP_DESCRIPTION
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.groups.createGroup(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
