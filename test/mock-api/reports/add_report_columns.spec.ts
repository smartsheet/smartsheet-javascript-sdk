import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_REPORT_ID,
    TEST_SUCCESS_MESSAGE,
    TEST_SUCCESS_RESULT_CODE,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Reports - addReportColumns endpoint tests', () => {
    const client = createClient();

    const testColumnsAllProperties = [
        {
            title: 'Item selected',
            type: 'CHECKBOX',
            index: 4
        },
        {
            title: 'Sheet name',
            type: 'TEXT_NUMBER',
            sheetNameColumn: true,
            index: 5
        }
    ];

    const testColumnsRequiredProperties = [
        {
            title: 'Item selected',
            type: 'CHECKBOX',
            index: 4
        },
        {
            title: 'Sheet name',
            type: 'TEXT_NUMBER',
            index: 5
        }
    ];

    // Comprehensive request body with all possible fields for marshalling validation
    const testColumnsCompleteStructure = [
        {
            index: 0,
            title: 'Status Column',
            type: 'PICKLIST',
            hidden: false,
            width: 150
        },
        {
            index: 1,
            title: 'Task Name',
            type: 'TEXT_NUMBER',
            primary: true,
            hidden: false,
            width: 200
        },
        {
            index: 2,
            title: 'Created By',
            type: 'CONTACT_LIST',
            systemColumnType: 'CREATED_BY',
            hidden: false,
            width: 120
        },
        {
            index: 3,
            title: 'Modified Date',
            type: 'DATETIME',
            systemColumnType: 'MODIFIED_DATE',
            hidden: true,
            width: 100
        },
        {
            index: 4,
            title: 'Sheet Name',
            type: 'TEXT_NUMBER',
            sheetNameColumn: true,
            hidden: false,
            width: 180
        }
    ];

    it('addReportColumns generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            body: testColumnsAllProperties,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/add-report-columns/all-response-body-properties'
            }
        };
        await client.reports.addReportColumns(options);
        const matchedRequest = await findWireMockRequest(requestId);

        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual(`/2.0/reports/${TEST_REPORT_ID}/columns`);
    });

    it('addReportColumns uses POST method', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            body: testColumnsAllProperties,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/add-report-columns/all-response-body-properties'
            }
        };
        await client.reports.addReportColumns(options);
        const matchedRequest = await findWireMockRequest(requestId);
        expect(matchedRequest.method).toEqual('POST');
    });

    it('addReportColumns all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            body: testColumnsAllProperties,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/add-report-columns/all-response-body-properties'
            }
        };
        const response = await client.reports.addReportColumns(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE,
            result: [
                {
                    virtualId: 12345,
                    index: 4,
                    title: 'Item selected',
                    type: 'CHECKBOX',
                    hidden: false,
                    version: 0,
                    width: 150
                },
                {
                    virtualId: 12346,
                    index: 5,
                    title: 'Sheet name',
                    type: 'TEXT_NUMBER',
                    systemColumnType: 'SHEET_NAME',
                    hidden: false,
                    version: 0,
                    width: 150,
                    sheetNameColumn: true
                }
            ]
        });

        const body = JSON.parse(matchedRequest.body);
        expect(body).toEqual(testColumnsAllProperties);
    });

    it('addReportColumns required response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            body: testColumnsRequiredProperties,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/add-report-columns/required-response-body-properties'
            }
        };
        const response = await client.reports.addReportColumns(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE,
            result: [
                {
                    virtualId: 12345,
                    index: 4,
                    title: 'Item selected',
                    type: 'CHECKBOX'
                },
                {
                    virtualId: 12346,
                    index: 5,
                    title: 'Sheet name',
                    type: 'TEXT_NUMBER'
                }
            ]
        });

        const body = JSON.parse(matchedRequest.body);
        expect(body).toEqual(testColumnsRequiredProperties);
    });

    it('addReportColumns error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            body: testColumnsAllProperties,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.reports.addReportColumns(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('addReportColumns error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            body: testColumnsAllProperties,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.reports.addReportColumns(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });

    it('addReportColumns request body marshalling validation', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            body: testColumnsCompleteStructure,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/add-report-columns/all-response-body-properties'
            }
        };
        await client.reports.addReportColumns(options);
        const matchedRequest = await findWireMockRequest(requestId);

        // Parse the request body sent by the SDK
        const actualRequestBody = JSON.parse(matchedRequest.body);

        // Validate that the entire request body structure matches exactly
        // This protects against accidental field additions or removals in the ReportColumn type
        expect(actualRequestBody).toEqual(testColumnsCompleteStructure);

        // Additional validation: ensure each column has expected structure
        expect(actualRequestBody).toHaveLength(5);

        // Validate first column (PICKLIST)
        expect(actualRequestBody[0]).toEqual({
            index: 0,
            title: 'Status Column',
            type: 'PICKLIST',
            hidden: false,
            width: 150
        });

        // Validate second column (primary TEXT_NUMBER)
        expect(actualRequestBody[1]).toEqual({
            index: 1,
            title: 'Task Name',
            type: 'TEXT_NUMBER',
            primary: true,
            hidden: false,
            width: 200
        });

        // Validate third column (system column CREATED_BY)
        expect(actualRequestBody[2]).toEqual({
            index: 2,
            title: 'Created By',
            type: 'CONTACT_LIST',
            systemColumnType: 'CREATED_BY',
            hidden: false,
            width: 120
        });

        // Validate fourth column (system column MODIFIED_DATE)
        expect(actualRequestBody[3]).toEqual({
            index: 3,
            title: 'Modified Date',
            type: 'DATETIME',
            systemColumnType: 'MODIFIED_DATE',
            hidden: true,
            width: 100
        });

        // Validate fifth column (sheet name column)
        expect(actualRequestBody[4]).toEqual({
            index: 4,
            title: 'Sheet Name',
            type: 'TEXT_NUMBER',
            sheetNameColumn: true,
            hidden: false,
            width: 180
        });
    });
});
