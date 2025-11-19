import type { RequestCallback } from '../types/RequestCallback.js';
import type { RequestOptions } from '../types/RequestOptions.js';

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

export interface ListContactsOptions {
  /**
   * @default false
   * @description If true, include all results, that is, do not paginate.
   * Mutually exclusive with page and pageSize (they are ignored if
   * includeAll=true is specified).
   */
  includeAll?: boolean;
  /**
   * @description When specified with a date and time value, response only
   * includes the objects that are modified on or after the date and time
   * specified. If you need to keep track of frequent changes, it may be more
   * useful to use Get Sheet Version.
   * @type { Timestamp_date-time (string) | Timestamp_number (number) }
   */
  modifiedSince?: string | number;
  /**
   * @default false
   * @description You can optionally choose to receive and send dates/times in
   * numeric format, as milliseconds since the UNIX epoch (midnight on January
   * 1, 1970 in UTC time), using the query string parameter numericDates with a
   * value of true. This query parameter works for any API request.
   */
  numericDates?: boolean;
  /**
   * @default 1
   * @description Which page to return. Defaults to 1 if not specified. If you
   * specify a value greater than the total number of pages, the last page of
   * results is returned.
   */
  page?: number;
  /**
   * @default 100
   * @description The maximum number of items to return per page. Unless
   * otherwise stated for a specific endpoint, defaults to 100. If only page is
   * specified, defaults to a page size of 100. For reports, the default is 100
   * rows. If you need larger sets of data from your report, returns a maximum
   * of 10,000 rows per request.
   */
  pageSize?: number;
}

export interface ListContactsResponse {
  /**
   * @description The current page in the full result set that the data array
   * represents. NOTE when a page number greater than totalPages is requested,
   * the last page is instead returned.
   * @example 1
   */
  pageNumber: number;
  /**
   * @description The number of items in a page. Omitted if there is no limit
   * to page size (and hence, all results are included). Unless otherwise
   * specified, this defaults to 100 for most endpoints.
   * @example 50
   */
  pageSize?: number;
  /**
   * @description The total number of pages in the full result set.
   * @example 25
   */
  totalPages: number;
  /**
   * @description The total number of items in the full result set.
   * @example 136
   */
  totalCount: number;
  /**
   * @description List of Contacts.
   * @example
   * json```
   * {
   *    "id": "AAAAATYU54QAD7_fNhTnhA",
   *    "name": "Jane Doe",
   *    "email": "jane.doe@smartsheet.com"
   * }
   */
  data: Contact[];
}

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
