import { apiUrlByResource } from '../types';
import { CreateResourceProvider } from '../types/ApiResourceProvider';
import { EventsApi, GetEventsOptions, GetEventsResponse } from './types';

const RESOURCE_PATH = apiUrlByResource['events'];

export const createEvents: CreateResourceProvider<EventsApi> = (httpClient) => {
  return {
    getEvents: (options: GetEventsOptions): Promise<GetEventsResponse> => {
      return httpClient.get<GetEventsOptions, GetEventsResponse>(RESOURCE_PATH, { params: options });
    },
  };
};
