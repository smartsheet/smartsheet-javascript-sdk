import type { RequestOptions } from '../types/RequestOptions';
import type { RequestCallback } from '../types/RequestCallback';
import type { BaseResponseStatus } from '../types/BaseResponseStatus';
import type { AlternateEmail } from './types';
import type { PaginationResponse } from '../types/PaginationResponse';

// ============================================================================
// Alternate Emails API Interface
// ============================================================================

export interface AlternateEmailsApi {
  /**
   * Adds one or more alternate email addresses for the specified user.
   *
   * A User in Smartsheet must have a primary email address associated with their user account
   * and may optionally have one or more alternate email addresses. Note that certain operations
   * (Add Group Members, Add User, Create Update Request, Share Report, Share Sheet, Share Workspace)
   * must be performed using the user's primary email address.
   *
   * @param options - {@link AddAlternateEmailOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link AddAlternateEmailResponse}\> - Optional callback function
   * @returns Promise\<{@link AddAlternateEmailResponse}\>
   *
   * @remarks
   * **Who can use this operation:**
   * - **Permissions:** System Admin
   *
   * It mirrors to the following Smartsheet REST API method: `POST /users/{userId}/alternateemails`
   *
   * @example
   * ```typescript
   * const result = await client.users.addAlternateEmail({
   *   userId: 123456789012345,
   *   body: [{ email: 'john.doe@example.com' }]
   * });
   * ```
   */
  addAlternateEmail(
    options: AddAlternateEmailOptions,
    callback?: RequestCallback<AddAlternateEmailResponse>
  ): Promise<AddAlternateEmailResponse>;

  /**
   * Gets the specified alternate email address for a user.
   *
   * @param options - {@link GetAlternateEmailOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link AlternateEmail}\> - Optional callback function
   * @returns Promise\<{@link AlternateEmail}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `GET /users/{userId}/alternateemails/{alternateEmailId}`
   *
   * @example
   * ```typescript
   * const email = await client.users.getAlternateEmail({
   *   userId: 123456789012345,
   *   alternateEmailId: 987654321098765
   * });
   * ```
   */
  getAlternateEmail(
    options: GetAlternateEmailOptions,
    callback?: RequestCallback<AlternateEmail>
  ): Promise<AlternateEmail>;

  /**
   * Gets a list of all alternate email addresses for the specified user.
   *
   * @param options - {@link ListAlternateEmailsOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link ListAlternateEmailsResponse}\> - Optional callback function
   * @returns Promise\<{@link ListAlternateEmailsResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `GET /users/{userId}/alternateemails`
   *
   * @example
   * ```typescript
   * const emailList = await client.users.listAlternateEmails({
   *   userId: 123456789012345
   * });
   * ```
   */
  listAlternateEmails(
    options: ListAlternateEmailsOptions,
    callback?: RequestCallback<ListAlternateEmailsResponse>
  ): Promise<ListAlternateEmailsResponse>;

  /**
   * Makes the specified alternate email address the primary email address for the specified user.
   *
   * The alternate email address can only be made primary if both conditions are met:
   * - The primary email address domain is validated
   * - The alternate email address is confirmed OR the alternate email address domain is validated
   *
   * @param options - {@link MakeAlternateEmailPrimaryOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link MakeAlternateEmailPrimaryResponse}\> - Optional callback function
   * @returns Promise\<{@link MakeAlternateEmailPrimaryResponse}\>
   *
   * @remarks
   * **Who can use this operation:**
   * - **Permissions:** System Admin
   * - **Plans:** Only Enterprise plans with this feature activated by Support can use this method
   *
   * It mirrors to the following Smartsheet REST API method: `POST /users/{userId}/alternateemails/{alternateEmailId}/makeprimary`
   *
   * @example
   * ```typescript
   * const result = await client.users.makeAlternateEmailPrimary({
   *   userId: 123456789012345,
   *   alternateEmailId: 987654321098765
   * });
   * ```
   */
  makeAlternateEmailPrimary(
    options: MakeAlternateEmailPrimaryOptions,
    callback?: RequestCallback<MakeAlternateEmailPrimaryResponse>
  ): Promise<MakeAlternateEmailPrimaryResponse>;

  /**
   * Deletes the specified alternate email address for the specified user.
   *
   * @param options - {@link DeleteAlternateEmailOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link BaseResponseStatus}\> - Optional callback function
   * @returns Promise\<{@link BaseResponseStatus}\>
   *
   * @remarks
   * **Who can use this operation:**
   * - **Permissions:** System Admin
   *
   * It mirrors to the following Smartsheet REST API method: `DELETE /users/{userId}/alternateemails/{alternateEmailId}`
   *
   * @example
   * ```typescript
   * const result = await client.users.deleteAlternateEmail({
   *   userId: 123456789012345,
   *   alternateEmailId: 987654321098765
   * });
   * ```
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
   * The alternate email address to add
   */
  email: string;
}

export interface AddAlternateEmailOptions extends RequestOptions<undefined, AddAlternateEmailBody[]> {
  /**
   * User ID
   */
  userId: number;
}

export interface AddAlternateEmailResponse extends BaseResponseStatus {
  /**
   * Array of added alternate email objects
   * @see AlternateEmail
   */
  data: AlternateEmail[];
}

// ============================================================================
// Get Alternate Email
// ============================================================================

export interface GetAlternateEmailOptions extends RequestOptions<undefined, undefined> {
  /**
   * User ID
   */
  userId: number;
  /**
   * Alternate email ID
   */
  alternateEmailId: number;
}

// ============================================================================
// List Alternate Emails
// ============================================================================

export interface ListAlternateEmailsOptions extends RequestOptions<undefined, undefined> {
  /**
   * User ID
   */
  userId: number;
}

export type ListAlternateEmailsResponse = PaginationResponse<AlternateEmail>;

// ============================================================================
// Make Alternate Email Primary
// ============================================================================

export interface MakeAlternateEmailPrimaryOptions extends RequestOptions<undefined, undefined> {
  /**
   * User ID
   */
  userId: number;
  /**
   * Alternate email ID to make primary
   */
  alternateEmailId: number;
}

export interface MakeAlternateEmailPrimaryResponse extends BaseResponseStatus {
  /**
   * The alternate email that was made primary
   * @see AlternateEmail
   */
  data: AlternateEmail[];
}

// ============================================================================
// Delete Alternate Email
// ============================================================================

export interface DeleteAlternateEmailOptions extends RequestOptions<undefined, undefined> {
  /**
   * User ID
   */
  userId: number;
  /**
   * Alternate email ID to delete
   */
  alternateEmailId: number;
}
