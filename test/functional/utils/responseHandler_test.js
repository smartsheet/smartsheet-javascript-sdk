const should = require('should');
const responseHandler = require('../../../lib/utils/responseHandler');

describe('responseHandler', () => {
  describe('with successful response', () => {
    it('should return the parsed body when content-type is JSON and charset is UTF-8', () => {
      const response = {
        statusCode: 200,
        headers: { 'content-type': 'application/json;charset=UTF-8' }
      };
      const body = JSON.stringify({ id: 1, name: 'John Doe' });

      const result = responseHandler(response, body);

      result.should.have.properties(['statusCode', 'headers', 'content']);
      result.statusCode.should.equal(response.statusCode);
      result.headers.should.equal(response.headers);
      result.content.should.deepEqual(JSON.parse(body));
    });

    it('should return the raw body when content-type is not JSON', () => {
      const response = {
        statusCode: 200,
        headers: { 'content-type': 'text/plain' }
      };
      const body = 'This is a test';

      const result = responseHandler(response, body);

      result.should.have.properties(['statusCode', 'headers', 'content']);
      result.statusCode.should.equal(response.statusCode);
      result.headers.should.equal(response.headers);
      result.content.should.equal(body);
    });
  });

  describe('with failed response', () => {
    it('should return a rejected promise with an error object', () => {
      const response = {
        statusCode: 500,
        headers: { 'content-type': 'application/json' }
      };
      const body = {
        errorCode: 'SOME_ERROR_CODE',
        message: 'Some error message',
        refId: 'SOME_REF_ID',
        detail: 'Some error detail'
      };

      return responseHandler(response, JSON.stringify(body))
        .then(() => {
          should.fail('Function should have thrown an error');
        })
        .catch((error) => {
          error.should.have.properties(['statusCode', 'headers', 'errorCode', 'message', 'refId', 'detail']);
          error.statusCode.should.equal(response.statusCode);
          error.headers.should.equal(response.headers);
          error.errorCode.should.equal(body.errorCode);
          error.message.should.equal(body.message);
          error.refId.should.equal(body.refId);
          error.detail.should.equal(body.detail);
        });
    });

    it('should return a rejected promise with an error message for non-JSON response', () => {
      const response = {
        statusCode: 500,
        headers: { 'content-type': 'text/plain' }
      };
      const body = 'Internal server error';

      return responseHandler(response, body)
        .then(() => {
          should.fail('Function should have thrown an error');
        })
        .catch(error => {
          error.should.have.properties(['statusCode', 'headers', 'message']);
          error.statusCode.should.equal(response.statusCode);
          error.headers.should.equal(response.headers);
          error.message.should.equal(body);
        });
    });
  });
});
