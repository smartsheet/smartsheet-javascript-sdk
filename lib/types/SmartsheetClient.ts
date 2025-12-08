import type { FoldersApi } from '../folders/types';
import type { FavoritesApi } from '../favorites/types';
import type { ContactsApi } from '../contacts/types';
import type { EventsApi } from '../events/types';
import type { SearchApi } from '../search/types';
import type { SharingApi } from '../sharing/index';
import type { SightsApi } from '../sights/types';
import type { AlternateEmailsApi } from '../users/alternateemails_types';
import type { UsersApi } from '../users/types';
import type { WebhooksApi } from '../webhooks/types';
import type { ImagesApi } from '../images/types';

export interface SmartsheetClient {
  constants: any;
  contacts: ContactsApi;
  events: EventsApi;
  folders: FoldersApi;
  favorites: FavoritesApi;
  groups: any;
  home: any;
  images: ImagesApi;
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
