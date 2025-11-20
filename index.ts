import type { CreateClient } from './lib/types/CreateClient';
import type { CreateOptions } from './lib/types/CreateOptions';
import { apiUrls } from './lib/utils/apis';
import { createContacts } from './lib/contacts/index';
import { createEvents } from './lib/events/index';
import { createSearch } from './lib/search/index';
import { createSharing } from './lib/sharing/index';
import { createSights } from './lib/sights/index';
import { create as createHttpRequestor } from './lib/utils/httpRequestor';
import * as constants from './lib/utils/constants';
import { create as createFavorites } from './lib/favorites/index';
import { create as createFolders } from './lib/folders/index';
import { create as createGroups } from './lib/groups/index';
import { create as createHome } from './lib/home/index';
import { create as createImages } from './lib/images/index';
import { create as createReports } from './lib/reports/index';
import { create as createRequest } from './lib/request/index';
import { create as createServer } from './lib/server/index';
import { create as createSheets } from './lib/sheets/index';
import { create as createTemplates } from './lib/templates/index';
import { create as createTokens } from './lib/tokens/index';
import { create as createUsers } from './lib/users/index';
import { create as createWebhooks } from './lib/webhooks/index';
import { create as createWorkspaces } from './lib/workspaces/index';

import _ from 'underscore';
import * as winston from 'winston';

// Possible TODO: Namespace parameters for different subcomponents
// E.g. clientOptions.requestor.instance OR
//      clientOptions.requestor.settings
//          w/ sub-paths maxRetryDurationSeconds and calcRetryBackoff

function buildRequestor(clientOptions) {
  if (clientOptions.requestor) return clientOptions.requestor;

  const requestorConfig = _.pick(clientOptions, 'maxRetryDurationSeconds', 'calcRetryBackoff');

  if (requestorConfig.maxRetryDurationSeconds)
    requestorConfig.maxRetryDurationMillis = requestorConfig.maxRetryDurationSeconds * 1000;

  requestorConfig.logger = buildLogger(clientOptions);

  return createHttpRequestor(requestorConfig);
}

function buildLogger(clientOptions) {
  if (hasMultipleLogOptions(clientOptions)) {
    throw new Error(
      'Smartsheet client options may specify at most one of ' + "'logger', 'loggerContainer', and 'logLevel'."
    );
  }

  if (clientOptions.logger) return clientOptions.logger;

  if (clientOptions.logLevel) return buildLoggerFromLevel(clientOptions.logLevel);

  if (clientOptions.loggerContainer) return buildLoggerFromContainer(clientOptions.loggerContainer);

  return null;
}

function hasMultipleLogOptions(clientOptions) {
  return (
    (clientOptions.logger && clientOptions.loggerContainer) ||
    (clientOptions.logger && clientOptions.logLevel) ||
    (clientOptions.loggerContainer && clientOptions.logLevel)
  );
}

function buildLoggerFromLevel(logLevel) {
  if (winston.level[logLevel] == null) {
    throw new Error(
      'Smartsheet client received configuration with invalid log level ' +
        `'${logLevel}'. Use one of the standard Winston log levels.`
    );
  }

  return new winston.Logger({
    transports: [
      new winston.transports.Console({
        level: logLevel,
        showLevel: false,
        label: 'Smartsheet',
      }),
    ],
  });
}

function buildLoggerFromContainer(container) {
  if (container.has('smartsheet')) return container.get('smartsheet');
  else
    throw new Error(
      'Smartsheet client received a logger container, but could not find a logger named ' + "'smartsheet' inside."
    );
}

export const createClient: CreateClient = function (clientOptions) {
  const requestor = buildRequestor(clientOptions);

  const options: CreateOptions = {
    apiUrls: apiUrls,
    requestor: requestor,
    clientOptions: {
      accessToken: clientOptions.accessToken || process.env.SMARTSHEET_ACCESS_TOKEN,
      userAgent: clientOptions.userAgent,
      baseUrl: clientOptions.baseUrl,
    },
  };

  return {
    constants: constants,
    contacts: createContacts(options),
    events: createEvents(options),
    favorites: createFavorites(options),
    folders: createFolders(options),
    groups: createGroups(options),
    /**
     * @deprecated
     * The home module is deprecated. The endpoints powering this module
     * are being shut off as part of the sheets folder deprecation.
     * The endpoints will be available until June.
     *
     * See this changelog entry for more information
     * https://developers.smartsheet.com/api/smartsheet/changelog#2025-03-25
     */
    home: createHome(options),
    images: createImages(options),
    reports: createReports(options),
    request: createRequest(options),
    search: createSearch(options),
    server: createServer(options),
    sharing: createSharing(options),
    sheets: createSheets(options),
    sights: createSights(options),
    templates: createTemplates(options),
    tokens: createTokens(options),
    users: createUsers(options),
    webhooks: createWebhooks(options),
    workspaces: createWorkspaces(options),
  };
};

export const smartSheetURIs = {
  defaultBaseURI: 'https://api.smartsheet.com/2.0/',
  govBaseURI: 'https://api.smartsheetgov.com/2.0/',
  euBaseURI: 'https://api.smartsheet.eu/2.0/',
};

export { CreateClient } from './lib/types/CreateClient';
export { CreateClientOptions } from './lib/types/CreateClientOptions';
export { SmartsheetClient } from './lib/types/SmartsheetClient';
export * from './lib/events/types';
export * from './lib/sharing/index';
