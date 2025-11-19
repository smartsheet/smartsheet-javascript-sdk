import type { CreateClient } from './lib/types/CreateClient.js';
import type { CreateOptions } from './lib/types/CreateOptions.js';
import { apiUrls } from './lib/utils/apis.js';
import { createContacts } from './lib/contacts/index.js';
import { createEvents } from './lib/events/index.js';
import { createSearch } from './lib/search/index.js';
import { createSharing } from './lib/sharing/index.js';
import { createSights } from './lib/sights/index.js';
import { create as createHttpRequestor } from './lib/utils/httpRequestor.js';
import * as constants from './lib/utils/constants.js';
import { create as createFavorites } from './lib/favorites/index.js';
import { create as createFolders } from './lib/folders/index.js';
import { create as createGroups } from './lib/groups/index.js';
import { create as createHome } from './lib/home/index.js';
import { create as createImages } from './lib/images/index.js';
import { create as createReports } from './lib/reports/index.js';
import { create as createRequest } from './lib/request/index.js';
import { create as createServer } from './lib/server/index.js';
import { create as createSheets } from './lib/sheets/index.js';
import { create as createTemplates } from './lib/templates/index.js';
import { create as createTokens } from './lib/tokens/index.js';
import { create as createUsers } from './lib/users/index.js';
import { create as createWebhooks } from './lib/webhooks/index.js';
import { create as createWorkspaces } from './lib/workspaces/index.js';

import _ from 'underscore';
import winston from 'winston';

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

export { CreateClient } from './lib/types/CreateClient.js';
export { CreateClientOptions } from './lib/types/CreateClientOptions.js';
export { SmartsheetClient } from './lib/types/SmartsheetClient.js';
export * from './lib/events/types.js';
export * from './lib/sharing/index.js';
