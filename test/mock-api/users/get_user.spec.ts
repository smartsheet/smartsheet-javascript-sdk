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
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Users - getUser endpoint tests', () => {
    const client = createClient();
    const accountId = TEST_ACCOUNT_ID;
    const accountName = 'Acme Corporation';
    const company = 'Acme Corporation';
    const department = 'Engineering';
    const email = TEST_EMAIL;
    const firstName = TEST_FIRST_NAME;
    const jiraAdmin = false;
    const lastName = TEST_LAST_NAME;
    const locale = 'en_US';
    const mobilePhone = TEST_MOBILE_PHONE;
    const role = 'Senior Developer';
    const salesforceAdmin = false;
    const salesforceUser = false;
    const timeZone = 'US/Pacific';
    const title = 'Senior Software Engineer';
    const workPhone = TEST_MOBILE_PHONE;
    const admin = true;
    const alternateEmailId = TEST_ALTERNATE_EMAIL_ID;
    const alternateEmailConfirmed = true;
    const alternateEmailAddress = TEST_ALTERNATE_EMAIL;
    const customWelcomeScreenViewed = TEST_CUSTOM_WELCOME_SCREEN_VIEWED;
    const groupAdmin = true;
    const lastLogin = TEST_LAST_LOGIN;
    const licensedSheetCreator = true;
    const profileImageId = TEST_PROFILE_IMAGE_ID;
    const profileImageHeight = TEST_PROFILE_IMAGE_HEIGHT;
    const profileImageWidth = TEST_PROFILE_IMAGE_WIDTH;
    const resourceViewer = false;
    const sheetCount = TEST_SHEET_COUNT;

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
        expect(matchedRequest.url.includes(`/2.0/users/${TEST_USER_ID}`)).toBeTruthy();
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
                id: accountId,
                name: accountName
            },
            company: company,
            department: department,
            email: email,
            firstName: firstName,
            jiraAdmin: jiraAdmin,
            lastName: lastName,
            locale: locale,
            mobilePhone: mobilePhone,
            role: role,
            salesforceAdmin: salesforceAdmin,
            salesforceUser: salesforceUser,
            timeZone: timeZone,
            title: title,
            workPhone: workPhone,
            admin: admin,
            alternateEmails: [
                {
                    id: alternateEmailId,
                    confirmed: alternateEmailConfirmed,
                    email: alternateEmailAddress
                }
            ],
            customWelcomeScreenViewed: customWelcomeScreenViewed,
            groupAdmin: groupAdmin,
            lastLogin: lastLogin,
            licensedSheetCreator: licensedSheetCreator,
            profileImage: {
                imageId: profileImageId,
                height: profileImageHeight,
                width: profileImageWidth
            },
            resourceViewer: resourceViewer,
            sheetCount: sheetCount
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
                id: accountId,
                name: accountName
            },
            company: company,
            department: department,
            email: email,
            firstName: firstName,
            jiraAdmin: jiraAdmin,
            lastName: lastName,
            locale: locale,
            mobilePhone: mobilePhone,
            role: role,
            salesforceAdmin: salesforceAdmin,
            salesforceUser: salesforceUser,
            timeZone: timeZone,
            title: title,
            workPhone: workPhone
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
