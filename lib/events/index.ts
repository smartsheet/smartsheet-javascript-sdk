import { apiUrlByResource } from '../types';
import type { CreateResourceProvider } from '../types/ApiResourceProvider';
import type { EventsApi, GetEventsOptions, GetEventsResponse } from './types';

const RESOURCE_PATH = apiUrlByResource['events'];

export const createEvents: CreateResourceProvider<EventsApi> = (httpClient) => {
  return {
    getEvents: (options: GetEventsOptions): Promise<GetEventsResponse> => {
      return httpClient.get<GetEventsOptions, GetEventsResponse>(RESOURCE_PATH, { params: options });
    },
  };
};
