import * as helpers from './helpers';

describe('Mock API SDK Tests - List Workspaces', function() {
  const client = helpers.setupClient();

  describe('#Workspaces', function() {
    const scenarios = [
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
