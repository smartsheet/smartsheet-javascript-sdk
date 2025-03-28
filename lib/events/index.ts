import { createApiProvider } from '../utils/createApiProvider';
import { EventsApi, GetEventsOptions, GetEventsResponse } from './types';
import { ApiResource, CreateOptions, RequestCallback, RequestOptions } from '../types';

export const createEvents = (options: CreateOptions): EventsApi => {
  return createApiProvider<EventsApi>(options, ApiResource.Events, (requester, optionsToSend) => ({
    getEvents: (
      options: RequestOptions<GetEventsOptions, undefined>,
      callback?: RequestCallback<GetEventsResponse>
    ): Promise<GetEventsResponse> => {
      return requester.get({ ...optionsToSend, ...options }, callback);
    },
  }));
};
