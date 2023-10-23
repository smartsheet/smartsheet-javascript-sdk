var Promise = require('bluebird');
var _ = require('underscore');
var constants = require('./constants.js');
var requestLogger = require('./requestLogger');
var packageJson = require('../../package.json');
var fs = require('fs');
var mime = require('mime');

exports.create = function(requestorConfig) {
  var logger = requestorConfig.logger
    ? requestLogger.create(requestorConfig.logger)
    : requestLogger.empty;

  var request = requestorConfig.request ||
                Promise.promisifyAll(require("axios"), {multiArgs: true});

  var handleResponse = requestorConfig.handleResponse ||
                       require('./responseHandler');

  var defaultCalcBackoff = numRetries => (Math.pow(2, numRetries) + Math.random()) * 1000;
  var defaultRetryOptions = {
    maxRetryDurationMillis: requestorConfig.maxRetryDurationMillis ||
                            constants.maxRetryDurationMillis,
    calcRetryBackoff: requestorConfig.calcRetryBackoff || defaultCalcBackoff
  };

  var getFileSizeFromPath = (path) => {
    var stats = fs.statSync(path);

    return stats.size;
  };

  var buildHeaders = options => {
    var headers = {
      Accept: options.accept || 'application/json',
      'Content-Type': options.contentType || mime.getType(options.fileName) || 'application/json',
      'User-Agent': `smartsheet-javascript-sdk/${packageJson.version}`
    };

    if (options.userAgent) {
      headers['User-Agent'] += `/${options.userAgent}`;
    }

    if(options.accessToken) {
      headers.Authorization = 'Bearer ' + options.accessToken;
    }
    if(options.assumeUser) {
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
    }
    else if (options.fileSize) {
      headers['Content-Length'] = options.fileSize;
    }
    if(options.apiScenario) {
      headers['Api-Scenario'] = options.apiScenario;
    }
    if(options.changeAgent) {
      headers['Smartsheet-Change-Agent'] = options.changeAgent;
    }
    if(options.customProperties) {
      for (const [key, value] of Object.entries(options.customProperties)) {
        headers[key] = value;
      }
    }
    return headers;
  };

  var buildUrl = options => {
    var baseUrl = options.baseUrl || process.env.SMARTSHEET_API_HOST || 'https://api.smartsheet.com/2.0/';
    if (options.id) {
      return baseUrl + options.url + options.id;
    } else {
      return baseUrl + (options.url || '');
    }
  };

  var get = (options, callback) =>
    methodRequest(options, request.get, 'GET', callback);

  var post = (options, callback) => methodRequest(options, request.post, 'POST', callback, options.body);

  var getFileBody = (options) => {
    if (options.path) {
      return fs.createReadStream(options.path);
    }

    return options.fileStream;
  };

  var postFile = (options, callback) => methodRequest(options, request.post, 'POST', callback, getFileBody(options));

  var deleteFunc = (options, callback)  =>
    methodRequest(options, request.delete, 'DELETE', callback);

  var put = (options, callback) => methodRequest(options, request.put, 'PUT', callback, options.body);

  var methodRequest = (options, method, methodName, callback, body) => {
    var baseRequestOptions = {
      url: buildUrl(options),
      headers: buildHeaders(options),
      params: options.queryParameters,
      responseEncoding: options.encoding
    };
    var url = buildUrl(options);
    var requestOptions = baseRequestOptions;

    var retryOptions = _.pick(options, 'maxRetryDurationMillis', 'calcRetryBackoff');

    logger.logRequest(methodName, requestOptions);

    return makeRequestWithRetries(url, method, methodName, requestOptions, body, retryOptions, callback);
  };

  var makeRequestWithRetries = (url, method, methodName, requestOptions, body, retryOptions, callback) => {
    var effectiveRetryOptions = _.defaults(retryOptions, defaultRetryOptions);

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
        
        return new Promise.reject(_.omit(error, 'headers', 'body'));
      });
  };

  var retryHelper = (url, method, methodName, requestOptions, body, retryOptions, numRetries) => {
    return methodHandler(url, method, methodName, requestOptions, body)
      .then(handleResponse)
      .catch(retryWithBackoffHelper(url, method, methodName, requestOptions, retryOptions, numRetries));
  };
  
  var methodHandler = (url, method, methodName, requestOptions, body) => {
    if (methodName === "POST" || methodName === "PUT") {
      return method(url, body, requestOptions);
    }

    return method(url, requestOptions);
  };

  var retryWithBackoffHelper = (url, method, methodName, requestOptions, retryOptions, numRetries) => {
    return error => {
      var processedError = handleResponse(error.response);
      var backoffMillis = retryOptions.calcRetryBackoff(numRetries, processedError);

      var shouldExitRetry =
        !shouldRetry(processedError) ||
        backoffMillis < 0 ||
        Date.now() + backoffMillis >= retryOptions.endRetryTime;

      if (shouldExitRetry) {
        logger.logRetryFailure(methodName, requestOptions, numRetries);
        return new Promise.reject(processedError);
      }

      var nextRetry = numRetries + 1;
      logger.logRetryAttempt(methodName, requestOptions, processedError, nextRetry);
      return Promise.delay(backoffMillis)
        .then(() => retryHelper(url, method, methodName, requestOptions, retryOptions, nextRetry));
    };
  };

  var shouldRetry = error =>
    error.errorCode === 4001 ||
    error.errorCode === 4002 ||
    error.errorCode === 4003 ||
    error.errorCode === 4004;

  return {
    get: get,
    put: put,
    post: post,
    postFile: postFile,
    delete: deleteFunc,
    internal: {
      buildHeaders: buildHeaders,
      buildUrl: buildUrl
    }
  };
};
