import type { PaginationResponse } from '../types/PaginationResponse';
import type { PaginationWithModifiedSinceQueryParameters } from '../types/PaginationQueryParameters';
import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';

export interface ContactsApi {
  getContact: (options: RequestOptions<undefined, undefined>, callback?: RequestCallback<Contact>) => Promise<Contact>;
  listContacts: (
    options: RequestOptions<ListContactsOptions, undefined>,
    callback?: RequestCallback<ListContactsResponse>
  ) => Promise<ListContactsResponse>;
}

export interface Contact {
  /**
   * @description Contact Id.
   */
  id: string;
  /**
   * @description Contact's full name.
   */
  name: string;
  /**
   * @description Contact's email address.
   */
  email: string;
}

export type ListContactsOptions = PaginationWithModifiedSinceQueryParameters;

export type ListContactsResponse = PaginationResponse<Contact>;

export interface GetContactOptions {
  /**
   * @description A comma-separated list of optional elements to include in the response
   * @type {'profileImage'}
   */
  include?: 'profileImage';
}

export interface GetContactBody {
  /**
   * @description contactId of the contact being accessed.
   */
  contactId: number | string;
}
