import should from 'should';
import _ from 'underscore';
import sinon from 'sinon';
import * as SmartsheetClient from '../../dist/index.js';

describe('Workspace Pagination Tests', function() {
  var client;
  var requestorStub;

  beforeEach(function() {
    // Mock requestor
    requestorStub = {
      get: function(options, callback) {
        // Mock different responses based on pagination parameters
        var mockResponse = {
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

  describe('#listWorkspaces with pagination', function() {
    it('should return traditional format when no pagination parameters provided', function(done) {
      client.workspaces.listWorkspaces({}, function(error, response) {
        should.not.exist(error);
        response.should.have.property('content');
        response.content.should.be.Array();
        response.content.length.should.equal(3);
        response.content[0].should.have.property('name', 'Workspace 1');
        done();
      });
    });

    it('should return paginated format when lastKey is provided', function(done) {
      client.workspaces.listWorkspaces({ queryParameters : {paginationType: 'token', lastKey: 'abc123'}}, function(error, response) {
        should.not.exist(error);
        response.should.have.property('content');
        response.content.should.have.property('data');
        response.content.should.have.property('lastKey');
        response.content.data.should.be.Array();
        response.content.data.length.should.equal(2);
        response.content.lastKey.should.equal('next_page_token_123');
        done();
      });
    });

    it('should return paginated format when maxItems is provided', function(done) {
      client.workspaces.listWorkspaces({ queryParameters :{paginationType: 'token', maxItems: 100}}, function(error, response) {
        should.not.exist(error);
        response.should.have.property('content');
        response.content.should.have.property('data');
        response.content.should.have.property('lastKey');
        response.content.data.should.be.Array();
        response.content.lastKey.should.equal('next_page_token_123');
        done();
      });
    });

    it('should return paginated format when both lastKey and maxItems are provided', function(done) {
      client.workspaces.listWorkspaces({ queryParameters : {paginationType: 'token', lastKey: 'abc123', maxItems: 500}}, function(error, response) {
        should.not.exist(error);
        response.should.have.property('content');
        response.content.should.have.property('data');
        response.content.should.have.property('lastKey');
        response.content.data.should.be.Array();
        response.content.lastKey.should.equal('next_page_token_123');
        done();
      });
    });
  });

  describe('#listWorkspaces validation warnings', function() {
    var consoleWarnStub;

    beforeEach(function() {
      consoleWarnStub = sinon.stub(console, 'warn');
    });

    afterEach(function() {
      consoleWarnStub.restore();
    });

    it('should show deprecation warning when pageSize is used', function(done) {
      client.workspaces.listWorkspaces({ queryParameters : {pageSize: 100}}, function(error, response) {
        should.not.exist(error);
        consoleWarnStub.calledOnce.should.be.true();
        consoleWarnStub.firstCall.args[0].should.equal('[DEPRECATED] pageSize parameter is deprecated in listWorkspaces. Use paginationType: "token" with maxItems instead.');
        done();
      });
    });

    it('should show deprecation warning when page is used', function(done) {
      client.workspaces.listWorkspaces({ queryParameters : {page: 1}}, function(error, response) {
        should.not.exist(error);
        consoleWarnStub.calledOnce.should.be.true();
        consoleWarnStub.firstCall.args[0].should.equal('[DEPRECATED] page parameter is deprecated in listWorkspaces. Use paginationType: "token" with lastKey instead.');
        done();
      });
    });

    it('should show deprecation warning when includeAll is used', function(done) {
      client.workspaces.listWorkspaces({ queryParameters : {includeAll: true}}, function(error, response) {
        should.not.exist(error);
        consoleWarnStub.calledOnce.should.be.true();
        consoleWarnStub.firstCall.args[0].should.equal('[DEPRECATED] includeAll parameter is deprecated in listWorkspaces. Use paginationType: "token" instead.');
        done();
      });
    });

    it('should show validation error when lastKey is used without token pagination', function(done) {
      client.workspaces.listWorkspaces({ queryParameters : {lastKey: 'abc123'}}, function(error, response) {
        should.not.exist(error);
        consoleWarnStub.calledOnce.should.be.true();
        consoleWarnStub.firstCall.args[0].should.equal('[VALIDATION ERROR] lastKey parameter can only be used when paginationType is set to "token".');
        done();
      });
    });

    it('should show validation error when maxItems is used without token pagination', function(done) {
      client.workspaces.listWorkspaces({ queryParameters : {maxItems: 100}}, function(error, response) {
        should.not.exist(error);
        consoleWarnStub.calledOnce.should.be.true();
        consoleWarnStub.firstCall.args[0].should.equal('[VALIDATION ERROR] maxItems parameter can only be used when paginationType is set to "token".');
        done();
      });
    });

    it('should show multiple warnings when multiple deprecated parameters are used', function(done) {
      client.workspaces.listWorkspaces({ queryParameters : {pageSize: 100, page: 1, includeAll: true}}, function(error, response) {
        should.not.exist(error);
        consoleWarnStub.calledThrice.should.be.true();
        consoleWarnStub.getCall(0).args[0].should.equal('[DEPRECATED] pageSize parameter is deprecated in listWorkspaces. Use paginationType: "token" with maxItems instead.');
        consoleWarnStub.getCall(1).args[0].should.equal('[DEPRECATED] page parameter is deprecated in listWorkspaces. Use paginationType: "token" with lastKey instead.');
        consoleWarnStub.getCall(2).args[0].should.equal('[DEPRECATED] includeAll parameter is deprecated in listWorkspaces. Use paginationType: "token" instead.');
        done();
      });
    });

    it('should show multiple validation errors when lastKey and maxItems are used without token pagination', function(done) {
      client.workspaces.listWorkspaces({ queryParameters : {lastKey: 'abc123', maxItems: 100}}, function(error, response) {
        should.not.exist(error);
        consoleWarnStub.calledTwice.should.be.true();
        consoleWarnStub.getCall(0).args[0].should.equal('[VALIDATION ERROR] lastKey parameter can only be used when paginationType is set to "token".');
        consoleWarnStub.getCall(1).args[0].should.equal('[VALIDATION ERROR] maxItems parameter can only be used when paginationType is set to "token".');
        done();
      });
    });

    it('should not show warnings when using token pagination correctly', function(done) {
      client.workspaces.listWorkspaces({ queryParameters : {paginationType: 'token', lastKey: 'abc123', maxItems: 100} }, function(error, response) {
        should.not.exist(error);
        consoleWarnStub.called.should.be.false();
        done();
      });
    });
  });
});
