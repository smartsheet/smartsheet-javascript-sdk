import type { CreateClientOptions } from './CreateClientOptions';
import type { SmartsheetClient } from './SmartsheetClient';

export type CreateClient = (options?: CreateClientOptions) => SmartsheetClient;
