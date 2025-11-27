import _ from 'underscore';
import handleResponse from '../../lib/utils/responseHandler';
import { expect, describe, beforeEach, afterEach, it } from '@jest/globals';

describe('Utils Unit Tests', () => {
  describe('#responseHandler', () => {
    describe('#handleResponse', () => {
      let mockResponse = null;
      let mockBody = null;
      let mockBodyError = null;

      beforeEach(() => {
        mockBody = {
          hello: "world"
        };
        mockBodyError = {
          errorCode: 911,
          message: "EMERGENCY"
        };
        
        mockResponse = {
          status: 200,
          headers: {
            'content-type':'application/json;charset=UTF-8'
          },
          data: mockBody
        };
      });

      afterEach(() => {
        mockResponse = null;
        mockBody = null;
      });

      it('should return a rejected promise if status code is not 200', () => {
        mockResponse.status = 500;
        mockResponse.data = mockBodyError;
        const errResponse = handleResponse(mockResponse);
        expect(errResponse.statusCode).toBe(500);
        expect(errResponse.message).toBe('EMERGENCY');
        expect(errResponse.errorCode).toBe(911);
      });

      it('should return parsed JSON body', () => {
        const result = handleResponse(mockResponse);
        expect(result.content.hello).toBe(mockBody.hello);
      });

      it('should return the body if content type is not application/json', () => {
        mockResponse.headers['content-type'] = 'application/xml';
        mockResponse.data = mockBody;
        const result = handleResponse(mockResponse);
        expect(result.headers).toBe(mockResponse.headers);
        expect(result.statusCode).toBe(mockResponse.status);
        expect(result.content).toBe(mockBody);
      });
    });
  });
});
