import type { RequestOptions } from '../types/RequestOptions';
import type { RequestCallback } from '../types/RequestCallback';
import type { BaseResponseStatus } from '../types/BaseResponseStatus';
import type { AlternateEmail } from './types';

// ============================================================================
// Alternate Emails API Interface
// ============================================================================

export interface AlternateEmailsApi {
  /**
   * POST /users/{userId}/alternateemails
   */
  addAlternateEmail(
    options: AddAlternateEmailOptions,
    callback?: RequestCallback<AddAlternateEmailResponse>
  ): Promise<AddAlternateEmailResponse>;

  /**
   * GET /users/{userId}/alternateemails/{alternateEmailId}
   */
  getAlternateEmail(
    options: GetAlternateEmailOptions,
    callback?: RequestCallback<AlternateEmail>
  ): Promise<AlternateEmail>;

  /**
   * GET /users/{userId}/alternateemails
   */
  listAlternateEmails(
    options: ListAlternateEmailsOptions,
    callback?: RequestCallback<ListAlternateEmailsResponse>
  ): Promise<ListAlternateEmailsResponse>;

  /**
   * POST /users/{userId}/alternateemails/{alternateEmailId}/makeprimary
   */
  makeAlternateEmailPrimary(
    options: MakeAlternateEmailPrimaryOptions,
    callback?: RequestCallback<MakeAlternateEmailPrimaryResponse>
  ): Promise<MakeAlternateEmailPrimaryResponse>;

  /**
   * DELETE /users/{userId}/alternateemails/{alternateEmailId}
   */
  deleteAlternateEmail(
    options: DeleteAlternateEmailOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ): Promise<BaseResponseStatus>;
}

// ============================================================================
// Add Alternate Email
// ============================================================================

export interface AddAlternateEmailBody {
  /**
   * @description The alternate email address to add
   */
  email: string;
}

export interface AddAlternateEmailOptions extends RequestOptions<undefined, AddAlternateEmailBody[]> {
  /**
   * @description User ID
   */
  userId: number;
}

export interface AddAlternateEmailResponse extends BaseResponseStatus {
  /**
   * @description Array of added alternate email objects
   */
  data: AlternateEmail[];
}

// ============================================================================
// Get Alternate Email
// ============================================================================

export interface GetAlternateEmailOptions extends RequestOptions<undefined, undefined> {
  /**
   * @description User ID
   */
  userId: number;
  /**
   * @description Alternate email ID
   */
  alternateEmailId: number;
}

// ============================================================================
// List Alternate Emails
// ============================================================================

export interface ListAlternateEmailsOptions extends RequestOptions<undefined, undefined> {
  /**
   * @description User ID
   */
  userId: number;
}

export interface ListAlternateEmailsResponse {
  /**
   * @description Array of alternate email objects
   */
  data: AlternateEmail[];
  /**
   * The current page in the full result set.
   */
  pageNumber: number;
  /**
   * @description Number of items in a page.
   */
  pageSize: number;
  /**
   * @description Total number of pages
   */
  totalPages: number;
  /**
   * @description Total count of alternate emails
   */
  totalCount: number;
}

// ============================================================================
// Make Alternate Email Primary
// ============================================================================

export interface MakeAlternateEmailPrimaryOptions extends RequestOptions<undefined, undefined> {
  /**
   * @description User ID
   */
  userId: number;
  /**
   * @description Alternate email ID to make primary
   */
  alternateEmailId: number;
}

export interface MakeAlternateEmailPrimaryResponse extends BaseResponseStatus {
  /**
   * @description The alternate email that was made primary
   */
  data: AlternateEmail[];
}

// ============================================================================
// Delete Alternate Email
// ============================================================================

export interface DeleteAlternateEmailOptions extends RequestOptions<undefined, undefined> {
  /**
   * @description User ID
   */
  userId: number;
  /**
   * @description Alternate email ID to delete
   */
  alternateEmailId: number;
}
