import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import { APIAccessLevel } from '@smartsheet/types';
import {
    TEST_REPORT_ID,
    TEST_REPORT_CREATED_AT,
    TEST_REPORT_MODIFIED_AT,
    TEST_PATH_WORKSPACE_ID,
    TEST_PATH_WORKSPACE_NAME,
    TEST_PATH_WORKSPACE_PERMALINK,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE,
} from './common_test_constants';
import { ReportPathNode } from '@smartsheet/reports/types';

describe('Reports - getReportPath endpoint tests', () => {
    const client = createClient();

    it('getReportPath generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/get-nested-report-path/all-response-body-properties',
            },
        };
        await client.reports.getReportPath(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual(`/2.0/reports/${TEST_REPORT_ID}/path`);
        expect(matchedRequest.method).toEqual('GET');
        const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
        expect(queryParamsObject).toEqual({});
    });

    it('getReportPath all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/get-nested-report-path/all-response-body-properties',
            },
        };
        const response = await client.reports.getReportPath(options);
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
                            reports: [
                                {
                                    id: 3456789012345678,
                                    name: 'Project Report',
                                    permalink: 'https://app.smartsheet.com/reports/3456789012345678',
                                    accessLevel: APIAccessLevel.admin,
                                    createdAt: TEST_REPORT_CREATED_AT,
                                    modifiedAt: TEST_REPORT_MODIFIED_AT,
                                },
                            ],
                        },
                    ],
                },
            ],
        });
    });

    it('getReportPath root level response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/get-root-report-path/all-response-body-properties',
            },
        };
        const response = await client.reports.getReportPath(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(matchedRequest.body).toEqual('');
        expect(response).toEqual({
            id: TEST_PATH_WORKSPACE_ID,
            name: TEST_PATH_WORKSPACE_NAME,
            permalink: TEST_PATH_WORKSPACE_PERMALINK,
            accessLevel: APIAccessLevel.owner,
            reports: [
                {
                    id: 5678901234567890,
                    name: 'Root Level Report',
                    permalink: 'https://app.smartsheet.com/reports/rootlevel',
                    accessLevel: APIAccessLevel.admin,
                    createdAt: TEST_REPORT_CREATED_AT,
                    modifiedAt: TEST_REPORT_MODIFIED_AT,
                },
            ],
        });
    });

    it('getReportPath returns ReportPathNode instance with getReport and getReportPath methods', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/get-nested-report-path/all-response-body-properties',
            },
        };
        const response = await client.reports.getReportPath(options);

        expect(response).toBeInstanceOf(ReportPathNode);
        expect(response.getReport()).toEqual({
            id: 3456789012345678,
            name: 'Project Report',
            permalink: 'https://app.smartsheet.com/reports/3456789012345678',
            accessLevel: APIAccessLevel.admin,
            createdAt: TEST_REPORT_CREATED_AT,
            modifiedAt: TEST_REPORT_MODIFIED_AT,
        });
        expect(response.getReportPath()).toEqual('Sample Workspace/Project Plans/Project Report');
    });

    it('getReportPath error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response',
            },
        };
        try {
            await client.reports.getReportPath(options);
            expect(true).toBe(false);
        } catch (error: any) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('getReportPath error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response',
            },
        };
        try {
            await client.reports.getReportPath(options);
            expect(true).toBe(false);
        } catch (error: any) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
