import * as _ from 'underscore';
import { EventsModule, GetEventsCallback, GetEventsOptions } from './types';
import {CreateOptions} from "../types";

export const create = (options: CreateOptions): EventsModule => {
  const requestor = options.requestor;

  const optionsToSend = {
    url: options.apiUrls.events,
  };

  if (options.clientOptions) { // Check if clientOptions exists
    _.extend(optionsToSend, options.clientOptions);
  }

  const getEvents = (getOptions: GetEventsOptions, callback?: GetEventsCallback) =>
    requestor.get(_.extend({}, optionsToSend, getOptions), callback);

  return {
    getEvents: getEvents,
  };
};
