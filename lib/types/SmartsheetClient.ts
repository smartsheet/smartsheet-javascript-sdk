import type { ContactsApi } from '../contacts/types.js';
import type { EventsApi } from '../events/types.js';
import type { SearchApi } from '../search/types.js';
import type { SharingApi } from '../sharing/index.js';
import type { SightsApi } from '../sights/types.js';
import type { AlternateEmailsApi } from '../users/alternateemails_types.js';
import type { UsersApi } from '../users/types.js';
import type { WebhooksApi } from '../webhooks/types.js';

export interface SmartsheetClient {
  constants: any;
  contacts: ContactsApi;
  events: EventsApi;
  favorites: any;
  folders: any;
  groups: any;
  home: any;
  images: any;
  reports: any;
  request: any;
  search: SearchApi;
  server: any;
  sharing: SharingApi;
  sheets: any;
  sights: SightsApi;
  templates: any;
  tokens: any;
  users: UsersApi & AlternateEmailsApi;
  webhooks: WebhooksApi;
  workspaces: any;
}
