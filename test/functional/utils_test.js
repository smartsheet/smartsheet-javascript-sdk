import Promise from 'bluebird';
import _ from 'underscore';
import fs from 'fs';
import { smartSheetURIs } from '@smartsheet';
import axios from 'axios';
import { create as createRequestor } from '../../lib/utils/httpRequestor';
import * as httpRequestor from '../../lib/utils/httpRequestor';
import packageJson from '../../package.json';
import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals';

describe('Utils Unit Tests', () => {
  const requestor = createRequestor({request: axios});

  const sample = {
    name : 'name'
  };

  const sampleRequest = {
    url:'URL',
    accessToken:'TOKEN'
  };

  const sampleRequestWithQueryParameters = {
    accessToken: 'TOKEN',
    contentType: 'application/json',
    body: sample,
    queryParameters: {
      parameter1:'',
      parameter2:''
    }
  };

  const EXPECTED_VERSION = packageJson.version;

  describe('#HttpRequestor', () => {
    it('should have GET method', () => expect(requestor).toHaveProperty('get'));

    it('should have POST method', () => expect(requestor).toHaveProperty('post'));

    it(
      'should have POST file method',
      () => expect(requestor).toHaveProperty('postFile')
    );

    it('should have PUT method', () => expect(requestor).toHaveProperty('put'));

    it(
      'should have DELETE method',
      () => expect(requestor).toHaveProperty('delete')
    );

    describe('#buildUrl', () => {
      let host = null;

      beforeEach(() => {
        host = process.env.SMARTSHEET_API_HOST = 'host/';
      });

      afterEach(() => {
        process.env.SMARTSHEET_API_HOST = '';
        host = null;
      });

      it('should return the set HOST with URL appended', () => {
        const url = 'test';
        const builtUrl = requestor.internal.buildUrl({url:url});
        expect(builtUrl).toBe(host + url);
      });

      it('url should equal default base url', () => {
        process.env.SMARTSHEET_API_HOST = '';
        const builtUrl = requestor.internal.buildUrl({});
        expect(builtUrl).toBe(smartSheetURIs.defaultBaseURI);
      });

      it('url should equal gov url', () => {
        const builtUrl = requestor.internal.buildUrl({baseUrl:smartSheetURIs.govBaseURI});
        expect(builtUrl).toBe(smartSheetURIs.govBaseURI);
      });

      it('url should equal eu url', () => {
        const builtUrl = requestor.internal.buildUrl({baseUrl:smartSheetURIs.euBaseURI});
        expect(builtUrl).toBe(smartSheetURIs.euBaseURI);
      });

      it('prefers baseUrl over env var', () => {
        const builtUrl = requestor.internal.buildUrl({baseUrl: 'base url'});
        expect(builtUrl).toBe('base url');
      });

      it('prefers baseUrl over default', () => {
        process.env.SMARTSHEET_API_HOST = '';
        const builtUrl = requestor.internal.buildUrl({baseUrl: 'base url'});
        expect(builtUrl).toBe('base url');
      });

      it('url should contain the host + url', () => {
        const builtUrl = requestor.internal.buildUrl({url: 'url/'});
        expect(builtUrl).toBe(host + 'url/');
      });

      it('url should contain the ID', () => {
        const builtUrl = requestor.internal.buildUrl({url: 'url/', id: '123'});
        expect(builtUrl).toBe(host + 'url/123');
      });
    });

    describe('#buildHeaders', () => {
      const newType = 'text/xml';
      const applicationJson = 'application/json';
      const textCsv = 'text/csv'
      const docType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      let fsStub = null;

      beforeEach(() => {
        // @ts-expect-error - Mocking with partial Stats object for testing
        fsStub = jest.spyOn(fs, 'statSync').mockReturnValue({size: 234});
      });

      afterEach(() => {
        fsStub.mockRestore();
      });

      it('authorization header should have token', () => {
        const headers = requestor.internal.buildHeaders({accessToken: 'token'});
        expect(headers.Authorization).toBe('Bearer token');
      });

      it('accept header should equal ' + applicationJson, () => {
        const headers = requestor.internal.buildHeaders({});
        expect(headers.Accept).toBe(applicationJson);
      });

      it('accept header should equal ' + newType, () => {
        const headers = requestor.internal.buildHeaders({accept: newType});
        expect(headers.Accept).toBe(newType);
      });

      it('content-type header should ' + applicationJson, () => {
        const headers = requestor.internal.buildHeaders({contentType: applicationJson});
        expect(headers['Content-Type']).toBe(applicationJson);
      });

      it('content-type header should equal ' + newType, () => {
        const headers = requestor.internal.buildHeaders({contentType: newType});
        expect(headers['Content-Type']).toBe(newType);
      });

      it('Content-Type should equal ' + textCsv, () => {
        const headers = requestor.internal.buildHeaders({fileName: 'test.csv'});
        expect(headers['Content-Type']).toBe(textCsv);
      });

      it('Content-Type should equal ' + docType, () => {
        const headers = requestor.internal.buildHeaders({fileName: 'test.docx'});
        expect(headers['Content-Type']).toBe(docType);
      });

      it('Content-Type should equal ' + applicationJson, () => {
        const headers = requestor.internal.buildHeaders({fileName: 'test'});
        expect(headers['Content-Type']).toBe(applicationJson);
      });

      it('Content-Disposition should equal filename', () => {
        const headers = requestor.internal.buildHeaders({fileName: 'test'});
        expect(headers['Content-Disposition']).toBe('attachment; filename="test"');
      });

      it('Should set Content-Disposition to contentDisposition', () => {
        const headers = requestor.internal.buildHeaders({contentDisposition: 'some content disposition'});
        expect(headers['Content-Disposition']).toBe('some content disposition');
      });

      it('Should prefer contentDisposition to fileName', () => {
        const headers = requestor.internal.buildHeaders({fileName: 'test', contentDisposition: 'something else'});
        expect(headers['Content-Disposition']).toBe('something else');
      });

      it('Should set Content-Length to fileSize', () => {
        const headers = requestor.internal.buildHeaders({fileName: 'test',   fileSize: 123});
        expect(headers['Content-Length']).toBe(123);
      });

      it('Should set Content-Length from file size when path is specified', () => {
        const headers = requestor.internal.buildHeaders({fileName: 'test',   path: "somePath"});
        expect(headers['Content-Length']).toBe(234);
      });

      it('Should prefer path over fileSize for Content-Length', () => {
        const headers = requestor.internal.buildHeaders({fileName: 'test',   path: "somePath", fileSize: 123});
        expect(headers['Content-Length']).toBe(234);
      });

      it('Assume-User should equal URI encoded email', () => {
        const headers = requestor.internal.buildHeaders({assumeUser: 'john.doe@smartsheet.com'});
        expect(headers['Assume-User']).toBe('john.doe%40smartsheet.com');
      });

      it('Should set the user agent string based on the version', () => {
        const headers = requestor.internal.buildHeaders({});
        expect(headers['User-Agent']).toBe(`smartsheet-javascript-sdk/${packageJson.version}`);
      });

      it('Should used a passed in value for the user agent string', () => {
        const headers = requestor.internal.buildHeaders({userAgent: 'someAgentString'});
        expect(headers['User-Agent']).toBe(`smartsheet-javascript-sdk/${packageJson.version}/someAgentString`);
      });

      it('Custom properties should be allowed', () => {
        const headers = requestor.internal.buildHeaders({customProperties: {custom1: 'value', custom2: 'value2'}});
        expect(headers['custom1']).toBe(`value`);
        expect(headers['custom2']).toBe(`value2`);
      });
    });
  });

  describe('#GET', () => {
    describe('#Successful request', () => {
      let requestStub = null;
      const stubbedRequestor = httpRequestor.create({request: axios, handleResponse: () => ({ content: true })});

      beforeEach(() => {
        requestStub = jest.spyOn(axios, 'get');
        const mockResponse = {
          status: 200,
          headers: {
            'content-type':'application/json;charset=UTF-8'
          },
          data: {
            hello: "world"
          }
        };
        requestStub.mockReturnValue(Promise.resolve(mockResponse));
      });

      afterEach(() => {
        requestStub.mockRestore();
      });

      it('request should resolve promise as true', () =>
        expect(stubbedRequestor.get(sampleRequest)).resolves.toBe(true));

      it('request should call callback as true', done => {
        stubbedRequestor.get(sampleRequest, function(err, data) {
          expect(data).toBe(true);
          done();
        })
      });
    });

    describe('#Error on request', () => {
      let requestStub = null;
      const stubbedRequestor = httpRequestor.create({request: axios, handleResponse: () => ({ content: true })});
      let mockBody;

      beforeEach(() => {
        requestStub = jest.spyOn(axios, 'get');
        mockBody = {error:true};
        requestStub.mockReturnValue(Promise.reject(mockBody));
      });

      afterEach(() => {
        requestStub.mockRestore();
      });

      it('request should error as false, using promises', () =>
        stubbedRequestor
          .get(sampleRequest)
          .catch(error => expect(error.content).toBe(true)));

      it('request should error as false, using callbacks', (done) => {
        stubbedRequestor
          .get(sampleRequest,
               (err, _) => {
                 expect(err.content).toBe(true)
                 done();
                });
      });
    });

    describe('#Arguments', () => {
      let spyGet;

      beforeEach(() => {
        spyGet = jest.spyOn(axios, 'get');
      });

      afterEach(() => {
        spyGet.mockRestore();
      });

      it('headers sent as part of request should match given', () => {
        const sampleHeaders = {
          Authorization: 'Bearer TOKEN',
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': `smartsheet-javascript-sdk/${EXPECTED_VERSION}`
        };
        requestor.get(sampleRequest);
        expect(spyGet.mock.calls[0][1].headers.Authorization).toBe(sampleHeaders.Authorization);
        expect(spyGet.mock.calls[0][1].headers.Accept).toBe(sampleHeaders.Accept);
        expect(spyGet.mock.calls[0][1].headers['Content-Type']).toBe(sampleHeaders['Content-Type']);
        expect(spyGet.mock.calls[0][1].headers['User-Agent']).toBe(sampleHeaders['User-Agent']);
      });

      it('url sent to request should match given', () => {
        requestor.get(sampleRequest);
        expect(spyGet.mock.calls[0][0]).toBe('https://api.smartsheet.com/2.0/URL');
      });

      it('queryString sent to request should match given', () => {
        requestor.get(sampleRequestWithQueryParameters);
        expect(spyGet.mock.calls[0][1].params).toBe(sampleRequestWithQueryParameters.queryParameters);
      });
    });

    describe('#Retry', () => {
      let requestStub = null;
      const handleResponseStub = jest.fn();
      const stubbedRequestor = httpRequestor.create({request: axios, handleResponse: handleResponseStub});
      let sampleRequestForRetry = null;

      function givenGetReturnsError() {
        requestStub.mockReturnValue(Promise.resolve([{}, {}]));
        handleResponseStub.mockReturnValue({errorCode: 4001});
      }

      function givenGetReturnsSuccess() {
        requestStub.mockReturnValue(Promise.resolve([{}, {}]));
        handleResponseStub.mockReturnValue({content: true});
      }

      function givenEarlyExitBackoff() {
        sampleRequestForRetry.calcRetryBackoff = numRetry => numRetry == 1 ? -1 : 1;
      }

      function givenBackoffDependsOnError() {
        sampleRequestForRetry.calcRetryBackoff = (numRetry, error) => {
          if(error.errorCode == 4001) return numRetry == 1 ? -1 : 1;
          else throw new Error('Error object not provided to backoff');
        };
      }

      beforeEach(() => {
        requestStub = jest.spyOn(axios, 'get');
        sampleRequestForRetry = _.extend({}, sampleRequest);
        sampleRequestForRetry.maxRetryDurationMillis = 30;
        sampleRequestForRetry.calcRetryBackoff = function (numRetry) {return Math.pow(3, numRetry);};
      });

      afterEach(() => {
        requestStub.mockRestore();
      });

      it('get called once on success', () => {
        givenGetReturnsSuccess();
        return stubbedRequestor
          .get(sampleRequestForRetry)
          .then(_ => expect(requestStub.mock.calls.length).toBe(1));
      });

      it('get retried on error', () => {
        givenGetReturnsError();
        return stubbedRequestor
          .get(sampleRequestForRetry)
          .catch(_ => expect(requestStub.mock.calls.length).toBeGreaterThan(1));
      });

      it('get stops retrying when receiving a negative backoff', () => {
        givenGetReturnsError();
        givenEarlyExitBackoff();
        return stubbedRequestor
          .get(sampleRequestForRetry)
          .catch(_ => expect(requestStub.mock.calls.length).toBe(2));
      });

      it('get passes the causing error to the backoff function', () => {
        givenGetReturnsError();
        givenBackoffDependsOnError();
        return stubbedRequestor
          .get(sampleRequestForRetry)
          .catch(_ => expect(requestStub.mock.calls.length).toBe(2));
      });
    });
  });

  describe('#POST', () => {
    describe('#Successful request', () => {
      let requestStub = null;
      const stubbedRequestor = httpRequestor.create({request: axios, handleResponse: () => ({content: true})});

      beforeEach(() => {
        requestStub = jest.spyOn(axios, 'post');
        const mockResponse = {
          statusCode: 200,
          headers: {
            'content-type':'application/json;charset=UTF-8'
          }
        };
        const mockBody = '{"hello":"world"}';
        requestStub.mockReturnValue(Promise.resolve([mockResponse, mockBody]));
      });

      afterEach(() => {
        requestStub.mockRestore();
      });

      it('request should resolve as true', () =>
        stubbedRequestor
          .post(sampleRequest)
          .then(data => expect(data).toBe(true)));

      it('request should call callback as true', (done) => {
        stubbedRequestor.post(sampleRequest, function(err, data) {
          expect(data).toBe(true);
          done();
        });
      });
    });

    describe('#Error on request', () => {
      let requestStub = null;
      const mockBody = {error:true};
      const stubbedRequestor = httpRequestor.create({request: axios, handleResponse: () => ({content: true})});

      beforeEach(() => {
        requestStub = jest.spyOn(axios, 'post');
        requestStub.mockReturnValue(Promise.reject(mockBody));
      });

      afterEach(() => {
        requestStub.mockRestore();
      });

      it('request should error as false', () =>
        stubbedRequestor
          .post(sampleRequest)
          .catch(error => expect(error.content).toBe(true)));

      it('request should error as false', (done) => {
        stubbedRequestor
          .post(sampleRequest,
                (err, _) => {
                  expect(err.content).toBe(true);
                  done();
                });
      });
    });

    describe('#Arguments', () => {
      let spyPost;

      beforeEach(() => {
        spyPost = jest.spyOn(axios, 'post');
      });

      afterEach(() => {
        spyPost.mockRestore();
      });

      it('headers sent as part of request should match given', () => {
        const sampleHeaders = {
          Authorization: 'Bearer TOKEN',
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': `smartsheet-javascript-sdk/${EXPECTED_VERSION}`
        };
        requestor.post(sampleRequest);
        expect(spyPost.mock.calls[0][2].headers.Authorization).toBe(sampleHeaders.Authorization);
        expect(spyPost.mock.calls[0][2].headers.Accept).toBe(sampleHeaders.Accept);
        expect(spyPost.mock.calls[0][2].headers['Content-Type']).toBe(sampleHeaders['Content-Type']);
        expect(spyPost.mock.calls[0][2].headers['User-Agent']).toBe(sampleHeaders['User-Agent']);
      });

      it('url sent to request should match given', () => {
        requestor.post(sampleRequest);
        expect(spyPost.mock.calls[0][0]).toBe('https://api.smartsheet.com/2.0/URL');
      });

      it('queryString sent to request should match given', () => {
        requestor.post(sampleRequestWithQueryParameters);
        expect(spyPost.mock.calls[0][2].params).toBe(sampleRequestWithQueryParameters.queryParameters);
      });

      it('body sent to request should match given', () => {
        requestor.post(sampleRequestWithQueryParameters);
        expect(spyPost.mock.calls[0][1]).toBe(sampleRequestWithQueryParameters.body);
      });
    });

    describe('#Retry', () => {
      let requestStub = null;
      const handleResponseStub = jest.fn();
      const stubbedRequestor = httpRequestor.create({request: axios, handleResponse: handleResponseStub});
      let sampleRequestForRetry;

      function givenPostReturnsError() {
        requestStub.mockReturnValue(Promise.resolve([{}, {}]));
        handleResponseStub.mockReturnValue({errorCode: 4001});
      }

      function givenPostReturnsSuccess() {
        requestStub.mockReturnValue(Promise.resolve([{}, {}]));
        handleResponseStub.mockReturnValue({content: true});
      }

      function givenEarlyExitBackoff() {
        sampleRequestForRetry.calcRetryBackoff = numRetry => numRetry == 1 ? -1 : 1;
      }

      function givenBackoffDependsOnError() {
        sampleRequestForRetry.calcRetryBackoff = (numRetry, error) => {
          if(error.errorCode == 4001) return numRetry == 1 ? -1 : 1;
          else throw new Error('Error object not provided to backoff');
        };
      }

      beforeEach(() => {
        requestStub = jest.spyOn(axios, 'post');

        sampleRequestForRetry = _.extend({}, sampleRequest);
        sampleRequestForRetry.maxRetryDurationMillis = 30;
        sampleRequestForRetry.calcRetryBackoff = function (numRetry) {return Math.pow(3, numRetry);};
      });

      afterEach(() => {
        requestStub.mockRestore();
      });

      it('post called once on success', () => {
        givenPostReturnsSuccess();
        return stubbedRequestor
          .post(sampleRequestForRetry)
          .then(_ => expect(requestStub.mock.calls.length).toBe(1));
      });

      it('post retried on error', () => {
        givenPostReturnsError();
        return stubbedRequestor
          .post(sampleRequestForRetry)
          .catch(_ => expect(requestStub.mock.calls.length).toBeGreaterThan(1));
      });

      it('post stops retrying when receiving a negative backoff', () => {
        givenPostReturnsError();
        givenEarlyExitBackoff();
        return stubbedRequestor
          .post(sampleRequestForRetry)
          .catch(_ => expect(requestStub.mock.calls.length).toBe(2));
      });

      it('post passes the causing error to the backoff function', () => {
        givenPostReturnsError();
        givenBackoffDependsOnError();
        return stubbedRequestor
          .post(sampleRequestForRetry)
          .catch(_ => expect(requestStub.mock.calls.length).toBe(2));
      });
    });
  });

  describe('#PUT', () => {
    describe('#Successful request', () => {
      let requestStub = null;
      const stubbedRequestor = httpRequestor.create({request: axios, handleResponse: () => ({content: true})});

      beforeEach(() => {
        requestStub = jest.spyOn(axios, 'put');
        const mockResponse = {
          statusCode: 200,
          headers: {
            'content-type':'application/json;charset=UTF-8'
          }
        };
        const mockBody = '{"hello":"world"}';
        requestStub.mockReturnValue(Promise.resolve([mockResponse, mockBody]));
      });

      afterEach(() => {
        requestStub.mockRestore();
      });

      it('request should resolve as true', () =>
        stubbedRequestor
          .put(sampleRequest)
          .then(data => expect(data).toBe(true)));

      it('request should call callback as true', (done) => {
        stubbedRequestor
          .put(sampleRequest,
               (err, data) => {
                 expect(data).toBe(true);
                 done();
                });
      });
    });

    describe('#Error on request', () => {
      let stub = null;
      const mockBody = {error: true};
      const stubbedRequestor = httpRequestor.create({request: axios, handleResponse: () => ({content: true})});

      beforeEach(() => {
        stub = jest.spyOn(axios, 'put');
        stub.mockReturnValue(Promise.reject(mockBody));
      });

      afterEach(() => {
        stub.mockRestore();
      });

      it('request should error as false', () =>
        stubbedRequestor
          .put(sampleRequest)
          .catch(error => expect(error.content).toBe(true)));

      it('request should error as false', (done) => {
        stubbedRequestor
          .put(sampleRequest,
               (err, _) => {
                 expect(err.content).toBe(true);
                 done();
                });
      });
    });

    describe('#Arguments', () => {
      let spyPut;

      beforeEach(() => {
        spyPut = jest.spyOn(axios, 'put');
      });

      afterEach(() => {
        spyPut.mockRestore();
      });

      it('headers sent as part of request should match given', () => {
        const sampleHeaders = {
          Authorization: 'Bearer TOKEN',
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': `smartsheet-javascript-sdk/${EXPECTED_VERSION}`
        };
        requestor.put(sampleRequest);
        expect(spyPut.mock.calls[0][2].headers.Authorization).toBe(sampleHeaders.Authorization);
        expect(spyPut.mock.calls[0][2].headers.Accept).toBe(sampleHeaders.Accept);
        expect(spyPut.mock.calls[0][2].headers['Content-Type']).toBe(sampleHeaders['Content-Type']);
        expect(spyPut.mock.calls[0][2].headers['User-Agent']).toBe(sampleHeaders['User-Agent']);
      });

      it('url sent to request should match given', () => {
        requestor.put(sampleRequest);
        expect(spyPut.mock.calls[0][0]).toBe('https://api.smartsheet.com/2.0/URL');
      });

      it('queryString sent to request should match given', () => {
        requestor.put(sampleRequestWithQueryParameters);
        expect(spyPut.mock.calls[0][2].params).toBe(sampleRequestWithQueryParameters.queryParameters);
      });

      it('body sent to request should match given', () => {
        requestor.put(sampleRequestWithQueryParameters);
        expect(spyPut.mock.calls[0][1]).toBe(sampleRequestWithQueryParameters.body);
      });
    });

    describe('#Retry', () => {
      let requestStub = null;
      const handleResponseStub = jest.fn();
      const stubbedRequestor = httpRequestor.create({request: axios, handleResponse: handleResponseStub});
      let sampleRequestForRetry = null;

      function givenPutReturnsError() {
        requestStub.mockReturnValue(Promise.resolve([{}, {}]));
        handleResponseStub.mockReturnValue({errorCode: 4001});
      }

      function givenPutReturnsSuccess() {
        requestStub.mockReturnValue(Promise.resolve([{}, {}]));
        handleResponseStub.mockReturnValue({content: true});
      }

      function givenEarlyExitBackoff() {
        sampleRequestForRetry.calcRetryBackoff = numRetry => numRetry == 1 ? -1 : 1;
      }

      function givenBackoffDependsOnError() {
        sampleRequestForRetry.calcRetryBackoff = (numRetry, error) => {
          if(error.errorCode == 4001) return numRetry == 1 ? -1 : 1;
          else throw new Error('Error object not provided to backoff');
        };
      }

      beforeEach(() => {
        requestStub = jest.spyOn(axios, 'put');

        sampleRequestForRetry = _.extend({}, sampleRequest);
        sampleRequestForRetry.maxRetryDurationMillis = 30;
        sampleRequestForRetry.calcRetryBackoff = function (numRetry) {return Math.pow(3, numRetry);};
      });

      afterEach(() => {
        requestStub.mockRestore();
      });

      it('put called once on success', () => {
        givenPutReturnsSuccess();
        return stubbedRequestor
          .put(sampleRequestForRetry)
          .then(_ => expect(requestStub.mock.calls.length).toBe(1));
      });

      it('put retried on error', () => {
        givenPutReturnsError();
        return stubbedRequestor
          .put(sampleRequestForRetry)
          .catch(_ => expect(requestStub.mock.calls.length).toBeGreaterThan(1));
      });

      it('put stops retrying when receiving a negative backoff', () => {
        givenPutReturnsError();
        givenEarlyExitBackoff();
        return stubbedRequestor
          .put(sampleRequestForRetry)
          .catch(_ => expect(requestStub.mock.calls.length).toBe(2));
      });

      it('put passes the causing error to the backoff function', () => {
        givenPutReturnsError();
        givenBackoffDependsOnError();
        return stubbedRequestor
          .put(sampleRequestForRetry)
          .catch(_ => expect(requestStub.mock.calls.length).toBe(2));
      });
    });
  });

  describe('#DELETE', () => {
    describe('#Successful request', () => {
      let requestStub = null;
      const stubbedRequestor = httpRequestor.create({request: axios, handleResponse: () => ({content: true})});

      beforeEach(() => {
        requestStub = jest.spyOn(axios, 'delete');
        const mockResponse = {
          statusCode: 200,
          headers: {
            'content-type':'application/json;charset=UTF-8'
          }
        };
        const mockBody = '{"hello":"world"}';
        requestStub.mockReturnValue(Promise.resolve([mockResponse, mockBody]));
      });

      afterEach(() => {
        requestStub.mockRestore();
      });

      it('request should resolve as true', () =>
        stubbedRequestor
          .delete(sampleRequest)
          .then(data => expect(data).toBe(true)));

      it('request should call callback as true', (done) => {
        stubbedRequestor
          .delete(sampleRequest,
                  (err, data) => {
                    expect(data).toBe(true);
                    done();
                  });
      });
    });

    describe('#Error on request', () => {
      let requestStub = null;
      const mockBody = {error: true};
      const stubbedRequestor = httpRequestor.create({request: axios, handleResponse: () => ({content: true})});

      beforeEach(() => {
        requestStub = jest.spyOn(axios, 'delete');
        requestStub.mockReturnValue(Promise.reject(mockBody));
      });

      afterEach(() => {
        requestStub.mockRestore();
      });

      it('request should error as false', () =>
        stubbedRequestor
          .delete(sampleRequest)
          .catch(error => expect(error.content).toBe(true)));

      it('request should error as false', (done) => {
        stubbedRequestor
          .delete(sampleRequest,
                  (err, _) => {
                    expect(err.content).toBe(true);
                    done();
                  });
      });
    });

    describe('#Arguments', () => {
      let spyPut;

      beforeEach(() => {
        spyPut = jest.spyOn(axios, 'delete');
      });

      afterEach(() => {
        spyPut.mockRestore();
      });

      it('headers sent as part of request should match given', () => {
        const sampleHeaders = {
          Authorization: 'Bearer TOKEN',
          Accept: 'application/json',
          'Content-Type': 'application/json',
          'User-Agent': `smartsheet-javascript-sdk/${EXPECTED_VERSION}`
        };
        requestor.delete(sampleRequest);
        expect(spyPut.mock.calls[0][1].headers.Authorization).toBe(sampleHeaders.Authorization);
        expect(spyPut.mock.calls[0][1].headers.Accept).toBe(sampleHeaders.Accept);
        expect(spyPut.mock.calls[0][1].headers['Content-Type']).toBe(sampleHeaders['Content-Type']);
        expect(spyPut.mock.calls[0][1].headers['User-Agent']).toBe(sampleHeaders['User-Agent']);
      });

      it('url sent to request should match given', () => {
        requestor.delete(sampleRequest);
        expect(spyPut.mock.calls[0][0]).toBe('https://api.smartsheet.com/2.0/URL');
      });

      it('queryString sent to request should match given', () => {
        requestor.delete(sampleRequestWithQueryParameters);
        expect(spyPut.mock.calls[0][1].params).toBe(sampleRequestWithQueryParameters.queryParameters);
      });
    });

    describe('#Retry', () => {
      let requestStub = null;
      const handleResponseStub = jest.fn();
      const stubbedRequestor = httpRequestor.create({request: axios, handleResponse: handleResponseStub});
      let sampleRequestForRetry;

      function givenDeleteReturnsError() {
        requestStub.mockReturnValue(Promise.resolve([{}, {}]));
        handleResponseStub.mockReturnValue({errorCode: 4001});
      }

      function givenDeleteReturnsSuccess() {
        requestStub.mockReturnValue(Promise.resolve([{}, {}]));
        handleResponseStub.mockReturnValue({content: true});
      }

      function givenEarlyExitBackoff() {
        sampleRequestForRetry.calcRetryBackoff = numRetry => numRetry == 1 ? -1 : 1;
      }

      function givenBackoffDependsOnError() {
        sampleRequestForRetry.calcRetryBackoff = (numRetry, error) => {
          if(error.errorCode == 4001) return numRetry == 1 ? -1 : 1;
          else throw new Error('Error object not provided to backoff');
        };
      }

      beforeEach(() => {
        requestStub = jest.spyOn(axios, 'delete');

        sampleRequestForRetry = _.extend({}, sampleRequest);
        sampleRequestForRetry.maxRetryDurationMillis = 30;
        sampleRequestForRetry.calcRetryBackoff = function (numRetry) {return Math.pow(3, numRetry);};
      });

      afterEach(() => {
        requestStub.mockRestore();
      });

      it('delete called once on success', () => {
        givenDeleteReturnsSuccess();
        return stubbedRequestor
          .delete(sampleRequestForRetry)
          .then(_ => expect(requestStub.mock.calls.length).toBe(1));
      });

      it('delete retried on error', () => {
        givenDeleteReturnsError();
        return stubbedRequestor
          .delete(sampleRequestForRetry)
          .catch(_ => expect(requestStub.mock.calls.length).toBeGreaterThan(1));
      });

      it('delete stops retrying when receiving a negative backoff', () => {
        givenDeleteReturnsError();
        givenEarlyExitBackoff();
        return stubbedRequestor
          .delete(sampleRequestForRetry)
          .catch(_ => expect(requestStub.mock.calls.length).toBe(2));
      });

      it('delete passes the causing error to the backoff function', () => {
        givenDeleteReturnsError();
        givenBackoffDependsOnError();
        return stubbedRequestor
          .delete(sampleRequestForRetry)
          .catch(_ => expect(requestStub.mock.calls.length).toBe(2));
      });
    });
  });
});
