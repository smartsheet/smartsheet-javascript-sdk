import * as smartsheetModule from '@smartsheet';
import { expect, describe, beforeEach, afterEach, it } from '@jest/globals';

describe('Client Unit Tests', () => {
  let smartsheet = null;

  beforeEach(() => {
    smartsheet = smartsheetModule.createClient({accessToken:'1234'});
  });

  afterEach(() => {
    smartsheet = null;
  });

  describe('#Constants', () => {
    it('should have Constants object', () => {
      expect(smartsheet).toHaveProperty('constants');
      expect(Object.keys(smartsheet.constants)).toHaveLength(7);
      expect(smartsheet.constants).toHaveProperty('maxRetryDurationMillis');
      expect(smartsheet.constants).toHaveProperty('accessLevel');
      expect(smartsheet.constants).toHaveProperty('accessScope');
      expect(smartsheet.constants).toHaveProperty('types');
      expect(smartsheet.constants).toHaveProperty('paperSize');
      expect(smartsheet.constants).toHaveProperty('acceptHeaders');
      expect(smartsheet.constants).toHaveProperty('sheet');
    });
  });

  describe('#Contacts', () => {
    it('should have Contacts object', () => {
      expect(smartsheet).toHaveProperty('contacts');
      expect(Object.keys(smartsheet.contacts)).toHaveLength(2);
    });

    it('should have Contacts GET methods', () => {
      expect(smartsheet.contacts).toHaveProperty('getContact');
      expect(smartsheet.contacts).toHaveProperty('listContacts');
    });
  });

  describe('#Events', () => {
    it('should have Events object', () => {
      expect(smartsheet).toHaveProperty('events');
      expect(Object.keys(smartsheet.events)).toHaveLength(1);
    });

    it('should have Events GET methods', () => {
      expect(smartsheet.events).toHaveProperty('getEvents');
    });
  });

  describe('#Favorites', () => {
    it('should have Favorites object', () => {
      expect(smartsheet).toHaveProperty('favorites');
    });

    it('should have get methods', () => {
      expect(smartsheet.favorites).toHaveProperty('listFavorites');
    });

    it('should have create methods', () => {
      expect(smartsheet.favorites).toHaveProperty('addItemsToFavorites');
      expect(smartsheet.favorites).toHaveProperty('addSheetToFavorites');
      expect(smartsheet.favorites).toHaveProperty('addFolderToFavorites');
      expect(smartsheet.favorites).toHaveProperty('addReportToFavorites');
      expect(smartsheet.favorites).toHaveProperty('addTemplateToFavorites');
      expect(smartsheet.favorites).toHaveProperty('addSightToFavorites');
      expect(smartsheet.favorites).toHaveProperty('addWorkspaceToFavorites');
    });

    it('should have delete methods', () => {
      expect(smartsheet.favorites).toHaveProperty('removeSheetFromFavorites');
      expect(smartsheet.favorites).toHaveProperty('removeSightFromFavorites');
      expect(smartsheet.favorites).toHaveProperty('removeWorkspaceFromFavorites');
      expect(smartsheet.favorites).toHaveProperty('removeFolderFromFavorites');
      expect(smartsheet.favorites).toHaveProperty('removeTemplateFromFavorites');
      expect(smartsheet.favorites).toHaveProperty('removeReportFromFavorites');
      expect(smartsheet.favorites).toHaveProperty('removeSheetsFromFavorites');
      expect(smartsheet.favorites).toHaveProperty('removeSightsFromFavorites');
      expect(smartsheet.favorites).toHaveProperty('removeWorkspacesFromFavorites');
      expect(smartsheet.favorites).toHaveProperty('removeFoldersFromFavorites');
      expect(smartsheet.favorites).toHaveProperty('removeTemplatesFromFavorites');
      expect(smartsheet.favorites).toHaveProperty('removeReportsFromFavorites');
    });
  });

  describe('#folders', () => {
    it('should have folders object', () => {
      expect(smartsheet).toHaveProperty('folders');
      expect(Object.keys(smartsheet.folders)).toHaveLength(8);
    });

    it('should have get methods', () => {
      expect(smartsheet.folders).toHaveProperty('getFolderMetadata');
      expect(smartsheet.folders).toHaveProperty('getFolderChildren');
      expect(smartsheet.folders).toHaveProperty('getFolderPath');
    });

    it('should have create methods', () => {
      expect(smartsheet.folders).toHaveProperty('createChildFolder');
      expect(smartsheet.folders).toHaveProperty('copyFolder');
    });

    it('should have update methods', () => {
      expect(smartsheet.folders).toHaveProperty('updateFolder');
      expect(smartsheet.folders).toHaveProperty('moveFolder');
    });

    it('should have delete methods', () => {
      expect(smartsheet.folders).toHaveProperty('deleteFolder');
    });
  });

  describe('#groups', () => {
    it('should have groups object', () => {
      expect(smartsheet).toHaveProperty('groups');
      expect(Object.keys(smartsheet.groups)).toHaveLength(7);
    });

    it('should have get methods', () => {
      expect(smartsheet.groups).toHaveProperty('listGroups');
      expect(smartsheet.groups).toHaveProperty('getGroup');
    });

    it('should have create methods', () => {
      expect(smartsheet.groups).toHaveProperty('createGroup');
      expect(smartsheet.groups).toHaveProperty('addGroupMembers');
    });

    it('should have update methods', () => {
      expect(smartsheet.groups).toHaveProperty('updateGroup');
    });

    it('should have delete methods', () => {
      expect(smartsheet.groups).toHaveProperty('deleteGroup');
      expect(smartsheet.groups).toHaveProperty('removeGroupMember');
    });
  });

  describe('#home', () => {
    it('should have home object', () => {
      expect(smartsheet).toHaveProperty('home');
      expect(Object.keys(smartsheet.home)).toHaveLength(3);
    });

    it('should have get methods', () => {
      expect(smartsheet.home).toHaveProperty('listContents');
      expect(smartsheet.home).toHaveProperty('listFolders');
    });

    it('should have create methods', () => {
      expect(smartsheet.home).toHaveProperty('createFolder');
    });
  });

  describe('#images', () => {
    it('should have image object', () => {
      expect(smartsheet).toHaveProperty('images');
      expect(Object.keys(smartsheet.images)).toHaveLength(2);
    });

    it('should have get methods', () => {
      expect(smartsheet.images).toHaveProperty('listImageUrls');
    });
  });

  describe('#search', () => {
    it('should have search object', () => {
      expect(smartsheet).toHaveProperty('search');
      expect(Object.keys(smartsheet.search)).toHaveLength(2);
    });

    it('should have get methods', () => {
      expect(smartsheet.search).toHaveProperty('searchAll');
      expect(smartsheet.search).toHaveProperty('searchSheet');
    });
  });

  describe('#reports', () => {
    it('should have reports object', () => {
      expect(smartsheet).toHaveProperty('reports');
      expect(Object.keys(smartsheet.reports)).toHaveLength(19);
    });

    it('should have get methods', () => {
      expect(smartsheet.reports).toHaveProperty('listReports');
      expect(smartsheet.reports).toHaveProperty('getReport');
      expect(smartsheet.reports).toHaveProperty('getReportAsExcel');
      expect(smartsheet.reports).toHaveProperty('getReportAsCSV');
      expect(smartsheet.reports).toHaveProperty('getReportPublishStatus');
      expect(smartsheet.reports).toHaveProperty('getReportPath');
      expect(smartsheet.reports).toHaveProperty('listReportScope');
      expect(smartsheet.reports).toHaveProperty('listReportColumns');
      expect(smartsheet.reports).toHaveProperty('getReportColumn');
      expect(smartsheet.reports).toHaveProperty('getReportDefinition');
    });

    it('should have create methods', () => {
      expect(smartsheet.reports).toHaveProperty('createReport');
      expect(smartsheet.reports).toHaveProperty('addReportScope');
      expect(smartsheet.reports).toHaveProperty('addReportColumns');
    });

    it('should have update methods', () => {
      expect(smartsheet.reports).toHaveProperty('setReportPublishStatus');
      expect(smartsheet.reports).toHaveProperty('sendReportViaEmail');
      expect(smartsheet.reports).toHaveProperty('updateReportColumn');
    });

    it('should have delete methods', () => {
      expect(smartsheet.reports).toHaveProperty('deleteReport');
      expect(smartsheet.reports).toHaveProperty('removeReportScope');
      expect(smartsheet.reports).toHaveProperty('deleteReportColumn');
    });
  });

  describe('#server', () => {
    it('should have server object', () => {
      expect(smartsheet).toHaveProperty('server');
      expect(Object.keys(smartsheet.server)).toHaveLength(1);
    });

    it('should have get methods', () => {
      expect(smartsheet.server).toHaveProperty('getInfo');
    });
  });

  describe('#Sheets', () => {
    it('should have Sheets object', () => {
      expect(smartsheet).toHaveProperty('sheets');
    });

    it('should have Sheets get methods', () => {
      expect(smartsheet.sheets).toHaveProperty('getAttachment');
      expect(smartsheet.sheets).toHaveProperty('getCellHistory');
      expect(smartsheet.sheets).toHaveProperty('getComment');
      expect(smartsheet.sheets).toHaveProperty('getDiscussion');
      expect(smartsheet.sheets).toHaveProperty('getDiscussions');
      expect(smartsheet.sheets).toHaveProperty('getPublishStatus');
      expect(smartsheet.sheets).toHaveProperty('getRowAttachments');
      expect(smartsheet.sheets).toHaveProperty('getRowDiscussions');
      expect(smartsheet.sheets).toHaveProperty('getSheet');
      expect(smartsheet.sheets).toHaveProperty('getSheetAsCSV');
      expect(smartsheet.sheets).toHaveProperty('getSheetAsExcel');
      expect(smartsheet.sheets).toHaveProperty('getSheetAsPDF');
      expect(smartsheet.sheets).toHaveProperty('getSheetVersion');
      expect(smartsheet.sheets).toHaveProperty('listAttachmentVersions');
      expect(smartsheet.sheets).toHaveProperty('listAttachments');
      expect(smartsheet.sheets).toHaveProperty('listDiscussionAttachments');
      expect(smartsheet.sheets).toHaveProperty('listOrganizationSheets');
      expect(smartsheet.sheets).toHaveProperty('listSheets');
    });

    it('should have Row methods', () => {
      expect(smartsheet.sheets).toHaveProperty('addImageToCell');
      expect(smartsheet.sheets).toHaveProperty('addRow');
      expect(smartsheet.sheets).toHaveProperty('addRows');
      expect(smartsheet.sheets).toHaveProperty('addRowFileAttachment');
      expect(smartsheet.sheets).toHaveProperty('addRowUrlAttachment');
      expect(smartsheet.sheets).toHaveProperty('addRowAttachment');
      expect(smartsheet.sheets).toHaveProperty('createRowDiscussion');
      expect(smartsheet.sheets).toHaveProperty('getRow');
      expect(smartsheet.sheets).toHaveProperty('getRowAttachments');
      expect(smartsheet.sheets).toHaveProperty('getRowDiscussions');
      expect(smartsheet.sheets).toHaveProperty('updateRow');
      expect(smartsheet.sheets).toHaveProperty('sendRows');
    });

    it('should have Column methods', () => {
      expect(smartsheet.sheets).toHaveProperty('addColumn');
      expect(smartsheet.sheets).toHaveProperty('getColumn');
      expect(smartsheet.sheets).toHaveProperty('getColumns');
      expect(smartsheet.sheets).toHaveProperty('updateColumn');
    });

    it('should have Sheets create methods', () => {
      expect(smartsheet.sheets).toHaveProperty('addCommentFileAttachment');
      expect(smartsheet.sheets).toHaveProperty('addCommentUrlAttachment');
      expect(smartsheet.sheets).toHaveProperty('addCommentAttachment');
      expect(smartsheet.sheets).toHaveProperty('addDiscussionComment');
      expect(smartsheet.sheets).toHaveProperty('addFileAttachment');
      expect(smartsheet.sheets).toHaveProperty('addUrlAttachment');
      expect(smartsheet.sheets).toHaveProperty('addAttachment');
      expect(smartsheet.sheets).toHaveProperty('attachNewVersion');
      expect(smartsheet.sheets).toHaveProperty('createDiscussion');
      expect(smartsheet.sheets).toHaveProperty('createRowDiscussion');
      expect(smartsheet.sheets).toHaveProperty('createSheet');
      expect(smartsheet.sheets).toHaveProperty('createSheetFromExisting');
      expect(smartsheet.sheets).toHaveProperty('createSheetInFolder');
      expect(smartsheet.sheets).toHaveProperty('createSheetInWorkspace');
      expect(smartsheet.sheets).toHaveProperty('copySheet');
      expect(smartsheet.sheets).toHaveProperty('moveSheet');
    });

    it('should have Sheets update methods', () => {
      expect(smartsheet.sheets).toHaveProperty('updateSheet');
      expect(smartsheet.sheets).toHaveProperty('editComment');
    });

    it('should have Sheets delete methods', () => {
      expect(smartsheet.sheets).toHaveProperty('deleteAllAttachmentVersions');
      expect(smartsheet.sheets).toHaveProperty('deleteAttachment');
      expect(smartsheet.sheets).toHaveProperty('deleteColumn');
      expect(smartsheet.sheets).toHaveProperty('deleteComment');
      expect(smartsheet.sheets).toHaveProperty('deleteDiscussion');
      expect(smartsheet.sheets).toHaveProperty('deleteRow');
      expect(smartsheet.sheets).toHaveProperty('deleteRows');
      expect(smartsheet.sheets).toHaveProperty('deleteSheet');
    });

    it('should have update request methods', () => {
      expect(smartsheet.sheets).toHaveProperty('createUpdateRequest');
      expect(smartsheet.sheets).toHaveProperty('deleteUpdateRequest');
      expect(smartsheet.sheets).toHaveProperty('getUpdateRequest');
      expect(smartsheet.sheets).toHaveProperty('getAllUpdateRequests');
      expect(smartsheet.sheets).toHaveProperty('changeUpdateRequest');
      expect(smartsheet.sheets).toHaveProperty('deleteSentUpdateRequest');
      expect(smartsheet.sheets).toHaveProperty('getSentUpdateRequest');
      expect(smartsheet.sheets).toHaveProperty('getAllSentUpdateRequests');
    });
  });
  describe('#Sights', () => {
    it('should have Sights object', () => {
      expect(smartsheet).toHaveProperty('sights');
      expect(Object.keys(smartsheet.sights)).toHaveLength(9);
    });

    it('should have Sights get methods', () => {
      expect(smartsheet.sights).toHaveProperty('getSight');
      expect(smartsheet.sights).toHaveProperty('listSights');
      expect(smartsheet.sights).toHaveProperty('getSightPublishStatus');
      expect(smartsheet.sights).toHaveProperty('getSightPath');
    });

    it('should have Sights update methods', () => {
      expect(smartsheet.sights).toHaveProperty('setSightPublishStatus');
      expect(smartsheet.sights).toHaveProperty('moveSight');
      expect(smartsheet.sights).toHaveProperty('updateSight');
    });

    it('should have Sight create methods', () => {
      expect(smartsheet.sights).toHaveProperty('copySight');
    });

    it('should have Sights delete methods', () => {
      expect(smartsheet.sights).toHaveProperty('deleteSight');
    });
  });

  describe('#tokens', () => {
    it('should have a tokens object', () => {
      expect(smartsheet).toHaveProperty('tokens');
      expect(Object.keys(smartsheet.tokens)).toHaveLength(3);
    });

    it('should have get methods', () => {
      expect(smartsheet.tokens).toHaveProperty('getAccessToken');
      expect(smartsheet.tokens).toHaveProperty('refreshAccessToken');
    });

    it('should have delete methods', () => {
      expect(smartsheet.tokens).toHaveProperty('revokeAccessToken');
    });
  });

  describe('#users', () => {
    it('should have user object', () => {
      expect(smartsheet).toHaveProperty('users');
      expect(Object.keys(smartsheet.users)).toHaveLength(19);
    });

    it('should have get methods', () => {
      expect(smartsheet.users).toHaveProperty('getCurrentUser');
      expect(smartsheet.users).toHaveProperty('listAllUsers');
      expect(smartsheet.users).toHaveProperty('getUser');
      expect(smartsheet.users).toHaveProperty('getAlternateEmail');
      expect(smartsheet.users).toHaveProperty('listAlternateEmails');
    });

    it('should have create methods', () => {
      expect(smartsheet.users).toHaveProperty('addUser');
      expect(smartsheet.users).toHaveProperty('addUserAndSendEmail');
      expect(smartsheet.users).toHaveProperty('addAlternateEmail');
      expect(smartsheet.users).toHaveProperty('addProfileImage');
      expect(smartsheet.users).toHaveProperty('deactivateUser');
      expect(smartsheet.users).toHaveProperty('reactivateUser');
    });

    it('should have update methods', () => {
      expect(smartsheet.users).toHaveProperty('updateUser');
      expect(smartsheet.users).toHaveProperty('makeAlternateEmailPrimary');
    });

    it('should have delete methods', () => {
      expect(smartsheet.users).toHaveProperty('removeUser');
      expect(smartsheet.users).toHaveProperty('deleteAlternateEmail');
    });
  });

  describe('#webhooks', () => {
    it('should have webhook object', () => {
      expect(smartsheet).toHaveProperty('webhooks');
      expect(Object.keys(smartsheet.webhooks)).toHaveLength(6);
    });

    it('should have get methods', () => {
      expect(smartsheet.webhooks).toHaveProperty('getWebhook');
      expect(smartsheet.webhooks).toHaveProperty('listWebhooks');
    });

    it('should have post methods', () => {
      expect(smartsheet.webhooks).toHaveProperty('createWebhook');
      expect(smartsheet.webhooks).toHaveProperty('resetSharedSecret');
    });

    it('should have put methods', () => {
      expect(smartsheet.webhooks).toHaveProperty('updateWebhook');
    });

    it('should have delete methods', () => {
      expect(smartsheet.webhooks).toHaveProperty('deleteWebhook');
    });
  });

  describe('#workspaces', () => {
    it('should have workspaces object', () => {
      expect(smartsheet).toHaveProperty('workspaces');
      expect(Object.keys(smartsheet.workspaces)).toHaveLength(8);
    });

    it('should have get methods', () => {
      expect(smartsheet.workspaces).toHaveProperty('getWorkspaceMetadata');
      expect(smartsheet.workspaces).toHaveProperty('getWorkspaceChildren');
      expect(smartsheet.workspaces).toHaveProperty('listWorkspaces');
    });

    it('should have create methods', () => {
      expect(smartsheet.workspaces).toHaveProperty('createWorkspace');
      expect(smartsheet.workspaces).toHaveProperty('createFolder');
      expect(smartsheet.workspaces).toHaveProperty('copyWorkspace');
    });

    it('should have update methods', () => {
      expect(smartsheet.workspaces).toHaveProperty('updateWorkspace');
    });

    it('should have delete methods', () => {
      expect(smartsheet.workspaces).toHaveProperty('deleteWorkspace');
    });
  });

  describe('#createClient with logLevel', () => {
    it('should not throw when logLevel is set to "info"', () => {
      expect(() => {
        smartsheetModule.createClient({ accessToken: '1234', logLevel: 'info' });
      }).not.toThrow();
    });

    it('should not throw when logLevel is set to "warn"', () => {
      expect(() => {
        smartsheetModule.createClient({ accessToken: '1234', logLevel: 'warn' });
      }).not.toThrow();
    });

    it('should not throw when logLevel is set to "error"', () => {
      expect(() => {
        smartsheetModule.createClient({ accessToken: '1234', logLevel: 'error' });
      }).not.toThrow();
    });

    it('should not throw when logLevel is set to "verbose"', () => {
      expect(() => {
        smartsheetModule.createClient({ accessToken: '1234', logLevel: 'verbose' });
      }).not.toThrow();
    });

    it('should not throw when logLevel is set to "debug"', () => {
      expect(() => {
        smartsheetModule.createClient({ accessToken: '1234', logLevel: 'debug' });
      }).not.toThrow();
    });

    it('should not throw when logLevel is set to "silly"', () => {
      expect(() => {
        smartsheetModule.createClient({ accessToken: '1234', logLevel: 'silly' });
      }).not.toThrow();
    });

    it('should throw when logLevel is set to an invalid value', () => {
      expect(() => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        smartsheetModule.createClient({ accessToken: '1234', logLevel: 'invalidLevel' as any });
      }).toThrow();
    });
  });

});
