import _ from 'underscore';

/**
 * @deprecated
 * The share module is deprecated. Please use the new sharing module instead.
 * The new sharing module provides asset-based sharing endpoints that support
 * all asset types (sheets, reports, sights, workspaces, etc.) through a unified API.
 *
 * Example migration:
 *
 * Old:
 * ```
 * client.sheets.getSheetShares({ sheetId: 123 });
 * ```
 *
 * New:
 * ```
 * client.sharing.listAssetShares({ assetType: 'sheet', assetId: 123 });
 * ```
 */
export default function shareModule(url) {
  /**
   * @deprecated Use the new sharing module instead
   */
  function create(options) {
    const requestor = options.requestor;

    const optionsToSend = _.extend({}, options.clientOptions);

    /**
     * @deprecated Use sharing.listAssetShares instead
     */
    const listShares = (getOptions, callback) => {
      const urlOptions = { url: buildUrl(getOptions) };
      return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
    };

    /**
     * @deprecated Use sharing.shareAsset instead
     */
    const share = (postOptions, callback) => {
      const urlOptions = { url: buildUrl(postOptions) };
      return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
    };

    /**
     * @deprecated Use sharing.deleteShare instead
     */
    const deleteShare = (deleteOptions, callback) => {
      const urlOptions = { url: buildUrl(deleteOptions) };
      return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
    };

    /**
     * @deprecated Use sharing.updateShare instead
     */
    const updateShare = (putOptions, callback) => {
      const urlOptions = { url: buildUrl(putOptions) };
      return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
    };

    const buildUrl = (urlOptions) =>
      url +
      '/' +
      (urlOptions.sheetId || urlOptions.workspaceId || urlOptions.reportId || urlOptions.sightId) +
      '/shares' +
      (urlOptions.shareId !== undefined ? '/' + urlOptions.shareId : '');

    return {
      /**
       * @deprecated Use sharing.getAssetShare instead
       */
      getShare: listShares,
      /**
       * @deprecated Use sharing.listShares instead
       */
      listShares: listShares,
      /**
       * @deprecated Use sharing.shareAsset instead
       */
      share: share,
      /**
       * @deprecated Use sharing.deleteShare instead
       */
      deleteShare: deleteShare,
      /**
       * @deprecated Use sharing.updateShare instead
       */
      updateShare: updateShare,
    };
  }

  return { create };
}
