import { create, AxiosError, AxiosInstance } from 'axios';
import { FullClientConfig } from '../types/clientConfiguration';
import axiosRetry from 'axios-retry';
import { SmartsheetErrorResponseData, errorCodes } from '../types/ServerResponses';
import { version } from '../../../package.json';
import { createRequestInterceptor, createResponseInterceptors, createRetryLogger } from './logging/buildCallbacks';
import { createInternalRequestLogger, RequestLogger } from './logging/buildInternalRequestLogger';

export const buildHttpClient = (fullConfiguration: FullClientConfig): AxiosInstance => {
  const axiosClient = create({
    baseURL: fullConfiguration.smartsheetClientConfig.apiHost,
    ...fullConfiguration.axiosConfig,
    headers: buildHeaders(fullConfiguration),
  });

  const loggingCallbacks = getInternalLogCallbacks(
    createInternalRequestLogger(fullConfiguration.loggingConfig.loggerInstance)
  );

  configureLoggingInterceptors(axiosClient, loggingCallbacks);
  configureRetry(axiosClient, fullConfiguration, loggingCallbacks);

  return axiosClient;
};

const buildHeaders = (fullConfiguration: FullClientConfig) => {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...(fullConfiguration.axiosConfig.headers || {}),
    // non-overridable values for userAgent and authorization
    'User-Agent': `smartsheet-javascript-sdk/${version}`,
    Authorization: `Bearer ${fullConfiguration.smartsheetClientConfig.accessToken}`,
  };
};

const configureRetry = (
  axiosClient: AxiosInstance,
  fullConfiguration: FullClientConfig,
  logCallbacks: LoggingCallbacks
) => {
  axiosRetry(axiosClient, {
    retries: fullConfiguration.retryConfig.maxRetries,
    retryDelay: axiosRetry.exponentialDelay,
    retryCondition: shouldRetry,
    onRetry: logCallbacks.retry.onRetry,
    onMaxRetryTimesExceeded: logCallbacks.retry.onMaxRetries,
  });
};

const configureLoggingInterceptors = (axiosClient: AxiosInstance, loggingCallbacks: LoggingCallbacks) => {
  axiosClient.interceptors.request.use(loggingCallbacks.requestInterceptors);
  axiosClient.interceptors.response.use(
    loggingCallbacks.responseInterceptors.onFulfilled,
    loggingCallbacks.responseInterceptors.onRejected
  );
};

type LoggingCallbacks = ReturnType<typeof getInternalLogCallbacks>;
const getInternalLogCallbacks = (internalLogWrapper: RequestLogger) => {
  return {
    requestInterceptors: createRequestInterceptor(internalLogWrapper),
    responseInterceptors: createResponseInterceptors(internalLogWrapper),
    retry: createRetryLogger(internalLogWrapper),
  };
};

/**
 * Determines if a request should be retried based on the error
 * @param error - The error that occurred
 * @returns True if the request should be retried, false otherwise
 */
export const shouldRetry = (error: AxiosError<SmartsheetErrorResponseData>): boolean => {
  // If we have a response with an error code, check if it's retryable
  const responseData = error.response?.data;

  if (responseData?.errorCode) {
    const errorCode = responseData.errorCode;
    return (
      errorCode === errorCodes.RATE_LIMIT ||
      errorCode === errorCodes.GATEWAY_TIMEOUT ||
      errorCode === errorCodes.INTERNAL_SERVER_ERROR ||
      errorCode === errorCodes.SERVICE_UNAVAILABLE
    );
  }

  // Default to axios-retry's default retry condition
  return axiosRetry.isNetworkOrIdempotentRequestError(error);
};
