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
    TEST_INCLUDE_ALL,
    TEST_MODIFIED_SINCE,
    TEST_NUMERIC_DATES,
    TEST_LIST_GROUPS_PAGE,
    TEST_LIST_GROUPS_PAGE_SIZE,
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
                includeAll: TEST_INCLUDE_ALL,
                modifiedSince: TEST_MODIFIED_SINCE,
                numericDates: TEST_NUMERIC_DATES,
                page: TEST_LIST_GROUPS_PAGE,
                pageSize: TEST_LIST_GROUPS_PAGE_SIZE
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/groups/list-groups/all-response-body-properties'
            }
        };
        await client.groups.listGroups(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual('/2.0/groups');

        const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
        expect(queryParamsObject).toEqual({
            includeAll: TEST_INCLUDE_ALL.toString(),
            modifiedSince: TEST_MODIFIED_SINCE,
            numericDates: TEST_NUMERIC_DATES.toString(),
            page: TEST_LIST_GROUPS_PAGE.toString(),
            pageSize: TEST_LIST_GROUPS_PAGE_SIZE.toString()
        });
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
        expect(response).toEqual({
            pageNumber: TEST_PAGE_NUMBER,
            pageSize: TEST_PAGE_SIZE,
            totalPages: TEST_TOTAL_PAGES,
            totalCount: TEST_TOTAL_COUNT,
            data: [
                {
                    id: TEST_GROUP_ID,
                    name: TEST_GROUP_NAME,
                    description: TEST_GROUP_DESCRIPTION,
                    owner: TEST_GROUP_OWNER,
                    ownerId: TEST_GROUP_OWNER_ID,
                    createdAt: TEST_GROUP_CREATED_AT,
                    modifiedAt: TEST_GROUP_MODIFIED_AT
                },
                {
                    id: TEST_GROUP_ID_2,
                    name: TEST_GROUP_NAME_2,
                    description: TEST_GROUP_DESCRIPTION_2,
                    owner: TEST_GROUP_OWNER_2,
                    ownerId: TEST_GROUP_OWNER_ID_2,
                    createdAt: TEST_GROUP_CREATED_AT_2,
                    modifiedAt: TEST_GROUP_MODIFIED_AT_2
                }
            ]
        });
    });

    it('listGroups required response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/groups/list-groups/required-response-body-properties'
            }
        };
        const response = await client.groups.listGroups(options);
        expect(response).toEqual({
            pageNumber: TEST_PAGE_NUMBER,
            totalPages: TEST_TOTAL_PAGES,
            totalCount: TEST_TOTAL_COUNT,
            data: [
                {
                    id: TEST_GROUP_ID,
                    name: TEST_GROUP_NAME,
                    description: TEST_GROUP_DESCRIPTION,
                    owner: TEST_GROUP_OWNER,
                    ownerId: TEST_GROUP_OWNER_ID,
                    createdAt: TEST_GROUP_CREATED_AT,
                    modifiedAt: TEST_GROUP_MODIFIED_AT
                },
                {
                    id: TEST_GROUP_ID_2,
                    name: TEST_GROUP_NAME_2,
                    description: TEST_GROUP_DESCRIPTION_2,
                    owner: TEST_GROUP_OWNER_2,
                    ownerId: TEST_GROUP_OWNER_ID_2,
                    createdAt: TEST_GROUP_CREATED_AT_2,
                    modifiedAt: TEST_GROUP_MODIFIED_AT_2
                }
            ]
        });
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
