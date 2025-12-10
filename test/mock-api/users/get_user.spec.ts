import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_USER_ID,
    TEST_ACCOUNT_ID,
    TEST_ALTERNATE_EMAIL_ID,
    TEST_MOBILE_PHONE,
    TEST_EMAIL,
    TEST_ALTERNATE_EMAIL,
    TEST_FIRST_NAME,
    TEST_LAST_NAME,
    TEST_LAST_LOGIN,
    TEST_CUSTOM_WELCOME_SCREEN_VIEWED,
    TEST_SHEET_COUNT,
    TEST_PROFILE_IMAGE_ID,
    TEST_PROFILE_IMAGE_HEIGHT,
    TEST_PROFILE_IMAGE_WIDTH,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE,
    TEST_DEPARTMENT,
    TEST_LOCALE,
    TEST_TIME_ZONE,
    TEST_JIRA_ADMIN,
    TEST_SALESFORCE_ADMIN,
    TEST_SALESFORCE_USER,
    TEST_ADMIN,
    TEST_GROUP_ADMIN,
    TEST_LICENSED_SHEET_CREATOR,
    TEST_ALTERNATE_EMAIL_CONFIRMED
} from './common_test_constants';

describe('Users - getUser endpoint tests', () => {
    const client = createClient();

    it('getUser generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/get-user/all-response-body-properties'
            }
        };
        await client.users.getUser(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual(`/2.0/users/${TEST_USER_ID}`);
    });

    it('getUser all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/get-user/all-response-body-properties'
            }
        };
        const response = await client.users.getUser(options);
        
        expect(response).toEqual({
            id: TEST_USER_ID,
            account: {
                id: TEST_ACCOUNT_ID,
                name: 'Acme Corporation'
            },
            company: 'Acme Corporation',
            department: TEST_DEPARTMENT,
            email: TEST_EMAIL,
            firstName: TEST_FIRST_NAME,
            jiraAdmin: TEST_JIRA_ADMIN,
            lastName: TEST_LAST_NAME,
            locale: TEST_LOCALE,
            mobilePhone: TEST_MOBILE_PHONE,
            role: 'Senior Developer',
            salesforceAdmin: TEST_SALESFORCE_ADMIN,
            salesforceUser: TEST_SALESFORCE_USER,
            timeZone: TEST_TIME_ZONE,
            title: 'Senior Software Engineer',
            workPhone: TEST_MOBILE_PHONE,
            admin: TEST_ADMIN,
            alternateEmails: [
                {
                    id: TEST_ALTERNATE_EMAIL_ID,
                    confirmed: TEST_ALTERNATE_EMAIL_CONFIRMED,
                    email: TEST_ALTERNATE_EMAIL
                }
            ],
            customWelcomeScreenViewed: TEST_CUSTOM_WELCOME_SCREEN_VIEWED,
            groupAdmin: TEST_GROUP_ADMIN,
            lastLogin: TEST_LAST_LOGIN,
            licensedSheetCreator: TEST_LICENSED_SHEET_CREATOR,
            profileImage: {
                imageId: TEST_PROFILE_IMAGE_ID,
                height: TEST_PROFILE_IMAGE_HEIGHT,
                width: TEST_PROFILE_IMAGE_WIDTH
            },
            resourceViewer: false,
            sheetCount: TEST_SHEET_COUNT
        });
    });

    it('getUser required response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/get-user/required-response-body-properties'
            }
        };
        const response = await client.users.getUser(options);
        
        expect(response).toEqual({
            id: TEST_USER_ID,
            account: {
                id: TEST_ACCOUNT_ID,
                name: 'Acme Corporation',
            },
            company: 'Acme Corporation',
            department: TEST_DEPARTMENT,
            email: TEST_EMAIL,
            firstName: TEST_FIRST_NAME,
            jiraAdmin: TEST_JIRA_ADMIN,
            lastName: TEST_LAST_NAME,
            locale: TEST_LOCALE,
            mobilePhone: TEST_MOBILE_PHONE,
            role: 'Senior Developer',
            salesforceAdmin: TEST_SALESFORCE_ADMIN,
            salesforceUser: TEST_SALESFORCE_USER,
            timeZone: TEST_TIME_ZONE,
            title: 'Senior Software Engineer',
            workPhone: TEST_MOBILE_PHONE
        });
    });

    it('getUser error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.users.getUser(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('getUser error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.users.getUser(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
