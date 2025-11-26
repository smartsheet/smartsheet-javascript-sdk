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
    let client = createClient();
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
        expect(response).toBeTruthy();
        expect(response.id).toBe(userId);
        expect(response.account.id).toBe(accountId);
        expect(response.account.name).toBe(accountName);
        expect(response.admin).toBe(admin);
        expect(response.alternateEmails.length).toBe(1);
        expect(response.alternateEmails[0].id).toBe(alternateEmailId);
        expect(response.alternateEmails[0].confirmed).toBe(alternateEmailConfirmed);
        expect(response.alternateEmails[0].email).toBe(alternateEmail);
        expect(response.company).toBe(company);
        expect(response.customWelcomeScreenViewed).toBe(customWelcomeScreenViewed);
        expect(response.department).toBe(department);
        expect(response.email).toBe(email);
        expect(response.firstName).toBe(firstName);
        expect(response.groupAdmin).toBe(groupAdmin);
        expect(response.jiraAdmin).toBe(jiraAdmin);
        expect(response.lastLogin).toBe(lastLogin);
        expect(response.lastName).toBe(lastName);
        expect(response.licensedSheetCreator).toBe(licensedSheetCreator);
        expect(response.locale).toBe(locale);
        expect(response.mobilePhone).toBe(mobilePhone);
        expect(response.profileImage.imageId).toBe(profileImageId);
        expect(response.profileImage.height).toBe(profileImageHeight);
        expect(response.profileImage.width).toBe(profileImageWidth);
        expect(response.resourceViewer).toBe(resourceViewer);
        expect(response.role).toBe(role);
        expect(response.salesforceAdmin).toBe(salesforceAdmin);
        expect(response.salesforceUser).toBe(salesforceUser);
        expect(response.sheetCount).toBe(sheetCount);
        expect(response.timeZone).toBe(timeZone);
        expect(response.title).toBe(title);
        expect(response.workPhone).toBe(workPhone);
        expect(response.data.length).toBe(1);
        expect(response.data[0].id).toBe(groupId);
        expect(response.data[0].name).toBe(groupName);
        expect(response.data[0].description).toBe(groupDescription);
        expect(response.data[0].owner).toBe(groupOwner);
        expect(response.data[0].ownerId).toBe(groupOwnerId);
        expect(response.data[0].createdAt).toBe(groupCreatedAt);
        expect(response.data[0].modifiedAt).toBe(groupModifiedAt);
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
        expect(response).toBeTruthy();
        expect(response.id).toBe(userId);
        expect(response.account.id).toBe(accountId);
        expect(response.account.name).toBe(accountName);
        expect(response.admin).toBe(admin);
        expect(response.alternateEmails).toBe(undefined);
        expect(response.company).toBe(company);
        expect(response.customWelcomeScreenViewed).toBe(undefined);
        expect(response.department).toBe(department);
        expect(response.email).toBe(email);
        expect(response.firstName).toBe(firstName);
        expect(response.groupAdmin).toBe(groupAdmin);
        expect(response.jiraAdmin).toBe(jiraAdmin);
        expect(response.lastLogin).toBe(undefined);
        expect(response.lastName).toBe(lastName);
        expect(response.licensedSheetCreator).toBe(licensedSheetCreator);
        expect(response.locale).toBe(locale);
        expect(response.mobilePhone).toBe(mobilePhone);
        expect(response.profileImage).toBe(undefined);
        expect(response.resourceViewer).toBe(resourceViewer);
        expect(response.role).toBe(role);
        expect(response.salesforceAdmin).toBe(salesforceAdmin);
        expect(response.salesforceUser).toBe(salesforceUser);
        expect(response.sheetCount).toBe(sheetCount);
        expect(response.timeZone).toBe(timeZone);
        expect(response.title).toBe(title);
        expect(response.workPhone).toBe(workPhone);
        expect(response.data.length).toBe(0);
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
