import assert from 'assert';
import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils.js';
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
} from './common_test_constants.js';

describe('Users - getCurrentUser endpoint tests', function () {
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

    it('getCurrentUser generated url is correct', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/get-current-user/all-response-body-properties'
            }
        };
        await client.users.getCurrentUser(options);
        const matchedRequest = await findWireMockRequest(requestId);

        assert.ok(matchedRequest.url.includes('/2.0/users/me'));
    });

    it('getCurrentUser all response body properties', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/get-current-user/all-response-body-properties'
            }
        };
        const response = await client.users.getCurrentUser(options);
        assert.ok(response);
        assert.strictEqual(response.id, userId);
        assert.strictEqual(response.account.id, accountId);
        assert.strictEqual(response.account.name, accountName);
        assert.strictEqual(response.admin, admin);
        assert.strictEqual(response.alternateEmails.length, 1);
        assert.strictEqual(response.alternateEmails[0].id, alternateEmailId);
        assert.strictEqual(response.alternateEmails[0].confirmed, alternateEmailConfirmed);
        assert.strictEqual(response.alternateEmails[0].email, alternateEmail);
        assert.strictEqual(response.company, company);
        assert.strictEqual(response.customWelcomeScreenViewed, customWelcomeScreenViewed);
        assert.strictEqual(response.department, department);
        assert.strictEqual(response.email, email);
        assert.strictEqual(response.firstName, firstName);
        assert.strictEqual(response.groupAdmin, groupAdmin);
        assert.strictEqual(response.jiraAdmin, jiraAdmin);
        assert.strictEqual(response.lastLogin, lastLogin);
        assert.strictEqual(response.lastName, lastName);
        assert.strictEqual(response.licensedSheetCreator, licensedSheetCreator);
        assert.strictEqual(response.locale, locale);
        assert.strictEqual(response.mobilePhone, mobilePhone);
        assert.strictEqual(response.profileImage.imageId, profileImageId);
        assert.strictEqual(response.profileImage.height, profileImageHeight);
        assert.strictEqual(response.profileImage.width, profileImageWidth);
        assert.strictEqual(response.resourceViewer, resourceViewer);
        assert.strictEqual(response.role, role);
        assert.strictEqual(response.salesforceAdmin, salesforceAdmin);
        assert.strictEqual(response.salesforceUser, salesforceUser);
        assert.strictEqual(response.sheetCount, sheetCount);
        assert.strictEqual(response.timeZone, timeZone);
        assert.strictEqual(response.title, title);
        assert.strictEqual(response.workPhone, workPhone);
        assert.strictEqual(response.data.length, 1);
        assert.strictEqual(response.data[0].id, groupId);
        assert.strictEqual(response.data[0].name, groupName);
        assert.strictEqual(response.data[0].description, groupDescription);
        assert.strictEqual(response.data[0].owner, groupOwner);
        assert.strictEqual(response.data[0].ownerId, groupOwnerId);
        assert.strictEqual(response.data[0].createdAt, groupCreatedAt);
        assert.strictEqual(response.data[0].modifiedAt, groupModifiedAt);
    });

    it('getCurrentUser required response body properties', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/get-current-user/required-response-body-properties'
            }
        };
        const response = await client.users.getCurrentUser(options);
        assert.ok(response);
        assert.strictEqual(response.id, userId);
        assert.strictEqual(response.account.id, accountId);
        assert.strictEqual(response.account.name, accountName);
        assert.strictEqual(response.admin, admin);
        assert.strictEqual(response.alternateEmails, undefined);
        assert.strictEqual(response.company, company);
        assert.strictEqual(response.customWelcomeScreenViewed, undefined);
        assert.strictEqual(response.department, department);
        assert.strictEqual(response.email, email);
        assert.strictEqual(response.firstName, firstName);
        assert.strictEqual(response.groupAdmin, groupAdmin);
        assert.strictEqual(response.jiraAdmin, jiraAdmin);
        assert.strictEqual(response.lastLogin, undefined);
        assert.strictEqual(response.lastName, lastName);
        assert.strictEqual(response.licensedSheetCreator, licensedSheetCreator);
        assert.strictEqual(response.locale, locale);
        assert.strictEqual(response.mobilePhone, mobilePhone);
        assert.strictEqual(response.profileImage, undefined);
        assert.strictEqual(response.resourceViewer, resourceViewer);
        assert.strictEqual(response.role, role);
        assert.strictEqual(response.salesforceAdmin, salesforceAdmin);
        assert.strictEqual(response.salesforceUser, salesforceUser);
        assert.strictEqual(response.sheetCount, sheetCount);
        assert.strictEqual(response.timeZone, timeZone);
        assert.strictEqual(response.title, title);
        assert.strictEqual(response.workPhone, workPhone);
        assert.strictEqual(response.data.length, 0);
    });

    it('getCurrentUser error 500 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.users.getCurrentUser(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_500_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_500_MESSAGE);
        }
    });

    it('getCurrentUser error 400 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.users.getCurrentUser(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_400_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_400_MESSAGE);
        }
    });
});
