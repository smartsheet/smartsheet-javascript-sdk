import { WebhookScope } from "@smartsheet/webhooks/types";

// Common Webhook IDs
export const TEST_WEBHOOK_ID = 4012345678901234;
export const TEST_SCOPE_OBJECT_ID = 3285357287499652;

// Common Webhook Properties
export const TEST_WEBHOOK_NAME = 'Test Webhook';
export const TEST_CALLBACK_URL = 'https://www.myApp.com/webhooks';
export const TEST_SCOPE_SHEET = WebhookScope.SHEET;
export const TEST_SCOPE_PLAN = WebhookScope.PLAN;
export const TEST_EVENTS = ['*.*'];
export const TEST_VERSION = 1;
export const TEST_ENABLED = false;
export const TEST_STATUS = 'NEW_NOT_VERIFIED';
export const TEST_SHARED_SECRET = 'abc123def456ghi789jkl012mno345pqr678stu901vwx234yz';
export const TEST_DISABLED_DETAILS = 'Webhook disabled due to verification failure';
export const TEST_API_CLIENT_ID = 'abc123client';
export const TEST_API_CLIENT_NAME = 'Test API Client';

// Common Webhook Timestamps
export const TEST_CREATED_AT = '2020-08-25T12:15:47Z';
export const TEST_MODIFIED_AT = '2020-10-04T18:32:47Z';
export const TEST_LAST_CALLBACK_ATTEMPT = '2020-10-04T18:30:00Z';
export const TEST_LAST_SUCCESSFUL_CALLBACK = '2020-10-04T18:29:45Z';

// Common Webhook Stats
export const TEST_LAST_CALLBACK_ATTEMPT_RETRY_COUNT = 0;

// Common Webhook Subscope (for sheet webhooks)
export const TEST_COLUMN_IDS = [7960873114331012, 2234073893033860];

// Common Webhook Custom Headers (for plan webhooks)
export const TEST_CUSTOM_HEADERS = {
  'x-custom-header': 'custom-value',
  'x-another-header': 'another-value'
};

// Common Request Bodies
export const TEST_SHEET_WEBHOOK_REQUEST_BODY = {
  name: TEST_WEBHOOK_NAME,
  callbackUrl: TEST_CALLBACK_URL,
  scope: TEST_SCOPE_SHEET,
  scopeObjectId: TEST_SCOPE_OBJECT_ID,
  events: TEST_EVENTS,
  version: TEST_VERSION,
  subscope: {
    columnIds: TEST_COLUMN_IDS
  }
};

export const TEST_PLAN_WEBHOOK_REQUEST_BODY = {
  name: TEST_WEBHOOK_NAME,
  callbackUrl: TEST_CALLBACK_URL,
  scope: TEST_SCOPE_PLAN,
  scopeObjectId: TEST_SCOPE_OBJECT_ID,
  events: TEST_EVENTS,
  version: TEST_VERSION,
  customHeaders: TEST_CUSTOM_HEADERS
};

export const TEST_UPDATE_WEBHOOK_REQUEST_BODY_MINIMAL = {
  enabled: true
};

export const TEST_UPDATE_SHEET_WEBHOOK_REQUEST_BODY = {
  name: TEST_WEBHOOK_NAME,
  enabled: true
};

export const TEST_UPDATE_PLAN_WEBHOOK_REQUEST_BODY = {
  name: TEST_WEBHOOK_NAME,
  enabled: true,
  customHeaders: TEST_CUSTOM_HEADERS
};

// Common Success Response Values
export const TEST_SUCCESS_MESSAGE = 'SUCCESS';
export const TEST_SUCCESS_RESULT_CODE = 0;

// Common Error Status Codes
export const ERROR_500_STATUS_CODE = 500;
export const ERROR_500_MESSAGE = 'Internal Server Error';
export const ERROR_400_STATUS_CODE = 400;
export const ERROR_400_MESSAGE = 'Malformed Request';

// Common Query Parameters
export const TEST_PAGE_NUMBER = 1;
export const TEST_PAGE_SIZE = 100;
export const TEST_INCLUDE_ALL = false;

// Common Pagination Response Values
export const TEST_TOTAL_PAGES = 1;
export const TEST_TOTAL_COUNT = 2;
