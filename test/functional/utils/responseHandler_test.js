const should = require('should');
const responseHandler = require('../../../lib/utils/responseHandler');

describe('responseHandler', () => {
  describe('with successful response', () => {
    it('should return the parsed body when content-type is JSON and charset is UTF-8', () => {
      const body = { id: 1, name: 'John Doe' };
      const response = {
        status: 200,
        headers: { 'content-type': 'application/json;charset=UTF-8' },
        data: body
      };

      const result = responseHandler(response);

      result.should.deepEqual({
        statusCode: response.status,
        headers: response.headers,
        content: response.data,
        body: response.data
      });
    });
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

      var responseError = responseHandler(response);
      responseError.should.have.properties(['statusCode', 'headers', 'errorCode', 'message', 'refId', 'detail']);
      responseError.statusCode.should.equal(response.status);
      responseError.headers.should.equal(response.headers);
      responseError.errorCode.should.equal(body.errorCode);
      responseError.message.should.equal(body.message);
      responseError.refId.should.equal(body.refId);
      responseError.detail.should.equal(body.detail);
    });

    it('should return a rejected promise with an error message for non-JSON response', () => {
      const body = 'Internal server error';
      const response = {
        status: 500,
        headers: { 'content-type': 'text/plain' },
        data: body
      };

      var responseError = responseHandler(response);
      responseError.should.have.properties(['statusCode', 'headers', 'message']);
      responseError.statusCode.should.equal(response.status);
      responseError.headers.should.equal(response.headers);
      responseError.message.should.equal(body);
    });
  });
});
