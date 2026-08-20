import * as smartsheet from '@smartsheet';
import { expect, describe, beforeEach, it } from '@jest/globals';

describe('Sharing Module', () => {
  let client;

  beforeEach(() => {
    client = smartsheet.createClient({ accessToken: '1234' });
  });

  describe('Module Exports', () => {
    it('should export the sharing module in the client', () => {
      expect(client.sharing).toBeDefined();
    });

    it('should export AssetType enum', () => {
      expect(smartsheet.AssetType).toBeDefined();
    });

    it('should export AccessLevel enum', () => {
      expect(smartsheet.AccessLevel).toBeDefined();
    });
  });

  describe('Sharing Module Methods', () => {
    const expectedMethods = [
      'listAssetShares',
      'getAssetShare',
      'shareAsset',
      'updateAssetShare',
      'deleteAssetShare'
    ];

    expectedMethods.forEach(method => {
      it(`should have ${method} method`, () => {
        expect(typeof client.sharing[method]).toBe('function');
      });
    });
  });
});
