import type { PaginationResponse } from '../types/PaginationResponse';
import type { PaginationQueryParameters } from '../types/PaginationQueryParameters';
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

export interface ListContactsOptions extends PaginationQueryParameters {
  /**
   * When specified with a date and time value, response only includes
   * the objects that are modified on or after the date and time specified.
   * Can be a timestamp string (ISO-8601) or number (milliseconds since UNIX epoch).
   */
  modifiedSince?: string | number;

  /**
   * If true, dates/times are sent and received as milliseconds since
   * the UNIX epoch (midnight on January 1, 1970 in UTC time).
   * @defaultValue false
   */
  numericDates?: boolean;
}

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
