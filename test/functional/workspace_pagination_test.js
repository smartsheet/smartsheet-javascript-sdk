var should = require('should');
var _ = require('underscore');

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

        if (options.qs && (options.qs.lastKey !== undefined || options.qs.maxItems !== undefined)) {
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

    var SmartsheetClient = require('../../dist/index.js');
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
      client.workspaces.listWorkspaces({paginationType: 'token', lastKey: 'abc123'}, function(error, response) {
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
      client.workspaces.listWorkspaces({paginationType: 'token', maxItems: 100}, function(error, response) {
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
      client.workspaces.listWorkspaces({paginationType: 'token', lastKey: 'abc123', maxItems: 500}, function(error, response) {
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
});
