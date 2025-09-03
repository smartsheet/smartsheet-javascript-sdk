var sinon = require('sinon');
var should = require('should');
var assert = require('assert');
var helpers = require('./helpers');

describe('Mock API SDK Tests - Folder Endpoints', function() {
  var client = helpers.setupClient();

  describe('#Folders', function() {
    var scenarios = [
      {
        "name": "Get Folder Metadata - No Params",
        "method": client.folders.getFolderMetadata,
        "shouldError": false,
        "options": {
          "folderId": 456
        }
      },
      {
        "name": "Get Folder Metadata - Include Source",
        "method": client.folders.getFolderMetadata,
        "shouldError": false,
        "options": {
          "folderId": 456,
          "queryParameters": {
            "include": "source"
          }
        }
      },
      {
        "name": "Get Folder Children - No Params",
        "method": client.folders.getFolderChildren,
        "shouldError": false,
        "options": {
          "folderId": 456
        }
      },
      {
        "name": "Get Folder Children - Include Source and OwnerInfo",
        "method": client.folders.getFolderChildren,
        "shouldError": false,
        "options": {
          "folderId": 456,
          "queryParameters": {
            "include": "source,ownerInfo"
          }
        }
      },
      {
        "name": "Get Folder Children - Filter Sights and Reports",
        "method": client.folders.getFolderChildren,
        "shouldError": false,
        "options": {
          "folderId": 456,
          "queryParameters": {
            "childrenResourceTypes": "reports,sights"
          }
        }
      },
      {
        "name": "Get Folder Children - MaxItems and LastKey",
        "method": client.folders.getFolderChildren,
        "shouldError": false,
        "options": {
          "folderId": 456,
          "queryParameters": {
            "maxItems": "100",
            "lastKey": "aslkjf4wlkta4n4900sjfklf499sjwlk4356lkj"
          }
        }
      }
    ];

    helpers.defineMockApiTests(scenarios);
  });
});