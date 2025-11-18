// Common Webhook IDs
const TEST_WEBHOOK_ID = 4012345678901234;
const TEST_SCOPE_OBJECT_ID = 3285357287499652;

// Common Webhook Properties
const TEST_WEBHOOK_NAME = 'Test Webhook';
const TEST_CALLBACK_URL = 'https://www.myApp.com/webhooks';
const TEST_SCOPE_SHEET = 'sheet';
const TEST_SCOPE_PLAN = 'plan';
const TEST_EVENTS = ['*.*'];
const TEST_VERSION = 1;
const TEST_ENABLED = false;
const TEST_STATUS = 'NEW_NOT_VERIFIED';
const TEST_SHARED_SECRET = 'abc123def456ghi789jkl012mno345pqr678stu901vwx234yz';
const TEST_DISABLED_DETAILS = 'Webhook disabled due to verification failure';
const TEST_API_CLIENT_ID = 'abc123client';
const TEST_API_CLIENT_NAME = 'Test API Client';

// Common Webhook Timestamps
const TEST_CREATED_AT = '2020-08-25T12:15:47Z';
const TEST_MODIFIED_AT = '2020-10-04T18:32:47Z';
const TEST_LAST_CALLBACK_ATTEMPT = '2020-10-04T18:30:00Z';
const TEST_LAST_SUCCESSFUL_CALLBACK = '2020-10-04T18:29:45Z';

// Common Webhook Stats
const TEST_LAST_CALLBACK_ATTEMPT_RETRY_COUNT = 0;

// Common Webhook Subscope (for sheet webhooks)
const TEST_COLUMN_IDS = [7960873114331012, 2234073893033860];

// Common Webhook Custom Headers (for plan webhooks)
const TEST_CUSTOM_HEADERS = {
  'x-custom-header': 'custom-value',
  'x-another-header': 'another-value'
};

// Common Success Response Values
const TEST_SUCCESS_MESSAGE = 'SUCCESS';
const TEST_SUCCESS_RESULT_CODE = 0;

// Common Error Status Codes
const ERROR_500_STATUS_CODE = 500;
const ERROR_500_MESSAGE = 'Internal Server Error';
const ERROR_400_STATUS_CODE = 400;
const ERROR_400_MESSAGE = 'Malformed Request';

module.exports = {
  TEST_WEBHOOK_ID,
  TEST_SCOPE_OBJECT_ID,
  TEST_WEBHOOK_NAME,
  TEST_CALLBACK_URL,
  TEST_SCOPE_SHEET,
  TEST_SCOPE_PLAN,
  TEST_EVENTS,
  TEST_VERSION,
  TEST_ENABLED,
  TEST_STATUS,
  TEST_SHARED_SECRET,
  TEST_DISABLED_DETAILS,
  TEST_API_CLIENT_ID,
  TEST_API_CLIENT_NAME,
  TEST_CREATED_AT,
  TEST_MODIFIED_AT,
  TEST_LAST_CALLBACK_ATTEMPT,
  TEST_LAST_SUCCESSFUL_CALLBACK,
  TEST_LAST_CALLBACK_ATTEMPT_RETRY_COUNT,
  TEST_COLUMN_IDS,
  TEST_CUSTOM_HEADERS,
  TEST_SUCCESS_MESSAGE,
  TEST_SUCCESS_RESULT_CODE,
  ERROR_500_STATUS_CODE,
  ERROR_500_MESSAGE,
  ERROR_400_STATUS_CODE,
  ERROR_400_MESSAGE
};
