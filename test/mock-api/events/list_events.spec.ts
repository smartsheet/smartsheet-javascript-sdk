import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
  ERROR_400_MESSAGE,
  ERROR_400_STATUS_CODE,
  ERROR_500_MESSAGE,
  ERROR_500_STATUS_CODE,
  TEST_EVENT_ID_1,
  TEST_EVENT_ID_2,
  TEST_EVENT_ID_3,
  TEST_EVENT_ID_4,
  TEST_EVENT_ID_5,
  TEST_EVENT_TIMESTAMP_1,
  TEST_EVENT_TIMESTAMP_2,
  TEST_EVENT_TIMESTAMP_3,
  TEST_EVENT_TIMESTAMP_4,
  TEST_EVENT_TIMESTAMP_5,
  TEST_NEXT_STREAM_POSITION,
  TEST_OBJECT_ID_1,
  TEST_OBJECT_ID_2,
  TEST_OBJECT_ID_3,
  TEST_OBJECT_ID_4,
  TEST_OBJECT_ID_5,
  TEST_OBJECT_ID_STR_1,
  TEST_OBJECT_ID_STR_2,
  TEST_OBJECT_ID_STR_3,
  TEST_OBJECT_ID_STR_4,
  TEST_OBJECT_ID_STR_5,
  TEST_SINCE,
  TEST_USER_ID_1,
  TEST_USER_ID_2,
  TEST_USER_ID_3,
} from './common_test_constants';

describe('Events - listEvents endpoint tests', () => {
  const client = createClient();

  const expectedAllResponseProperties = {
    moreAvailable: true,
    nextStreamPosition: TEST_NEXT_STREAM_POSITION,
    data: [
      {
        eventId: TEST_EVENT_ID_1,
        objectType: 'SHEET',
        objectId: TEST_OBJECT_ID_1,
        objectIdStr: TEST_OBJECT_ID_STR_1,
        userId: TEST_USER_ID_1,
        requestUserId: TEST_USER_ID_1,
        eventTimestamp: TEST_EVENT_TIMESTAMP_1,
        action: 'UPDATE',
        source: 'WEB_APP',
        additionalDetails: { emailAddress: 'test@test.com' },
      },
      {
        eventId: TEST_EVENT_ID_2,
        objectType: 'WORKSPACE',
        objectId: TEST_OBJECT_ID_2,
        objectIdStr: TEST_OBJECT_ID_STR_2,
        userId: TEST_USER_ID_2,
        requestUserId: TEST_USER_ID_2,
        eventTimestamp: TEST_EVENT_TIMESTAMP_2,
        action: 'CREATE',
        source: 'API_UNDEFINED_APP',
        additionalDetails: { emailAddress: 'test@test.com' },
      },
      {
        eventId: TEST_EVENT_ID_3,
        objectType: 'SHEET',
        action: 'PURGE',
        objectId: TEST_OBJECT_ID_3,
        objectIdStr: TEST_OBJECT_ID_STR_3,
        eventTimestamp: TEST_EVENT_TIMESTAMP_3,
        userId: TEST_USER_ID_1,
        requestUserId: TEST_USER_ID_1,
        source: 'UNKNOWN',
        additionalDetails: { emailAddress: 'test@test.com' },
      },
      {
        eventId: TEST_EVENT_ID_4,
        objectType: 'ATTACHMENT',
        action: 'CREATE',
        objectId: TEST_OBJECT_ID_4,
        objectIdStr: TEST_OBJECT_ID_STR_4,
        eventTimestamp: TEST_EVENT_TIMESTAMP_4,
        userId: TEST_USER_ID_1,
        requestUserId: TEST_USER_ID_1,
        source: 'UNKNOWN',
        additionalDetails: {
          emailAddress: 'test@test.com',
          sheetId: '102030405',
          attachmentName: 'picture.jpg',
        },
      },
      {
        eventId: TEST_EVENT_ID_5,
        objectType: 'SHEET',
        action: 'LOAD',
        objectId: TEST_OBJECT_ID_5,
        objectIdStr: TEST_OBJECT_ID_STR_5,
        eventTimestamp: TEST_EVENT_TIMESTAMP_5,
        userId: TEST_USER_ID_3,
        requestUserId: TEST_USER_ID_3,
        source: 'API_INTEGRATED_APP',
        additionalDetails: { emailAddress: 'test@test.com' },
      },
    ],
  };

  const expectedRequiredResponseProperties = {
    moreAvailable: false,
    data: [
      {
        eventId: TEST_EVENT_ID_1,
        objectType: 'SHEET',
        objectId: TEST_OBJECT_ID_1,
        userId: TEST_USER_ID_1,
        requestUserId: TEST_USER_ID_1,
        eventTimestamp: TEST_EVENT_TIMESTAMP_1,
        action: 'UPDATE',
        source: 'WEB_APP',
      },
      {
        eventId: TEST_EVENT_ID_2,
        objectType: 'WORKSPACE',
        objectId: TEST_OBJECT_ID_2,
        userId: TEST_USER_ID_2,
        requestUserId: TEST_USER_ID_2,
        eventTimestamp: TEST_EVENT_TIMESTAMP_2,
        action: 'CREATE',
        source: 'API_UNDEFINED_APP',
      },
      {
        eventId: TEST_EVENT_ID_3,
        objectType: 'SHEET',
        action: 'PURGE',
        objectId: TEST_OBJECT_ID_3,
        eventTimestamp: TEST_EVENT_TIMESTAMP_3,
        userId: TEST_USER_ID_1,
        requestUserId: TEST_USER_ID_1,
        source: 'UNKNOWN',
      },
      {
        eventId: TEST_EVENT_ID_4,
        objectType: 'ATTACHMENT',
        action: 'CREATE',
        objectId: TEST_OBJECT_ID_4,
        eventTimestamp: TEST_EVENT_TIMESTAMP_4,
        userId: TEST_USER_ID_1,
        requestUserId: TEST_USER_ID_1,
        source: 'UNKNOWN',
      },
      {
        eventId: TEST_EVENT_ID_5,
        objectType: 'SHEET',
        action: 'LOAD',
        objectId: TEST_OBJECT_ID_5,
        eventTimestamp: TEST_EVENT_TIMESTAMP_5,
        userId: TEST_USER_ID_3,
        requestUserId: TEST_USER_ID_3,
        source: 'API_INTEGRATED_APP',
      },
    ],
  };

  it('getEvents generated url is correct', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      queryParameters: {
        since: TEST_SINCE,
      },
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/events/list-events/all-response-body-properties',
      },
    };
    await client.events.getEvents(options);
    const matchedRequest = await findWireMockRequest(requestId);
    const parsedUrl = new URL(matchedRequest.absoluteUrl);
    expect(parsedUrl.pathname).toEqual('/2.0/events');
    expect(matchedRequest.method).toEqual('GET');

    const queryParamsObject = Object.fromEntries(parsedUrl.searchParams);
    expect(queryParamsObject).toEqual({ since: TEST_SINCE });
  });

  it('getEvents all response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/events/list-events/all-response-body-properties',
      },
    };
    const response = await client.events.getEvents(options);
    const matchedRequest = await findWireMockRequest(requestId);

    expect(matchedRequest.body).toEqual('');
    expect(response).toEqual(expectedAllResponseProperties);
  });

  it('getEvents required response body properties', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/events/list-events/required-response-body-properties',
      },
    };
    const response = await client.events.getEvents(options);
    const matchedRequest = await findWireMockRequest(requestId);

    expect(matchedRequest.body).toEqual('');
    expect(response).toEqual(expectedRequiredResponseProperties);
  });

  it('getEvents error 400 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/errors/400-response',
      },
    };
    try {
      await client.events.getEvents(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
      expect(error.message).toBe(ERROR_400_MESSAGE);
    }
  });

  it('getEvents error 500 response', async () => {
    const requestId = crypto.randomUUID();
    const options = {
      customProperties: {
        'x-request-id': requestId,
        'x-test-name': '/errors/500-response',
      },
    };
    try {
      await client.events.getEvents(options);
      expect(true).toBe(false); // Expected an error to be thrown
    } catch (error: any) {
      expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
      expect(error.message).toBe(ERROR_500_MESSAGE);
    }
  });
});
