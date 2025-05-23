import { AxiosRequestConfig } from 'axios';
import { Logger } from 'winston';

export enum ApiHost {
  DEFAULT = 'https://api.smartsheet.com/2.0/',
  GOV = 'https://api.smartsheetgov.com/2.0/',
  EU = 'https://api.smartsheet.eu/2.0/',
}

export const isSupportedLogLevel = (level: string): level is SupportedLogLevel => {
  return SUPPORTED_LOG_LEVELS.includes(level as SupportedLogLevel);
};

export const SUPPORTED_LOG_LEVELS = [
  'error',
  'warn',
  'info',
  'http',
  'info',
  'http',
  'verbose',
  'debug',
  'silly',
] as const;

export type SupportedLogLevel = (typeof SUPPORTED_LOG_LEVELS)[number];

export interface LoggingConfig {
  logLevel?: SupportedLogLevel;
  loggerInstance?: Logger;
}

export interface RetryConfig {
  maxRetries?: number;
}

export interface SmartsheetClientConfig {
  apiHost?: ApiHost;
  accessToken?: string;
}

export interface CreateClientOptions {
  smartsheetClientConfig?: SmartsheetClientConfig;
  retryConfig?: RetryConfig;
  loggingConfig?: LoggingConfig;
  axiosConfig?: AxiosRequestConfig;
}

export type FullClientConfig = CreateClientOptions & {
  smartsheetClientConfig: Required<SmartsheetClientConfig>;
  retryConfig: Required<RetryConfig>;
  loggingConfig: Required<LoggingConfig>;
};

export const DEFAULT_LOG_LEVEL: SupportedLogLevel = 'warn' as const;

export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxRetries: 3,
} as const;

export const DEFAULT_LOGGING_CONFIG: LoggingConfig = {
  logLevel: 'warn',
} as const;
