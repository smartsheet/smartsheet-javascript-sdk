import type { ContactsApi } from '../contacts/types';
import type { EventsApi } from '../events/types';
import type { SearchApi } from '../search/types';
import type { SharingApi } from '../sharing';
import type { SightsApi } from '../sights/types';
import type { AlternateEmailsApi } from '../users/alternateemails_types';
import type { UsersApi } from '../users/types';
import type { WebhooksApi } from '../webhooks/types';

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
