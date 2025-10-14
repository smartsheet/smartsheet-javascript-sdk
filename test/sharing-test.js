const smartsheet = require('../');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// Load API key from environment variable or a local .env file
let accessToken = process.env.SMARTSHEET_ACCESS_TOKEN;

if (!accessToken) {
  console.error('SMARTSHEET_ACCESS_TOKEN not found. Please set it as an environment variable or in a .env file.');
  process.exit(1);
}

// Initialize the client
const client = smartsheet.createClient({
  accessToken,
  logLevel: 'info'
});

// Test asset IDs - replace these with actual IDs from your account
const TEST_SHEET_ID = 123456789;
const TEST_WORKSPACE_ID = 987654321;
const TEST_REPORT_ID = 456789123;
const TEST_SIGHT_ID = 789123456;

// Test functions for the new sharing APIs
async function testListAssetShares() {
  console.log('\n=== Testing listAssetShares ===');
  
  try {
    console.log('Listing shares for a sheet...');
    const sheetShares = await client.sharing.listAssetShares({
      assetType: 'sheet',
      assetId: TEST_SHEET_ID
    });
    console.log('Sheet shares:', JSON.stringify(sheetShares, null, 2));
    
    console.log('\nListing shares for a workspace...');
    const workspaceShares = await client.sharing.listAssetShares({
      assetType: 'workspace',
      assetId: TEST_WORKSPACE_ID
    });
    console.log('Workspace shares:', JSON.stringify(workspaceShares, null, 2));
  } catch (err) {
    console.error('Error listing shares:', err);
  }
}

async function testGetAssetShare() {
  console.log('\n=== Testing getAssetShare ===');
  
  try {
    // First, get a list of shares to find a share ID
    const shares = await client.sharing.listAssetShares({
      assetType: 'sheet',
      assetId: TEST_SHEET_ID
    });
    
    if (shares.items?.length > 0) {
      const shareId = shares.items[0].id;
      console.log(`Getting share with ID ${shareId}...`);
      
      const share = await client.sharing.getAssetShare({
        assetType: 'sheet',
        assetId: TEST_SHEET_ID,
        shareId
      });
      
      console.log('Share details:', JSON.stringify(share, null, 2));
    } else {
      console.log('No shares found to test getAssetShare');
    }
  } catch (err) {
    console.error('Error getting share:', err);
  }
}

async function testShareAsset() {
  console.log('\n=== Testing shareAsset ===');
  
  // Replace with a valid email address
  const TEST_EMAIL = 'test.user@example.com';
  
  try {
    console.log(`Sharing sheet ${TEST_SHEET_ID} with ${TEST_EMAIL}...`);
    
    const result = await client.sharing.shareAsset({
      assetType: 'sheet',
      assetId: TEST_SHEET_ID,
      body: [
        {
          email: TEST_EMAIL,
          accessLevel: 'VIEWER'
        }
      ]
    });
    
    console.log('Share result:', JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('Error sharing asset:', err);
  }
}

async function testUpdateShare() {
  console.log('\n=== Testing updateShare ===');
  
  try {
    // First, get a list of shares to find a share ID
    const shares = await client.sharing.listAssetShares({
      assetType: 'sheet',
      assetId: TEST_SHEET_ID
    });
    
    if (shares.items && shares.items.length > 0) {
      const shareId = shares.items[0].id;
      console.log(`Updating share with ID ${shareId}...`);
      
      const result = await client.sharing.updateAssetShare({
        assetType: 'sheet',
        assetId: TEST_SHEET_ID,
        shareId,
        body: {
          accessLevel: 'EDITOR'
        }
      });
      
      console.log('Update result:', JSON.stringify(result, null, 2));
    } else {
      console.log('No shares found to test updateShare');
    }
  } catch (err) {
    console.error('Error updating share:', err);
  }
}

async function testDeleteShare() {
  console.log('\n=== Testing deleteShare ===');
  
  try {
    // First, get a list of shares to find a share ID
    const shares = await client.sharing.listAssetShares({
      assetType: 'sheet',
      assetId: TEST_SHEET_ID
    });
    
    if (shares.items && shares.items.length > 0) {
      const shareId = shares.items[0].id;
      console.log(`Deleting share with ID ${shareId}...`);
      
      const result = await client.sharing.deleteAssetShare({
        assetType: 'sheet',
        assetId: TEST_SHEET_ID,
        shareId
      });
      
      console.log('Delete result:', JSON.stringify(result, null, 2));
    } else {
      console.log('No shares found to test deleteShare');
    }
  } catch (err) {
    console.error('Error deleting share:', err);
  }
}

// Compare old and new APIs
async function compareOldAndNewApis() {
  console.log('\n=== Comparing Old and New APIs ===');
  
  try {
    console.log('Using old API to list sheet shares...');
    const oldApiShares = await client.sheets.getSheetShares({
      sheetId: TEST_SHEET_ID
    });
    console.log('Old API result:', JSON.stringify(oldApiShares, null, 2));
    
    console.log('\nUsing new API to list sheet shares...');
    const newApiShares = await client.sharing.listAssetShares({
      assetType: 'sheet',
      assetId: TEST_SHEET_ID
    });
    console.log('New API result:', JSON.stringify(newApiShares, null, 2));
  } catch (err) {
    console.error('Error comparing APIs:', err);
  }
}

// Run the tests
async function runTests() {
  console.log('Starting sharing API tests...');
  
  // Uncomment the tests you want to run
  await testListAssetShares();
  await testGetAssetShare();
  // await testShareAsset();  // Be careful with this one as it will actually share your sheet
  // await testUpdateShare(); // Be careful with this one as it will modify share permissions
  // await testDeleteShare(); // Be careful with this one as it will delete shares
  await compareOldAndNewApis();
  
  console.log('\nTests completed!');
}

runTests();
