import * as sinon from 'sinon';
import 'should';
import * as winston from 'winston';
import axios, { AxiosError } from 'axios';
import axiosRetry from 'axios-retry';
import { buildHttpClient, shouldRetry } from '../../lib/client/httpClient/buildHttpClient';
import { ApiHost, CreateClientOptions, FullClientConfig } from '../../lib/client/types/clientConfiguration';
import { SmartsheetErrorResponseData, errorCodes } from '../../lib/client/types/ServerResponses';

describe('buildHttpRequestor', function() {
  let axiosCreateStub: sinon.SinonStub;
  let axiosClientStub: any;
  let loggerStub: any;
  let sandbox: sinon.SinonSandbox;
  
  beforeEach(function() {
    // Create a sandbox
    sandbox = sinon.createSandbox();
    
    // Setup stubs
    axiosClientStub = {
      interceptors: {
        request: { use: sandbox.stub() },
        response: { use: sandbox.stub() }
      }
    };
    
    axiosCreateStub = sandbox.stub(axios, 'create').returns(axiosClientStub);
    loggerStub = {
      level: 'warn',
      log: sinon.stub()
    };
  });
  
  afterEach(function() {
    sandbox.restore();
  });
  
  describe('buildHttpClient', function() {
    it('should create an axios instance with the correct configuration', function() {
      // Arrange
      const fullConfig: FullClientConfig = {
        smartsheetClientConfig: {
          apiHost: ApiHost.DEFAULT,
          accessToken: 'test-token'
        },
        retryConfig: {
          maxRetries: 3
        },
        loggingConfig: {
          loggerInstance: loggerStub as winston.Logger,
          logLevel: 'warn'
        },
        axiosConfig: {
          timeout: 5000
        }
      };
      
      // Act
      buildHttpClient(fullConfig);
      
      // Assert
      axiosCreateStub.calledOnce.should.be.true();
      axiosCreateStub.firstCall.args[0].should.have.property('baseURL', fullConfig.smartsheetClientConfig.apiHost);
      axiosCreateStub.firstCall.args[0].should.have.property('timeout', 5000);
      axiosCreateStub.firstCall.args[0].should.have.property('headers');
      axiosCreateStub.firstCall.args[0].headers.should.have.property('Authorization', 'Bearer test-token');
    });

    it("should build a client from minimum config", () => {
      const minimumConfig: FullClientConfig = {
        retryConfig: {
          maxRetries: 3
        },
        loggingConfig: {
          loggerInstance: loggerStub as winston.Logger,
          logLevel: 'warn'
        },
        smartsheetClientConfig: {
          apiHost: ApiHost.DEFAULT,
          accessToken: 'test-token'
        },
      }

      buildHttpClient(minimumConfig);
    })
    
    it('should merge custom headers with default headers', function() {
      // Arrange
      const fullConfig: FullClientConfig = {
        smartsheetClientConfig: {
          apiHost: ApiHost.DEFAULT,
          accessToken: 'test-token'
        },
        retryConfig: {
          maxRetries: 3
        },
        loggingConfig: {
          loggerInstance: loggerStub as winston.Logger,
          logLevel: 'warn'
        },
        axiosConfig: {
          headers: {
            'Custom-Header': 'custom-value'
          }
        }
      };
      
      // Act
      buildHttpClient(fullConfig);
      
      // Assert
      axiosCreateStub.firstCall.args[0].headers.should.have.property('Custom-Header', 'custom-value');
      axiosCreateStub.firstCall.args[0].headers.should.have.property('Authorization', 'Bearer test-token');
    });
  });
  
  describe('shouldRetry', function() {
    it('should return true for rate limit errors', function() {
      // Arrange
      const error = {
        response: {
          data: {
            errorCode: errorCodes.RATE_LIMIT
          }
        }
      } as AxiosError<SmartsheetErrorResponseData>;
      
      // Act
      const result = shouldRetry(error);
      
      // Assert
      result.should.be.true();
    });
    
    it('should return true for gateway timeout errors', function() {
      // Arrange
      const error = {
        response: {
          data: {
            errorCode: errorCodes.GATEWAY_TIMEOUT
          }
        }
      } as AxiosError<SmartsheetErrorResponseData>;
      
      // Act
      const result = shouldRetry(error);
      
      // Assert
      result.should.be.true();
    });
    
    it('should return true for internal server errors', function() {
      // Arrange
      const error = {
        response: {
          data: {
            errorCode: errorCodes.INTERNAL_SERVER_ERROR
          }
        }
      } as AxiosError<SmartsheetErrorResponseData>;
      
      // Act
      const result = shouldRetry(error);
      
      // Assert
      result.should.be.true();
    });
    
    it('should return true for service unavailable errors', function() {
      // Arrange
      const error = {
        response: {
          data: {
            errorCode: errorCodes.SERVICE_UNAVAILABLE
          }
        }
      } as AxiosError<SmartsheetErrorResponseData>;
      
      // Act
      const result = shouldRetry(error);
      
      // Assert
      result.should.be.true();
    });
    
    it('should return false for other error codes', function() {
      // Arrange
      const error = {
        response: {
          data: {
            errorCode: 1000 // Some other error code
          }
        }
      } as AxiosError<SmartsheetErrorResponseData>;
      
      // Act & Assert
      // We need to stub the default axios-retry condition to return false
      sinon.stub(axiosRetry, 'isNetworkOrIdempotentRequestError').returns(false);
      
      const result = shouldRetry(error);
      result.should.be.false();
    });
  });
});
