import { EventsApi } from "../events/types";
import { ContactsApi } from "../contacts/types";

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
  search: any;
  server: any;
  sheets: any;
  sights: any;
  templates: any;
  tokens: any;
  users: any;
  webhooks: any;
  workspaces: any;
}
