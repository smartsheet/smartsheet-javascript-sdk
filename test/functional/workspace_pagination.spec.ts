import _ from 'underscore';
import * as SmartsheetClient from '@smartsheet';
import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals';

describe('Workspace Pagination Tests', () => {
  let client;
  let requestorStub;

  beforeEach(() => {
    // Mock requestor
    requestorStub = {
      get: function(options, callback) {
        // Mock different responses based on pagination parameters
        const mockResponse = {
          statusCode: 200,
          headers: {'content-type': 'application/json'},
          content: null
        };

        if (options.queryParameters && (options.queryParameters.lastKey !== undefined || options.queryParameters.maxItems !== undefined)) {
          // Return paginated response format
          mockResponse.content = {
            data: [
              {id: 1, name: 'Workspace 1'},
              {id: 2, name: 'Workspace 2'}
            ],
            lastKey: 'next_page_token_123'
          };
        } else {
          // Return traditional response format (array directly)
          mockResponse.content = [
            {id: 1, name: 'Workspace 1'},
            {id: 2, name: 'Workspace 2'},
            {id: 3, name: 'Workspace 3'}
          ];
        }

        callback(null, mockResponse);
      }
    };

    client = SmartsheetClient.createClient({
      accessToken: 'test_token',
      requestor: requestorStub
    });
  });

  describe('#listWorkspaces with pagination', () => {
    it(
      'should return traditional format when no pagination parameters provided',
      done => {
        client.workspaces.listWorkspaces({}, function(error, response) {
          expect(error).toBeFalsy();
          expect(response).toHaveProperty('content');
          expect(Array.isArray(response.content)).toBe(true);
          expect(response.content.length).toBe(3);
          expect(response.content[0]).toHaveProperty('name', 'Workspace 1');
          done();
        });
      }
    );

    it(
      'should return paginated format when lastKey is provided',
      done => {
        client.workspaces.listWorkspaces({ queryParameters : {paginationType: 'token', lastKey: 'abc123'}}, function(error, response) {
          expect(error).toBeFalsy();
          expect(response).toHaveProperty('content');
          expect(response.content).toHaveProperty('data');
          expect(response.content).toHaveProperty('lastKey');
          expect(Array.isArray(response.content.data)).toBe(true);
          expect(response.content.data.length).toBe(2);
          expect(response.content.lastKey).toBe('next_page_token_123');
          done();
        });
      }
    );

    it(
      'should return paginated format when maxItems is provided',
      done => {
        client.workspaces.listWorkspaces({ queryParameters :{paginationType: 'token', maxItems: 100}}, function(error, response) {
          expect(error).toBeFalsy();
          expect(response).toHaveProperty('content');
          expect(response.content).toHaveProperty('data');
          expect(response.content).toHaveProperty('lastKey');
          expect(Array.isArray(response.content.data)).toBe(true);
          expect(response.content.lastKey).toBe('next_page_token_123');
          done();
        });
      }
    );

    it(
      'should return paginated format when both lastKey and maxItems are provided',
      done => {
        client.workspaces.listWorkspaces({ queryParameters : {paginationType: 'token', lastKey: 'abc123', maxItems: 500}}, function(error, response) {
          expect(error).toBeFalsy();
          expect(response).toHaveProperty('content');
          expect(response.content).toHaveProperty('data');
          expect(response.content).toHaveProperty('lastKey');
          expect(Array.isArray(response.content.data)).toBe(true);
          expect(response.content.lastKey).toBe('next_page_token_123');
          done();
        });
      }
    );
  });

  describe('#listWorkspaces validation warnings', () => {
    let consoleWarnStub;

    beforeEach(() => {
      consoleWarnStub = jest.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
      consoleWarnStub.mockRestore();
    });

    it('should show deprecation warning when pageSize is used', done => {
      client.workspaces.listWorkspaces({ queryParameters : {pageSize: 100}}, function(error) {
        expect(error).toBeFalsy();
        expect(consoleWarnStub.mock.calls.length).toBe(1);
        expect(consoleWarnStub.mock.calls[0][0]).toBe(
          '[DEPRECATED] pageSize parameter is deprecated in listWorkspaces. Use paginationType: "token" with maxItems instead.'
        );
        done();
      });
    });

    it('should show deprecation warning when page is used', done => {
      client.workspaces.listWorkspaces({ queryParameters : {page: 1}}, function(error) {
        expect(error).toBeFalsy();
        expect(consoleWarnStub.mock.calls.length).toBe(1);
        expect(consoleWarnStub.mock.calls[0][0]).toBe(
          '[DEPRECATED] page parameter is deprecated in listWorkspaces. Use paginationType: "token" with lastKey instead.'
        );
        done();
      });
    });

    it(
      'should show deprecation warning when includeAll is used',
      done => {
        client.workspaces.listWorkspaces({ queryParameters : {includeAll: true}}, function(error) {
          expect(error).toBeFalsy();
          expect(consoleWarnStub.mock.calls.length).toBe(1);
          expect(consoleWarnStub.mock.calls[0][0]).toBe(
            '[DEPRECATED] includeAll parameter is deprecated in listWorkspaces. Use paginationType: "token" instead.'
          );
          done();
        });
      }
    );

    it(
      'should show validation error when lastKey is used without token pagination',
      done => {
        client.workspaces.listWorkspaces({ queryParameters : {lastKey: 'abc123'}}, function(error) {
          expect(error).toBeFalsy();
          expect(consoleWarnStub.mock.calls.length).toBe(1);
          expect(consoleWarnStub.mock.calls[0][0]).toBe(
            '[VALIDATION ERROR] lastKey parameter can only be used when paginationType is set to "token".'
          );
          done();
        });
      }
    );

    it(
      'should show validation error when maxItems is used without token pagination',
      done => {
        client.workspaces.listWorkspaces({ queryParameters : {maxItems: 100}}, function(error) {
          expect(error).toBeFalsy();
          expect(consoleWarnStub.mock.calls.length).toBe(1);
          expect(consoleWarnStub.mock.calls[0][0]).toBe(
            '[VALIDATION ERROR] maxItems parameter can only be used when paginationType is set to "token".'
          );
          done();
        });
      }
    );

    it(
      'should show multiple warnings when multiple deprecated parameters are used',
      done => {
        client.workspaces.listWorkspaces({ queryParameters : {pageSize: 100, page: 1, includeAll: true}}, function(error) {
          expect(error).toBeFalsy();
          expect(consoleWarnStub.mock.calls.length).toBe(3);
          expect(consoleWarnStub.mock.calls[0][0]).toBe(
            '[DEPRECATED] pageSize parameter is deprecated in listWorkspaces. Use paginationType: "token" with maxItems instead.'
          );
          expect(consoleWarnStub.mock.calls[1][0]).toBe(
            '[DEPRECATED] page parameter is deprecated in listWorkspaces. Use paginationType: "token" with lastKey instead.'
          );
          expect(consoleWarnStub.mock.calls[2][0]).toBe(
            '[DEPRECATED] includeAll parameter is deprecated in listWorkspaces. Use paginationType: "token" instead.'
          );
          done();
        });
      }
    );

    it(
      'should show multiple validation errors when lastKey and maxItems are used without token pagination',
      done => {
        client.workspaces.listWorkspaces({ queryParameters : {lastKey: 'abc123', maxItems: 100}}, function(error) {
          expect(error).toBeFalsy();
          expect(consoleWarnStub.mock.calls.length).toBe(2);
          expect(consoleWarnStub.mock.calls[0][0]).toBe(
            '[VALIDATION ERROR] lastKey parameter can only be used when paginationType is set to "token".'
          );
          expect(consoleWarnStub.mock.calls[1][0]).toBe(
            '[VALIDATION ERROR] maxItems parameter can only be used when paginationType is set to "token".'
          );
          done();
        });
      }
    );

    it(
      'should not show warnings when using token pagination correctly',
      done => {
        client.workspaces.listWorkspaces({ queryParameters : {paginationType: 'token', lastKey: 'abc123', maxItems: 100} }, function(error) {
          expect(error).toBeFalsy();
          expect(consoleWarnStub.mock.calls.length).toBe(0);
          done();
        });
      }
    );
  });
});
