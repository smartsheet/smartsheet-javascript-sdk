const assert = require('assert');
const crypto = require('crypto');
const axios = require('axios');
const { createClient, baseUrl, wiremockUrl, findWireMockRequest } = require('./utils/utils.js');

describe('Users - GET endpoints tests', function () {
    let client = createClient(baseUrl, 'test_token');
    const userId = 12345678;
    const planId = 1234567890123456;

    it('listUserPlans generated url is correct', async function () {
        const lastKey = 'abcDefGhIjKlMnOpQrStUvWxYz';
        const maxItems = 100;
        const requestId = crypto.randomUUID();

        const options = {
            userId: userId,
            queryParameters: {
                lastKey: lastKey,
                maxItems: maxItems
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/list-user-plans/all-response-body-properties'
            }
        };
        await client.users.listUserPlans(options);
        
        const matchedRequest = await findWireMockRequest(wiremockUrl, requestId);
        const queryParams = matchedRequest.queryParams;
        const lastKeyActual = queryParams.lastKey.values[0];
        const maxItemsActual = parseInt(queryParams.maxItems.values[0]);
        
        assert.ok(matchedRequest.url.includes(`/users/${userId}/plans`));
        assert.strictEqual(lastKeyActual, lastKey);
        assert.strictEqual(maxItemsActual, maxItems);
    });

    it('listUserPlans all response body properties', async function () {
        const lastKey = 'abcDefGhIjKlMnOpQrStUvWxYz';
        const maxItems = 100;
        const requestId = crypto.randomUUID();

        const options = {
            userId: userId,
            queryParameters: {
                lastKey: lastKey,
                maxItems: maxItems
            },
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/list-user-plans/all-response-body-properties'
            }
        };

        const response = await client.users.listUserPlans(options);
        
        assert.ok(response);
        assert.strictEqual(response.lastKey, '12345678901234569');
        assert.strictEqual(response.data[0].planId, 1234567890123456);
        assert.strictEqual(response.data[0].seatType, 'MEMBER');
        assert.strictEqual(response.data[0].seatTypeLastChangedAt, '2025-01-01T00:00:00.123456789Z');
        assert.strictEqual(response.data[0].provisionalExpirationDate, '2026-12-13T12:17:52.525696Z');
        assert.strictEqual(response.data[0].isInternal, false);
    });

    it('listUserPlans required response body properties', async function () {
        const requestId = crypto.randomUUID();

        const options = {
            userId: userId,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/list-user-plans/required-response-body-properties'
            }
        };

        const response = await client.users.listUserPlans(options);
        
        assert.ok(response);
        assert.strictEqual(response.data[0].planId, 1234567890123456);
        assert.strictEqual(response.data[0].seatType, 'MEMBER');
        assert.strictEqual(response.data[0].seatTypeLastChangedAt, undefined);
        assert.strictEqual(response.data[0].provisionalExpirationDate, undefined);
        assert.strictEqual(response.data[0].isInternal, false);
    });

    it('listUserPlans error 500 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: userId,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.users.listUserPlans(options);
            assert.fail('Expected an error to be thrown');
        } catch (error) {
            assert.strictEqual(error.statusCode, 500);
            assert.strictEqual(error.message, 'Internal Server Error');
        }
    });

    it('listUserPlans error 400 response', async function () {
        const requestId = crypto.randomUUID();
        const options = {
            userId: userId,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
          await client.users.listUserPlans(options);
          assert.fail('Expected an error to be thrown');
        } catch (error) {
          assert.strictEqual(error.statusCode, 400);
          assert.strictEqual(error.message, 'Malformed Request');
        }
    });

    it('listUsers generated url is correct', async function () {
      const emails = 'test.user@smartsheet.com';
      const seatType = 'MEMBER';
      const page = 1;
      const pageSize = 100;
      const includeAll = false;
      const requestId = crypto.randomUUID();

      const options = {
        queryParameters: {
          emails: emails,
          planId: planId,
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

      const matchedRequest = await findWireMockRequest(wiremockUrl, requestId);

      const queryParams = matchedRequest.queryParams;
      const emailsActual = queryParams.emails.values[0];
      const planIdActual = parseInt(queryParams.planId.values[0]);
      const seatTypeActual = queryParams.seatType.values[0];
      const includeAllActual = queryParams.includeAll.values[0];
      const pageActual = queryParams.page.values[0];
      const pageSizeActual = queryParams.pageSize.values[0];

      assert.ok(matchedRequest.url.includes(`/2.0/users`));
      assert.strictEqual(emailsActual, emails);
      assert.strictEqual(planIdActual, planId);
      assert.strictEqual(seatTypeActual, seatType);
      assert.strictEqual(includeAllActual, includeAll.toString());
      assert.strictEqual(parseInt(pageActual), page);
      assert.strictEqual(parseInt(pageSizeActual), pageSize);
    });

    it('listUsers all response body properties', async function () {
      const requestId = crypto.randomUUID();

      const options = {
        queryParameters: {
          planId: planId
        },
        customProperties: {
          'x-request-id': requestId,
          'x-test-name': '/users/list-users/all-response-body-properties'
        }
      };

      const response = await client.users.listAllUsers(options);

      assert.ok(response);
      assert.strictEqual(response.data[0].seatType, 'MEMBER');
      assert.strictEqual(response.data[0].seatTypeLastChangedAt, '2025-06-14T09:55:30Z');
      assert.strictEqual(response.data[0].provisionalExpirationDate, '2026-12-13T12:17:52.525696Z');
      assert.strictEqual(response.data[0].isInternal, true);
      assert.strictEqual(response.data[0].firstName, 'Test');
      assert.strictEqual(response.data[0].lastName, 'User');
      assert.strictEqual(response.data[0].name, 'Test User');
      assert.strictEqual(response.data[0].email, 'test.user@smartsheet.com');
      assert.strictEqual(response.data[0].admin, true);
      assert.strictEqual(response.data[0].licensedSheetCreator, true);
      assert.strictEqual(response.data[0].resourceViewer, true);
      assert.strictEqual(response.data[0].groupAdmin, true);
      assert.strictEqual(response.data[0].status, 'ACTIVE');
      assert.strictEqual(response.data[0].sheetCount, -1);
      assert.strictEqual(response.data[0].lastLogin, '2020-10-04T18:32:47Z');
      assert.strictEqual(response.data[0].customWelcomeScreenViewed, '2020-08-25T12:15:47Z');
      assert.strictEqual(response.data[0].id, 1234567890123456);
    });

    it('listUsers required response body properties', async function () {
      const requestId = crypto.randomUUID();

      const options = {
        queryParameters: {
          planId: planId
        },
        customProperties: {
          'x-request-id': requestId,
          'x-test-name': '/users/list-users/required-response-body-properties'
        }
      };

      const response = await client.users.listAllUsers(options);

      assert.ok(response);
      assert.strictEqual(response.data[0].seatType, 'MEMBER');
      assert.strictEqual(response.data[0].seatTypeLastChangedAt, undefined);
      assert.strictEqual(response.data[0].provisionalExpirationDate, undefined);
      assert.strictEqual(response.data[0].isInternal, true);
      assert.strictEqual(response.data[0].firstName, 'Test');
      assert.strictEqual(response.data[0].lastName, 'User');
      assert.strictEqual(response.data[0].name, 'Test User');
      assert.strictEqual(response.data[0].email, 'test.user@smartsheet.com');
      assert.strictEqual(response.data[0].admin, true);
      assert.strictEqual(response.data[0].licensedSheetCreator, true);
      assert.strictEqual(response.data[0].resourceViewer, true);
      assert.strictEqual(response.data[0].groupAdmin, true);
      assert.strictEqual(response.data[0].status, 'ACTIVE');
      assert.strictEqual(response.data[0].sheetCount, -1);
      assert.strictEqual(response.data[0].lastLogin, undefined);
      assert.strictEqual(response.data[0].customWelcomeScreenViewed, undefined);
      assert.strictEqual(response.data[0].id, 1234567890123456);
    });

    it('listUserPlans error 500 response', async function () {
      const requestId = crypto.randomUUID();
      const options = {
        queryParameters: {
          planId: planId
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
          planId: planId
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
