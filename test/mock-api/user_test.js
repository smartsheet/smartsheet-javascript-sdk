var sinon = require("sinon");
var should = require("should");
var assert = require("assert");
var helpers = require("./helpers");

describe("Mock API SDK Tests", function() {
  var client = helpers.setupClient();

  describe("#User", function() {
    var scenarios = [
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
