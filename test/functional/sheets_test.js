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
  });

  describe('#Sheets', () => {
    it(
      'should not change base URL when getSheetVersion is called first',
      async () => {
        // First call to getSheet
        await smartsheet.sheets.getSheet({ id: 100 });
        expect(spyGet.mock.calls[0][0]).toHaveProperty('url', 'sheets');

        // First call to getSheetVersion
        await smartsheet.sheets.getSheetVersion({ sheetId: 100 });
        expect(spyGet.mock.calls[1][0]).toHaveProperty('url', 'sheets/100/version');

        // Second call to getSheet
        await smartsheet.sheets.getSheet({ id: 100 });
        expect(spyGet.mock.calls[2][0]).toHaveProperty('url', 'sheets');
      }
    );

    it(
      'should not change base URL when getOrganizationSheets is called first',
      async () => {
        // First call to getSheet
        await smartsheet.sheets.getSheet({ id: 100 });
        expect(spyGet.mock.calls[0][0]).toHaveProperty('url', 'sheets');

        // First call to getSheetVersion
        await smartsheet.sheets.listOrganizationSheets();
        expect(spyGet.mock.calls[1][0]).toHaveProperty('url', 'users/sheets');

        // Second call to getSheet
        await smartsheet.sheets.getSheet({ id: 100 });
        expect(spyGet.mock.calls[2][0]).toHaveProperty('url', 'sheets');
      }
    );
  });
});
