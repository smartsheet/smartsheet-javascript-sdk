const smartsheet = require('../');

// Test that the sharing module is properly exported
console.log('Testing sharing module exports...');

// Check if the client has the sharing property
if (typeof smartsheet.createClient({}).sharing === 'undefined') {
  console.error('ERROR: sharing module is not exported in the client');
  process.exit(1);
}

// Check if the sharing types are exported
if (typeof smartsheet.AssetType === 'undefined') {
  console.warn('WARNING: AssetType enum is not exported');
}

if (typeof smartsheet.AccessLevel === 'undefined') {
  console.warn('WARNING: AccessLevel enum is not exported');
}

// Check the structure of the sharing module
const client = smartsheet.createClient({});
const sharingModule = client.sharing;

// Check if the sharing module has the expected methods
const expectedMethods = [
  'listAssetShares',
  'getAssetShare',
  'shareAsset',
  'updateShare',
  'deleteShare'
];

const missingMethods = expectedMethods.filter(method => typeof sharingModule[method] !== 'function');

if (missingMethods.length > 0) {
  console.error(`ERROR: The following methods are missing from the sharing module: ${missingMethods.join(', ')}`);
  process.exit(1);
}

// Check if the old sharing methods are still available (deprecated but working)
const sheets = client.sheets;
if (typeof sheets.getSheetShares !== 'function') {
  console.warn('WARNING: sheets.getSheetShares method is not available');
}

const reports = client.reports;
if (typeof reports.getReportShares !== 'function') {
  console.warn('WARNING: reports.getReportShares method is not available');
}

const workspaces = client.workspaces;
if (typeof workspaces.getWorkspaceShares !== 'function') {
  console.warn('WARNING: workspaces.getWorkspaceShares method is not available');
}

const sights = client.sights;
if (typeof sights.getSightShares !== 'function') {
  console.warn('WARNING: sights.getSightShares method is not available');
}

console.log('SUCCESS: Sharing module is properly exported and has all expected methods');