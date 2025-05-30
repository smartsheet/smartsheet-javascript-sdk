import winston, { format } from 'winston';
import {
  type ApiHost,
  type CreateClientOptions,
  DEFAULT_LOG_LEVEL,
  DEFAULT_RETRY_CONFIG,
  type FullClientConfig,
  type LoggingConfig,
  type RetryConfig,
  SUPPORTED_LOG_LEVELS,
  type SmartsheetClientConfig,
  isSupportedLogLevel,
} from './types/clientConfiguration';

// Derive a full set of client configuration from user provided input, environment variables, and defaults
export const buildFullCreateOptions = (options?: CreateClientOptions): FullClientConfig => {
  const smartsheetClientConfig = buildSmarClientConfig(options?.smartsheetClientConfig);
  const retryConfig = buildRetryConfig(options?.retryConfig);
  const loggingConfig = buildLoggingConfig(options?.loggingConfig);

  return {
    smartsheetClientConfig,
    retryConfig,
    loggingConfig,
    axiosConfig: options?.axiosConfig,
  };
};

const buildLoggingConfig = (loggingConfig?: LoggingConfig): Required<LoggingConfig> => {
  // Fetch or build new logging instance
  const loggerInstance =
    loggingConfig?.loggerInstance ??
    winston.createLogger({
      level: loggingConfig?.logLevel || DEFAULT_LOG_LEVEL,
      format: format.combine(format.timestamp(), format.json()),
      transports: [new winston.transports.Console()],
    });

  // extract the log level and validate it is supported
  const logLevel = loggerInstance.level;

  if (!isSupportedLogLevel(logLevel)) {
    return throwRequiredConfigMissingError(
      'loggerInstance.logLevel',
      `Log level '${logLevel}' is not supported, please set logging level to one of [${SUPPORTED_LOG_LEVELS.join(', ')}]`
    );
  }

  return {
    loggerInstance,
    logLevel: logLevel,
  };
};

const buildRetryConfig = (retryConfig?: RetryConfig): Required<RetryConfig> => {
  return {
    maxRetries: retryConfig?.maxRetries || DEFAULT_RETRY_CONFIG.maxRetries,
  };
};

const buildSmarClientConfig = (smarConfig?: SmartsheetClientConfig): Required<SmartsheetClientConfig> => {
  const apiHost = smarConfig?.apiHost || (process.env.SMARTSHEET_API_HOST as ApiHost) || ApiHost.DEFAULT;
  const accessToken = smarConfig?.accessToken || process.env.SMARTSHEET_ACCESS_TOKEN;

  if (!accessToken) {
    return throwRequiredConfigMissingError(
      'accessToken',
      'Please provide a value within smartsheetClientConfig or set SMARTSHEET_ACCESS_TOKEN env variable'
    );
  }

  return { apiHost, accessToken };
};

const throwRequiredConfigMissingError = (field: string, message: string) => {
  throw new Error(`Required config missing ${field}. ` + message);
};
