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

// Batch 1: typed calls that must compile under strict mode. Never executed.
export function batch1TypeChecks(c: SmartsheetClient) {
  void c.tokens.getAccessToken({ queryParameters: { client_id: 'a', code: 'b', hash: 'c' } });
  void c.tokens.revokeAccessToken();
  void c.home.listFolders({ queryParameters: { pageSize: 10 } });
  void c.request.get<{ id: number }>({ url: 'users/me' });
  const locales: string[] = (null as unknown as Awaited<ReturnType<SmartsheetClient['server']['getInfo']>>)
    .supportedLocales;
  return locales;
}
