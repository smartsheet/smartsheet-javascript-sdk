import sinon from 'sinon';
import should from 'should';
import assert from 'assert';
import * as helpers from './helpers';

describe('Mock API SDK Tests', function() {
  const client = helpers.setupClient();

  describe('#Sheets', function() {
  const scenarios = [
      {
        "name": "List Sheets - No Params",
        "method": client.sheets.listSheets,
        "shouldError": false,
        "options": {}
      },
      {
        "name": "List Sheets - Include Owner Info",
        "method": client.sheets.listSheets,
        "shouldError": false,
        "options": {
          "queryParameters": {
            "include": "ownerInfo"
          }
        }
      },
      {
        "name": "Create Sheet - Invalid - No Columns",
        "method": client.sheets.createSheet,
        "shouldError": true,
        "options": {
          "body": {
            "name": "New Sheet",
            "columns": []
          }
        }
      }
    ];

    helpers.defineMockApiTests(scenarios);
  });
});
