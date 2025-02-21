import * as _ from 'underscore';
import { EventsModule } from './types';
import {CreateOptions} from "../types";

export const create = (options: CreateOptions): EventsModule => {
  const requester = options.requestor;

  const optionsToSend = {
    url: options.apiUrls.events,
  };

  if (options.clientOptions) { // Check if clientOptions exists
    _.extend(optionsToSend, options.clientOptions);
  }

  return {
    getEvents: (getOptions, callback) => {
      return requester.get(_.extend({}, optionsToSend, getOptions), callback)
    },
  };
};
