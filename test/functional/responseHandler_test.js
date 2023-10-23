var should = require('should');
var Promise = require('bluebird');
var _ = require('underscore');

var handleResponse = require('../../lib/utils/responseHandler');

describe('Utils Unit Tests', function() {
  describe('#responseHandler', function() {
    describe('#handleResponse', function() {
      var mockResponse = null;
      var mockBody = null;

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
        var errResponse = handleResponse(mockResponse);
        errResponse.statusCode.should.equal(500);
        errResponse.message.should.equal('EMERGENCY');
        errResponse.errorCode.should.equal(911);
      });

      it('should return parsed JSON body', () => {
        var result = handleResponse(mockResponse);
        result.content.hello.should.equal(mockBody.hello);
      });

      it('should return the body if content type is not application/json', () => {
        mockResponse.headers['content-type'] = 'application/xml';
        mockResponse.data = mockBody;
        var result = handleResponse(mockResponse);
        result.headers.should.equal(mockResponse.headers);
        result.statusCode.should.equal(mockResponse.status);
        result.content.should.equal(mockBody);
      });
    });
  });
});
