import type { CreateOptions } from "../types";
import type {
  ContactsAPI,
  GetContactOptions,
  ListContactsOptions,
} from "./types";

export function contacts(options: CreateOptions): ContactsAPI {
  const requestor = options.requestor;

  const optionsToSend = {
    url: options.apiUrls.contacts,
    ...options.clientOptions,
  };

  const getContact = (
    getOptions: GetContactOptions | ListContactsOptions,
    callback: (error: any, response: any) => void
  ) => requestor.get({ ...optionsToSend, ...getOptions }, callback);

  return {
    getContact: getContact,
    listContacts: getContact,
  };
}
