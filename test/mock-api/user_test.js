import sinon from "sinon";
import should from "should";
import assert from "assert";
import * as helpers from './helpers';

describe("Mock API SDK Tests", function() {
  const client = helpers.setupClient();

  describe("#User", function() {
    const scenarios = [
      {
        name: "Deactivate user",
        method: client.users.deactivateUser,
        shouldError: false,
        options: {
          userId: 2
        }
      },
      {
        name: "Reactivate user",
        method: client.users.reactivateUser,
        shouldError: false,
        options: {
          userId: 2
        }
      }
    ];

    helpers.defineMockApiTests(scenarios);
  });
});
