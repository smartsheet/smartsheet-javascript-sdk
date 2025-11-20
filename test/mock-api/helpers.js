import should from 'should';
import assert from 'assert';
import _ from 'underscore';
import * as smartsheet from '@smartsheet';
import sinon from "sinon";
import axios from "axios";

export function setupClient() {
    return smartsheet.createClient({accessToken:'1234', baseUrl: "http://localhost:8082/"});
}

export function defineMockApiTests(scenarios) {
    _.each(scenarios, function (scenario) {
        defineMockApiTest(scenario)
    });
}

function defineMockApiTest(scenario) {
    describe('#' + scenario.name, function () {
        var postStub;
        var putStub;
        var getStub;
        var deleteStub;

        this.beforeAll(() => {
            postStub = sinon.stub(axios, 'post').resolves({ status: 200, data: true });
            putStub = sinon.stub(axios, 'put').resolves({ status: 200, data: true });
            getStub = sinon.stub(axios, 'get').resolves({ status: 200, data: true });
            deleteStub = sinon.stub(axios, 'delete').resolves({ status: 200, data: true });
        });

        this.afterAll(() => {
            postStub.restore();
            putStub.restore();
            getStub.restore();
            deleteStub.restore();
        });

        it('makes request', function () {
            if(_.has(scenario, 'skip')) {
              this.skip();
            }

            scenario.options.apiScenario = scenario.name;
            return scenario.method(scenario.options)
            .then(function(response) {
                if (scenario.shouldError) {
                    assert.fail('Expected error response, received success.');
                }
                else {
                    should.exist(response);
                }
            })
            .catch(function(error) {
                if (scenario.shouldError && !isScenarioError(error)) {
                    return Promise.resolve();
                }
                else {
                    return Promise.reject(new Error(error.message));
                }
            });
        });
    });
};

function isScenarioError(error) {
    return error.errorCode === 9999;
}
