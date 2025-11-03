const assert = require('assert');
const crypto = require('crypto');
const { createClient, findWireMockRequest } = require('../utils/utils.js');
const { TEST_PLAN_ID } = require('./common_test_constants.js');

describe('Users - listAllUsers endpoint tests', function () {
    let client = createClient();
    const emails = 'test.user@smartsheet.com';
    const seatType = 'MEMBER';
    const page = 1;
    const pageSize = 100;
    const includeAll = false;
    const seatTypeLastChangedAt = '2025-06-14T09:55:30Z';
    const provisionalExpirationDate = '2026-12-13T12:17:52.525696Z';
    const isInternal = true;
    const firstName = 'Test';
    const lastName = 'User';
    const name = 'Test User';
    const email = 'test.user@smartsheet.com';
    const admin = true;
    const licensedSheetCreator = true;
    const resourceViewer = true;
    const groupAdmin = true;
    const status = 'ACTIVE';
    const sheetCount = -1;
    const lastLogin = '2020-10-04T18:32:47Z';
    const customWelcomeScreenViewed = '2020-08-25T12:15:47Z';

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
            assert.strictEqual(error.statusCode, 500);
            assert.strictEqual(error.message, 'Internal Server Error');
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
            assert.strictEqual(error.statusCode, 400);
            assert.strictEqual(error.message, 'Malformed Request');
        }
    });
});
