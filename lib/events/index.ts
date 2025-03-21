import { EventsApi, GetEventsOptions, GetEventsResponse } from "./types";
import { CreateOptions, RequestCallback, RequestOptions } from "../types";
import { createApiProvider } from "../utils/createApiProvider";
import { ApiSection } from "../utils/apis";

export const createEvents = (options: CreateOptions): EventsApi => {
  return createApiProvider<EventsApi>(
    options,
    ApiSection.Events,
    (requester, optionsToSend) => ({
      getEvents: (
        options: RequestOptions<GetEventsOptions, undefined>,
        callback?: RequestCallback<GetEventsResponse>
      ): Promise<GetEventsResponse> => {
        return requester.get({ ...optionsToSend, ...options }, callback);
      },
    })
  );
};
