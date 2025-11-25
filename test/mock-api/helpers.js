import assert from 'assert';
import _ from 'underscore';
import * as smartsheet from '@smartsheet';
import { expect, jest, describe, it, beforeAll, afterAll } from '@jest/globals';
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
    describe('#' + scenario.name, () => {
        let postStub;
        let putStub;
        let getStub;
        let deleteStub;

        beforeAll(() => {
            postStub = jest.spyOn(axios, 'post').mockResolvedValue({ status: 200, data: true });
            putStub = jest.spyOn(axios, 'put').mockResolvedValue({ status: 200, data: true });
            getStub = jest.spyOn(axios, 'get').mockResolvedValue({ status: 200, data: true });
            deleteStub = jest.spyOn(axios, 'delete').mockResolvedValue({ status: 200, data: true });
        });

        afterAll(() => {
            postStub.mockRestore();
            putStub.mockRestore();
            getStub.mockRestore();
            deleteStub.mockRestore();
        });

        it('makes request', () => {
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
                    expect(response).toBeDefined();
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
}

function isScenarioError(error) {
    return error.errorCode === 9999;
}
