import type { CreateOptions } from '../types';
// Use any type for CommonJS module
// @ts-ignore
import shareModule from '../share/share.js';
import type {
  CopySight,
  DeleteSight,
  GetSight,
  GetSightPublishStatus,
  ListSights,
  MoveSight,
  SetSightPublishStatus,
  SightsApi,
  UpdateSight,
} from './types';

export const createSights = (options: CreateOptions): SightsApi => {
  const requestor = options.requestor;
  // Legacy shares module (deprecated)
  const shares = shareModule(options.apiUrls.sights);
  
  // Create a wrapper for the new sharing API that maintains backward compatibility
  const sharesWrapper = {
    create: function(options: any) {
      const legacyShares = shares.create(options);
      
      /**
       * @deprecated Use client.sharing.listAssetShares instead
       */
      function getSightShares(getOptions: any, callback?: any) {
        console.warn('DEPRECATED: getSightShares is deprecated. Use client.sharing.listAssetShares instead.');
        return legacyShares.listShares(getOptions, callback);
      }
      
      /**
       * @deprecated Use client.sharing.shareAsset instead
       */
      function shareSight(postOptions: any, callback?: any) {
        console.warn('DEPRECATED: shareSight is deprecated. Use client.sharing.shareAsset instead.');
        return legacyShares.share(postOptions, callback);
      }
      
      /**
       * @deprecated Use client.sharing.deleteShare instead
       */
      function deleteShare(deleteOptions: any, callback?: any) {
        console.warn('DEPRECATED: deleteShare is deprecated. Use client.sharing.deleteShare instead.');
        return legacyShares.deleteShare(deleteOptions, callback);
      }
      
      /**
       * @deprecated Use client.sharing.updateShare instead
       */
      function updateShare(putOptions: any, callback?: any) {
        console.warn('DEPRECATED: updateShare is deprecated. Use client.sharing.updateShare instead.');
        return legacyShares.updateShare(putOptions, callback);
      }
      
      return {
        getSightShares,
        shareSight,
        deleteShare,
        updateShare
      };
    }
  };

  const optionsToSend = {
    ...options.clientOptions,
  };

  const getSight: GetSight = (getOptions, callback) => {
    const requestOptions = {
      ...optionsToSend,
      url: `${options.apiUrls.sights}${getOptions.sightId}`,
      ...getOptions,
    };
    return requestor.get(requestOptions, callback);
  };

  const listSights: ListSights = (getOptions, callback) => {
    const requestOptions = {
      ...optionsToSend,
      url: options.apiUrls.sights,
      ...getOptions,
    };
    return requestor.get(requestOptions, callback);
  };

  const deleteSight: DeleteSight = (deleteOptions, callback) => {
    const requestOptions = {
      ...optionsToSend,
      url: `${options.apiUrls.sights}${deleteOptions.sightId}`,
      ...deleteOptions,
    };
    return requestor.delete(requestOptions, callback);
  };

  const updateSight: UpdateSight = (putOptions, callback) => {
    const requestOptions = {
      ...optionsToSend,
      url: `${options.apiUrls.sights}${putOptions.sightId}`,
      ...putOptions,
    };
    return requestor.put(requestOptions, callback);
  };

  const copySight: CopySight = (postOptions, callback) => {
    const requestOptions = {
      ...optionsToSend,
      url: `${options.apiUrls.sights}${postOptions.sightId}/copy`,
      ...postOptions,
    };
    return requestor.post(requestOptions, callback);
  };

  const moveSight: MoveSight = (postOptions, callback) => {
    const requestOptions = {
      ...optionsToSend,
      url: `${options.apiUrls.sights}${postOptions.sightId}/move`,
      ...postOptions,
    };
    return requestor.post(requestOptions, callback);
  };

  const getSightPublishStatus: GetSightPublishStatus = (getOptions, callback) => {
    const requestOptions = {
      ...optionsToSend,
      url: `${options.apiUrls.sights}${getOptions.sightId}/publish`,
      ...getOptions,
    };
    return requestor.get(requestOptions, callback);
  };

  const setSightPublishStatus: SetSightPublishStatus = (putOptions, callback) => {
    const requestOptions = {
      ...optionsToSend,
      url: `${options.apiUrls.sights}${putOptions.sightId}/publish`,
      ...putOptions,
    };
    return requestor.put(requestOptions, callback);
  };

  return {
    listSights,
    getSight,
    deleteSight,
    updateSight,
    copySight,
    moveSight,
    getSightPublshStatus: getSightPublishStatus,
    setSightPublishStatus,
    ...sharesWrapper.create(options),
  };
};
