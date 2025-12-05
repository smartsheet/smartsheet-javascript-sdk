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
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Users - getCurrentUser endpoint tests', () => {
    const client = createClient();
    const userId = TEST_USER_ID;
    const accountId = TEST_ACCOUNT_ID;
    const accountName = 'Test Account';
    const admin = true;
    const alternateEmailId = TEST_ALTERNATE_EMAIL_ID;
    const alternateEmailConfirmed = true;
    const alternateEmail = TEST_ALTERNATE_EMAIL;
    const company = 'Test Company';
    const customWelcomeScreenViewed = TEST_CUSTOM_WELCOME_SCREEN_VIEWED;
    const department = 'Engineering';
    const email = TEST_EMAIL;
    const firstName = TEST_FIRST_NAME;
    const groupAdmin = true;
    const jiraAdmin = false;
    const lastLogin = TEST_LAST_LOGIN;
    const lastName = TEST_LAST_NAME;
    const licensedSheetCreator = true;
    const locale = 'en_US';
    const mobilePhone = TEST_MOBILE_PHONE;
    const profileImageId = TEST_PROFILE_IMAGE_ID;
    const profileImageHeight = TEST_PROFILE_IMAGE_HEIGHT;
    const profileImageWidth = TEST_PROFILE_IMAGE_WIDTH;
    const resourceViewer = true;
    const role = 'System Admin';
    const salesforceAdmin = false;
    const salesforceUser = false;
    const sheetCount = TEST_SHEET_COUNT;
    const timeZone = 'US/Pacific';
    const title = 'Senior Engineer';
    const workPhone = TEST_MOBILE_PHONE;
    const groupId = 2222222222222222;
    const groupName = 'Engineering Team';
    const groupDescription = 'Engineering department group';
    const groupOwner = 'owner@smartsheet.com';
    const groupOwnerId = 3333333333333333;
    const groupCreatedAt = '2020-01-15T10:30:00Z';
    const groupModifiedAt = '2020-06-20T14:45:00Z';

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

        expect(matchedRequest.url.includes('/2.0/users/me')).toBeTruthy();
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
            id: userId,
            account: {
                id: accountId,
                name: accountName
            },
            admin: admin,
            alternateEmails: [
                {
                    id: alternateEmailId,
                    confirmed: alternateEmailConfirmed,
                    email: alternateEmail
                }
            ],
            company: company,
            customWelcomeScreenViewed: customWelcomeScreenViewed,
            department: department,
            email: email,
            firstName: firstName,
            groupAdmin: groupAdmin,
            jiraAdmin: jiraAdmin,
            lastLogin: lastLogin,
            lastName: lastName,
            licensedSheetCreator: licensedSheetCreator,
            locale: locale,
            mobilePhone: mobilePhone,
            profileImage: {
                imageId: profileImageId,
                height: profileImageHeight,
                width: profileImageWidth
            },
            resourceViewer: resourceViewer,
            role: role,
            salesforceAdmin: salesforceAdmin,
            salesforceUser: salesforceUser,
            sheetCount: sheetCount,
            timeZone: timeZone,
            title: title,
            workPhone: workPhone,
            data: [
                {
                    id: groupId,
                    name: groupName,
                    description: groupDescription,
                    owner: groupOwner,
                    ownerId: groupOwnerId,
                    createdAt: groupCreatedAt,
                    modifiedAt: groupModifiedAt
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
            id: userId,
            account: {
                id: accountId,
                name: accountName
            },
            admin: admin,
            company: company,
            department: department,
            email: email,
            firstName: firstName,
            groupAdmin: groupAdmin,
            jiraAdmin: jiraAdmin,
            lastName: lastName,
            licensedSheetCreator: licensedSheetCreator,
            locale: locale,
            mobilePhone: mobilePhone,
            resourceViewer: resourceViewer,
            role: role,
            salesforceAdmin: salesforceAdmin,
            salesforceUser: salesforceUser,
            sheetCount: sheetCount,
            timeZone: timeZone,
            title: title,
            workPhone: workPhone,
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
