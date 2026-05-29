import * as SmartsheetClient from '@smartsheet';
import { expect, describe, beforeEach, it } from '@jest/globals';

describe('Workspace Pagination Tests', () => {
  let client;
  let requestorStub;

  beforeEach(() => {
    // Mock requestor that always returns a token-paginated response
    requestorStub = {
      get: function (options, callback) {
        const mockResponse = {
          statusCode: 200,
          headers: { 'content-type': 'application/json' },
          content: {
            data: [
              { id: 1, name: 'Workspace 1' },
              { id: 2, name: 'Workspace 2' },
            ],
            lastKey: 'next_page_token_123',
          },
        };
        callback(null, mockResponse);
      },
    };

    client = SmartsheetClient.createClient({
      accessToken: 'test_token',
      requestor: requestorStub,
    });
  });

  describe('#listWorkspaces with token-based pagination', () => {
    it('returns a token-paginated response when no query parameters are provided', (done) => {
      client.workspaces.listWorkspaces({}, function (error, response) {
        expect(error).toBeFalsy();
        expect(response).toHaveProperty('content');
        expect(response.content).toHaveProperty('data');
        expect(response.content).toHaveProperty('lastKey');
        expect(Array.isArray(response.content.data)).toBe(true);
        expect(response.content.data.length).toBe(2);
        expect(response.content.lastKey).toBe('next_page_token_123');
        done();
      });
    });

    it('returns a token-paginated response when lastKey is provided', (done) => {
      client.workspaces.listWorkspaces(
        { queryParameters: { lastKey: 'abc123' } },
        function (error, response) {
          expect(error).toBeFalsy();
          expect(response).toHaveProperty('content');
          expect(response.content).toHaveProperty('data');
          expect(response.content).toHaveProperty('lastKey');
          expect(Array.isArray(response.content.data)).toBe(true);
          expect(response.content.data.length).toBe(2);
          expect(response.content.lastKey).toBe('next_page_token_123');
          done();
        }
      );
    });

    it('returns a token-paginated response when maxItems is provided', (done) => {
      client.workspaces.listWorkspaces(
        { queryParameters: { maxItems: 100 } },
        function (error, response) {
          expect(error).toBeFalsy();
          expect(response).toHaveProperty('content');
          expect(response.content).toHaveProperty('data');
          expect(response.content).toHaveProperty('lastKey');
          expect(Array.isArray(response.content.data)).toBe(true);
          expect(response.content.lastKey).toBe('next_page_token_123');
          done();
        }
      );
    });

    it('returns a token-paginated response when both lastKey and maxItems are provided', (done) => {
      client.workspaces.listWorkspaces(
        { queryParameters: { lastKey: 'abc123', maxItems: 500 } },
        function (error, response) {
          expect(error).toBeFalsy();
          expect(response).toHaveProperty('content');
          expect(response.content).toHaveProperty('data');
          expect(response.content).toHaveProperty('lastKey');
          expect(Array.isArray(response.content.data)).toBe(true);
          expect(response.content.lastKey).toBe('next_page_token_123');
          done();
        }
      );
    });
  });
});
