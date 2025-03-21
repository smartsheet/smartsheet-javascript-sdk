import type {
  Contact,
  ContactsApi,
  GetContactOptions,
  ListContactsOptions,
  ListContactsResponse,
} from "./types";
import type { CreateOptions } from "../types";
import type { RequestCallback } from "../types/RequestCallback";
import type { RequestOptions } from "./../types/RequestOptions";

// TODO: Finish the types for GetContactOptions and ListContactsOptions - need to trace the httpRequestor to see how they are used to make sure it all applies

export function createContacts(options: CreateOptions): ContactsApi {
  const requestor = options.requestor;

  const optionsToSend = {
    url: options.apiUrls.contacts,
    ...options.clientOptions,
  };

  const getContact = (
    options: RequestOptions<GetContactOptions, undefined>,
    callback: RequestCallback<Contact>
  ) => requestor.get({ ...optionsToSend, ...options }, callback);

  const listContacts = (
    options: RequestOptions<ListContactsOptions, undefined>,
    callback: RequestCallback<ListContactsResponse>
  ) => requestor.get({ ...optionsToSend, ...options }, callback);

  return {
    getContact,
    listContacts,
  };
}
