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

  describe('Asset-specific Sharing Methods', () => {
    describe('Sheets', () => {
      it('should have listShares method', () => {
        expect(typeof client.sheets.listShares).toBe('function');
      });

      it('should have getShare method', () => {
        expect(typeof client.sheets.getShare).toBe('function');
      });

      it('should have share method', () => {
        expect(typeof client.sheets.share).toBe('function');
      });

      it('should have updateShare method', () => {
        expect(typeof client.sheets.updateShare).toBe('function');
      });

      it('should have deleteShare method', () => {
        expect(typeof client.sheets.deleteShare).toBe('function');
      });
    });

    describe('Reports', () => {
      it('should have listShares method', () => {
        expect(typeof client.reports.listShares).toBe('function');
      });

      it('should have getShare method', () => {
        expect(typeof client.reports.getShare).toBe('function');
      });

      it('should have share method', () => {
        expect(typeof client.reports.share).toBe('function');
      });

      it('should have updateShare method', () => {
        expect(typeof client.reports.updateShare).toBe('function');
      });

      it('should have deleteShare method', () => {
        expect(typeof client.reports.deleteShare).toBe('function');
      });
    });

    describe('Workspaces', () => {
      it('should have listShares method', () => {
        expect(typeof client.workspaces.listShares).toBe('function');
      });

      it('should have getShare method', () => {
        expect(typeof client.workspaces.getShare).toBe('function');
      });

      it('should have share method', () => {
        expect(typeof client.workspaces.share).toBe('function');
      });

      it('should have updateShare method', () => {
        expect(typeof client.workspaces.updateShare).toBe('function');
      });

      it('should have deleteShare method', () => {
        expect(typeof client.workspaces.deleteShare).toBe('function');
      });
    });

    describe('Sights', () => {
      it('should have listShares method', () => {
        expect(typeof client.sights.listShares).toBe('function');
      });

      it('should have getShare method', () => {
        expect(typeof client.sights.getShare).toBe('function');
      });

      it('should have share method', () => {
        expect(typeof client.sights.share).toBe('function');
      });

      it('should have updateShare method', () => {
        expect(typeof client.sights.updateShare).toBe('function');
      });

      it('should have deleteShare method', () => {
        expect(typeof client.sights.deleteShare).toBe('function');
      });
    });
  });
});
