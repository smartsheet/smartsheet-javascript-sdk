import type { Contact, ContactsApi, ListContactsOptions, ListContactsResponse } from './types';
import type { CreateOptions } from '../types';
import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from './../types/RequestOptions';

export function createContacts(options: CreateOptions): ContactsApi {
  const requestor = options.requestor;

  const optionsToSend = {
    url: options.apiUrls.contacts,
    ...options.clientOptions,
  };

  const getContact = (options: RequestOptions<undefined, undefined>, callback: RequestCallback<Contact>) =>
    requestor.get({ ...optionsToSend, ...options }, callback);

  const listContacts = (
    options: RequestOptions<ListContactsOptions, undefined>,
    callback: RequestCallback<ListContactsResponse>
  ) => requestor.get({ ...optionsToSend, ...options }, callback);

  return {
    getContact,
    listContacts,
  };
}
