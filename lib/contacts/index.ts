import type {
  Contact,
  ContactsApi,
  GetContactBody,
  GetContactOptions,
  ListContactsOptions,
  ListContactsResponse,
} from './types';
import type { CreateOptions } from '../types/CreateOptions';
import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from './../types/RequestOptions';

export function createContacts(options: CreateOptions): ContactsApi {
  const requestor = options.requestor;

  const baseUrl = options.apiUrls.contacts;
  const optionsToSend = {
    url: baseUrl,
    ...options.clientOptions,
  };

  const getContact = (
    options: RequestOptions<GetContactOptions, GetContactBody>,
    callback: RequestCallback<Contact>
  ) => {
    const urlWithSlash = baseUrl + '/';
    return requestor.get({ ...optionsToSend, url: urlWithSlash, ...options }, callback);
  };

  const listContacts = (
    options: RequestOptions<ListContactsOptions, undefined>,
    callback: RequestCallback<ListContactsResponse>
  ) => requestor.get({ ...optionsToSend, ...options }, callback);

  return {
    getContact,
    listContacts,
  };
}
