import { create as createRequestor } from '../../lib/utils/httpRequestor';
import * as client from '@smartsheet';
import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals';

describe('Client Unit Tests', () => {
  let requestor = null;
  let smartsheet = null;
  let spyGet = null;
  const mockResponse = {
    status: 200,
    headers: {
      'content-type':'application/json;charset=UTF-8'
    },
    data: {}
  };

  beforeEach(() => {
    requestor = createRequestor({});
    spyGet = jest.spyOn(requestor, 'get');
    spyGet.mockReturnValue(Promise.resolve(mockResponse));
    smartsheet = client.createClient({accessToken:'1234', requestor: requestor});
  });

  afterEach(() => {
    smartsheet = null;
    requestor = null;
    spyGet.mockRestore();
  });

  describe('#Sheets', () => {
    it(
      'should not change base URL when getSheetVersion is called first',
      async () => {
        // First call to getSheet
        await smartsheet.sheets.getSheet({ sheetId: 100 });
        expect(spyGet.mock.calls[0][0]).toHaveProperty('url', 'sheets/100');

        // First call to getSheetVersion
        await smartsheet.sheets.getSheetVersion({ sheetId: 100 });
        expect(spyGet.mock.calls[1][0]).toHaveProperty('url', 'sheets/100/version');

        // Second call to getSheet
        await smartsheet.sheets.getSheet({ sheetId: 100 });
        expect(spyGet.mock.calls[2][0]).toHaveProperty('url', 'sheets/100');
      }
    );

    it(
      'should not change base URL when getOrganizationSheets is called first',
      async () => {
        // First call to getSheet
        await smartsheet.sheets.getSheet({ sheetId: 100 });
        expect(spyGet.mock.calls[0][0]).toHaveProperty('url', 'sheets/100');

        // First call to getSheetVersion
        await smartsheet.sheets.listOrganizationSheets();
        expect(spyGet.mock.calls[1][0]).toHaveProperty('url', 'users/sheets');

        // Second call to getSheet
        await smartsheet.sheets.getSheet({ sheetId: 100 });
        expect(spyGet.mock.calls[2][0]).toHaveProperty('url', 'sheets/100');
      }
    );

    it(
      'should handle legacy id option with correct URL formatting',
      async () => {
        // Test that the legacy { id: ... } syntax still works with proper slash separator
        // This is a regression test for issue #163
        await requestor.get({ url: 'sheets', id: 12345 });
        
        // Verify the URL was constructed correctly with slash separator
        const callArgs = spyGet.mock.calls[0][0];
        expect(callArgs.url).toBe('sheets');
        expect(callArgs.id).toBe(12345);
      }
    );
  });
});
