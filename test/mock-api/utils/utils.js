const axios = require('axios');
var smartsheet = require('../../../');

const baseUrl = 'http://127.0.0.1:8082/2.0/';
const wiremockUrl = 'http://127.0.0.1:8082';

exports.createClient = function () {
    return client = smartsheet.createClient({
        accessToken: 'test_token',
        baseUrl: baseUrl
    });
}

exports.findWireMockRequest = async function findWireMockRequest(requestId) {
    const requestBody = {
        headers: {
            'x-request-id': {
                equalTo: requestId
            }
        }
    };
    const response = await axios.post(`${wiremockUrl}/__admin/requests/find`, requestBody, {
        headers: { 'Content-Type': 'application/json' }
    });
    const matchedRequests = response.data.requests;
    if (matchedRequests.length === 0) {
       throw new Error(`No matching request found for ID: ${requestId}`);
    }
    if (matchedRequests.length > 1) {
        throw new Error(`Multiple matching requests found for ID: ${requestId}`);
    }
    return matchedRequests[0];
}