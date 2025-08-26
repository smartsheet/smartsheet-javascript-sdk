var sinon = require('sinon');
var should = require('should');
var assert = require('assert');
var helpers = require('./helpers');


describe('Mock API SDK Tests - List Workspaces', function() {
  var client = helpers.setupClient();

  describe('#Workspaces', function() {
    var scenarios = [
      {
        "name": "List Workspaces - First Page with Pagination",
          "method": client.workspaces.listWorkspaces,
          "shouldError": false,
          "options": {
            "queryParameters": {
              "paginationType": "token",
              "maxItems": "100"
            }
          }
      },
      {
        "name": "List Workspaces - Middle Page with Pagination",
        "method": client.workspaces.listWorkspaces,
        "shouldError": false,
        "options": {
          "queryParameters": {
            "paginationType": "token",
            "lastKey": "eyJsYXN0SWQiOjEwMDJ9",
            "maxItems": "100"
          }
        }
      },
      {
        "name": "List Workspaces - Final Page with Pagination",
        "method": client.workspaces.listWorkspaces,
        "shouldError": false,
        "options": {
          "queryParameters": {
            "paginationType": "token",
            "lastKey": "eyJsYXN0SWQiOjEwMDR9",
            "maxItems": "100"
          }
        }
      },
      {
        "name": "List Workspaces - No Pagination Parameters",
        "method": client.workspaces.listWorkspaces,
        "shouldError": false,
        "options": {
          "queryParameters": {
            "paginationType": "token",
            "lastKey": "eyJsYXN0SWQiOjEwMDR9",
            "maxItems": "100"
          }
        }
      },
    ];

    helpers.defineMockApiTests(scenarios);
  });
});
