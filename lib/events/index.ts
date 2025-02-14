import * as _ from 'underscore';
import { EventsModule, GetEventsCallback, GetEventsOptions } from './types';

// todo: add options type
export const create = (options: any): EventsModule => {
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