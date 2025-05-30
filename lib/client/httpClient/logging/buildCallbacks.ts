import type { AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';
import type { RequestLogger } from './buildInternalRequestLogger';

// Create request interceptor
export const createRequestInterceptor = (logger: RequestLogger) => {
  return (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    logger.logRequest(config);
    return config;
  };
};

// Create response interceptor
export const createResponseInterceptors = (logger: RequestLogger) => {
  return {
    onFulfilled: (response: AxiosResponse): AxiosResponse => {
      logger.logSuccessfulResponse(response);
      return response;
    },
    onRejected: (error: AxiosError): Promise<never> => {
      if (error.config) {
        logger.logErrorResponse(error.config, error);
      }
      return Promise.reject(error);
    },
  };
};

// Create retry logger
export const createRetryLogger = (logger: RequestLogger) => {
  return {
    onRetry: (retryCount: number, error: AxiosError, requestConfig: AxiosRequestConfig) => {
      logger.logRetryAttempt(requestConfig, error, retryCount);
    },
    onMaxRetries: (_error: unknown, retryCount: number) => {
      logger.logRetryFailure(retryCount);
    },
  };
};
