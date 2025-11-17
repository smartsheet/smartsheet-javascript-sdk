const assert = require('assert');
const crypto = require('crypto');
const { createClient, findWireMockRequest } = require('../utils/utils.js');
const {
    TEST_USER_ID,
    TEST_EMAIL,
    TEST_FIRST_NAME,
    TEST_LAST_NAME,
    TEST_NAME,
    TEST_PROFILE_IMAGE_ID,
    TEST_PROFILE_IMAGE_HEIGHT,
    TEST_PROFILE_IMAGE_WIDTH,
    TEST_SUCCESS_MESSAGE,
    TEST_SUCCESS_RESULT_CODE,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} = require('./common_test_constants.js');

describe('Users - updateUser endpoint tests', function () {
    let client = createClient();
    const email = TEST_EMAIL;
    const firstName = TEST_FIRST_NAME;
    const lastName = TEST_LAST_NAME;
    const name = TEST_NAME;
    const admin = true;
    const licensedSheetCreator = true;
    const groupAdmin = false;
    const resourceViewer = true;
    const profileImageId = TEST_PROFILE_IMAGE_ID;
    const profileImageHeight = TEST_PROFILE_IMAGE_HEIGHT;
    const profileImageWidth = TEST_PROFILE_IMAGE_WIDTH;

    const testUpdateBody = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        admin: admin,
        licensedSheetCreator: licensedSheetCreator,
        groupAdmin: groupAdmin,
        resourceViewer: resourceViewer
    };

    it('updateUser generated url is correct', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            body: testUpdateBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/update-user/all-response-body-properties'
            }
        };
        await client.users.updateUser(options);
        const matchedRequest = await findWireMockRequest(requestId);

        assert.ok(matchedRequest.url.includes(`/2.0/users/${TEST_USER_ID}`));
        let body = JSON.parse(matchedRequest.body);
        assert.strictEqual(body.email, email);
        assert.strictEqual(body.firstName, firstName);
        assert.strictEqual(body.lastName, lastName);
        assert.strictEqual(body.admin, admin);
        assert.strictEqual(body.licensedSheetCreator, licensedSheetCreator);
        assert.strictEqual(body.groupAdmin, groupAdmin);
        assert.strictEqual(body.resourceViewer, resourceViewer);
    });

    it('updateUser all response body properties', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            body: testUpdateBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/update-user/all-response-body-properties'
            }
        };
        const response = await client.users.updateUser(options);
        assert.ok(response);
        assert.strictEqual(response.message, TEST_SUCCESS_MESSAGE);
        assert.strictEqual(response.resultCode, TEST_SUCCESS_RESULT_CODE);
        assert.strictEqual(response.data[0].id, TEST_USER_ID);
        assert.strictEqual(response.data[0].email, email);
        assert.strictEqual(response.data[0].firstName, firstName);
        assert.strictEqual(response.data[0].lastName, lastName);
        assert.strictEqual(response.data[0].name, name);
        assert.strictEqual(response.data[0].profileImage.imageId, profileImageId);
        assert.strictEqual(response.data[0].profileImage.height, profileImageHeight);
        assert.strictEqual(response.data[0].profileImage.width, profileImageWidth);
    });

    it('updateUser required response body properties', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            body: testUpdateBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/update-user/required-response-body-properties'
            }
        };
        const response = await client.users.updateUser(options);
        assert.ok(response);
        assert.strictEqual(response.message, TEST_SUCCESS_MESSAGE);
        assert.strictEqual(response.resultCode, TEST_SUCCESS_RESULT_CODE);
        assert.strictEqual(response.data[0].id, TEST_USER_ID);
        assert.strictEqual(response.data[0].email, email);
        assert.strictEqual(response.data[0].firstName, firstName);
        assert.strictEqual(response.data[0].lastName, lastName);
        assert.strictEqual(response.data[0].name, name);
        assert.strictEqual(response.data[0].profileImage, undefined);
    });

    it('updateUser error 500 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            body: testUpdateBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.users.updateUser(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_500_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_500_MESSAGE);
        }
    });

    it('updateUser error 400 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            body: testUpdateBody,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.users.updateUser(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_400_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_400_MESSAGE);
        }
    });
});
