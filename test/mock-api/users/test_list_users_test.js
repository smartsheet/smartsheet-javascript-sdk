const assert = require('assert');
const crypto = require('crypto');
const { createClient, findWireMockRequest } = require('../utils/utils.js');
const {
    TEST_PLAN_ID,
    TEST_EMAIL,
    TEST_FIRST_NAME,
    TEST_LAST_NAME,
    TEST_NAME,
    TEST_CUSTOM_WELCOME_SCREEN_VIEWED,
    TEST_LAST_LOGIN,
    TEST_SEAT_TYPE_LAST_CHANGED_AT,
    TEST_PAGE_NUMBER,
    TEST_PAGE_SIZE,
    TEST_SHEET_COUNT,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE,
    TEST_PROVISIONAL_EXPIRATION_DATE
} = require('./common_test_constants.js');

describe('Users - listAllUsers endpoint tests', function () {
    let client = createClient();
    const emails = TEST_EMAIL;
    const seatType = 'MEMBER';
    const page = TEST_PAGE_NUMBER;
    const pageSize = TEST_PAGE_SIZE;
    const includeAll = false;
    const seatTypeLastChangedAt = TEST_SEAT_TYPE_LAST_CHANGED_AT;
    const provisionalExpirationDate = TEST_PROVISIONAL_EXPIRATION_DATE;
    const isInternal = true;
    const firstName = TEST_FIRST_NAME;
    const lastName = TEST_LAST_NAME;
    const name = TEST_NAME;
    const email = TEST_EMAIL;
    const admin = true;
    const licensedSheetCreator = true;
    const resourceViewer = true;
    const groupAdmin = true;
    const status = 'ACTIVE';
    const sheetCount = TEST_SHEET_COUNT;
    const lastLogin = TEST_LAST_LOGIN;
    const customWelcomeScreenViewed = TEST_CUSTOM_WELCOME_SCREEN_VIEWED;

    it('listUsers generated url is correct', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                emails: emails,
                planId: TEST_PLAN_ID,
                seatType: seatType,
                includeAll: includeAll,
                page: page,
                pageSize: pageSize
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/list-users/required-response-body-properties'
            }
        };
        await client.users.listAllUsers(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const queryParams = matchedRequest.queryParams;
        const emailsActual = queryParams.emails.values[0];
        const planIdActual = parseInt(queryParams.planId.values[0]);
        const seatTypeActual = queryParams.seatType.values[0];
        const includeAllActual = queryParams.includeAll.values[0];
        const pageActual = queryParams.page.values[0];
        const pageSizeActual = queryParams.pageSize.values[0];
        assert.ok(matchedRequest.url.includes(`/2.0/users`));
        assert.strictEqual(emailsActual, emails);
        assert.strictEqual(planIdActual, TEST_PLAN_ID);
        assert.strictEqual(seatTypeActual, seatType);
        assert.strictEqual(includeAllActual, includeAll.toString());
        assert.strictEqual(parseInt(pageActual), page);
        assert.strictEqual(parseInt(pageSizeActual), pageSize);
    });

    it('listUsers all response body properties', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                planId: TEST_PLAN_ID
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/list-users/all-response-body-properties'
            }
        };
        const response = await client.users.listAllUsers(options);
    assert.ok(response);
    assert.strictEqual(response.data[0].seatType, seatType);
    assert.strictEqual(response.data[0].seatTypeLastChangedAt, seatTypeLastChangedAt);
    assert.strictEqual(response.data[0].provisionalExpirationDate, provisionalExpirationDate);
    assert.strictEqual(response.data[0].isInternal, isInternal);
    assert.strictEqual(response.data[0].firstName, firstName);
    assert.strictEqual(response.data[0].lastName, lastName);
    assert.strictEqual(response.data[0].name, name);
    assert.strictEqual(response.data[0].email, email);
    assert.strictEqual(response.data[0].admin, admin);
    assert.strictEqual(response.data[0].licensedSheetCreator, licensedSheetCreator);
    assert.strictEqual(response.data[0].resourceViewer, resourceViewer);
    assert.strictEqual(response.data[0].groupAdmin, groupAdmin);
    assert.strictEqual(response.data[0].status, status);
    assert.strictEqual(response.data[0].sheetCount, sheetCount);
    assert.strictEqual(response.data[0].lastLogin, lastLogin);
    assert.strictEqual(response.data[0].customWelcomeScreenViewed, customWelcomeScreenViewed);
    assert.strictEqual(response.data[0].id, TEST_PLAN_ID);
    });

    it('listUsers required response body properties', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                planId: TEST_PLAN_ID
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/list-users/required-response-body-properties'
            }
        };
        const response = await client.users.listAllUsers(options);
    assert.ok(response);
    assert.strictEqual(response.data[0].seatType, seatType);
    assert.strictEqual(response.data[0].seatTypeLastChangedAt, undefined);
    assert.strictEqual(response.data[0].provisionalExpirationDate, undefined);
    assert.strictEqual(response.data[0].isInternal, isInternal);
    assert.strictEqual(response.data[0].firstName, firstName);
    assert.strictEqual(response.data[0].lastName, lastName);
    assert.strictEqual(response.data[0].name, name);
    assert.strictEqual(response.data[0].email, email);
    assert.strictEqual(response.data[0].admin, admin);
    assert.strictEqual(response.data[0].licensedSheetCreator, licensedSheetCreator);
    assert.strictEqual(response.data[0].resourceViewer, resourceViewer);
    assert.strictEqual(response.data[0].groupAdmin, groupAdmin);
    assert.strictEqual(response.data[0].status, status);
    assert.strictEqual(response.data[0].sheetCount, sheetCount);
    assert.strictEqual(response.data[0].lastLogin, undefined);
    assert.strictEqual(response.data[0].customWelcomeScreenViewed, undefined);
    assert.strictEqual(response.data[0].id, TEST_PLAN_ID);
    });

    it('listUserPlans error 500 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                planId: TEST_PLAN_ID
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.users.listAllUsers(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_500_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_500_MESSAGE);
        }
    });

    it('listUserPlans error 400 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            queryParameters: {
                planId: TEST_PLAN_ID
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.users.listAllUsers(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, ERROR_400_STATUS_CODE);
            assert.strictEqual(error.message, ERROR_400_MESSAGE);
        }
    });
});
