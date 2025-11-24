import sinon from 'sinon';
import should from 'should';
import { create as createRequestor } from '../../lib/utils/httpRequestor';
import * as client from '@smartsheet';

describe('Client Unit Tests', function() {
  let requestor = null;
  let smartsheet = null;

  beforeEach(function() {
    requestor = createRequestor({});
    sinon.spy(requestor, 'get');
    smartsheet = client.createClient({accessToken:'1234', requestor: requestor});
  });

  afterEach(function() {
    smartsheet = null;
    requestor = null;
  });

  describe('#Sheets', function() {
    it('should not change base URL when getSheetVersion is called first', function() {
      // First call to getSheet
      smartsheet.sheets.getSheet({ id: 100 });
      should(requestor.get.firstCall.args[0]).have.property('url', 'sheets');

      // First call to getSheetVersion
      smartsheet.sheets.getSheetVersion({ sheetId: 100 });
      should(requestor.get.secondCall.args[0]).have.property('url', 'sheets/100/version');

      // Second call to getSheet
      smartsheet.sheets.getSheet({ id: 100 });
      should(requestor.get.thirdCall.args[0]).have.property('url', 'sheets');
    });

    it('should not change base URL when getOrganizationSheets is called first', function () {
      // First call to getSheet
      smartsheet.sheets.getSheet({ id: 100 });
      should(requestor.get.firstCall.args[0]).have.property('url', 'sheets');

      // First call to getSheetVersion
      smartsheet.sheets.listOrganizationSheets();
      should(requestor.get.secondCall.args[0]).have.property('url', 'users/sheets');

      // Second call to getSheet
      smartsheet.sheets.getSheet({ id: 100 });
      should(requestor.get.thirdCall.args[0]).have.property('url', 'sheets');
    });
  });
});
