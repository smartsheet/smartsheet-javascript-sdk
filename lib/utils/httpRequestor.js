import _ from 'underscore';
import * as constants from './constants';
import * as requestLogger from './requestLogger';
import * as fs from 'fs';
import mime from 'mime';
import axios from 'axios';
import responseHandler from './responseHandler';
import packageJson from '../../package.json';

export function create(requestorConfig) {
  const logger = requestorConfig.logger ? requestLogger.create(requestorConfig.logger) : requestLogger.empty;

  const request = requestorConfig.request || axios;

  const handleResponse = requestorConfig.handleResponse || responseHandler;

  const defaultCalcBackoff = (numRetries) => (Math.pow(2, numRetries) + Math.random()) * 1000;
  const defaultRetryOptions = {
    maxRetryDurationMillis: requestorConfig.maxRetryDurationMillis || constants.maxRetryDurationMillis,
    calcRetryBackoff: requestorConfig.calcRetryBackoff || defaultCalcBackoff,
  };

  const getFileSizeFromPath = (path) => {
    const stats = fs.statSync(path);

    return stats.size;
  };

  const buildHeaders = (options) => {
    const headers = {
      Accept: options.accept || 'application/json',
      'Content-Type': options.contentType || mime.getType(options.fileName) || 'application/json',
      'User-Agent': `smartsheet-javascript-sdk/${packageJson.version}`,
    };

    if (options.userAgent) {
      headers['User-Agent'] += `/${options.userAgent}`;
    }

    if (options.accessToken) {
      headers.Authorization = 'Bearer ' + options.accessToken;
    }
    if (options.assumeUser) {
      headers['Assume-User'] = encodeURIComponent(options.assumeUser);
    }
    if (options.fileName) {
      headers['Content-Disposition'] = `attachment; filename="${options.fileName}"`;
    }
    if (options.contentDisposition) {
      headers['Content-Disposition'] = options.contentDisposition;
    }

    if (options.path) {
      headers['Content-Length'] = getFileSizeFromPath(options.path);
    } else if (options.fileSize) {
      headers['Content-Length'] = options.fileSize;
    }
    if (options.apiScenario) {
      headers['Api-Scenario'] = options.apiScenario;
    }
    if (options.changeAgent) {
      headers['Smartsheet-Change-Agent'] = options.changeAgent;
    }
    if (options.customProperties) {
      for (const [key, value] of Object.entries(options.customProperties)) {
        headers[key] = value;
      }
    }
    return headers;
  };

  const buildUrl = (options) => {
    const baseUrl = options.baseUrl || process.env.SMARTSHEET_API_HOST || 'https://api.smartsheet.com/2.0/';
    if (options.id) {
      return baseUrl + options.url + options.id;
    } else {
      return baseUrl + (options.url || '');
    }
  };

  const get = (options, callback) => methodRequest(options, request.get, 'GET', callback);

  const post = (options, callback) => methodRequest(options, request.post, 'POST', callback, options.body);

  const getFileBody = (options) => {
    if (options.path) {
      return fs.createReadStream(options.path);
    }

    return options.fileStream;
  };

  const postFile = (options, callback) => methodRequest(options, request.post, 'POST', callback, getFileBody(options));

  const deleteFunc = (options, callback) => methodRequest(options, request.delete, 'DELETE', callback);

  const put = (options, callback) => methodRequest(options, request.put, 'PUT', callback, options.body);

  const methodRequest = (options, method, methodName, callback, body) => {
    const baseRequestOptions = {
      url: buildUrl(options),
      headers: buildHeaders(options),
      params: options.queryParameters,
      responseEncoding: options.encoding,
    };
    const url = buildUrl(options);
    const requestOptions = baseRequestOptions;

    const retryOptions = _.pick(options, 'maxRetryDurationMillis', 'calcRetryBackoff');

    logger.logRequest(methodName, requestOptions);

    return makeRequestWithRetries(url, method, methodName, requestOptions, body, retryOptions, callback);
  };

  const makeRequestWithRetries = (url, method, methodName, requestOptions, body, retryOptions, callback) => {
    const effectiveRetryOptions = _.defaults(retryOptions, defaultRetryOptions);

    effectiveRetryOptions.endRetryTime = Date.now() + effectiveRetryOptions.maxRetryDurationMillis;

    return retryHelper(url, method, methodName, requestOptions, body, effectiveRetryOptions, 0)
      .then((response) => {
        logger.logSuccessfulResponse(response);

        if (callback) {
          callback(undefined, response.content);
        }

        return response.content;
      })
      .catch((error) => {
        logger.logErrorResponse(methodName, requestOptions, error);

        if (callback) {
          callback(error, undefined);
        }

        return Promise.reject(_.omit(error, 'headers', 'body'));
      });
  };

  const retryHelper = (url, method, methodName, requestOptions, body, retryOptions, numRetries) => {
    return methodHandler(url, method, methodName, requestOptions, body)
      .then(handleResponse)
      .catch(retryWithBackoffHelper(url, method, methodName, requestOptions, body, retryOptions, numRetries));
  };

  const methodHandler = (url, method, methodName, requestOptions, body) => {
    if (methodName === 'POST' || methodName === 'PUT') {
      return method(url, body, requestOptions);
    }

    return method(url, requestOptions);
  };

  const retryWithBackoffHelper = (url, method, methodName, requestOptions, body, retryOptions, numRetries) => {
    return (error) => {
      const processedError = handleResponse(error.response);

      let backoffMillis = 0;
      if (retryOptions.calcRetryBackoff) {
        backoffMillis = retryOptions.calcRetryBackoff(numRetries, processedError);
      } else {
        backoffMillis = defaultCalcBackoff(numRetries);
      }

      const shouldExitRetry =
        !shouldRetry(processedError) || backoffMillis < 0 || Date.now() + backoffMillis >= retryOptions.endRetryTime;

      if (shouldExitRetry) {
        logger.logRetryFailure(methodName, requestOptions, numRetries);
        return Promise.reject(processedError);
      }

      const nextRetry = numRetries + 1;
      logger.logRetryAttempt(methodName, requestOptions, processedError, nextRetry);
      return new Promise((resolve) => setTimeout(resolve, backoffMillis)).then(() =>
        retryHelper(url, method, methodName, requestOptions, body, retryOptions, nextRetry)
      );
    };
  };

  const shouldRetry = (error) =>
    error.errorCode === 4001 || error.errorCode === 4002 || error.errorCode === 4003 || error.errorCode === 4004;

  return {
    get: get,
    put: put,
    post: post,
    postFile: postFile,
    delete: deleteFunc,
    internal: {
      buildHeaders: buildHeaders,
      buildUrl: buildUrl,
    },
  };
}
