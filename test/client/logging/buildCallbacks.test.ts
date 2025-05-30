import * as sinon from 'sinon';
import 'should';
import { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { createRequestInterceptor, createResponseInterceptors, createRetryLogger } from '../../../lib/client/httpClient/logging/buildCallbacks';
import { RequestLogger } from '../../../lib/client/httpClient/logging/buildInternalRequestLogger';

describe('buildCallbacks', function() {
  let loggerMock: RequestLogger;
  
  beforeEach(function() {
    // Setup mock logger
    loggerMock = {
      logRequest: sinon.stub(),
      logRetryAttempt: sinon.stub(),
      logRetryFailure: sinon.stub(),
      logSuccessfulResponse: sinon.stub(),
      logErrorResponse: sinon.stub()
    };
  });
  
  afterEach(function() {
    sinon.restore();
  });
  
  describe('createRequestInterceptor', function() {
    it('should return a function that logs requests and returns the config', function() {
      // Arrange
      const requestInterceptor = createRequestInterceptor(loggerMock);
      const config = { headers: {} } as InternalAxiosRequestConfig;
      
      // Act
      const result = requestInterceptor(config);
      
      // Assert
      (loggerMock.logRequest as sinon.SinonStub).calledOnceWith(config).should.be.true();
      result.should.equal(config);
    });
  });
  
  describe('createResponseInterceptors', function() {
    it('onFulfilled should log successful responses and return the response', function() {
      // Arrange
      const responseInterceptors = createResponseInterceptors(loggerMock);
      const response: AxiosResponse = {} as AxiosResponse;
      
      // Act
      const result = responseInterceptors.onFulfilled(response);
      
      // Assert
      (loggerMock.logSuccessfulResponse as sinon.SinonStub).calledOnceWith(response).should.be.true();
      result.should.equal(response);
    });
    
    it('onRejected should log error responses and reject with the error', async function() {
      // Arrange
      const responseInterceptors = createResponseInterceptors(loggerMock);
      const config: InternalAxiosRequestConfig = { headers: {} } as InternalAxiosRequestConfig;
      const error: AxiosError = { 
        config,
        message: 'Test error'
      } as AxiosError;
      
      // Act & Assert
      try {
        await responseInterceptors.onRejected(error);
        // Should not reach here
        false.should.be.true('Promise should have been rejected');
      } catch (e) {
        // Assert
        (loggerMock.logErrorResponse as sinon.SinonStub).calledOnceWith(config, error).should.be.true();
        e.should.equal(error);
      }
    });
    
    it('onRejected should not log error if config is missing', async function() {
      // Arrange
      const responseInterceptors = createResponseInterceptors(loggerMock);
      const error: AxiosError = { 
        message: 'Test error'
      } as AxiosError;
      
      // Act & Assert
      try {
        await responseInterceptors.onRejected(error);
        // Should not reach here
        false.should.be.true('Promise should have been rejected');
      } catch (e) {
        // Assert
        (loggerMock.logErrorResponse as sinon.SinonStub).called.should.be.false();
        e.should.equal(error);
      }
    });
  });
  
  describe('createRetryLogger', function() {
    it('onRetry should log retry attempts', function() {
      // Arrange
      const retryLogger = createRetryLogger(loggerMock);
      const retryCount = 2;
      const error: AxiosError = {} as AxiosError;
      const requestConfig = {};
      
      // Act
      retryLogger.onRetry(retryCount, error, requestConfig);
      
      // Assert
      (loggerMock.logRetryAttempt as sinon.SinonStub).calledOnceWith(requestConfig, error, retryCount).should.be.true();
    });
    
    it('onMaxRetries should log retry failures', function() {
      // Arrange
      const retryLogger = createRetryLogger(loggerMock);
      const retryCount = 3;
      const error = {};
      
      // Act
      retryLogger.onMaxRetries(error, retryCount);
      
      // Assert
      (loggerMock.logRetryFailure as sinon.SinonStub).calledOnceWith(retryCount).should.be.true();
    });
  });
});
