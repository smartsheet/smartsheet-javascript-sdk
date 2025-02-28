import { EventsModule } from './types';
import {ClientOptions, CreateOptions} from "../types";

type OptionsToSend = Partial<ClientOptions> & {
  url: string
}

export const create = (options: CreateOptions): EventsModule => {
  const requester = options.requestor;

  let optionsToSend: OptionsToSend= {
    url: options.apiUrls.events,
  };

  if (options.clientOptions) {
    optionsToSend = {
      ...optionsToSend,
      ...options.clientOptions
    }
  }

  return {
    getEvents: (options, callback) => {
      return requester.get({ ...optionsToSend, ...options}, callback)
    }
  }
};
