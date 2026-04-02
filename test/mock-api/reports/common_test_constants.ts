// Common Report IDs
export const TEST_REPORT_ID = 4583173393803140;

// Common Report Names
export const TEST_REPORT_NAME = 'Test Report';

// Common Report Properties
export const TEST_REPORT_OWNER = 'test.user@smartsheet.com';
export const TEST_REPORT_OWNER_ID = 1234567890123456;
export const TEST_REPORT_PERMALINK = 'https://app.smartsheet.com/reports/test-report';
export const TEST_REPORT_ACCESS_LEVEL = 'VIEWER';

// All Properties Test Values
export const TEST_REPORT_OWNER_ALL_PROPS = 'john.doe@smartsheet.com';
export const TEST_REPORT_OWNER_ID_ALL_PROPS = 1234567890;
export const TEST_REPORT_ACCESS_LEVEL_ALL_PROPS = 'OWNER';
export const TEST_REPORT_PERMALINK_ALL_PROPS = 'https://app.smartsheet.com/reports/test';

// Common Timestamps
export const TEST_CREATED_AT = '2019-08-24T14:15:22Z';
export const TEST_MODIFIED_AT = '2019-08-24T14:15:22Z';
export const TEST_MODIFIED_AT_ALL_PROPS = '2019-08-25T10:30:45Z';
export const TEST_MODIFIED_SINCE = '2023-01-01T00:00:00Z';

// Common Success Response Values
export const TEST_SUCCESS_MESSAGE = 'SUCCESS';
export const TEST_SUCCESS_RESULT_CODE = 0;

// Common Error Status Codes
export const ERROR_500_STATUS_CODE = 500;
export const ERROR_500_MESSAGE = 'Internal Server Error';
export const ERROR_400_STATUS_CODE = 400;
export const ERROR_400_MESSAGE = 'Malformed Request';

// Report Scope - Source Sheets (SourceSheet type requires all these properties)
export const TEST_SOURCE_SHEET_ID = 1234567890123456;
export const TEST_SOURCE_SHEET_NAME = 'Source Sheet 1';
export const TEST_SOURCE_SHEET_ACCESS_LEVEL = 'VIEWER';
export const TEST_SOURCE_SHEET_PERMALINK = 'https://app.smartsheet.com/sheets/source-sheet-1';
export const TEST_SOURCE_SHEET_FROM_ID = 0;
export const TEST_SOURCE_SHEET_OWNER_ID = 1234567890123456;
export const TEST_SOURCE_SHEET_OWNER = 'test.user@smartsheet.com';

// Report Scope - Workspaces (WorkspaceListing type)
export const TEST_SOURCE_WORKSPACE_ID = 9876543210987654;
export const TEST_SOURCE_WORKSPACE_NAME = 'Source Workspace';
export const TEST_SOURCE_WORKSPACE_ACCESS_LEVEL = 'VIEWER';
export const TEST_SOURCE_WORKSPACE_PERMALINK = 'https://app.smartsheet.com/workspaces/source-workspace';

// Report Scope Assets
export const TEST_SHEET_ID = 9876543210;
export const TEST_WORKSPACE_ID = 1122334455;
export const TEST_ASSET_TYPE_SHEET = 'SHEET';
export const TEST_ASSET_TYPE_WORKSPACE = 'WORKSPACE';

// Report Columns (Column type requires all these properties)
export const TEST_COLUMN_1_ID = 1111111111111111;
export const TEST_COLUMN_1_INDEX = 0;
export const TEST_COLUMN_1_TITLE = 'Task Name';
export const TEST_COLUMN_1_TYPE = 'TEXT_NUMBER';
export const TEST_COLUMN_1_PRIMARY = true;
export const TEST_COLUMN_1_WIDTH = 150;

export const TEST_COLUMN_2_ID = 2222222222222222;
export const TEST_COLUMN_2_INDEX = 1;
export const TEST_COLUMN_2_TITLE = 'Status';
export const TEST_COLUMN_2_TYPE = 'PICKLIST';
export const TEST_COLUMN_2_OPTIONS = ['Not Started', 'In Progress', 'Complete'];
export const TEST_COLUMN_2_WIDTH = 100;

// Report Effective Attachment Options
export const TEST_EFFECTIVE_ATTACHMENT_OPTIONS = ['BOX', 'DROPBOX', 'GOOGLE_DRIVE', 'ONEDRIVE'];

// Report Project Settings - Non Working Days
export const TEST_NON_WORKING_DAYS = ["2019-12-25"];
export const TEST_WORKING_DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];

// Report Rows (Row type requires all these properties)
export const TEST_ROW_ID = 5555555555555555;
export const TEST_ROW_SHEET_ID = 1234567890123456;
export const TEST_ROW_NUMBER = 1;
export const TEST_ROW_SIBLING_ID = 0;
export const TEST_ROW_ACCESS_LEVEL = 'VIEWER';
export const TEST_ROW_EXPANDED = true;
export const TEST_ROW_LOCKED = false;
export const TEST_ROW_LOCKED_FOR_USER = false;
export const TEST_ROW_VERSION = 0;

// Report Summary Fields (SummaryField type requires all these properties)
export const TEST_SUMMARY_FIELD_ID = 7777777777777777;
export const TEST_SUMMARY_FIELD_INDEX = 0;
export const TEST_SUMMARY_FIELD_TITLE = 'Total Tasks';
export const TEST_SUMMARY_FIELD_TYPE = 'TEXT_NUMBER';
export const TEST_SUMMARY_FIELD_DISPLAY_VALUE = '10';
export const TEST_SUMMARY_FIELD_LOCKED = false;
export const TEST_SUMMARY_FIELD_LOCKED_FOR_USER = false;
export const TEST_SUMMARY_FIELD_VALIDATION = false;

// Empty User object
export const TEST_EMPTY_USER = { email: '', name: '' };

// Empty AutoNumberFormat
export const TEST_EMPTY_AUTO_NUMBER_FORMAT = {
    fill: '',
    prefix: '',
    startingNumber: 0,
    suffix: ''
};

// Empty Hyperlink
export const TEST_EMPTY_HYPERLINK = {
    reportId: 0,
    sheetId: 0,
    sightId: 0,
    url: ''
};

// Empty ObjectValue
export const TEST_EMPTY_OBJECT_VALUE = {
    objectType: '',
    value: ''
};

// Empty Proof
export const TEST_EMPTY_PROOF = {
    id: 0,
    originalId: 0,
    type: '',
    documentType: '',
    proofRequestUrl: '',
    version: 0,
    lastUpdatedAt: TEST_CREATED_AT,
    lastUpdatedBy: TEST_EMPTY_USER,
    isCompleted: false
};
