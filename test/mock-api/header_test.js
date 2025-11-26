import * as helpers from './helpers';

describe("Mock API SDK Tests", () => {
  const client = helpers.setupClient();
  
  describe("#Header", () => {
    const scenarios = [
        {
          "name": "Change Agent Header - Can Be Passed",
          "method": client.sheets.createSheet,
          "shouldError": false,
          "options": {
            "body": {
              "name": "My new sheet",
              "columns": [
                {
                  "title": "Col1",
                  "primary": true,
                  "type": "TEXT_NUMBER"
                }
              ]
            },
            "changeAgent": "MyChangeAgent"
          }
        }
      ];

    helpers.defineMockApiTests(scenarios);
  });
});
