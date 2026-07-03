# Advanced Topics for the Smartsheet SDK for Javascript

## Table of Contents

- [SDK Architecture](#sdk-architecture)
  - [Client Initialization](#client-initialization)
  - [Request Lifecycle](#request-lifecycle)
  - [Response Handling](#response-handling)
  - [Error Handling and Exceptions](#error-handling-and-exceptions)
  - [Retry Logic and Backoff](#retry-logic-and-backoff)
  - [Serialization and Deserialization](#serialization-and-deserialization)
  - [Pagination Handling](#pagination-handling)
  - [Model Object Construction](#model-object-construction)
  - [Resource Module Organization](#resource-module-organization)
  - [Passthrough Internals](#passthrough-internals)
  - [Logging Infrastructure](#logging-infrastructure)
  - [Authentication Flow](#authentication-flow)
- [Conventions](#conventions)
- [Basic Configuration](#basic-configuration)
- [Advanced Configuration Options](#advanced-configuration-options)
- [Testing](#testing)
- [Passthrough Option](#passthrough-option)
- [Event Reporting](#event-reporting)

## SDK Architecture

This section provides detailed insight into the internal architecture of the Smartsheet JavaScript SDK, covering the core subsystems that power API interactions. Understanding these patterns enables advanced customization, troubleshooting, and integration work.

### Client Initialization

The SDK entry point begins with the `createClient()` function (`index.ts:98-142`), which orchestrates several initialization steps. Token resolution follows a priority order: constructor parameter `clientOptions.accessToken` first, then `SMARTSHEET_ACCESS_TOKEN` environment variable, undefined if neither provided (no error thrown at client creation time). Logger configuration happens through `buildLogger()` (`index.ts:47-96`), which supports three mutually exclusive modes: custom logger object with required methods, `loggerContainer` (Winston container with 'smartsheet' logger), or `logLevel` string that creates a Winston console logger. Log level validation checks `winston.config.npm.levels[logLevel]` and throws on invalid levels. The requestor is built via `buildRequestor()` (`index.ts:34-45`), creating an httpRequestor with retry configuration including `maxRetryDurationMillis` (converted from seconds) and optional custom `calcRetryBackoff` function. Each resource module (sheets, users, events, folders, etc.) is instantiated through factory functions: `createSheets(options)`, `createUsers(options)`, etc., all receiving an options object containing `apiUrls`, `requestor`, and `clientOptions` (accessToken, userAgent, baseUrl). Unlike the Python SDK's lazy-loading pattern, all modules are eagerly initialized at client creation time. Base URL configuration supports three regions via `smartSheetURIs` constants: default US (`https://api.smartsheet.com/2.0/`), government (`https://api.smartsheetgov.com/2.0/`), and EU (`https://api.smartsheet.eu/2.0/`).

**Implementation locations:**
- `index.ts:98-142` - createClient function
- `index.ts:34-45` - buildRequestor
- `index.ts:47-96` - buildLogger and validation helpers
- `lib/utils/httpRequestor.js:10-44` - Requestor configuration

**Cross-reference:** See [Authentication Flow](#authentication-flow) for token usage in requests, [Retry Logic and Backoff](#retry-logic-and-backoff) for requestor retry configuration, [Logging Infrastructure](#logging-infrastructure) for logger setup details.

### Request Lifecycle

API requests flow through a delegation pattern where resource methods construct options objects, which are processed through multiple transformation layers before reaching axios. Resource methods (in `lib/sheets/index.js`, `lib/users/index.ts`, etc.) create options with properties like `url`, `body`, `queryParameters`, and resource-specific IDs. These options are merged using the pattern `_.extend({}, optionsToSend, urlOptions, methodOptions)` to combine base client configuration with method-specific parameters. The `methodRequest()` function (`lib/utils/httpRequestor.js:99-114`) builds the complete request by calling `buildUrl()` (`httpRequestor.js:72-79`) for URL construction (resolving baseUrl from option → env var → default, appending ID paths for resource-specific endpoints) and `buildHeaders()` (`httpRequestor.js:29-70`) for header injection (Accept, Content-Type, User-Agent, Authorization with Bearer token, Assume-User for impersonation, Content-Disposition/Content-Length for files, Api-Scenario for testing, Smartsheet-Change-Agent for auditing, and custom properties for arbitrary headers). The prepared request flows to `makeRequestWithRetries()` which wraps execution with retry logic, then to `retryHelper()` which executes via `methodHandler()`. The `methodHandler()` (`httpRequestor.js:148-159`) routes to axios methods based on HTTP verb: POST/PUT/PATCH pass body as second parameter, DELETE with body uses `config.data`, GET/DELETE without body pass config only. All methods support Promise/callback duality - promises returned by default, optional callback as last parameter following `callback(error, data)` convention. Request logging happens via `logger.logRequest()` before execution.

**Request flow:**
```
┌──────────────────┐
│ Resource Method  │  e.g., sheets.updateSheet()
└────────┬─────────┘
         │ Creates options object
         ▼
┌──────────────────┐
│ requestor.put()  │  Merges clientOptions + urlOptions + methodOptions
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ methodRequest    │  Builds URL, headers, request config
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│makeRequestWith   │  Wraps retryHelper with retry config
│     Retries      │
└────────┬─────────┘
         │
         ▼
┌──────────────────┐
│ methodHandler    │  Routes to axios.get/post/put/delete
└────────┬─────────┘
         │ Returns Promise
         ▼
┌──────────────────┐
│ responseHandler  │  Extracts data or error details
└──────────────────┘
```

**Implementation locations:**
- `lib/utils/httpRequestor.js:81-114` - HTTP verb methods and methodRequest
- `lib/utils/httpRequestor.js:72-79` - buildUrl
- `lib/utils/httpRequestor.js:29-70` - buildHeaders
- `lib/utils/httpRequestor.js:148-159` - methodHandler
- `lib/sheets/index.js:27-60` - Example resource methods

**Cross-reference:** See [Authentication Flow](#authentication-flow) for header injection details, [Retry Logic and Backoff](#retry-logic-and-backoff) for makeRequestWithRetries, [Response Handling](#response-handling) for responseHandler processing.

### Response Handling

Response handling via `responseHandler` (`lib/utils/responseHandler.js:1-28`) processes axios responses and normalizes them into a consistent structure. The success path (HTTP status 200) creates a response object with `statusCode`, `headers`, `body`, and `content` properties, where `content` contains the parsed data payload. The error path (status != 200) creates an error response with the same base properties plus error-specific fields. For JSON responses (detected via Content-Type header check with regex `/\bapplication\/json\b/`), the handler extracts `errorCode`, `message`, `refId`, and optional `detail` from the response body. Non-JSON error responses use the raw response data as the message string. This standardization happens in `makeRequestWithRetries()` (`httpRequestor.js:122-139`), which resolves promises differently based on success or error: success responses resolve with `response.content`, error responses reject with a sanitized error object. Error sanitization uses `_.omit(error, 'headers', 'body')` to remove internal fields before rejection, reducing payload size and avoiding leaking implementation details. For callbacks, the SDK follows Node.js convention: `callback(undefined, response.content)` on success, `callback(error, undefined)` on error. Logging integration happens via `logger.logSuccessfulResponse()` for 2xx responses and `logger.logErrorResponse()` for failures. The raw axios response remains accessible in the resolved value for advanced use cases requiring access to headers or additional metadata.

**Response flow:**
```
axios response
     │
     ▼
┌──────────────────┐
│ responseHandler  │
└────────┬─────────┘
         │
         ├─── status == 200 ────→ { statusCode, headers, body, content: data }
         │                                      │
         │                                      ▼
         │                          Promise.resolve(content)
         │                          callback(undefined, content)
         │
         └─── status != 200 ────→ { statusCode, headers, body, errorCode, message, refId, detail? }
                                                │
                                                ▼
                                    Promise.reject(sanitized error)
                                    callback(error, undefined)
```

**Implementation locations:**
- `lib/utils/responseHandler.js:1-28` - Response processing logic
- `lib/utils/httpRequestor.js:122-139` - Promise resolution/rejection and callback invocation
- `lib/types/ApiError.ts` - Error response interface

**Cross-reference:** See [Request Lifecycle](#request-lifecycle) for responseHandler integration, [Error Handling and Exceptions](#error-handling-and-exceptions) for error structure details, [Logging Infrastructure](#logging-infrastructure) for response logging.

### Error Handling and Exceptions

Error handling follows a three-tier structure: network errors from axios, API errors from Smartsheet responses, and SDK-level validation errors. Network errors (connection failures, timeouts, DNS issues) bubble up from axios with properties like `code: 'ECONNREFUSED'` and trigger retry logic. API errors (HTTP status != 200) are normalized by `responseHandler` into objects with `statusCode`, `errorCode` (numeric API error code), `message` (human-readable description), `refId` (request tracking ID for support), and optional `detail` object with additional context. Common error codes include 1006 (not found), 1032 (invalid), 4003 (rate limit exceeded), and full mappings are documented in API references. SDK validation errors are thrown synchronously for invalid inputs like missing required parameters or invalid logger configurations, using standard JavaScript Error objects. The retry system (`lib/utils/httpRequestor.js:116-141`) distinguishes retriable errors (5xx server errors, rate limits with 429 status, network timeouts) from permanent failures (4xx client errors except 429, authentication failures). Error responses maintain consistent structure whether using promises or callbacks: promises reject with the full error object including all properties, callbacks receive `callback(error, undefined)` where error contains the same normalized structure. Logger integration via `logger.logErrorResponse(error)` captures failures at 'error' level with full context including request details and error properties.

**Error response structure:**
```javascript
{
  statusCode: 400,           // HTTP status code
  errorCode: 1032,           // Smartsheet API error code
  message: "Invalid input",  // Human-readable message
  refId: "abc123xyz",        // Request tracking ID
  detail?: {                 // Optional additional context
    index: 0,
    rowId: 123456
  }
}
```

**Implementation locations:**
- `lib/utils/responseHandler.js:11-26` - Error response normalization
- `lib/utils/httpRequestor.js:122-139` - Error handling in makeRequestWithRetries
- `lib/types/ApiError.ts` - Error response TypeScript interface
- `index.ts:59-96` - Logger validation errors

**Cross-reference:** See [Response Handling](#response-handling) for error normalization, [Retry Logic and Backoff](#retry-logic-and-backoff) for retriable error detection, [Logging Infrastructure](#logging-infrastructure) for error logging.

### Retry Logic and Backoff

Retry logic is implemented in `makeRequestWithRetries()` (`lib/utils/httpRequestor.js:116-141`) using the `retryHelper()` function from `lib/utils/retryLogic.js`. The system retries requests that fail due to transient errors: HTTP 5xx server errors, 429 rate limit responses, network errors like ECONNREFUSED/ETIMEDOUT/ENOTFOUND, and socket hang-ups (ECONNRESET). Non-retriable errors (4xx client errors except 429, authentication failures with 401/403) fail immediately without retry. Retry timing follows exponential backoff with jitter via `calcRetryBackoff()` (`retryLogic.js:26-46`): base delay of 1 second doubled on each attempt (1s, 2s, 4s, 8s), plus random jitter up to 1 second to prevent thundering herd. The maximum retry duration is controlled by `maxRetryDurationMillis` (default 15 seconds, configurable via `maxRetryDurationSeconds` client option). The retry helper tracks elapsed time and stops retrying once the max duration is exceeded, even if backoff would suggest another attempt. Custom backoff functions can be provided via the `calcRetryBackoff` client option, receiving `(attemptNumber, error)` parameters and returning milliseconds to wait (negative values abort retries). Rate limit responses (429) are always retried, using the `Retry-After` header value if provided by the API. Logger integration captures retry attempts at 'warn' level via `logger.logRetry()`, including attempt number, error details, and wait duration.

**Retry backoff timing:**
```
Attempt 0: 1000ms + jitter(0-1000ms) = 1-2 seconds
Attempt 1: 2000ms + jitter(0-1000ms) = 2-3 seconds
Attempt 2: 4000ms + jitter(0-1000ms) = 4-5 seconds
Attempt 3: 8000ms + jitter(0-1000ms) = 8-9 seconds
(stops when cumulative time exceeds maxRetryDurationMillis)
```

**Implementation locations:**
- `lib/utils/httpRequestor.js:116-141` - makeRequestWithRetries
- `lib/utils/retryLogic.js:1-68` - retryHelper and calcRetryBackoff
- `lib/utils/retryLogic.js:48-66` - shouldRetry error classification
- `index.ts:36-43` - Retry configuration in buildRequestor

**Cross-reference:** See [Client Initialization](#client-initialization) for retry configuration, [Error Handling and Exceptions](#error-handling-and-exceptions) for error classification, [Request Lifecycle](#request-lifecycle) for retry integration.

### Serialization and Deserialization

The SDK relies on axios for automatic JSON serialization and deserialization, with no custom encoding layer. Request bodies are passed directly to axios as JavaScript objects in the `data` property, which serializes them to JSON automatically. Response bodies are deserialized by axios based on Content-Type headers, with the assumption that all API responses are `application/json`. The `responseHandler` extracts the parsed data from `response.data` without additional processing. For file uploads, the SDK constructs multipart/form-data requests manually in `sheets.importSheetFromFileOrURL()` and similar methods using the FormData API. File content is read as a buffer and attached with metadata including filename, Content-Type (from file extension mapping), and Content-Length headers. Form data serialization happens through axios's built-in multipart support, triggered by passing a FormData instance as the request body. URL query parameters are handled by axios's `params` config property (`httpRequestor.js:100-105`), which automatically encodes parameter objects into query strings. Special characters in query values (spaces, special symbols) are URL-encoded by axios. No custom date/datetime handling exists; dates must be pre-formatted by calling code to ISO 8601 strings. The SDK does not perform schema validation on request bodies - structure validation happens server-side, with errors returned via the standard API error response format.

**Serialization flow:**
```
JavaScript object
      │
      ▼
   axios.post({
     data: object  ──→ JSON.stringify() ──→ HTTP request body
   })

HTTP response body
      │
      ▼
  Content-Type: application/json
      │
      ▼
   JSON.parse() ──→ response.data (JavaScript object)
```

**Implementation locations:**
- `lib/utils/httpRequestor.js:100-105` - Query parameter handling
- `lib/utils/httpRequestor.js:148-159` - Body passing to axios
- `lib/sheets/index.js:198-268` - File upload with FormData
- `lib/utils/responseHandler.js:1-28` - Response deserialization

**Cross-reference:** See [Request Lifecycle](#request-lifecycle) for body/query parameter flow, [Response Handling](#response-handling) for response deserialization, [Passthrough Internals](#passthrough-internals) for file upload mechanics.

### Pagination Handling

Pagination support exists for endpoints returning large result sets through the `autoPage` option (`lib/utils/pagination.js:1-46`). When `autoPage: true` is set, the SDK automatically follows `nextPage` links in API responses until all results are retrieved. The pagination helper function wraps the original endpoint call, checking each response for a `nextPage` property (URL string). If present, the SDK makes another request to that URL, accumulating results in the `data` array. This continues until `nextPage` is undefined or null. The accumulated response replaces individual page responses, combining all `data` arrays into a single collection. The `totalPages` property tracks how many requests were made. Page size is controlled by query parameters (e.g., `pageSize`, `maxResults`) passed in the original options, which are preserved across pagination requests. The SDK does not modify page size automatically. No cursor-based pagination exists; all pagination uses URL-based navigation via `nextPage`. Manual pagination is supported by checking `nextPage` in responses and making subsequent calls with that URL as the endpoint. Pagination works with both promise and callback patterns - when using callbacks, the final accumulated result is passed once all pages are retrieved. Logger integration logs each page retrieval at 'info' level. Not all endpoints support pagination; support depends on API endpoint capabilities documented in Smartsheet API references.

**Pagination flow (autoPage: true):**
```
Initial request ──→ Response { data: [...], nextPage: "url1" }
                           │
                           ▼
Request to url1 ──→ Response { data: [...], nextPage: "url2" }
                           │
                           ▼
Request to url2 ──→ Response { data: [...], nextPage: undefined }
                           │
                           ▼
                    Combined { data: [...all results...], totalPages: 3 }
```

**Implementation locations:**
- `lib/utils/pagination.js:1-46` - autoPage implementation
- `lib/sheets/index.js` - Example usage in listSheets
- Resource module files - autoPage option handling

**Cross-reference:** See [Request Lifecycle](#request-lifecycle) for pagination request flow, [Response Handling](#response-handling) for nextPage extraction, [Resource Module Organization](#resource-module-organization) for endpoint-specific pagination support.

### Model Object Construction

The SDK returns plain JavaScript objects directly from API responses without wrapping them in model classes. Unlike SDKs with rich domain models, this SDK provides raw deserialized JSON as-is, favoring simplicity and transparency over abstraction. Response objects match API documentation structures exactly, with properties like `id`, `name`, `createdAt`, etc. available directly as object keys. No getter/setter methods exist; all properties are plain data fields. This design choice eliminates the need for model class definitions and version-specific mappings, reducing maintenance burden when API schemas evolve. TypeScript type definitions (`lib/types/*.ts`) provide compile-time type checking and IDE autocomplete for response structures, but these are purely static annotations with no runtime behavior. For nested structures (e.g., Sheet containing Row containing Cell), the same pattern applies - plain objects all the way down, with structure defined by TypeScript interfaces. Collections are returned as arrays of objects, never as custom collection classes. No lazy loading or relationships exist; all data must be explicitly fetched through separate API calls. Helper methods for common operations (e.g., finding a cell by column ID) are not provided - these are left to user code. This approach trades convenience for explicitness, making it clear what data came from the API versus what was computed locally.

**Response structure example:**
```javascript
// API response for getSheet
{
  id: 123456789,
  name: "My Sheet",
  rows: [
    {
      id: 987654321,
      rowNumber: 1,
      cells: [
        { columnId: 111, value: "John" },
        { columnId: 222, value: 30 }
      ]
    }
  ]
}
// Accessed as plain object properties
sheet.rows[0].cells[0].value  // "John"
```

**Implementation locations:**
- `lib/types/*.ts` - TypeScript interfaces for response structures
- `lib/utils/responseHandler.js:1-28` - Raw response.data extraction
- Resource module files - Direct return of API response content

**Cross-reference:** See [Response Handling](#response-handling) for raw object extraction, [Serialization and Deserialization](#serialization-and-deserialization) for JSON parsing, TypeScript interfaces for structure definitions.

### Resource Module Organization

Resources are organized into separate modules under `lib/` directory, each implementing a specific API domain (sheets, users, folders, etc.). Each module exports a factory function (e.g., `createSheets(options)`) that returns an object with methods corresponding to API endpoints. The factory pattern allows dependency injection of `requestor`, `apiUrls`, and `clientOptions` from the main client initialization. Internal module structure follows a consistent pattern: method definitions reference the requestor's HTTP verb methods (`requestor.get()`, `requestor.post()`, etc.), construct options objects with `url` (relative path), `body` (for mutations), `queryParameters` (for filters/pagination), and resource-specific IDs. URL path construction uses template literals with embedded IDs (e.g., `` `sheets/${options.sheetId}` ``). Some modules are TypeScript (`lib/users/index.ts`, `lib/events/index.ts`) while others are JavaScript (`lib/sheets/index.js`, `lib/folders/index.js`), reflecting gradual TypeScript migration. Cross-resource operations (e.g., copying a sheet to a workspace) are implemented in the resource owning the primary entity (sheet copying is in sheets module). Resource modules have no shared base class; common behavior is provided through the requestor abstraction. Module discovery happens at client initialization time when all resources are eagerly loaded, unlike lazy-loading patterns in other SDKs. This organization allows per-resource testing and independent evolution of endpoint implementations.

**Module structure example (sheets):**
```javascript
// lib/sheets/index.js
function createSheets(options) {
  const { requestor, apiUrls, clientOptions } = options;
  
  return {
    getSheet: (getOptions, callback) => {
      const url = `sheets/${getOptions.sheetId}`;
      return requestor.get({ ...getOptions, url }, callback);
    },
    updateSheet: (updateOptions, callback) => {
      const url = `sheets/${updateOptions.sheetId}`;
      return requestor.put({ ...updateOptions, url }, callback);
    }
    // ... more methods
  };
}
module.exports = createSheets;
```

**Implementation locations:**
- `lib/sheets/index.js` - Sheets resource (largest module)
- `lib/users/index.ts` - Users resource (TypeScript)
- `lib/folders/index.js` - Folders resource
- `lib/events/index.ts` - Events resource
- `index.ts:98-142` - Resource instantiation in createClient

**Cross-reference:** See [Client Initialization](#client-initialization) for resource module instantiation, [Request Lifecycle](#request-lifecycle) for resource method to requestor flow, [Passthrough Internals](#passthrough-internals) for special-case resource behavior.

### Passthrough Internals

Passthrough operations are implemented via a dedicated request module (`lib/request/index.js`) that exposes low-level requestor methods directly to user code. The passthrough API surface includes `get()`, `post()`, `postFile()`, `put()`, and `deleteRequest()` methods that accept options objects with a required `url` property (relative path) plus standard options like `body`, `queryParameters`, and `headers`. Unlike resource methods that construct URLs internally, passthrough requires explicit URL specification by the caller. This allows access to API endpoints not yet wrapped by resource modules or experimental endpoints. URL construction follows the same `buildUrl()` logic as resource methods, resolving baseUrl and appending the provided relative path. Header injection, retry logic, and response handling use the same infrastructure as wrapped endpoints - no special-casing exists at the requestor level. File uploads via `postFile()` handle Content-Type and Content-Disposition headers manually, supporting both file paths and streams. The passthrough is the escape hatch for advanced users needing API features ahead of SDK support, with the tradeoff being less type safety and more verbose call sites. TypeScript definitions for passthrough options are minimal, requiring type assertions for endpoint-specific body structures. Logging includes passthrough calls at the same level as wrapped endpoints. Error handling and response structure are identical to resource methods, maintaining consistency across the SDK surface area.

**Passthrough example:**
```javascript
// Calling an unwrapped endpoint
const result = await client.request.post({
  url: 'sheets/123/rows',
  body: {
    toTop: true,
    rows: [{ cells: [{ columnId: 456, value: "data" }] }]
  },
  queryParameters: { allowPartialSuccess: true }
});
```

**Implementation locations:**
- `lib/request/index.js` - Passthrough request module
- `lib/utils/httpRequestor.js:81-114` - Underlying requestor methods
- `index.ts:132` - Passthrough module instantiation

**Cross-reference:** See [Request Lifecycle](#request-lifecycle) for URL/header construction, [Resource Module Organization](#resource-module-organization) for wrapped vs. passthrough patterns, [Serialization and Deserialization](#serialization-and-deserialization) for file upload mechanics.

### Logging Infrastructure

Logging infrastructure is built on Winston, providing structured logging across all SDK operations. The `buildLogger()` function (`index.ts:47-96`) supports three configuration modes: custom logger object (must implement `silly`, `verbose`, `debug`, `info`, `warn`, `error`, and `log` methods), `loggerContainer` (Winston container with 'smartsheet' logger pre-configured), or `logLevel` string (creates Winston console logger with that level). These modes are mutually exclusive - providing multiple throws a validation error. Log level validation checks `winston.config.npm.levels[logLevel]` against valid levels: 'error', 'warn', 'info', 'verbose', 'debug', 'silly'. The logger is injected into the requestor at client initialization time. Logging events cover the full request lifecycle: `logger.logRequest()` before execution (logs method, URL, headers at 'info'), `logger.logSuccessfulResponse()` after 2xx responses (logs status code, truncated body at 'verbose'/'debug'), `logger.logErrorResponse()` for failures (logs error details at 'error'), and `logger.logRetry()` for retry attempts (logs attempt number, wait time at 'warn'). Body logging truncation at 'verbose' level limits output to 1024 characters; 'debug' level shows full bodies. 'silly' level includes full HTTP headers in addition to bodies. No PII redaction exists - sensitive data in requests/responses will be logged if log level includes body output. Logger format defaults to Winston's simple console output; custom transports can be configured via loggerContainer or custom logger.

**Logging level behaviors:**
| Level     | Logs |
|-----------|------|
| error     | Errors only |
| warn      | Errors + retry attempts |
| info      | Errors + retries + each request URL/status |
| verbose   | Errors + retries + requests + truncated bodies (1024 chars) |
| debug     | Errors + retries + requests + full bodies |
| silly     | Errors + retries + requests + full bodies + headers |

**Implementation locations:**
- `index.ts:47-96` - buildLogger and validation
- `lib/utils/httpRequestor.js` - logger.logRequest/logSuccessfulResponse/logErrorResponse integration
- `lib/utils/retryLogic.js` - logger.logRetry integration

**Cross-reference:** See [Client Initialization](#client-initialization) for logger setup, [Request Lifecycle](#request-lifecycle) for request logging, [Error Handling and Exceptions](#error-handling-and-exceptions) for error logging, [Retry Logic and Backoff](#retry-logic-and-backoff) for retry logging.

### Authentication Flow

Authentication uses Bearer token injection via the Authorization header in every API request. Token resolution happens at client initialization (`index.ts:98-142`) following priority: constructor parameter `clientOptions.accessToken` first, then `SMARTSHEET_ACCESS_TOKEN` environment variable, undefined if neither provided (no error at client creation). The resolved token is stored in `clientOptions.accessToken` and passed to all resource modules. Header injection happens in `buildHeaders()` (`lib/utils/httpRequestor.js:29-70`), which adds `Authorization: Bearer ${accessToken}` if token is present. No token means no Authorization header (for unauthenticated endpoints, though most require auth). Token refresh/rotation is not handled by the SDK - users must manage token lifecycle and create new clients with updated tokens. User impersonation is supported via the `Assume-User` header, set through `assumeUser` option on individual requests or globally via client configuration. The SDK does not validate token format or expiration - invalid tokens result in 401 responses from the API. OAuth flow is not implemented; users must obtain tokens externally (via Smartsheet developer portal or OAuth library) and pass them to the SDK. API key authentication (deprecated by Smartsheet) is not supported. All requests use HTTPS via axios defaults, with no HTTP fallback. Certificate pinning and custom TLS configuration are not exposed; axios uses Node.js default TLS behavior.

**Authentication header construction:**
```javascript
// In buildHeaders()
if (accessToken) {
  headers['Authorization'] = `Bearer ${accessToken}`;
}
if (assumeUser) {
  headers['Assume-User'] = assumeUser;
}
```

**Implementation locations:**
- `index.ts:98-142` - Token resolution at client creation
- `lib/utils/httpRequestor.js:29-70` - Authorization header injection
- `lib/utils/httpRequestor.js:43-45` - Assume-User header injection

**Cross-reference:** See [Client Initialization](#client-initialization) for token resolution, [Request Lifecycle](#request-lifecycle) for header injection details, [Error Handling and Exceptions](#error-handling-and-exceptions) for 401 error handling.

## Conventions

Each endpoint takes two arguments: a set of options, and an optional callback function. If the callback is not specified, the SDK will return a promise instead.

The options argument is an object that contains any number of parameters specific to the endpoint, and may optionally require a `body` field that will be placed in the body of the request when applicable.

Each endpoint also permits an optional parameter in the options object:

* `queryParameters` - This option is common for specifying enhancements or additional features for an API call. It specifies the query string for the call's URL.

  This must be an object mapping URL query string fields to their values. For example, to make a call with the query string `?include=comments&includeAll=true`, an API call would look like the following:

  ```javascript
  ...getSheet({
    ...
    queryParameters: {include: 'comments', includeAll: true});
  ```

## Basic Configuration

When creating the client object, pass an object with any of the following properties to tune its behavior.

* `maxRetryDurationSeconds` - The maximum time in seconds to retry intermittent errors. (Defaults to 15 seconds.)

* `logLevel` - Set to `'info'` to log each call and return value to the console.


## Advanced Configuration Options
### Logging Configuration


This library leverages [**winston**](https://github.com/winstonjs/winston) for logging.

Supported log levels are:

|Level|What is logged|
|---|---|
|`'error'`|Failures only|
|`'warn'`|Failures and retries|
|`'info'`|Each call URL and response code|
|`'verbose'`|Payloads, truncated to 1024 characters|
|`'debug'`|Full payloads|
|`'silly'`|Full payloads and HTTP headers|

You may create your own **winston** container or configure the default `winston.loggers` container, adding a logger named 'smartsheet'. Specify this container using the configuration option `loggerContainer`. ([winston documentation on configuring loggers](https://github.com/winstonjs/winston#working-with-multiple-loggers-in-winston).)

If you want to use your own logger, pass a logger object as the configuration option `logger` that implements the following methods:
* `silly`, `verbose`, `debug`, `info`, `warn`, `error` - Standard logging methods
* `log` - Similar to the above, but accepting the logging level string as its initial parameter; the log level is guaranteed be one of the above options.

### Retry Configuration
For additional customization, you can specify a `calcRetryBackoff` function.  This function is called with two arguments:

* The first accepts the index of the retry being attempted (0 for the first retry, 1 for the second, etc.)
* The second accepts the Error Object that caused the retry.

The function must return the number of milliseconds to wait before making the subsequent retry call, or a negative number if no more retries should be made.

The default implementation performs exponential backoff with jitter.

### Base URL Configuration
The SDK can be directed to point at a different base URL, which can be helpful for testing against mock APIs or connecting to specialized Smartsheet environments.

When creating the Smartsheet client, set the base URL by passing it into the constructor arguments:

```javascript
const smartsheet = require('smartsheet').createClient({
  baseUrl: smartsheet.smartSheetURIs.defaultBaseURI
});
```

#### Working With Smartsheetgov.com Accounts
If you need to access Smartsheetgov you will need to specify the Smartsheetgov API URI as the `baseUrl` during creation of the Smartsheet client object. SmartsheetGov uses a base URI of `https://api.smartsheetgov.com/2.0/`. The Smartsheetgov URI is defined as a constant (`smartSheetURIs.govBaseURI`).

Invoke the SmartsheetBuilder with the base URI pointing to Smartsheetgov:
```javascript
const smartsheet = require('smartsheet').createClient({
  baseUrl: smartsheet.smartSheetURIs.govBaseURI
});
```

#### Working With Smartsheet Regions Europe Accounts

If you need to access Smartsheet.eu you will need to specify the Smartsheet.eu API URI as the `baseUrl` during creation of the Smartsheet client object. Smartsheet.eu uses a base URI of `https://api.smartsheet.eu/2.0/`. The Smartsheet.eu URI is defined as a constant (`smartSheetURIs.euBaseURI`).

Invoke the SmartsheetBuilder with the base URI pointing to Smartsheet.eu:
```javascript
const smartsheet = require('smartsheet').createClient({
  baseUrl: smartsheet.smartSheetURIs.euBaseURI
});
```

## Testing

See [TESTING.md](./TESTING.md) for comprehensive testing documentation and patterns.

## Passthrough Option

If there is an API Feature that is not yet supported by the JavaScript SDK, there is a passthrough option that allows you to call arbitrary API endpoints. Passthrough calls support error retry and logging.

To invoke the passthrough, your code can call one of the following methods:

`response = smartsheet.request.get(getOptions, callback)`

`response = smartsheet.request.post(postOptions, callback)`

`response = smartsheet.request.postFile(postOptions, callback)`

`response = smartsheet.request.put(putOptions, callback)`

`response = smartsheet.request.deleteRequest(deleteOptions, callback)`

The `...Options` parameter takes the normal set of parameters taken by other similar SDK calls, but also requires a `url` parameter that tells it the relative path of the endpoint to call.

### Passthrough Example

The following example shows how to POST data to `https://api.smartsheet.com/2.0/sheets` using the passthrough method:

```javascript
const payload = {
  name: 'my new sheet',
  columns: [
    {
      title: 'Favorite',
      type: 'CHECKBOX',
      symbol: 'STAR'
    },
    {
      title: 'Primary Column',
      primary: true,
      type: 'TEXT_NUMBER'
    }
  ]
};

const responsePromise = smartsheet.request.post({
  url: 'sheets',
  body: payload
});
```

## Event Reporting
The following sample demonstrates best practices for consuming the event stream returned from the Smartsheet Event Reporting feature. 

The sample uses the `smartsheet.events.getEvents` method to request lists of events from the stream. The first request sets the `since` parameter with the point in time (i.e. event occurrence datetime) in the stream from which to start consuming events. The `since` parameter can be set with a datetime value that is either formatted as ISO 8601 (e.g. 2010-01-01T00:00:00Z) or as UNIX epoch (in which case the `numericDates` parameter must also be set to `true`. By default the `numericDates` parameter is set to `false`).

To consume the next list of events after the initial list of events is returned, set the `streamPosition` parameter with the `nextStreamPosition` attribute obtained from the previous request and don't set the `since` parameter with any values. This is because when using the `get` method, either the `since` parameter or the `streamPosition` parameter should be set, but never both. 

Note that the `moreAvailable` attribute in a response indicates whether more events are immediately available for consumption. If events aren't immediately available, they may still be generating so subsequent requests should keep using the same `streamPosition` value until the next list of events is retrieved.

Many events have additional information available as a part of the event. That information can be accessed from the data stored in the `additionalDetails` attribute. Information about the additional details provided can be found [here](https://smartsheet-platform.github.io/event-reporting-docs/).

Each event identifies the object it affected. Use the `objectIdStr` property, which holds the object identifier as a string and supports both numeric and non-numeric identifiers. The older `objectId` property is deprecated and kept only for backward compatibility: when the identifier is numeric it contains the number, and when the identifier is non-numeric it contains `-1` while the real value is available in `objectIdStr`. New code should read `objectIdStr`.

```javascript
result.data.forEach((event) => {
  // Preferred: works for all identifier types
  console.log(event.objectIdStr);

  // Deprecated: numeric only; returns -1 for non-numeric identifiers
  // console.log(event.objectId);
});
```


```javascript
// Initialize the client
const client = require('smartsheet');
const smartsheet = client.createClient({
  accessToken: 'JKlMNOpQ12RStUVwxYZAbcde3F5g6hijklM789',
  logLevel: 'info'
});

const currentDate = new Date();
const dateWeekAgo = currentDate.setDate(currentDate.getDate() - 7);
// The first call to the events reporting API
// requires the since query parameter.
// If you pass in an UNIX epoch date, numericDates must be true
let options = {
  queryParameters: {
    since: dateWeekAgo,
    maxCount: 10,
    numericDates: true
  }
}

function getEvents(options) {
  smartsheet.events.getEvents(options)
  .then((result) => {
    printNewSheetEvents(result);
    getNextStreamOfEvents(result.moreAvailable, result.nextStreamPosition);
  })
  .catch((error) => console.log(JSON.stringify(error)));
}

function getNextStreamOfEvents(moreEventsAvailable, nextStreamPosition) {
  // Subsequent calls require the streamPosition property
  options = {
    queryParameters: {
      streamPosition: nextStreamPosition,
      maxCount: 10
    }
  }

  if (moreEventsAvailable) {
    getEvents(options);
  } 
}

// This example is looking specifically for new sheet events
function printNewSheetEvents(result) {
  // Find all created sheets
  result.data.forEach(function (item) {
    if (item.objectType === "SHEET" && item.action === "CREATE") {
      console.log(item.additionalDetails.sheetName)
    }
  })
}

getEvents(options);
```
