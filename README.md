# Smartsheet SDK for JavaScript
![Build Status](https://github.com/smartsheet/smartsheet-javascript-sdk/actions/workflows/test-build.yaml/badge.svg) [![Coverage Status](https://coveralls.io/repos/github/smartsheet/smartsheet-javascript-sdk/badge.svg?branch=mainline)](https://coveralls.io/github/smartsheet/smartsheet-javascript-sdk?branch=mainline) [![npm version](https://badge.fury.io/js/smartsheet.svg)](https://badge.fury.io/js/smartsheet)

This is a client SDK for connecting to the [Smartsheet API](https://smartsheet.redoc.ly/) from Node.js applications.

## System Requirements

The SDK is compatible with [actively supported](https://github.com/nodejs/release#release-schedule) Node.js versions 14.x or later.

## Installation

To install this SDK run the following command in a terminal window:

```bash
npm install smartsheet
```

## Example Usage

To call the API you must have an access token. You can generate an access token in Smartsheet UI under Account > Personal Settings > API Access.

The following is a brief sample using promises that shows you how to:

* Initialize the client
* List all sheets
* Load one sheet


```javascript
// Initialize the client
var client = require('smartsheet');
var smartsheet = client.createClient({
  accessToken: '<access_token>', // Replace <access_token> with your API token
  logLevel: 'info'
});

// The `smartsheet` variable now contains access to all of the APIs

// Set queryParameters for `include` and pagination
var options = {
  queryParameters: {
    include: "attachments",
    includeAll: true
  }
};

// List all sheets
smartsheet.sheets.listSheets(options)
  .then(function (result) {
    var sheetId = result.data[0].id;  // Choose the first sheet

    // Load one sheet
    smartsheet.sheets.getSheet({id: sheetId})
      .then(function(sheetInfo) {
        console.log(sheetInfo);
      })
      .catch(function(error) {
        console.log(error);
      });
  })
  .catch(function(error) {
    console.log(error);
  });
```

 See the [node-read-write-sheet](https://github.com/smartsheet-samples/node-read-write-sheet) project for a code example that shows how to call methods to read and write to a sheet using this SDK.
## Documentation

* The Smartsheet API documentation with corresponding SDK example code can be found [here](https://smartsheet.redoc.ly/).
* For an example of using the Javascript SDK see the sample project [here](https://github.com/smartsheet-samples/node-read-write-sheet).

## Advanced Topics
For details about more advanced features, see [Advanced Topics](ADVANCED.md).

## Developer Agreement
Review the [Developer Program Agreement](https://www.smartsheet.com/legal/developer-program-agreement).

## Acknowledgements

We would like to thank the following people for their contributions to this project:

* Cameron Bowie - [cameronbowie](https://github.com/cameronbowie)
* Nathan Armstrong - [armstnp](https://github.com/armstnp)
* Emily Koh - [emilykoh](https://github.com/emilykoh)
* Steve Weil - [seweil](https://github.com/seweil)
* Kim Brandl - [kbrandl](https://github.com/kbrandl)
