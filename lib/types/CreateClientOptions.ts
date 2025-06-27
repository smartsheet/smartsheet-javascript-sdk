import type { LoggerInstance } from 'winston';

export interface CreateClientOptions {
  accessToken?: string;
  userAgent?: string;
  baseUrl?: string;
  requestor?: any; // Custom HTTP client that will be used. TODO -> Evaluate if we want to keep this.
  maxRetryDurationSeconds?: number;
  calcRetryBackoff?: (retryCount: number, error?: any) => number;
  logger?: LoggerInstance;
  logLevel?: 'error' | 'warn' | 'info' | 'http' | 'info' | 'verbose' | 'debug' | 'silly';
  loggerContainer?: any;
}
