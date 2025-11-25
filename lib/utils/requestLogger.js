import _ from 'underscore';

export function create(logger) {
  const PAYLOAD_PREVIEW_LENGTH = 1024;
  const EXPOSED_CENSOR_CHARS = 4;

  const logRequest = (verb, requestOptions) => {
    logRequestBasics('info', verb, requestOptions);
    logHeaders('Request', requestOptions.headers);
    logPreviewAndFullPayload('Request', requestOptions.body);
  };

  const logRetryAttempt = (verb, requestOptions, error, attemptNum) => {
    logger.warn('Request failed, performing retry #%d\nCause: ', attemptNum, error);
    logRequestBasics('warn', verb, requestOptions);
  };

  const logRetryFailure = (verb, requestOptions, attemptNum) => {
    logger.error('Request failed after %d retries', attemptNum);
  };

  const logSuccessfulResponse = (response) => {
    logger.info('Response: Success (HTTP %d)', response.statusCode);
    logHeaders('Response', response.headers);
    logResponsePayload('Response', response.content);
  };

  const logErrorResponse = (verb, requestOptions, error) => {
    logRequestBasics('error', verb, requestOptions);
    logger.error(
      'Response: Failure (HTTP %d)\n\tError Code: %d - %s\n\tRef ID: %s',
      error.statusCode,
      error.errorCode,
      error.message,
      error.refId
    );
    logHeaders('Response', error.headers);
  };

  const log = logger.log;

  const logRequestBasics = (level, verb, requestOptions) => {
    const url = buildLoggingUrl(requestOptions);

    logger.log(level, '%s %s', verb, url);
  };

  const logHeaders = (context, headers) => {
    if (_.isEmpty(headers)) return;

    logger.silly('%s Headers: %s', context, JSON.stringify(censorHeaders(headers)));
  };

  const logResponsePayload = (context, payload) => {
    if (_.isEmpty(payload)) return;

    const censoredPayload = censorPayload(payload);
    const payloadStr = JSON.stringify(censoredPayload);
    logPreviewAndFullPayload(context, payloadStr);
  };

  const logPreviewAndFullPayload = (context, payloadStr) => {
    if (_.isEmpty(payloadStr)) return;

    let preview = payloadStr;
    if (typeof preview === 'string' && preview.length > PAYLOAD_PREVIEW_LENGTH) {
      preview = preview.substring(0, PAYLOAD_PREVIEW_LENGTH) + '...';
    }

    logger.verbose('%s Payload (preview): %s', context, preview);
    logger.debug('%s Payload (full): %s', context, payloadStr);
  };

  // Formatting Utilities

  const buildLoggingUrl = (requestOptions) => {
    let queryParams = '';
    let qs = requestOptions.qs;
    if (!_.isEmpty(qs)) {
      qs = censorQueryParams(qs);

      queryParams =
        '?' +
        _.pairs(qs)
          .map((pair) => `${encodeURIComponent(pair[0])}=${encodeURIComponent(pair[1])}`)
          .join('&');
    }
    return requestOptions.url + queryParams;
  };

  const censor = (s) => {
    if (_.isEmpty(s)) return s;

    const censoredSection = '*'.repeat(Math.max(s.length - EXPOSED_CENSOR_CHARS, 0));
    const exposedSection = s.slice(-EXPOSED_CENSOR_CHARS);
    return censoredSection + exposedSection;
  };

  const buildCensor = function (blacklist) {
    return (obj) =>
      _.mapObject(obj, (val, key) => {
        const keyMatch = key.toLowerCase();
        return blacklist.indexOf(keyMatch) != -1 // Found in censor blacklist
          ? censor(val)
          : val;
      });
  };

  const queryParamBlacklist = ['code', 'client_id', 'hash', 'refresh_token'].sort();
  const censorQueryParams = buildCensor(queryParamBlacklist);

  const headerBlacklist = ['authorization'].sort();
  const censorHeaders = buildCensor(headerBlacklist);

  const payloadBlacklist = ['access_token', 'refresh_token'].sort();
  const censorPayload = buildCensor(payloadBlacklist);

  // Logger final configuration

  const formatLog = (level, msg, _meta) => {
    const timestamp = new Date().toISOString();
    const displayLevel = padStart(level.toUpperCase(), 7);

    return `${timestamp}[${displayLevel}] ${msg}`;
  };

  const padStart = (str, maxLength) => {
    if (str.length >= maxLength) return str;

    const timesToRepeat = maxLength - str.length;
    return ' '.repeat(timesToRepeat) + str;
  };

  if (logger.filters) {
    logger.filters.push(formatLog);
  }

  // Generated object

  return {
    logRequest: logRequest,
    logRetryAttempt: logRetryAttempt,
    logRetryFailure: logRetryFailure,
    logSuccessfulResponse: logSuccessfulResponse,
    logErrorResponse: logErrorResponse,
    log: log,
  };
}

const doNothing = () => {};
export const empty = {
  logRequest: doNothing,
  logRetryAttempt: doNothing,
  logRetryFailure: doNothing,
  logSuccessfulResponse: doNothing,
  logErrorResponse: doNothing,
  log: doNothing,
};
