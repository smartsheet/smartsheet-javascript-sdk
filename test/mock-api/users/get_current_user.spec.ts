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
    TEST_CUSTOM_WELCOME_SCREEN_VIEWED,
    TEST_LAST_LOGIN,
    TEST_SHEET_COUNT,
    TEST_PROFILE_IMAGE_ID,
    TEST_PROFILE_IMAGE_HEIGHT,
    TEST_PROFILE_IMAGE_WIDTH,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE,
    TEST_ACCOUNT_NAME,
    TEST_COMPANY,
    TEST_DEPARTMENT,
    TEST_LOCALE,
    TEST_ROLE,
    TEST_TIME_ZONE,
    TEST_TITLE,
    TEST_WORK_PHONE,
    TEST_JIRA_ADMIN,
    TEST_SALESFORCE_ADMIN,
    TEST_SALESFORCE_USER,
    TEST_ADMIN,
    TEST_GROUP_ADMIN,
    TEST_LICENSED_SHEET_CREATOR,
    TEST_RESOURCE_VIEWER,
    TEST_ALTERNATE_EMAIL_CONFIRMED,
    TEST_GROUP_ID,
    TEST_GROUP_NAME,
    TEST_GROUP_DESCRIPTION,
    TEST_GROUP_OWNER,
    TEST_GROUP_OWNER_ID,
    TEST_GROUP_CREATED_AT,
    TEST_GROUP_MODIFIED_AT
} from './common_test_constants';

describe('Users - getCurrentUser endpoint tests', () => {
    const client = createClient();

    it('getCurrentUser generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/get-current-user/all-response-body-properties'
            }
        };
        await client.users.getCurrentUser(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual('/2.0/users/me');
    });

    it('getCurrentUser all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/get-current-user/all-response-body-properties'
            }
        };
        const response = await client.users.getCurrentUser(options);
        expect(response).toEqual({
            id: TEST_USER_ID,
            account: {
                id: TEST_ACCOUNT_ID,
                name: TEST_ACCOUNT_NAME
            },
            admin: TEST_ADMIN,
            alternateEmails: [
                {
                    id: TEST_ALTERNATE_EMAIL_ID,
                    confirmed: TEST_ALTERNATE_EMAIL_CONFIRMED,
                    email: TEST_ALTERNATE_EMAIL
                }
            ],
            company: TEST_COMPANY,
            customWelcomeScreenViewed: TEST_CUSTOM_WELCOME_SCREEN_VIEWED,
            department: TEST_DEPARTMENT,
            email: TEST_EMAIL,
            firstName: TEST_FIRST_NAME,
            groupAdmin: TEST_GROUP_ADMIN,
            jiraAdmin: TEST_JIRA_ADMIN,
            lastLogin: TEST_LAST_LOGIN,
            lastName: TEST_LAST_NAME,
            licensedSheetCreator: TEST_LICENSED_SHEET_CREATOR,
            locale: TEST_LOCALE,
            mobilePhone: TEST_MOBILE_PHONE,
            profileImage: {
                imageId: TEST_PROFILE_IMAGE_ID,
                height: TEST_PROFILE_IMAGE_HEIGHT,
                width: TEST_PROFILE_IMAGE_WIDTH
            },
            resourceViewer: TEST_RESOURCE_VIEWER,
            role: TEST_ROLE,
            salesforceAdmin: TEST_SALESFORCE_ADMIN,
            salesforceUser: TEST_SALESFORCE_USER,
            sheetCount: TEST_SHEET_COUNT,
            timeZone: TEST_TIME_ZONE,
            title: TEST_TITLE,
            workPhone: TEST_WORK_PHONE,
            data: [
                {
                    id: TEST_GROUP_ID,
                    name: TEST_GROUP_NAME,
                    description: TEST_GROUP_DESCRIPTION,
                    owner: TEST_GROUP_OWNER,
                    ownerId: TEST_GROUP_OWNER_ID,
                    createdAt: TEST_GROUP_CREATED_AT,
                    modifiedAt: TEST_GROUP_MODIFIED_AT
                }
            ]
        });
    });

    it('getCurrentUser required response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/get-current-user/required-response-body-properties'
            }
        };
        const response = await client.users.getCurrentUser(options);
        expect(response).toEqual({
            id: TEST_USER_ID,
            account: {
                id: TEST_ACCOUNT_ID,
                name: TEST_ACCOUNT_NAME
            },
            admin: TEST_ADMIN,
            company: TEST_COMPANY,
            department: TEST_DEPARTMENT,
            email: TEST_EMAIL,
            firstName: TEST_FIRST_NAME,
            groupAdmin: TEST_GROUP_ADMIN,
            jiraAdmin: TEST_JIRA_ADMIN,
            lastName: TEST_LAST_NAME,
            licensedSheetCreator: TEST_LICENSED_SHEET_CREATOR,
            locale: TEST_LOCALE,
            mobilePhone: TEST_MOBILE_PHONE,
            resourceViewer: TEST_RESOURCE_VIEWER,
            role: TEST_ROLE,
            salesforceAdmin: TEST_SALESFORCE_ADMIN,
            salesforceUser: TEST_SALESFORCE_USER,
            sheetCount: TEST_SHEET_COUNT,
            timeZone: TEST_TIME_ZONE,
            title: TEST_TITLE,
            workPhone: TEST_WORK_PHONE,
            data: []
        });
    });

    it('getCurrentUser error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.users.getCurrentUser(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('getCurrentUser error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.users.getCurrentUser(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
