// Strict TypeScript consumer: must compile against the packed SDK's .d.ts files.
// Nothing here is executed; it only has to type-check.
import { createClient } from 'smartsheet';
import type { SmartsheetClient } from 'smartsheet';

const client: SmartsheetClient = createClient({ accessToken: 'x' });

export const referenced = [
  client.server.getInfo,
  client.home.listContents,
  client.tokens.revokeAccessToken,
  client.request.get,
];
