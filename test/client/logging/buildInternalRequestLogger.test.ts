import * as sinon from 'sinon';
import 'should';
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Logger } from 'winston';
import { createInternalRequestLogger } from '../../../lib/client/httpClient/logging/buildInternalRequestLogger';
import { SmartsheetErrorResponseData } from '../../../lib/client/types/ServerResponses';
import * as logSanitizer from '../../../lib/client/httpClient/logging/logSanitizer';

describe('buildInternalRequestLogger', function() {
  let loggerMock: Logger;
  let getSanitizedUrlForLogsStub: sinon.SinonStub;
  let withRedactedPayloadStub: sinon.SinonStub;
  let withRedactedHeadersStub: sinon.SinonStub;
  
  
  const createLoggerMock = () => {
    return {
      log: sinon.stub(),
      info: sinon.stub(),
      warn: sinon.stub(),
      error: sinon.stub(),
      verbose: sinon.stub(),
      debug: sinon.stub(),
      silly: sinon.stub()
    } as unknown as Logger;
  };
  
  beforeEach(function() {
    // Setup logger mock
    loggerMock = createLoggerMock();
    
    // Setup logSanitizer stubs
    getSanitizedUrlForLogsStub = sinon.stub(logSanitizer, 'getSanitizedUrlForLogs').returns('https://api.example.com/resource');
    withRedactedPayloadStub = sinon.stub(logSanitizer, 'withRedactedPayload').callsFake(payload => payload);
    withRedactedHeadersStub = sinon.stub(logSanitizer, 'withRedactedHeaders').callsFake(headers => headers);
  });
  
  afterEach(function() {
    sinon.restore();
  });
  
  describe('logRequest', function() {
    it('should log request basics, headers, and payload', function() {
      // Arrange
      const requestLogger = createInternalRequestLogger(loggerMock);
      const requestConfig: AxiosRequestConfig = {
        method: 'GET',
        url: 'https://api.example.com/resource',
        headers: { 'Content-Type': 'application/json' },
        data: { key: 'value' }
      };
      
      // Act
      requestLogger.logRequest(requestConfig);
      
      // Assert
      (loggerMock.log as sinon.SinonStub).calledWith('info', sinon.match.object).should.be.true();
      (loggerMock.silly as sinon.SinonStub).calledOnce.should.be.true();
      (loggerMock.verbose as sinon.SinonStub).calledOnce.should.be.true();
      (loggerMock.debug as sinon.SinonStub).calledOnce.should.be.true();
      getSanitizedUrlForLogsStub.calledWith(requestConfig).should.be.true();
      withRedactedPayloadStub.calledWith(requestConfig.data).should.be.true();
      withRedactedHeadersStub.calledWith(requestConfig.headers).should.be.true();
    });
  });
  
  describe('logRetryAttempt', function() {
    it('should log retry attempt with warning level', function() {
      // Arrange
      const requestLogger = createInternalRequestLogger(loggerMock);
      const requestConfig: AxiosRequestConfig = {
        method: 'GET',
        url: 'https://api.example.com/resource'
      };
      const error: AxiosError = {} as AxiosError;
      const attemptNum = 2;
      
      // Act
      requestLogger.logRetryAttempt(requestConfig, error, attemptNum);
      
      // Assert
      (loggerMock.warn as sinon.SinonStub).calledWith('Request failed, performing retry', {attemptNum, error}).should.be.true();
      (loggerMock.log as sinon.SinonStub).calledWith('warn', sinon.match.object).should.be.true();
    });
  });
  
  describe('logRetryFailure', function() {
    it('should log retry failure with error level', function() {
      // Arrange
      const requestLogger = createInternalRequestLogger(loggerMock);
      const attemptNum = 3;
      
      // Act
      requestLogger.logRetryFailure(attemptNum);
      
      // Assert
      (loggerMock.error as sinon.SinonStub).calledWith('Request failed after %d retries', attemptNum).should.be.true();
    });
  });
  
  describe('logSuccessfulResponse', function() {
    it('should log successful response with info level', function() {
      // Arrange
      const requestLogger = createInternalRequestLogger(loggerMock);
      const response: AxiosResponse = {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        data: { result: 'success' },
        statusText: 'OK',
        config: {} as any
      };
      
      // Act
      requestLogger.logSuccessfulResponse(response);
      
      // Assert
      (loggerMock.info as sinon.SinonStub).calledWith('Response: Success', sinon.match.object).should.be.true();
      (loggerMock.silly as sinon.SinonStub).calledOnce.should.be.true();
      withRedactedHeadersStub.calledWith(response.headers).should.be.true();
      withRedactedPayloadStub.calledWith(response.data).should.be.true();
    });
    
    it('should not log payload if it is undefined', function() {
      // Arrange
      const requestLogger = createInternalRequestLogger(loggerMock);
      const response: AxiosResponse = {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        data: undefined,
        statusText: 'OK',
        config: {} as any
      };
      
      // Act
      requestLogger.logSuccessfulResponse(response);
      
      // Assert
      (loggerMock.verbose as sinon.SinonStub).called.should.be.false();
      (loggerMock.debug as sinon.SinonStub).called.should.be.false();
    });
  });
  
  describe('logErrorResponse', function() {
    it('should log error response with error level', function() {
      // Arrange
      const requestLogger = createInternalRequestLogger(loggerMock);
      const requestConfig: AxiosRequestConfig = {
        method: 'GET',
        url: 'https://api.example.com/resource'
      };
      const error: AxiosError<SmartsheetErrorResponseData> = {
        response: {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
          data: {
            errorCode: 1001,
            message: 'Bad request',
            refId: 'ref-123'
          },
          statusText: 'Bad Request',
          config: {} as any
        }
      } as AxiosError<SmartsheetErrorResponseData>;
      
      // Act
      requestLogger.logErrorResponse(requestConfig, error);
      
      // Assert
      (loggerMock.log as sinon.SinonStub).calledWith('error', sinon.match.object).should.be.true();
      (loggerMock.error as sinon.SinonStub).calledWith('Response: Failure', sinon.match.object).should.be.true();
      (loggerMock.silly as sinon.SinonStub).calledOnce.should.be.true();
    });
    
    it('should handle missing response data', function() {
      // Arrange
      const requestLogger = createInternalRequestLogger(loggerMock);
      const requestConfig: AxiosRequestConfig = {
        method: 'GET',
        url: 'https://api.example.com/resource'
      };
      const error: AxiosError = {
        message: 'Network error'
      } as AxiosError;
      
      // Act
      requestLogger.logErrorResponse(requestConfig, error);
      
      // Assert
      (loggerMock.error as sinon.SinonStub).calledWith('Response: Failure', sinon.match({
        statusCode: 'unknown',
        errorCode: 'unknown',
        message: 'Network error',
        refId: 'unknown'
      })).should.be.true();
    });
  });
});
