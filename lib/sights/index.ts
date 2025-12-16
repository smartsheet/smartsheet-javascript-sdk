import type { CreateOptions } from '../types/CreateOptions';
import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';
import shareModule from '../share/share';
import type {
  SightsApi,
  GetSightOptions,
  Sight,
  ListSightQueryParameters,
  ListSightsResponse,
  DeleteSightOptions,
  DeleteSightResponse,
  UpdateSightOptions,
  UpdateSightResponse,
  CopySightOptions,
  CopySightResponse,
  MoveSightOptions,
  MoveSightResponse,
  GetSightPublishStatusOptions,
  SightPublishStatus,
  SetSightPublishStatusOptions,
  SetSightPublishStatusResponse,
} from './types';

export function create(options: CreateOptions): SightsApi {
  const requestor = options.requestor;

  const optionsToSend = {
    ...options.clientOptions,
  };

  // Legacy shares module (deprecated)
  const shares = shareModule(options.apiUrls.sights);

  const getSight = (getOptions: GetSightOptions, callback?: RequestCallback<Sight>) => {
    const urlOptions = { url: buildUrl(getOptions.sightId) };
    return requestor.get({ ...optionsToSend, ...urlOptions, ...getOptions }, callback);
  };

  const listSights = (
    getOptions: RequestOptions<ListSightQueryParameters, undefined>,
    callback?: RequestCallback<ListSightsResponse>
  ) => {
    const urlOptions = { url: buildUrl() };
    return requestor.get({ ...optionsToSend, ...urlOptions, ...getOptions }, callback);
  };

  const deleteSight = (deleteOptions: DeleteSightOptions, callback?: RequestCallback<DeleteSightResponse>) => {
    const urlOptions = { url: buildUrl(deleteOptions.sightId) };
    return requestor.delete({ ...optionsToSend, ...urlOptions, ...deleteOptions }, callback);
  };

  const updateSight = (putOptions: UpdateSightOptions, callback?: RequestCallback<UpdateSightResponse>) => {
    const urlOptions = { url: buildUrl(putOptions.sightId) };
    return requestor.put({ ...optionsToSend, ...urlOptions, ...putOptions }, callback);
  };

  const copySight = (postOptions: CopySightOptions, callback?: RequestCallback<CopySightResponse>) => {
    const urlOptions = { url: buildUrl(postOptions.sightId) + '/copy' };
    return requestor.post({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

  const moveSight = (postOptions: MoveSightOptions, callback?: RequestCallback<MoveSightResponse>) => {
    const urlOptions = { url: buildUrl(postOptions.sightId) + '/move' };
    return requestor.post({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

  const getSightPublishStatus = (
    getOptions: GetSightPublishStatusOptions,
    callback?: RequestCallback<SightPublishStatus>
  ) => {
    const urlOptions = { url: buildUrl(getOptions.sightId) + '/publish' };
    return requestor.get({ ...optionsToSend, ...urlOptions, ...getOptions }, callback);
  };

  const setSightPublishStatus = (
    putOptions: SetSightPublishStatusOptions,
    callback?: RequestCallback<SetSightPublishStatusResponse>
  ) => {
    const urlOptions = { url: buildUrl(putOptions.sightId) + '/publish' };
    return requestor.put({ ...optionsToSend, ...urlOptions, ...putOptions }, callback);
  };

  const buildUrl = (sightId?: number | string) => {
    if (sightId !== undefined) {
      return options.apiUrls.sights + '/' + sightId;
    }
    return options.apiUrls.sights;
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
}

// Export with legacy name for backward compatibility
export const createSights = create;
