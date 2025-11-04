const assert = require('assert');
const crypto = require('crypto');
const { createClient, findWireMockRequest } = require('../utils/utils.js');

describe('Contacts - getContact endpoint tests', function () {
  let client = createClient();
  const contactId = '123';

  it('getContact generated url is correct', async function () {
    const requestId = crypto.randomUUID();
    const options = {
      id: contactId,
      queryParameters: {
        include: "profileImage"
      },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/contacts/get-contact'
      }
    };
    const reponse = await client.contacts.getContact(options);
    const matchedRequest = await findWireMockRequest(requestId);
    assert.ok(matchedRequest.url.includes(`/2.0/contacts/${contactId}`));
  });

  it('listContacts generated url is correct', async function () {
    const requestId = crypto.randomUUID();
    const options = {
      queryParameters: {
        page: 1,
        pageSize: 50
      },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/contacts/list-contacts'
      }
    };
    const reponse = await client.contacts.listContacts(options);
    const matchedRequest = await findWireMockRequest(requestId);
    assert.ok(matchedRequest.url.includes(`/2.0/contacts/${contactId}`));
  });

  it('getEvents generated url is correct', async function () {
    const requestId = crypto.randomUUID();
    const options = {
      queryParameters: {
        since: "2025-03-24T15:15:22Z",
        to: "2025-03-24T16:15:22Z"
      },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/events/list-events'
      }
    };
    const response = await client.events.getEvents(options);
    const matchedRequest = await findWireMockRequest(requestId);
    assert.ok(
      matchedRequest.url.includes(
        `/2.0/events?since=2025-03-24T15%3A15%3A22Z&to=2025-03-24T16%3A15%3A22Z`
      )
    );
  });

});
