import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_USER_ID,
    TEST_PLAN_ID,
    TEST_SUCCESS_MESSAGE,
    TEST_SUCCESS_RESULT_CODE,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';
import { SeatTypes } from '@smartsheet/users/types';

describe('Users - upgradeUser & downgradeUser endpoint tests', () => {
    const client = createClient();
    const TEST_UPGRADE_BODY = { seatType: SeatTypes.MEMBER };
    const TEST_DOWNGRADE_BODY = { seatType: SeatTypes.VIEWER };
    const TEST_DOWNGRADE_TO_CONTRIBUTOR_BODY = { seatType: SeatTypes.CONTRIBUTOR };

    it('upgradeUser generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            body: TEST_UPGRADE_BODY,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/upgrade-user/all-response-body-properties'
            }
        };
        await client.users.upgradeUser(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual(`/2.0/users/${TEST_USER_ID}/plans/${TEST_PLAN_ID}/upgrade`);
    });

    it('upgradeUser all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            body: TEST_UPGRADE_BODY,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/upgrade-user/all-response-body-properties'
            }
        };
        const response = await client.users.upgradeUser(options);
        const matchedRequest = await findWireMockRequest(requestId);
        
        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE
        });
        
        const body = JSON.parse(matchedRequest.body);
        expect(body).toEqual(TEST_UPGRADE_BODY);
    });

    it('upgradeUser no seat type passed', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/upgrade-user/all-response-body-properties'
            }
        };
        const response = await client.users.upgradeUser(options);
        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE
        });
    });

    it('upgradeUser error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            body: TEST_UPGRADE_BODY,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.users.upgradeUser(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('upgradeUser error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            body: TEST_UPGRADE_BODY,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.users.upgradeUser(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });

    it('downgradeUser generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            body: TEST_DOWNGRADE_BODY,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/downgrade-user/all-response-body-properties'
            }
        };
        await client.users.downgradeUser(options);
        const matchedRequest = await findWireMockRequest(requestId);
        const parsedUrl = new URL(matchedRequest.absoluteUrl);
        expect(parsedUrl.pathname).toEqual(`/2.0/users/${TEST_USER_ID}/plans/${TEST_PLAN_ID}/downgrade`);
    });

    it('downgradeUser all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            body: TEST_DOWNGRADE_BODY,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/downgrade-user/all-response-body-properties'
            }
        };
        const response = await client.users.downgradeUser(options);
        const matchedRequest = await findWireMockRequest(requestId);
        
        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE
        });
        
        const body = JSON.parse(matchedRequest.body);
        expect(body).toEqual(TEST_DOWNGRADE_BODY);
    });

    it('downgradeUser error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            body: TEST_DOWNGRADE_BODY,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.users.downgradeUser(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('downgradeUser error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            body: TEST_DOWNGRADE_BODY,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.users.downgradeUser(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });

    it('downgradeUser to CONTRIBUTOR seat type', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            userId: TEST_USER_ID,
            planId: TEST_PLAN_ID,
            body: TEST_DOWNGRADE_TO_CONTRIBUTOR_BODY,
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/users/downgrade-user/to-contributor'
            }
        };
        const response = await client.users.downgradeUser(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(response).toEqual({
            message: TEST_SUCCESS_MESSAGE,
            resultCode: TEST_SUCCESS_RESULT_CODE
        });

        const body = JSON.parse(matchedRequest.body);
        expect(body).toEqual(TEST_DOWNGRADE_TO_CONTRIBUTOR_BODY);
    });
});
