# Advanced Topics for the Smartsheet SDK for Javascript

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
var smartsheet = require('smartsheet').createClient({
  baseUrl: smartsheet.smartSheetURIs.defaultBaseURI
});
```

#### Working With Smartsheetgov.com Accounts
If you need to access Smartsheetgov you will need to specify the Smartsheetgov API URI as the `baseUrl` during creation of the Smartsheet client object. SmartsheetGov uses a base URI of `https://api.smartsheetgov.com/2.0/`. The Smartsheetgov URI is defined as a constant (`smartSheetURIs.govBaseURI`).

Invoke the SmartsheetBuilder with the base URI pointing to Smartsheetgov:
```javascript
var smartsheet = require('smartsheet').createClient({
  baseUrl: smartsheet.smartSheetURIs.govBaseURI
});
```

#### Working With Smartsheet Regions Europe Accounts

If you need to access Smartsheet.eu you will need to specify the Smartsheet.eu API URI as the `baseUrl` during creation of the Smartsheet client object. Smartsheet.eu uses a base URI of `https://api.smartsheet.eu/2.0/`. The Smartsheet.eu URI is defined as a constant (`smartSheetURIs.euBaseURI`).

Invoke the SmartsheetBuilder with the base URI pointing to Smartsheet.eu:
```javascript
var smartsheet = require('smartsheet').createClient({
  baseUrl: smartsheet.smartSheetURIs.euBaseURI
});
```

## Testing

The source code comes with several scripts for running tests:

|Script|Action|
|---|---|
|`npm run test`|Runs all tests. Note, the mock API tests will fail unless the mock server is running|
|`npm run test-functional`|Runs only functional tests|
|`npm run test-mock-api`|Runs only mock API tests. Clone the [Smartsheet SDK tests](https://github.com/smartsheet-platform/smartsheet-sdk-tests) repo and follow the instructions from the README to start the mock server|
|`npm run coverage`|Runs functional tests and reports on code coverage|
|`gulp jshint`|Runs JSHint against the codebase|
|`gulp [watch]`|Watches the codebase and runs JSHint whenever changes are made|

Note that a successful test run will currently output some unhandled rejection messages in the body of the logs. This is expected, and does not indicate test failure.

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
var payload = {
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

var responsePromise = smartsheet.request.post({
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


```javascript
// Initialize the client
var client = require('smartsheet');
var smartsheet = client.createClient({
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