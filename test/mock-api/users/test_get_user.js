const assert = require('assert');
const crypto = require('crypto');
const { createClient, findWireMockRequest } = require('../utils/utils.js');
const {
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
} = require('./common_test_constants.js');

describe('Users - getUser endpoint tests', function () {
    let client = createClient();
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

    it('getUser generated url is correct', async function () {
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
        assert.ok(matchedRequest.url.includes(`/2.0/users/${TEST_USER_ID}`));
    });

    it('getUser all response body properties', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/get-user/all-response-body-properties'
            }
        };
        const response = await client.users.getUser(options);
        
        // Verify required properties
        assert.ok(response);
        assert.strictEqual(response.id, TEST_USER_ID);
        assert.ok(response.account);
        assert.strictEqual(response.account.id, accountId);
        assert.strictEqual(response.account.name, accountName);
        assert.strictEqual(response.company, company);
        assert.strictEqual(response.department, department);
        assert.strictEqual(response.email, email);
        assert.strictEqual(response.firstName, firstName);
        assert.strictEqual(response.jiraAdmin, jiraAdmin);
        assert.strictEqual(response.lastName, lastName);
        assert.strictEqual(response.locale, locale);
        assert.strictEqual(response.mobilePhone, mobilePhone);
        assert.strictEqual(response.role, role);
        assert.strictEqual(response.salesforceAdmin, salesforceAdmin);
        assert.strictEqual(response.salesforceUser, salesforceUser);
        assert.strictEqual(response.timeZone, timeZone);
        assert.strictEqual(response.title, title);
        assert.strictEqual(response.workPhone, workPhone);

        // Verify optional properties
        assert.strictEqual(response.admin, admin);
        assert.ok(response.alternateEmails);
        assert.strictEqual(response.alternateEmails.length, 1);
        assert.strictEqual(response.alternateEmails[0].id, alternateEmailId);
        assert.strictEqual(response.alternateEmails[0].confirmed, alternateEmailConfirmed);
        assert.strictEqual(response.alternateEmails[0].email, alternateEmailAddress);
        assert.strictEqual(response.customWelcomeScreenViewed, customWelcomeScreenViewed);
        assert.strictEqual(response.groupAdmin, groupAdmin);
        assert.strictEqual(response.lastLogin, lastLogin);
        assert.strictEqual(response.licensedSheetCreator, licensedSheetCreator);
        assert.ok(response.profileImage);
        assert.strictEqual(response.profileImage.imageId, profileImageId);
        assert.strictEqual(response.profileImage.height, profileImageHeight);
        assert.strictEqual(response.profileImage.width, profileImageWidth);
        assert.strictEqual(response.resourceViewer, resourceViewer);
        assert.strictEqual(response.sheetCount, sheetCount);
    });

    it('getUser required response body properties', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/get-user/required-response-body-properties'
            }
        };
        const response = await client.users.getUser(options);
        
        // Verify required properties
        assert.ok(response);
        assert.strictEqual(response.id, TEST_USER_ID);
        assert.ok(response.account);
        assert.strictEqual(response.account.id, accountId);
        assert.strictEqual(response.account.name, accountName);
        assert.strictEqual(response.company, company);
        assert.strictEqual(response.department, department);
        assert.strictEqual(response.email, email);
        assert.strictEqual(response.firstName, firstName);
        assert.strictEqual(response.jiraAdmin, jiraAdmin);
        assert.strictEqual(response.lastName, lastName);
        assert.strictEqual(response.locale, locale);
        assert.strictEqual(response.mobilePhone, mobilePhone);
        assert.strictEqual(response.role, role);
        assert.strictEqual(response.salesforceAdmin, salesforceAdmin);
        assert.strictEqual(response.salesforceUser, salesforceUser);
        assert.strictEqual(response.timeZone, 'US/Pacific');
        assert.strictEqual(response.title, title);
        assert.strictEqual(response.workPhone, workPhone);

        // Verify optional properties are undefined
        assert.strictEqual(response.admin, undefined);
        assert.strictEqual(response.alternateEmails, undefined);
        assert.strictEqual(response.customWelcomeScreenViewed, undefined);
        assert.strictEqual(response.groupAdmin, undefined);
        assert.strictEqual(response.lastLogin, undefined);
        assert.strictEqual(response.licensedSheetCreator, undefined);
        assert.strictEqual(response.profileImage, undefined);
        assert.strictEqual(response.resourceViewer, undefined);
        assert.strictEqual(response.sheetCount, undefined);
    });

    it('getUser error 500 response', async function () {
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
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_500_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_500_MESSAGE);
        }
    });

    it('getUser error 400 response', async function () {
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
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_400_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_400_MESSAGE);
        }
    });
});
