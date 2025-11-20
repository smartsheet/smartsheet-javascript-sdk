import type { CreateOptions } from '../types/CreateOptions';
import shareModule from '../share/share';
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

  const optionsToSend = {
    ...options.clientOptions,
  };

  const getSight: GetSight = (getOptions, callback) => {
    const requestOptions = {
      ...optionsToSend,
      url: `${options.apiUrls.sights}/${getOptions.sightId}`,
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
      url: `${options.apiUrls.sights}/${deleteOptions.sightId}`,
      ...deleteOptions,
    };
    return requestor.delete(requestOptions, callback);
  };

  const updateSight: UpdateSight = (putOptions, callback) => {
    const requestOptions = {
      ...optionsToSend,
      url: `${options.apiUrls.sights}/${putOptions.sightId}`,
      ...putOptions,
    };
    return requestor.put(requestOptions, callback);
  };

  const copySight: CopySight = (postOptions, callback) => {
    const requestOptions = {
      ...optionsToSend,
      url: `${options.apiUrls.sights}/${postOptions.sightId}/copy`,
      ...postOptions,
    };
    return requestor.post(requestOptions, callback);
  };

  const moveSight: MoveSight = (postOptions, callback) => {
    const requestOptions = {
      ...optionsToSend,
      url: `${options.apiUrls.sights}/${postOptions.sightId}/move`,
      ...postOptions,
    };
    return requestor.post(requestOptions, callback);
  };

  const getSightPublishStatus: GetSightPublishStatus = (getOptions, callback) => {
    const requestOptions = {
      ...optionsToSend,
      url: `${options.apiUrls.sights}/${getOptions.sightId}/publish`,
      ...getOptions,
    };
    return requestor.get(requestOptions, callback);
  };

  const setSightPublishStatus: SetSightPublishStatus = (putOptions, callback) => {
    const requestOptions = {
      ...optionsToSend,
      url: `${options.apiUrls.sights}/${putOptions.sightId}/publish`,
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
    getSightPublishStatus,
    setSightPublishStatus,
    ...shares.create(options),
  };
};
