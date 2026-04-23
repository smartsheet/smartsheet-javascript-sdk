import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_SUCCESS_MESSAGE,
    TEST_SUCCESS_RESULT_CODE,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';
import { ReportColumnType, SystemColumnType, ReportAssetType, ReportDestinationType } from '../../../lib/reports/types';

describe('Reports - createReport endpoint tests', () => {
    const client = createClient();

    const testCreateReportRequired = {
        name: 'Q2 Earnings Report',
        destination: {
            destinationType: ReportDestinationType.FOLDER,
            destinationId: 1234567890
        },
        columns: [
            {
                title: 'Primary',
                type: ReportColumnType.TEXT_NUMBER,
                primary: true,
                index: 0
            }
        ],
        scope: [
            {
                assetType: ReportAssetType.SHEET,
                assetId: 9876543210
            }
        ]
    };

    const testCreateReportAllProperties = {
        name: 'Q2 Project Status',
        destination: {
            destinationType: ReportDestinationType.WORKSPACE,
            destinationId: 5555555555
        },
        columns: [
            {
                title: 'Primary',
                type: ReportColumnType.TEXT_NUMBER,
                primary: true,
                index: 0
            },
            {
                title: 'Status',
                type: ReportColumnType.PICKLIST,
                index: 1,
                hidden: false,
                width: 150
            },
            {
                title: 'Created By',
                type: ReportColumnType.CONTACT_LIST,
                systemColumnType: SystemColumnType.CREATED_BY,
                index: 2
            }
        ],
        scope: [
            {
                assetType: ReportAssetType.SHEET,
                assetId: 9876543210
            },
            {
                assetType: ReportAssetType.WORKSPACE,
                assetId: 1122334455
            }
        ],
        reportDefinition: {
            filters: {
                operator: 'AND',
                criteria: [
                    {
                        column: {
                            title: 'Status',
                            type: 'PICKLIST'
                        },
                        operator: 'EQUAL',
                        values: ['In Progress']
                    }
                ]
            },
            sortingCriteria: [
                {
                    column: {
                        title: 'Primary',
                        type: 'TEXT_NUMBER',
                        primary: true
                    },
                    sortingDirection: 'ASCENDING'
                }
            ]
        },
        isSummaryReport: false
    };

    it('createReport generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            body: testCreateReportRequired,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/create-report/required-response-body-properties'
            }
        };
        await client.reports.createReport(options);
        const matchedRequest = await findWireMockRequest(requestId);

        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual('/2.0/reports');
    });

    it('createReport uses POST method', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            body: testCreateReportRequired,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/create-report/required-response-body-properties'
            }
        };
        await client.reports.createReport(options);
        const matchedRequest = await findWireMockRequest(requestId);
        expect(matchedRequest.method).toEqual('POST');
    });

    it('createReport required response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            body: testCreateReportRequired,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/create-report/required-response-body-properties'
            }
        };
        const response = await client.reports.createReport(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE,
            result: [
                {
                    id: 4583614634583940,
                    name: 'Q2 Earnings',
                    accessLevel: 'OWNER',
                    permalink: 'https://app.smartsheet.com/reports/c8gJxw87cXpRCvCC5PPw6jFhFRrf5r8PxCrxvW21'
                }
            ]
        });

        const body = JSON.parse(matchedRequest.body);
        expect(body).toEqual(testCreateReportRequired);
    });

    it('createReport all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            body: testCreateReportAllProperties,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/create-report/all-response-body-properties'
            }
        };
        const response = await client.reports.createReport(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE,
            result: [
                {
                    id: 4583614634583940,
                    name: 'Q2 Earnings',
                    accessLevel: 'OWNER',
                    permalink: 'https://app.smartsheet.com/reports/c8gJxw87cXpRCvCC5PPw6jFhFRrf5r8PxCrxvW21',
                    isSummaryReport: false
                }
            ]
        });

        const body = JSON.parse(matchedRequest.body);
        expect(body).toEqual(testCreateReportAllProperties);
    });

    it('createReport request body marshalling validation', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            body: testCreateReportAllProperties,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/create-report/all-response-body-properties'
            }
        };
        await client.reports.createReport(options);
        const matchedRequest = await findWireMockRequest(requestId);

        // Parse the request body sent by the SDK
        const actualRequestBody = JSON.parse(matchedRequest.body);

        // Validate that the entire request body structure matches exactly
        expect(actualRequestBody).toEqual(testCreateReportAllProperties);

        // Validate top-level properties
        expect(actualRequestBody.name).toBe('Q2 Project Status');
        expect(actualRequestBody.isSummaryReport).toBe(false);

        // Validate destination structure
        expect(actualRequestBody.destination).toEqual({
            destinationType: 'workspace',
            destinationId: 5555555555
        });

        // Validate columns array
        expect(actualRequestBody.columns).toHaveLength(3);
        expect(actualRequestBody.columns[0]).toEqual({
            title: 'Primary',
            type: 'TEXT_NUMBER',
            primary: true,
            index: 0
        });
        expect(actualRequestBody.columns[1]).toEqual({
            title: 'Status',
            type: 'PICKLIST',
            index: 1,
            hidden: false,
            width: 150
        });
        expect(actualRequestBody.columns[2]).toEqual({
            title: 'Created By',
            type: 'CONTACT_LIST',
            systemColumnType: 'CREATED_BY',
            index: 2
        });

        // Validate scope array
        expect(actualRequestBody.scope).toHaveLength(2);
        expect(actualRequestBody.scope[0]).toEqual({
            assetType: 'sheet',
            assetId: 9876543210
        });
        expect(actualRequestBody.scope[1]).toEqual({
            assetType: 'workspace',
            assetId: 1122334455
        });

        // Validate report definition
        expect(actualRequestBody.reportDefinition).toBeDefined();
        expect(actualRequestBody.reportDefinition.filters).toBeDefined();
        expect(actualRequestBody.reportDefinition.filters.operator).toBe('AND');
        expect(actualRequestBody.reportDefinition.filters.criteria).toHaveLength(1);
        expect(actualRequestBody.reportDefinition.sortingCriteria).toHaveLength(1);
    });

    it('createReport error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            body: testCreateReportRequired,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.reports.createReport(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error: any) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('createReport error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            body: testCreateReportRequired,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.reports.createReport(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error: any) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
