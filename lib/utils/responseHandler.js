var Promise = require("bluebird");

module.exports = (response) => {
  var outResponse = {
    statusCode: response.status,
    headers: response.headers,
    body: response.data
  };

  if (response.status != 200) {
    var errorResponse = outResponse;
    if (/\bapplication\/json\b/.test(response.headers['content-type'])) {
      errorResponse.errorCode = response.data.errorCode;
      errorResponse.message = response.data.message;
      errorResponse.refId = response.data.refId;
      
      if (response.data.detail !== undefined) {
        errorResponse.detail = response.data.detail;
      }
    } else {
      errorResponse.message = response.data;
    }

    return errorResponse;
  }

  outResponse.content = response.data;

  return outResponse;
};
