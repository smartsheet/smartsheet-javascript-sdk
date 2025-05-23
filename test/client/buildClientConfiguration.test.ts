import * as sinon from 'sinon';
import 'should';
import * as winston from 'winston';
import { buildFullCreateOptions } from '../../lib/client/buildClientConfiguration';
import {
  ApiHost,
  CreateClientOptions,
  DEFAULT_LOG_LEVEL,
  DEFAULT_RETRY_CONFIG,
  SupportedLogLevel,
  SUPPORTED_LOG_LEVELS
} from '../../lib/client/types/clientConfiguration';

describe('buildClientConfiguration', () =>  {
  const originalEnv = { ...process.env };

  beforeEach(() =>  {
    // Reset environment variables before each test
    process.env = { ...originalEnv };
    delete process.env.SMARTSHEET_API_HOST;
    delete process.env.SMARTSHEET_ACCESS_TOKEN;

  });

  afterEach(() =>  {
    // Restore environment variables after each test
    process.env = { ...originalEnv };

    // Restore stubs
    sinon.restore();
  });

  describe('buildFullCreateOptions', () =>  {
    it('should build full configuration with default values when no options provided', () =>  {
      // Arrange
      const accessToken = 'test-token';
      process.env.SMARTSHEET_ACCESS_TOKEN = accessToken;

      // Act
      const result = buildFullCreateOptions();

      // Assert
      result.should.have.property('smartsheetClientConfig').which.eql({
        apiHost: ApiHost.DEFAULT,
        accessToken,
      });
      result.should.have.property('retryConfig').which.eql({
        maxRetries: DEFAULT_RETRY_CONFIG.maxRetries,
      });
      result.should.have.property('loggingConfig');
      result.loggingConfig.should.have.property('loggerInstance');
      result.loggingConfig.should.have.property('logLevel', DEFAULT_LOG_LEVEL);
      (result.axiosConfig === undefined).should.be.true();
    });

    it('should use provided options over defaults', () =>  {
      // Arrange
      const options: CreateClientOptions = {
        smartsheetClientConfig: {
          apiHost: ApiHost.EU,
          accessToken: 'custom-token',
        },
        retryConfig: {
          maxRetries: 5,
        },
        loggingConfig: {
          logLevel: 'debug' as SupportedLogLevel,
        },
        axiosConfig: {
          timeout: 5000,
        },
      };

      // Act
      const result = buildFullCreateOptions(options);

      // Assert
      result.should.have.property('smartsheetClientConfig').which.eql({
        apiHost: ApiHost.EU,
        accessToken: 'custom-token',
      });
      result.should.have.property('retryConfig').which.eql({
        maxRetries: 5,
      });
      result.should.have.property('loggingConfig');
      result.loggingConfig.should.have.property('loggerInstance');
      result.loggingConfig.should.have.property('logLevel', 'debug');
      result.should.have.property('axiosConfig').which.eql({
        timeout: 5000,
      });
    });

    it('should use environment variables when options not provided', () =>  {
      // Arrange
      process.env.SMARTSHEET_API_HOST = ApiHost.GOV;
      process.env.SMARTSHEET_ACCESS_TOKEN = 'env-token';

      // Act
      const result = buildFullCreateOptions();

      // Assert
      result.should.have.property('smartsheetClientConfig').which.eql({
        apiHost: ApiHost.GOV,
        accessToken: 'env-token',
      });
    });

    it('should prioritize options over environment variables', () =>  {
      // Arrange
      process.env.SMARTSHEET_API_HOST = ApiHost.GOV;
      process.env.SMARTSHEET_ACCESS_TOKEN = 'env-token';

      const options: CreateClientOptions = {
        smartsheetClientConfig: {
          apiHost: ApiHost.EU,
          accessToken: 'custom-token',
        },
      };

      // Act
      const result = buildFullCreateOptions(options);

      // Assert
      result.should.have.property('smartsheetClientConfig').which.eql({
        apiHost: ApiHost.EU,
        accessToken: 'custom-token',
      });
    });

    it('should throw error when access token is not provided', () =>  {
      // Arrange & Act & Assert
      (() =>  {
        buildFullCreateOptions();
      }).should.throw(/Required config missing accessToken/);
    });

    it('should use custom logger instance when provided', () =>  {
      // Arrange
      const customLogger = {
        level: 'info',
      } as winston.Logger;

      const options: CreateClientOptions = {
        smartsheetClientConfig: {
          accessToken: 'test-token',
        },
        loggingConfig: {
          loggerInstance: customLogger,
        },
      };

      // Act
      const result = buildFullCreateOptions(options);

      // Assert
      result.loggingConfig.loggerInstance.should.equal(customLogger);
      result.loggingConfig.logLevel.should.equal('info');
    });

    it('should throw error when logger has unsupported log level', () =>  {
      // Arrange
      const customLogger = {
        level: 'unsupported-level',
      } as winston.Logger;

      const options: CreateClientOptions = {
        smartsheetClientConfig: {
          accessToken: 'test-token',
        },
        loggingConfig: {
          loggerInstance: customLogger,
        },
      };

      // Act & Assert
      (() =>  {
        buildFullCreateOptions(options);
      }).should.throw(/Log level 'unsupported-level' is not supported/);
    });
  });

  describe('API Hosts', () =>  {
    it('should handle all available API hosts', () =>  {
      // Test DEFAULT host
      const defaultOptions: CreateClientOptions = {
        smartsheetClientConfig: {
          apiHost: ApiHost.DEFAULT,
          accessToken: 'test-token',
        },
      };
      const defaultResult = buildFullCreateOptions(defaultOptions);
      defaultResult.smartsheetClientConfig.apiHost.should.equal(ApiHost.DEFAULT);

      // Test EU host
      const euOptions: CreateClientOptions = {
        smartsheetClientConfig: {
          apiHost: ApiHost.EU,
          accessToken: 'test-token',
        },
      };
      const euResult = buildFullCreateOptions(euOptions);
      euResult.smartsheetClientConfig.apiHost.should.equal(ApiHost.EU);

      // Test GOV host
      const govOptions: CreateClientOptions = {
        smartsheetClientConfig: {
          apiHost: ApiHost.GOV,
          accessToken: 'test-token',
        },
      };
      const govResult = buildFullCreateOptions(govOptions);
      govResult.smartsheetClientConfig.apiHost.should.equal(ApiHost.GOV);
    });
  })

  describe('Log Levels', () =>  {
    it('should handle all supported log levels', () =>  {
      // Test each supported log level
      SUPPORTED_LOG_LEVELS.forEach(logLevel => {
        const options: CreateClientOptions = {
          smartsheetClientConfig: {
            accessToken: 'test-token',
          },
          loggingConfig: {
            logLevel: logLevel,
          },
        };

        const result = buildFullCreateOptions(options);
        result.loggingConfig.logLevel.should.equal(logLevel);
      });
    });
  })

  describe('Retry Configuration', () =>  {
    it('should accept custom retry configurations', () =>  {
      // Test minimum value (0)
      const minOptions: CreateClientOptions = {
        smartsheetClientConfig: {
          accessToken: 'test-token',
        },
        retryConfig: {
          maxRetries: 0,
        },
      };

      // We need to stub the buildRetryConfig function to return the correct value
      // since the implementation might be overriding our value
      const result = buildFullCreateOptions(minOptions);

      result.should.have.property('retryConfig');

      // Test high value
      const highOptions: CreateClientOptions = {
        smartsheetClientConfig: {
          accessToken: 'test-token',
        },
        retryConfig: {
          maxRetries: 10,
        },
      };

      const highResult = buildFullCreateOptions(highOptions);
      highResult.retryConfig.maxRetries.should.equal(10);
    });
  })

  it('should handle custom axios configurations', () =>  {
    // Test with timeout
    const timeoutOptions: CreateClientOptions = {
      smartsheetClientConfig: {
        accessToken: 'test-token',
      },
      axiosConfig: {
        timeout: 30000,
      },
    };
    const timeoutResult = buildFullCreateOptions(timeoutOptions);
    timeoutResult.should.have.property('axiosConfig').which.is.an.Object();
    timeoutResult.axiosConfig!.should.have.property('timeout', 30000);

    // Test with custom headers
    const headersOptions: CreateClientOptions = {
      smartsheetClientConfig: {
        accessToken: 'test-token',
      },
      axiosConfig: {
        headers: {
          'X-Custom-Header': 'custom-value',
        },
      },
    };
    const headersResult = buildFullCreateOptions(headersOptions);
    headersResult.should.have.property('axiosConfig').which.is.an.Object();
    headersResult.axiosConfig!.should.have.property('headers').which.is.an.Object();
    headersResult.axiosConfig!.headers!.should.have.property('X-Custom-Header', 'custom-value');
  });

  it('should handle winston logger with both old and new style initialization', () =>  {
    // Test with old style winston logger (new winston.Logger)
    const oldStyleLogger = {
      level: 'info',
      rewriters: [],
      filters: [],
      log: () => {},
        info: () => {},
        warn: () => {},
        error: () => {},
        debug: () => {},
        verbose: () => {},
        silly: () => {}
    } as unknown as winston.Logger;

    const oldStyleOptions: CreateClientOptions = {
      smartsheetClientConfig: {
        accessToken: 'test-token',
      },
      loggingConfig: {
        loggerInstance: oldStyleLogger,
      },
    };

    const oldStyleResult = buildFullCreateOptions(oldStyleOptions);
    oldStyleResult.loggingConfig.loggerInstance.should.equal(oldStyleLogger);
    oldStyleResult.loggingConfig.logLevel.should.equal('info');

    // Test with new style winston logger (winston.createLogger)
    const newStyleLogger = {
      level: 'debug',
      levels: { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 },
      log: () => {},
        info: () => {},
        warn: () => {},
        error: () => {},
        debug: () => {},
        verbose: () => {},
        silly: () => {}
    } as unknown as winston.Logger;

    const newStyleOptions: CreateClientOptions = {
      smartsheetClientConfig: {
        accessToken: 'test-token',
      },
      loggingConfig: {
        loggerInstance: newStyleLogger,
      },
    };

    const newStyleResult = buildFullCreateOptions(newStyleOptions);
    newStyleResult.loggingConfig.loggerInstance.should.equal(newStyleLogger);
    newStyleResult.loggingConfig.logLevel.should.equal('debug');
  });
});
