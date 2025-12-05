import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_GROUP_ID,
    TEST_GROUP_ID_2,
    TEST_GROUP_NAME,
    TEST_GROUP_NAME_2,
    TEST_GROUP_DESCRIPTION,
    TEST_GROUP_DESCRIPTION_2,
    TEST_GROUP_OWNER,
    TEST_GROUP_OWNER_ID,
    TEST_GROUP_OWNER_2,
    TEST_GROUP_OWNER_ID_2,
    TEST_GROUP_CREATED_AT,
    TEST_GROUP_MODIFIED_AT,
    TEST_GROUP_CREATED_AT_2,
    TEST_GROUP_MODIFIED_AT_2,
    TEST_PAGE_NUMBER,
    TEST_PAGE_SIZE,
    TEST_TOTAL_PAGES,
    TEST_TOTAL_COUNT,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Groups - listGroups endpoint tests', () => {
    const client = createClient();

    it('listGroups generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                includeAll: true
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/groups/list-groups/all-response-body-properties'
            }
        };
        await client.groups.listGroups(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const queryParams = matchedRequest.queryParams;
        const includeAllActual = queryParams.includeAll.values[0];
        expect(matchedRequest.url.includes(`/2.0/groups`)).toBeTruthy();
        expect(includeAllActual).toBe('true');
    });

    it('listGroups all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/groups/list-groups/all-response-body-properties'
            }
        };
        const response = await client.groups.listGroups(options);
        expect(response).toBeTruthy();
        expect(response.pageNumber).toBe(TEST_PAGE_NUMBER);
        expect(response.pageSize).toBe(TEST_PAGE_SIZE);
        expect(response.totalPages).toBe(TEST_TOTAL_PAGES);
        expect(response.totalCount).toBe(TEST_TOTAL_COUNT);
        expect(response.data).toHaveLength(2);
        
        // First group
        expect(response.data[0].id).toBe(TEST_GROUP_ID);
        expect(response.data[0].name).toBe(TEST_GROUP_NAME);
        expect(response.data[0].description).toBe(TEST_GROUP_DESCRIPTION);
        expect(response.data[0].owner).toBe(TEST_GROUP_OWNER);
        expect(response.data[0].ownerId).toBe(TEST_GROUP_OWNER_ID);
        expect(response.data[0].createdAt).toBe(TEST_GROUP_CREATED_AT);
        expect(response.data[0].modifiedAt).toBe(TEST_GROUP_MODIFIED_AT);
        
        // Second group
        expect(response.data[1].id).toBe(TEST_GROUP_ID_2);
        expect(response.data[1].name).toBe(TEST_GROUP_NAME_2);
        expect(response.data[1].description).toBe(TEST_GROUP_DESCRIPTION_2);
        expect(response.data[1].owner).toBe(TEST_GROUP_OWNER_2);
        expect(response.data[1].ownerId).toBe(TEST_GROUP_OWNER_ID_2);
        expect(response.data[1].createdAt).toBe(TEST_GROUP_CREATED_AT_2);
        expect(response.data[1].modifiedAt).toBe(TEST_GROUP_MODIFIED_AT_2);
    });

    it('listGroups error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.groups.listGroups(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('listGroups error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.groups.listGroups(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
