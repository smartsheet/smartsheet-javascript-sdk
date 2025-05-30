import type { AxiosRequestConfig } from 'axios';

// Censoring logs
const EXPOSED_CENSOR_CHARS = 4;

// Builds a censorFn with a filterList of keys to censor.
// Calling censorFn(logObject) will return a new object with any field matching the keys in filterList redacted
const buildCensorFn =
  (filterList: string[]) =>
  (loggedObject?: Record<string, unknown>): Record<string, unknown> =>
    Object.entries(loggedObject || {}).reduce<Record<string, unknown>>((redactedLogObject, [key, value]) => {
      const keyLower = key.toLowerCase();
      if (filterList.includes(keyLower) && typeof value === 'string') {
        redactedLogObject[key] = rectactString(value);
      } else {
        redactedLogObject[key] = value;
      }
      return redactedLogObject;
    }, {});

// Formatting Utilities
const rectactString = (s: string): string => {
  if (!s || s.length === 0) return s;

  const censoredSection = '*'.repeat(Math.max(s.length - EXPOSED_CENSOR_CHARS, 0));
  const exposedSection = s.slice(-EXPOSED_CENSOR_CHARS);
  return censoredSection + exposedSection;
};

// lists of keys to redact when logging specific request objects.
const headerFilterList = ['authorization'];
const payloadFilterList = ['access_token', 'refresh_token'];
const queryParamFilterList = ['code', 'client_id', 'hash', 'refresh_token'];

export const withRedactedHeaders = buildCensorFn(headerFilterList);
export const withRedactedPayload = buildCensorFn(payloadFilterList);
export const withRedactedQueryParams = buildCensorFn(queryParamFilterList);

export const getSanitizedUrlForLogs = (requestConfig?: AxiosRequestConfig): string => {
  const url = requestConfig?.url || '';
  const params = requestConfig?.params || {};

  if (!params || Object.keys(params).length === 0) {
    return url;
  }

  const censoredParams = withRedactedQueryParams(params);
  const queryString = Object.entries(censoredParams)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`)
    .join('&');

  return url + '?' + queryString;
};
