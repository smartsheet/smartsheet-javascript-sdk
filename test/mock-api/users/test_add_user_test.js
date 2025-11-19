import assert from 'assert';
import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils.js';
import {
    TEST_EMAIL,
    TEST_FIRST_NAME,
    TEST_LAST_NAME,
    TEST_NAME,
    TEST_CUSTOM_WELCOME_SCREEN_VIEWED,
    TEST_LAST_LOGIN,
    TEST_PROVISIONAL_EXPIRATION_DATE,
    TEST_SEAT_TYPE_LAST_CHANGED_AT,
    TEST_SHEET_COUNT,
    TEST_PROFILE_IMAGE_ID,
    TEST_PROFILE_IMAGE_HEIGHT,
    TEST_PROFILE_IMAGE_WIDTH,
    TEST_SUCCESS_MESSAGE,
    TEST_SUCCESS_RESULT_CODE,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE,
    TEST_USER_ID
} from './common_test_constants.js';

describe('Users - addUser endpoint tests', function () {
    let client = createClient();
    const newUserId = TEST_USER_ID;
    const email = TEST_EMAIL;
    const firstName = TEST_FIRST_NAME;
    const lastName = TEST_LAST_NAME;
    const name = TEST_NAME;
    const admin = false;
    const licensedSheetCreator = true;
    const groupAdmin = false;
    const resourceViewer = false;
    const status = 'ACTIVE';
    const customWelcomeScreenViewed = TEST_CUSTOM_WELCOME_SCREEN_VIEWED;
    const lastLogin = TEST_LAST_LOGIN;
    const isInternal = true;
    const profileImageId = TEST_PROFILE_IMAGE_ID;
    const profileImageHeight = TEST_PROFILE_IMAGE_HEIGHT;
    const profileImageWidth = TEST_PROFILE_IMAGE_WIDTH;
    const provisionalExpirationDate = TEST_PROVISIONAL_EXPIRATION_DATE;
    const seatType = 'MEMBER';
    const seatTypeLastChangedAt = TEST_SEAT_TYPE_LAST_CHANGED_AT;
    const sheetCount = TEST_SHEET_COUNT;

    const testUserBody = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        admin: admin,
        licensedSheetCreator: licensedSheetCreator,
        groupAdmin: groupAdmin,
        resourceViewer: resourceViewer,
        status: status
    };

    it('addUser generated url is correct', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            body: testUserBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/add-user/all-response-body-properties'
            }
        };
        await client.users.addUser(options);
        const matchedRequest = await findWireMockRequest(requestId);

        assert.ok(matchedRequest.url.includes('/2.0/users'));
    });
    it('addUserAndSendEmail generated url is correct', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            body: testUserBody,
            queryParameters: {
                sendEmail: true
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/add-user/all-response-body-properties'
            }
        };
        await client.users.addUserAndSendEmail(options);
        const matchedRequest = await findWireMockRequest(requestId);

        assert.ok(matchedRequest.url.includes('/2.0/users'));
        const queryParams = matchedRequest.queryParams;
        const sendEmailActual = queryParams.sendEmail.values[0];
        assert.strictEqual(sendEmailActual, 'true');
    });


    it('addUser all response body properties', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            body: testUserBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/add-user/all-response-body-properties'
            }
        };
        const response = await client.users.addUser(options);
        const matchedRequest = await findWireMockRequest(requestId);
        
        assert.ok(response);
        assert.strictEqual(response.message, TEST_SUCCESS_MESSAGE);
        assert.strictEqual(response.resultCode, TEST_SUCCESS_RESULT_CODE);
        assert.strictEqual(response.result.id, newUserId);
        assert.strictEqual(response.result.admin, admin);
        assert.strictEqual(response.result.customWelcomeScreenViewed, customWelcomeScreenViewed);
        assert.strictEqual(response.result.email, email);
        assert.strictEqual(response.result.firstName, firstName);
        assert.strictEqual(response.result.groupAdmin, groupAdmin);
        assert.strictEqual(response.result.isInternal, isInternal);
        assert.strictEqual(response.result.lastLogin, lastLogin);
        assert.strictEqual(response.result.lastName, lastName);
        assert.strictEqual(response.result.licensedSheetCreator, licensedSheetCreator);
        assert.strictEqual(response.result.name, name);
        assert.strictEqual(response.result.profileImage.imageId, profileImageId);
        assert.strictEqual(response.result.profileImage.height, profileImageHeight);
        assert.strictEqual(response.result.profileImage.width, profileImageWidth);
        assert.strictEqual(response.result.provisionalExpirationDate, provisionalExpirationDate);
        assert.strictEqual(response.result.resourceViewer, resourceViewer);
        assert.strictEqual(response.result.seatType, seatType);
        assert.strictEqual(response.result.seatTypeLastChangedAt, seatTypeLastChangedAt);
        assert.strictEqual(response.result.sheetCount, sheetCount);
        assert.strictEqual(response.result.status, status);
        
        let body = JSON.parse(matchedRequest.body);
        assert.strictEqual(body.email, email);
        assert.strictEqual(body.firstName, firstName);
        assert.strictEqual(body.lastName, lastName);
        assert.strictEqual(body.admin, admin);
        assert.strictEqual(body.licensedSheetCreator, licensedSheetCreator);
        assert.strictEqual(body.groupAdmin, groupAdmin);
        assert.strictEqual(body.resourceViewer, resourceViewer);
        assert.strictEqual(body.status, status);
    });

    it('addUser required response body properties', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            body: testUserBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/add-user/required-response-body-properties'
            }
        };
        const response = await client.users.addUser(options);
        const matchedRequest = await findWireMockRequest(requestId);
        
        assert.ok(response);
        assert.strictEqual(response.message, TEST_SUCCESS_MESSAGE);
        assert.strictEqual(response.resultCode, TEST_SUCCESS_RESULT_CODE);
        assert.strictEqual(response.result.id, newUserId);
        assert.strictEqual(response.result.admin, undefined);
        assert.strictEqual(response.result.customWelcomeScreenViewed, undefined);
        assert.strictEqual(response.result.email, email);
        assert.strictEqual(response.result.firstName, firstName);
        assert.strictEqual(response.result.groupAdmin, undefined);
        assert.strictEqual(response.result.isInternal, undefined);
        assert.strictEqual(response.result.lastLogin, undefined);
        assert.strictEqual(response.result.lastName, lastName);
        assert.strictEqual(response.result.licensedSheetCreator, undefined);
        assert.strictEqual(response.result.name, name);
        assert.strictEqual(response.result.profileImage, undefined);
        assert.strictEqual(response.result.provisionalExpirationDate, undefined);
        assert.strictEqual(response.result.resourceViewer, undefined);
        assert.strictEqual(response.result.seatType, undefined);
        assert.strictEqual(response.result.seatTypeLastChangedAt, undefined);
        assert.strictEqual(response.result.sheetCount, undefined);
        assert.strictEqual(response.result.status, status);
        
        let body = JSON.parse(matchedRequest.body);
        assert.strictEqual(body.email, email);
        assert.strictEqual(body.firstName, firstName);
        assert.strictEqual(body.lastName, lastName);
        assert.strictEqual(body.admin, admin);
        assert.strictEqual(body.licensedSheetCreator, licensedSheetCreator);
        assert.strictEqual(body.groupAdmin, groupAdmin);
        assert.strictEqual(body.resourceViewer, resourceViewer);
        assert.strictEqual(body.status, status);
    });

    it('addUser error 500 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            body: testUserBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.users.addUser(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_500_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_500_MESSAGE);
        }
    });

    it('addUser error 400 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            body: testUserBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.users.addUser(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_400_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_400_MESSAGE);
        }
    });
});
