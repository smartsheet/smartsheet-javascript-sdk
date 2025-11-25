import { create as createRequestor } from '../../lib/utils/httpRequestor';
import * as client from '@smartsheet';
import { expect, jest, describe, beforeEach, afterEach, it } from '@jest/globals';

describe('Client Unit Tests', () => {
  let requestor = null;
  let smartsheet = null;

  beforeEach(() => {
    requestor = createRequestor({});
    jest.spyOn(requestor, 'get');
    smartsheet = client.createClient({accessToken:'1234', requestor: requestor});
  });

  afterEach(() => {
    smartsheet = null;
    requestor = null;
  });

  describe('#Sheets', () => {
    it(
      'should not change base URL when getSheetVersion is called first',
      () => {
        // First call to getSheet
        smartsheet.sheets.getSheet({ id: 100 });
        expect(requestor.get.mock.calls[0][0]).toHaveProperty('url', 'sheets');

        // First call to getSheetVersion
        smartsheet.sheets.getSheetVersion({ sheetId: 100 });
        expect(requestor.get.mock.calls[1][0]).toHaveProperty('url', 'sheets/100/version');

        // Second call to getSheet
        smartsheet.sheets.getSheet({ id: 100 });
        expect(requestor.get.mock.calls[2][0]).toHaveProperty('url', 'sheets');
      }
    );

    it(
      'should not change base URL when getOrganizationSheets is called first',
      () => {
        // First call to getSheet
        smartsheet.sheets.getSheet({ id: 100 });
        expect(requestor.get.mock.calls[0][0]).toHaveProperty('url', 'sheets');

        // First call to getSheetVersion
        smartsheet.sheets.listOrganizationSheets();
        expect(requestor.get.mock.calls[1][0]).toHaveProperty('url', 'users/sheets');

        // Second call to getSheet
        smartsheet.sheets.getSheet({ id: 100 });
        expect(requestor.get.mock.calls[2][0]).toHaveProperty('url', 'sheets');
      }
    );
  });
});
