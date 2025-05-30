import type { EventsApi } from '../../events/types';
import type { SearchApi } from '../../search/types';

export interface SmartsheetClient {
  constants: any;
  contacts: any;
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
  sheets: any;
  sights: any;
  templates: any;
  tokens: any;
  users: any;
  webhooks: any;
  workspaces: any;
}
