import type { EventsApi, GetEventsOptions, GetEventsResponse } from './types.js';
import type { RequestCallback } from '../types/RequestCallback.js';
import type { RequestOptions } from '../types/RequestOptions.js';
import type { ClientOptions, CreateOptions } from '../types/CreateOptions.js';

type OptionsToSend = Partial<ClientOptions> & {
  url: string;
};

export const createEvents = (options: CreateOptions): EventsApi => {
  const requester = options.requestor;

  let optionsToSend: OptionsToSend = {
    url: options.apiUrls.events,
  };

  if (options.clientOptions) {
    optionsToSend = {
      ...optionsToSend,
      ...options.clientOptions,
    };
  }

  return {
    getEvents: (
      options: RequestOptions<GetEventsOptions, undefined>,
      callback?: RequestCallback<GetEventsResponse>
    ): Promise<GetEventsResponse> => {
      return requester.get({ ...optionsToSend, ...options }, callback);
    },
  };
};
