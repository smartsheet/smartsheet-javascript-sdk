import type { CreateClientOptions } from './CreateClientOptions.js';
import type { SmartsheetClient } from './SmartsheetClient.js';

export type CreateClient = (options?: CreateClientOptions) => SmartsheetClient;
