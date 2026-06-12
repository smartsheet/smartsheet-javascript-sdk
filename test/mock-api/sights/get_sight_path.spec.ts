import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import { APIAccessLevel } from '@smartsheet/types';
import { SightPathNode } from '@smartsheet/sights/types';
import {
    TEST_SIGHT_ID,
    TEST_SIGHT_CREATED_AT,
    TEST_SIGHT_MODIFIED_AT,
    TEST_PATH_WORKSPACE_ID,
    TEST_PATH_WORKSPACE_NAME,
    TEST_PATH_WORKSPACE_PERMALINK,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE,
} from './common_test_constants';

describe('Sights - getSightPath endpoint tests', () => {
    const client = createClient();

    it('getSightPath generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            sightId: TEST_SIGHT_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/sights/get-nested-sight-path/all-response-body-properties',
            },
        };
        await client.sights.getSightPath(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual(`/2.0/sights/${TEST_SIGHT_ID}/path`);
        expect(matchedRequest.method).toEqual('GET');
        const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
        expect(queryParamsObject).toEqual({});
    });

    it('getSightPath all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            sightId: TEST_SIGHT_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/sights/get-nested-sight-path/all-response-body-properties',
            },
        };
        const response = await client.sights.getSightPath(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.body).toEqual('');
        expect(response).toEqual({
            id: TEST_PATH_WORKSPACE_ID,
            name: TEST_PATH_WORKSPACE_NAME,
            permalink: TEST_PATH_WORKSPACE_PERMALINK,
            accessLevel: APIAccessLevel.owner,
            folders: [
                {
                    id: 1234567890123456,
                    name: 'Project Plans',
                    permalink: 'https://app.smartsheet.com/folders/1234567890123456',
                    folders: [
                        {
                            id: 2345678901234567,
                            name: 'Project Plans Subfolder',
                            permalink: 'https://app.smartsheet.com/folders/2345678901234567',
                            sights: [
                                {
                                    id: 3456789012345678,
                                    name: 'Project Dashboard',
                                    permalink: 'https://app.smartsheet.com/dashboards/3456789012345678',
                                    accessLevel: APIAccessLevel.admin,
                                    createdAt: TEST_SIGHT_CREATED_AT,
                                    modifiedAt: TEST_SIGHT_MODIFIED_AT,
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    });

    it('getSightPath root level response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            sightId: TEST_SIGHT_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/sights/get-root-sight-path/all-response-body-properties',
            },
        };
        const response = await client.sights.getSightPath(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.body).toEqual('');
        expect(response).toEqual({
            id: TEST_PATH_WORKSPACE_ID,
            name: TEST_PATH_WORKSPACE_NAME,
            permalink: TEST_PATH_WORKSPACE_PERMALINK,
            accessLevel: APIAccessLevel.owner,
            sights: [
                {
                    id: 5678901234567890,
                    name: 'Root Level Dashboard',
                    permalink: 'https://app.smartsheet.com/dashboards/rootlevel',
                    accessLevel: APIAccessLevel.admin,
                    createdAt: TEST_SIGHT_CREATED_AT,
                    modifiedAt: TEST_SIGHT_MODIFIED_AT,
                },
            ],
        });
    });

    it('getSightPath returns SightPathNode instance with getSight and getSightPath methods', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            sightId: TEST_SIGHT_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/sights/get-nested-sight-path/all-response-body-properties',
            },
        };
        const response = await client.sights.getSightPath(options);

        expect(response).toBeInstanceOf(SightPathNode);
        expect(response.getLeafSight()).toEqual({
            id: 3456789012345678,
            name: 'Project Dashboard',
            permalink: 'https://app.smartsheet.com/dashboards/3456789012345678',
            accessLevel: APIAccessLevel.admin,
            createdAt: TEST_SIGHT_CREATED_AT,
            modifiedAt: TEST_SIGHT_MODIFIED_AT,
        });
        expect(response.getLeafSightPath()).toEqual('/Sample Workspace/Project Plans/Project Dashboard');
    });

    it('getSightPath error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            sightId: TEST_SIGHT_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response',
            },
        };
        try {
            await client.sights.getSightPath(options);
            expect(true).toBe(false);
        } catch (error: any) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('getSightPath error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            sightId: TEST_SIGHT_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response',
            },
        };
        try {
            await client.sights.getSightPath(options);
            expect(true).toBe(false);
        } catch (error: any) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
