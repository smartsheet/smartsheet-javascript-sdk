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

describe('Users - addProfileImage endpoint tests', function () {
    let client = createClient();
    const imageId = TEST_PROFILE_IMAGE_ID;
    const height = TEST_PROFILE_IMAGE_HEIGHT;
    const width = TEST_PROFILE_IMAGE_WIDTH;
    const email = TEST_EMAIL;
    const name = TEST_NAME;
    const firstName = TEST_FIRST_NAME;
    const lastName = TEST_LAST_NAME;

    it('addProfileImage generated url is correct', async function () {
        const requestId = crypto.randomUUID();
        const mockImageBuffer = Buffer.from('fake-image-data');
        const options = {
            userId: TEST_USER_ID,
            body: {
                file: mockImageBuffer
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/add-profile-image/all-response-body-properties'
            }
        };
        await client.users.addProfileImage(options);
        const matchedRequest = await findWireMockRequest(requestId);

        assert.ok(matchedRequest.url.includes(`/users/${TEST_USER_ID}/profileimage`));
    });

    it('addProfileImage all response body properties', async function () {
        const requestId = crypto.randomUUID();
        const mockImageBuffer = Buffer.from('fake-image-data');
        const options = {
            userId: TEST_USER_ID,
            body: {
                file: mockImageBuffer
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/add-profile-image/all-response-body-properties'
            }
        };
        const response = await client.users.addProfileImage(options);
        assert.ok(response);
        assert.strictEqual(response.message, TEST_SUCCESS_MESSAGE);
        assert.strictEqual(response.resultCode, TEST_SUCCESS_RESULT_CODE);
        assert.ok(response.data);
        assert.strictEqual(response.data.length, 1);
        assert.strictEqual(response.data[0].id, TEST_USER_ID);
        assert.strictEqual(response.data[0].email, email);
        assert.strictEqual(response.data[0].name, name);
        assert.strictEqual(response.data[0].firstName, firstName);
        assert.strictEqual(response.data[0].lastName, lastName);
        assert.ok(response.data[0].profileImage);
        assert.strictEqual(response.data[0].profileImage.imageId, imageId);
        assert.strictEqual(response.data[0].profileImage.height, height);
        assert.strictEqual(response.data[0].profileImage.width, width);
    });

    it('addProfileImage error 500 response', async function () {
        const requestId = crypto.randomUUID();
        const mockImageBuffer = Buffer.from('fake-image-data');
        const options = {
            userId: TEST_USER_ID,
            body: {
                file: mockImageBuffer
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.users.addProfileImage(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_500_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_500_MESSAGE);
        }
    });

    it('addProfileImage error 400 response', async function () {
        const requestId = crypto.randomUUID();
        const mockImageBuffer = Buffer.from('fake-image-data');
        const options = {
            userId: TEST_USER_ID,
            body: {
                file: mockImageBuffer
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.users.addProfileImage(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_400_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_400_MESSAGE);
        }
    });
});
