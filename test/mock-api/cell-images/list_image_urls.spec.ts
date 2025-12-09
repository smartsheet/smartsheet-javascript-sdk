import crypto from 'crypto';
import { createClient, findWireMockRequest } from '../utils/utils';
import { expect } from '@jest/globals';
import {
    TEST_IMAGE_ID_1,
    TEST_IMAGE_ID_2,
    TEST_IMAGE_HEIGHT_1,
    TEST_IMAGE_WIDTH_1,
    TEST_IMAGE_HEIGHT_2,
    TEST_IMAGE_WIDTH_2,
    TEST_IMAGE_URL_1,
    TEST_IMAGE_URL_2,
    TEST_URL_EXPIRES_IN_MILLIS,
    ERROR_500_STATUS_CODE,
    ERROR_500_MESSAGE,
    ERROR_400_STATUS_CODE,
    ERROR_400_MESSAGE
} from './common_test_constants';

describe('Images - listImageUrls endpoint tests', () => {
    const client = createClient();

    it('listImageUrls generated url is correct', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            body: [
                { imageId: TEST_IMAGE_ID_1, height: TEST_IMAGE_HEIGHT_1, width: TEST_IMAGE_WIDTH_1 },
                { imageId: TEST_IMAGE_ID_2, height: TEST_IMAGE_HEIGHT_2, width: TEST_IMAGE_WIDTH_2 }
            ],
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/cell-images/list-image-urls/all-response-body-properties'
            }
        };
        await client.images.listImageUrls(options);
        const matchedRequest = await findWireMockRequest(requestId);
        expect(matchedRequest.url.includes(`/2.0/imageurls`)).toBeTruthy();
    });

    it('listImageUrls all response body properties', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            body: [
                { imageId: TEST_IMAGE_ID_1, height: TEST_IMAGE_HEIGHT_1, width: TEST_IMAGE_WIDTH_1 },
                { imageId: TEST_IMAGE_ID_2, height: TEST_IMAGE_HEIGHT_2, width: TEST_IMAGE_WIDTH_2 }
            ],
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/cell-images/list-image-urls/all-response-body-properties'
            }
        };
        const response = await client.images.listImageUrls(options);
        const matchedRequest = await findWireMockRequest(requestId);

        expect(response).toEqual({
            imageUrls: [
                {
                    imageId: TEST_IMAGE_ID_1,
                    error: {
                        refId: '123',
                        errorCode: 0,
                        message: 'Image not found'
                    },
                    height: TEST_IMAGE_HEIGHT_1,
                    width: TEST_IMAGE_WIDTH_1,
                    url: TEST_IMAGE_URL_1
                },
                {
                    imageId: TEST_IMAGE_ID_2,
                    height: TEST_IMAGE_HEIGHT_2,
                    width: TEST_IMAGE_WIDTH_2,
                    url: TEST_IMAGE_URL_2
                }
            ],
            urlExpiresInMillis: TEST_URL_EXPIRES_IN_MILLIS
        });

        const body = JSON.parse(matchedRequest.body);
        expect(body).toEqual([
            { imageId: TEST_IMAGE_ID_1, height: TEST_IMAGE_HEIGHT_1, width: TEST_IMAGE_WIDTH_1 },
            { imageId: TEST_IMAGE_ID_2, height: TEST_IMAGE_HEIGHT_2, width: TEST_IMAGE_WIDTH_2 }
        ]);
    });

    it('listImageUrls error 500 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            body: [
                { imageId: TEST_IMAGE_ID_1, height: TEST_IMAGE_HEIGHT_1, width: TEST_IMAGE_WIDTH_1 }
            ],
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/500-response'
            }
        };
        try {
            await client.images.listImageUrls(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_500_STATUS_CODE);
            expect(error.message).toBe(ERROR_500_MESSAGE);
        }
    });

    it('listImageUrls error 400 response', async () => {
        const requestId = crypto.randomUUID();
        const options = {
            body: [
                { imageId: TEST_IMAGE_ID_1, height: TEST_IMAGE_HEIGHT_1, width: TEST_IMAGE_WIDTH_1 }
            ],
            customProperties: {
                'x-request-id': requestId,
                'x-test-name': '/errors/400-response'
            }
        };
        try {
            await client.images.listImageUrls(options);
            expect(true).toBe(false); // Expected an error to be thrown
        } catch (error) {
            expect(error.statusCode).toBe(ERROR_400_STATUS_CODE);
            expect(error.message).toBe(ERROR_400_MESSAGE);
        }
    });
});
