import { AxiosError, AxiosHeaderValue, AxiosRequestConfig, AxiosResponse } from 'axios';
import { Logger } from 'winston';
import { SmartsheetErrorResponseData } from '../../types/ServerResponses';
import { SupportedLogLevel } from '../../types/clientConfiguration';
import { getSanitizedUrlForLogs, withRedactedPayload, withRedactedHeaders } from './logSanitizer';

// Define RequestLogger interface
export interface RequestLogger {
  logRequest: (requestConfig: AxiosRequestConfig) => void;
  logRetryAttempt: (requestConfig: AxiosRequestConfig, error: AxiosError, attemptNum: number) => void;
  logRetryFailure: (attemptNum: number) => void;
  logSuccessfulResponse: (response: AxiosResponse) => void;
  logErrorResponse: (requestConfig: AxiosRequestConfig, error: AxiosError, attemptNum?: number) => void;
}

const getHttpVerb = (requestConfig: AxiosRequestConfig): string => {
  return requestConfig.method || 'UNKNOWN';
};

export const createInternalRequestLogger = (logger: Logger): RequestLogger => {
  const PAYLOAD_PREVIEW_LENGTH = 1024;

  const logRequestBasics = (level: SupportedLogLevel, requestConfig: AxiosRequestConfig): void => {
    const httpAction = getHttpVerb(requestConfig);
    const url = getSanitizedUrlForLogs(requestConfig);

    logger.log(level, { httpAction, url });
  };

  const logRequest = (requestConfig: AxiosRequestConfig): void => {
    logRequestBasics('info', requestConfig);
    logHeaders('Request', requestConfig.headers);
    logPreviewAndFullPayload('Request', withRedactedPayload(requestConfig.data));
  };

  const logRetryAttempt = (requestConfig: AxiosRequestConfig, error: AxiosError, attemptNum: number): void => {
    logger.warn('Request failed, performing retry', { attemptNum, error });
    logRequestBasics('warn', requestConfig);
  };

  const logRetryFailure = (attemptNum: number): void => {
    logger.error('Request failed after %d retries', attemptNum);
  };

  const logSuccessfulResponse = (response: AxiosResponse): void => {
    logger.info('Response: Success', { status: response.status });
    logHeaders('Response', response.headers);
    logResponsePayload(response);
  };

  const logErrorResponse = (requestConfig: AxiosRequestConfig, error: AxiosError): void => {
    logRequestBasics('error', requestConfig);

    const statusCode = error.response?.status || 'unknown';

    // Extract error information with proper type checking
    const errorData = error.response?.data as SmartsheetErrorResponseData;
    const errorCode = errorData?.errorCode || 'unknown';
    const message = errorData?.message || error.message || 'Unknown error';
    const refId = errorData?.refId || 'unknown';

    logger.error('Response: Failure', { statusCode, errorCode, message, refId });

    if (error.response) {
      logHeaders('Response', error.response.headers);
    }
  };

  const logHeaders = (context: string, headers: Record<string, AxiosHeaderValue | undefined>): void => {
    if (!headers || Object.keys(headers).length === 0) return;

    logger.silly({ context, headers: withRedactedHeaders(headers) });
  };

  const logResponsePayload = (response: AxiosResponse): void => {
    const payload = response.data;
    if (payload === undefined || payload === null) return;

    const censoredPayload = withRedactedPayload(payload);

    logPreviewAndFullPayload('Response', censoredPayload);
  };

  const logPreviewAndFullPayload = (context: string, censoredPayload: Record<string, unknown>): void => {
    let preview: string;
    try {
      preview = JSON.stringify(censoredPayload);
    } catch (_error: unknown) {
      preview = String(censoredPayload);
    }

    if (preview.length > PAYLOAD_PREVIEW_LENGTH) {
      preview = preview.substring(0, PAYLOAD_PREVIEW_LENGTH) + '...';
    }

    logger.verbose(`${context} Payload (preview)`, { preview });
    logger.debug(`${context} Payload (full)`, { censoredPayload });
  };

  // Generated object
  return {
    logRequest,
    logRetryAttempt,
    logRetryFailure,
    logSuccessfulResponse,
    logErrorResponse,
  };
};
