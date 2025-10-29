import axios from 'axios';

export default async function findWireMockRequests(wiremockUrl, requestId) {
    const requestBody = {
        headers: {
            'x-request-id': {
                equalTo: requestId
            }
        }
    };
    return axios.post(`${wiremockUrl}/__admin/requests/find`, requestBody, {
        headers: { 'Content-Type': 'application/json' }
    });
}