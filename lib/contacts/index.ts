import type { CreateOptions } from "../types";
import type { GetContactOptions, ListContactsOptions } from "./types";

interface ContactAPI {
  getContact: (
    getOptions: GetContactOptions,
    callback: (error: any, response: any) => void
  ) => void;
  listContacts: (
    getOptions: ListContactsOptions,
    callback: (error: any, response: any) => void
  ) => void;
}

export function contacts(options: CreateOptions): ContactAPI {
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
