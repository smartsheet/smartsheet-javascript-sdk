import axios from 'axios';
import * as smartsheet from '@smartsheet';

const baseUrl = 'http://127.0.0.1:8082/2.0/';
const wiremockUrl = 'http://127.0.0.1:8082';

export function createClient() {
    return smartsheet.createClient({
        accessToken: 'test_token',
        baseUrl: baseUrl,
        logLevel: 'info',
    });
}

export async function findWireMockRequest(requestId) {
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
