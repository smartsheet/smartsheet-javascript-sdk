import responseHandler from '../../../lib/utils/responseHandler';
import { expect, describe, it } from '@jest/globals';

describe('responseHandler', () => {
  describe('with successful response', () => {
    it(
      'should return the parsed body when content-type is JSON and charset is UTF-8',
      () => {
        const body = { id: 1, name: 'John Doe' };
        const response = {
          status: 200,
          headers: { 'content-type': 'application/json;charset=UTF-8' },
          data: body
        };

        const result = responseHandler(response);

        expect(result).toEqual({
          statusCode: response.status,
          headers: response.headers,
          content: response.data,
          body: response.data
        });
      }
    );
  });

  describe('with failed response', () => {
    it('should return a rejected promise with an error object', () => {
      const body = {
        errorCode: 'SOME_ERROR_CODE',
        message: 'Some error message',
        refId: 'SOME_REF_ID',
        detail: 'Some error detail'
      };
      const response = {
        status: 500,
        headers: { 'content-type': 'application/json' },
        data: body
      };

      const responseError = responseHandler(response);
      expect(responseError).toHaveProperty('statusCode');
      expect(responseError).toHaveProperty('headers');
      expect(responseError).toHaveProperty('errorCode');
      expect(responseError).toHaveProperty('message');
      expect(responseError).toHaveProperty('refId');
      expect(responseError).toHaveProperty('detail');
      expect(responseError.statusCode).toBe(response.status);
      expect(responseError.headers).toBe(response.headers);
      expect(responseError.errorCode).toBe(body.errorCode);
      expect(responseError.message).toBe(body.message);
      expect(responseError.refId).toBe(body.refId);
      expect(responseError.detail).toBe(body.detail);
    });

    it(
      'should return a rejected promise with an error message for non-JSON response',
      () => {
        const body = 'Internal server error';
        const response = {
          status: 500,
          headers: { 'content-type': 'text/plain' },
          data: body
        };

        const responseError = responseHandler(response);
        expect(responseError).toHaveProperty('statusCode');
        expect(responseError).toHaveProperty('headers');
        expect(responseError).toHaveProperty('message');
        expect(responseError.statusCode).toBe(response.status);
        expect(responseError.headers).toBe(response.headers);
        expect(responseError.message).toBe(body);
      }
    );
  });
});
