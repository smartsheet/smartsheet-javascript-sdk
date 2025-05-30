import { createEvents } from '../events';
import { buildFullCreateOptions } from './buildClientConfiguration';
import { buildHttpClient } from './httpClient/buildHttpClient';
import type { CreateClientOptions } from './types/clientConfiguration';
import type { SmartsheetClient } from './types/smartsheetClient';

// TODO un-mark Return value as partial once all endpoints are available
export const createApiClient = (options: CreateClientOptions): Partial<SmartsheetClient> => {
  const fullConfiguration = buildFullCreateOptions(options);
  const httpClient = buildHttpClient(fullConfiguration);

  return {
    events: createEvents(httpClient, fullConfiguration.loggingConfig.loggerInstance),
  };
};
