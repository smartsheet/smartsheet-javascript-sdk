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

describe('Reports - sendReportViaEmail endpoint tests', () => {
    const client = createClient();

    const testEmailBody = {
        sendTo: [{ email: 'john.doe@smartsheet.com' }],
        subject: 'Check this report out!',
        message: 'Here is the report I mentioned',
        ccMe: false,
        format: 'PDF',
        formatDetails: { paperSize: 'A4' }
    };

    it('sendReportViaEmail generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            body: testEmailBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/send-report-via-email/success-response'
            }
        };
        await client.reports.sendReportViaEmail(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual(`/2.0/reports/${TEST_REPORT_ID}/emails`);
    });

    it('sendReportViaEmail success response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            body: testEmailBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/send-report-via-email/success-response'
            }
        };
        const response = await client.reports.sendReportViaEmail(options);
        const matchedRequest = await findWireMockRequest(requestId);
        
        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE,
            version: 1
        });

        const body = JSON.parse(matchedRequest.body);
        expect(body).toEqual({
            sendTo: [{ email: 'john.doe@smartsheet.com' }],
            subject: 'Check this report out!',
            message: 'Here is the report I mentioned',
            ccMe: false,
            format: 'PDF',
            formatDetails: { paperSize: 'A4' }
        });
    });

    it('sendReportViaEmail with multiple recipients', async () => {
        const requestId = crypto.randomUUID();
        const multipleRecipientsBody = {
            sendTo: [
                { email: 'john.doe@smartsheet.com' },
                { email: 'jane.doe@smartsheet.com' }
            ],
            subject: 'Monthly Report',
            message: 'Please review the attached monthly report',
            ccMe: true,
            format: 'PDF',
            formatDetails: { paperSize: 'LETTER' }
        };
        const options = {
            reportId: TEST_REPORT_ID,
            body: multipleRecipientsBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/send-report-via-email/success-response'
            }
        };
        const response = await client.reports.sendReportViaEmail(options);
        const matchedRequest = await findWireMockRequest(requestId);
        
        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE,
            version: 1
        });

        const body = JSON.parse(matchedRequest.body);
        expect(body).toEqual({
            sendTo: [
                { email: 'john.doe@smartsheet.com' },
                { email: 'jane.doe@smartsheet.com' }
            ],
            subject: 'Monthly Report',
            message: 'Please review the attached monthly report',
            ccMe: true,
            format: 'PDF',
            formatDetails: { paperSize: 'LETTER' }
        });
    });

    it('sendReportViaEmail with group recipient', async () => {
        const requestId = crypto.randomUUID();
        const groupRecipientBody = {
            sendTo: [
                { groupId: 123456789 }
            ],
            subject: 'Report for Team',
            message: 'Team report attached',
            ccMe: false,
            format: 'EXCEL'
        };
        const options = {
            reportId: TEST_REPORT_ID,
            body: groupRecipientBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/reports/send-report-via-email/success-response'
            }
        };
        const response = await client.reports.sendReportViaEmail(options);
        const matchedRequest = await findWireMockRequest(requestId);
        
        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE,
            version: 1
        });

        const body = JSON.parse(matchedRequest.body);
        expect(body).toEqual({
            sendTo: [
                { groupId: 123456789 }
            ],
            subject: 'Report for Team',
            message: 'Team report attached',
            ccMe: false,
            format: 'EXCEL'
        });
    });

    it('sendReportViaEmail error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            body: testEmailBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.reports.sendReportViaEmail(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('sendReportViaEmail error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            reportId: TEST_REPORT_ID,
            body: testEmailBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.reports.sendReportViaEmail(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
