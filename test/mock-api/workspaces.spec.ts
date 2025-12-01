import * as helpers from './helpers';

describe('Mock API SDK Tests - Workspace Endpoints', () => {
  const client = helpers.setupClient();

  describe('#Workspaces', () => {
    const scenarios = [
      {
        "name": "Get Workspace Metadata - No Params",
        "method": client.workspaces.getWorkspaceMetadata,
        "shouldError": false,
        "options": {
          "workspaceId": 123
        }
      },
      {
        "name": "Get Workspace Metadata - Include Source",
        "method": client.workspaces.getWorkspaceMetadata,
        "shouldError": false,
        "options": {
          "workspaceId": 123,
          "queryParameters": {
            "include": "source"
          }
        }
      },
      {
        "name": "Get Workspace Children - No Params",
        "method": client.workspaces.getWorkspaceChildren,
        "shouldError": false,
        "options": {
          "workspaceId": 123
        }
      },
      {
        "name": "Get Workspace Children - Include Source and OwnerInfo",
        "method": client.workspaces.getWorkspaceChildren,
        "shouldError": false,
        "options": {
          "workspaceId": 123,
          "queryParameters": {
            "include": "source,ownerInfo"
          }
        }
      },
      {
        "name": "Get Workspace Children - Filter Sheets and Folders",
        "method": client.workspaces.getWorkspaceChildren,
        "shouldError": false,
        "options": {
          "workspaceId": 123,
          "queryParameters": {
            "childrenResourceTypes": "folders,sheets"
          }
        }
      },
      {
        "name": "Get Workspace Children - MaxItems and LastKey",
        "method": client.workspaces.getWorkspaceChildren,
        "shouldError": false,
        "options": {
          "workspaceId": 123,
          "queryParameters": {
            "maxItems": "1000",
            "lastKey": "aslkjf4wlkta4n4900sjfklf499sjwlk4356lkj"
          }
        }
      }
    ];

    helpers.defineMockApiTests(scenarios);
  });
});
