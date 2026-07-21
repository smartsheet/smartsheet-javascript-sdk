import { AccessLevel, AssetType, ShareScope, ShareType } from '@smartsheet/sharing';

// Common share identifiers
export const TEST_SHARE_ID = 'AAAMCmYGFOeE';
export const TEST_SHARE_EMAIL = 'test.email@smartsheet.com';
// userId and groupId are returned as strings in the API JSON payload
export const TEST_SHARE_USER_ID = '9876543210';
export const TEST_SHARE_GROUP_ID = '1234567890';
export const TEST_SHARE_NAME = 'Example Name';
export const TEST_LAST_KEY = 'abcDefGhIjKlMnOpQrStUvWxYz';

// Asset targeted by share operations
export const TEST_ASSET_ID = 9876543210;

// Pagination / include query parameters
export const TEST_MAX_ITEMS = 25;
export const TEST_SHARING_INCLUDE = 'email';

// Common success response values
export const TEST_SUCCESS_MESSAGE = 'SUCCESS';
export const TEST_SUCCESS_RESULT_CODE = 0;

// Share object with all properties present (matches all-response-body-properties mappings)
export const EXPECTED_SHARE_ALL_PROPERTIES = {
  id: TEST_SHARE_ID,
  email: TEST_SHARE_EMAIL,
  userId: TEST_SHARE_USER_ID,
  groupId: TEST_SHARE_GROUP_ID,
  name: TEST_SHARE_NAME,
  type: ShareType.USER,
  accessLevel: AccessLevel.ADMIN,
  scope: ShareScope.ITEM,
};

// Share object with only required properties (matches required-response-body-properties mappings)
export const EXPECTED_SHARE_REQUIRED_PROPERTIES = {
  id: TEST_SHARE_ID,
  email: TEST_SHARE_EMAIL,
  userId: TEST_SHARE_USER_ID,
  groupId: TEST_SHARE_GROUP_ID,
  type: ShareType.USER,
  accessLevel: AccessLevel.ADMIN,
  scope: ShareScope.ITEM,
};

// Reusable query parameters targeting a sheet asset
export const TEST_SHEET_ASSET_QUERY = {
  assetType: AssetType.SHEET,
  assetId: TEST_ASSET_ID,
};

// Expected query parameters after URLSearchParams serialization (all values become strings)
export const EXPECTED_SHEET_ASSET_QUERY = {
  assetType: AssetType.SHEET,
  assetId: TEST_ASSET_ID.toString(),
};

// Common error status codes and messages
export const ERROR_500_STATUS_CODE = 500;
export const ERROR_500_MESSAGE = 'Internal Server Error';
export const ERROR_400_STATUS_CODE = 400;
export const ERROR_400_MESSAGE = 'Malformed Request';
