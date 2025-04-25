import { createEvents } from '../events';
import { buildFullCreateOptions } from './buildClientConfiguration';
import { buildHttpClient } from './buildHttpRequestor';
import { CreateClientOptions } from './types/clientConfiguration';
import { SmartsheetClient } from './types/smartsheetClient';

// TODO un-mark this as partial once all endpoints are available
export const createApiClient = (options: CreateClientOptions): Partial<SmartsheetClient> => {
  const fullConfiguration = buildFullCreateOptions(options);
  const httpClient = buildHttpClient(fullConfiguration);

  return {
    events: createEvents(httpClient),
  };
};
