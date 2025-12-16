import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';
import type { BaseResponseStatus } from '../types/BaseResponseStatus';
import type { PaginationQueryParameters } from '../types/PaginationQueryParameters';
import type { PaginationResponse } from '../types/PaginationResponse';

// ============================================================================
// Users API Interface
// ============================================================================

export interface UsersApi {
  /**
   * Gets the specified user.
   *
   * @param options - {@link GetUserOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link GetUserResponse}\> - Optional callback function
   * @returns Promise\<{@link GetUserResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `GET /users/{userId}`
   *
   * @example
   * ```typescript
   * const user = await client.users.getUser({
   *   userId: 123456789012345
   * });
   * ```
   */
  getUser: (options: GetUserOptions, callback?: RequestCallback<GetUserResponse>) => Promise<GetUserResponse>;

  /**
   * Gets a list of users in the organization account.
   *
   * To filter by email, use the optional email query string parameter to specify a list of users' email addresses.
   *
   * For System admins, additional User object attributes are included in the response (admin, groupAdmin,
   * isInternal, licensedSheetCreator, resourceViewer, seatType, seatTypeLastChangedAt, sheetCount, status).
   *
   * @param options - {@link RequestOptions}\<{@link ListUsersQueryParameters}, undefined\> - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link ListUsersResponse}\> - Optional callback function
   * @returns Promise\<{@link ListUsersResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `GET /users`
   *
   * @example
   * ```typescript
   * const userList = await client.users.listAllUsers({
   *   queryParams: { includeAll: true }
   * });
   * ```
   */
  listAllUsers: (
    options: RequestOptions<ListUsersQueryParameters, undefined>,
    callback?: RequestCallback<ListUsersResponse>
  ) => Promise<ListUsersResponse>;

  /**
   * Gets the current user (the user whose access token is being used to make the API call).
   *
   * @param options - {@link RequestOptions}\<{@link GetCurrentUserQueryParameters}, undefined\> - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link GetCurrentUserResponse}\> - Optional callback function
   * @returns Promise\<{@link GetCurrentUserResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `GET /users/me`
   *
   * @example
   * ```typescript
   * const currentUser = await client.users.getCurrentUser({});
   * ```
   */
  getCurrentUser: (
    options: RequestOptions<GetCurrentUserQueryParameters, undefined>,
    callback?: RequestCallback<GetCurrentUserResponse>
  ) => Promise<GetCurrentUserResponse>;

  /**
   * Adds a user to the organization account.
   *
   * If successful, and user auto provisioning (UAP) is on, and user matches the auto provisioning rules,
   * user is added to the org. If UAP is off, or user does not match UAP rules, user is invited to the org
   * and must explicitly accept the invitation to join.
   *
   * @param options - {@link RequestOptions}\<undefined, {@link AddUserBody}\> - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link AddUserResponse}\> - Optional callback function
   * @returns Promise\<{@link AddUserResponse}\>
   *
   * @remarks
   * **Who can use this operation:**
   * - **Permissions:** System Admin
   *
   * It mirrors to the following Smartsheet REST API method: `POST /users`
   *
   * @example
   * ```typescript
   * const newUser = await client.users.addUser({
   *   body: {
   *     email: 'john.doe@example.com',
   *     firstName: 'John',
   *     lastName: 'Doe',
   *     admin: false,
   *     licensedSheetCreator: true
   *   }
   * });
   * ```
   */
  addUser: (
    options: RequestOptions<AddUserQueryParameters, AddUserBody>,
    callback?: RequestCallback<AddUserResponse>
  ) => Promise<AddUserResponse>;

  /**
   * Adds a user to the organization account and sends an email notification.
   *
   * This is a convenience method that adds a user with sendEmail=true query parameter.
   *
   * @param options - {@link RequestOptions}\<undefined, {@link AddUserBody}\> - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link AddUserResponse}\> - Optional callback function
   * @returns Promise\<{@link AddUserResponse}\>
   *
   * @remarks
   * **Who can use this operation:**
   * - **Permissions:** System Admin
   *
   * It mirrors to the following Smartsheet REST API method: `POST /users?sendEmail=true`
   *
   * @example
   * ```typescript
   * const newUser = await client.users.addUserAndSendEmail({
   *   body: {
   *     email: 'john.doe@example.com',
   *     firstName: 'John',
   *     lastName: 'Doe'
   *   }
   * });
   * ```
   */
  addUserAndSendEmail: (
    options: RequestOptions<undefined, AddUserBody>,
    callback?: RequestCallback<AddUserResponse>
  ) => Promise<AddUserResponse>;

  /**
   * Updates the specified user.
   *
   * @param options - {@link UpdateUserOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link UpdateUserResponse}\> - Optional callback function
   * @returns Promise\<{@link UpdateUserResponse}\>
   *
   * @remarks
   * **Who can use this operation:**
   * - **Permissions:** System Admin
   *
   * It mirrors to the following Smartsheet REST API method: `PUT /users/{userId}`
   *
   * @example
   * ```typescript
   * const result = await client.users.updateUser({
   *   userId: 123456789012345,
   *   body: {
   *     admin: true,
   *     licensedSheetCreator: true
   *   }
   * });
   * ```
   */
  updateUser: (
    options: UpdateUserOptions,
    callback?: RequestCallback<UpdateUserResponse>
  ) => Promise<UpdateUserResponse>;

  /**
   * Removes the specified user from the organization account.
   *
   * User is transitioned to a free collaborator with read-only access to owned sheets
   * (unless those are optionally transferred to another user).
   *
   * @param options - {@link RemoveUserOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link BaseResponseStatus}\> - Optional callback function
   * @returns Promise\<{@link BaseResponseStatus}\>
   *
   * @remarks
   * **Who can use this operation:**
   * - **Permissions:** System Admin
   *
   * It mirrors to the following Smartsheet REST API method: `DELETE /users/{userId}`
   *
   * @example
   * ```typescript
   * const result = await client.users.removeUser({
   *   userId: 123456789012345,
   *   queryParams: {
   *     transferTo: 987654321098765,
   *     transferSheets: true
   *   }
   * });
   * ```
   */
  removeUser: (
    options: RemoveUserOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => Promise<BaseResponseStatus>;
  /**
   * Deactivates the specified user.
   *
   * Deactivated users retain their account information but cannot access Smartsheet.
   * They can be reactivated later.
   *
   * @param options - {@link DeactivateUserOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link BaseResponseStatus}\> - Optional callback function
   * @returns Promise\<{@link BaseResponseStatus}\>
   *
   * @remarks
   * **Who can use this operation:**
   * - **Permissions:** System Admin
   *
   * It mirrors to the following Smartsheet REST API method: `POST /users/{userId}/deactivate`
   *
   * @example
   * ```typescript
   * const result = await client.users.deactivateUser({
   *   userId: 123456789012345
   * });
   * ```
   */
  deactivateUser: (
    options: DeactivateUserOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => Promise<BaseResponseStatus>;

  /**
   * Reactivates the specified user.
   *
   * Reactivated users regain access to their account and Smartsheet.
   *
   * @param options - {@link ReactivateUserOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link BaseResponseStatus}\> - Optional callback function
   * @returns Promise\<{@link BaseResponseStatus}\>
   *
   * @remarks
   * **Who can use this operation:**
   * - **Permissions:** System Admin
   *
   * It mirrors to the following Smartsheet REST API method: `POST /users/{userId}/reactivate`
   *
   * @example
   * ```typescript
   * const result = await client.users.reactivateUser({
   *   userId: 123456789012345
   * });
   * ```
   */
  reactivateUser: (
    options: ReactivateUserOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => Promise<BaseResponseStatus>;

  /**
   * Adds a profile image to the specified user's Smartsheet account.
   *
   * The image file must be a PNG, JPEG, or GIF file. The maximum file size is 1 MB.
   *
   * @param options - {@link AddProfileImageOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link AddProfileImageResponse}\> - Optional callback function
   * @returns Promise\<{@link AddProfileImageResponse}\>
   *
   * @remarks
   * **Who can use this operation:**
   * - **Permissions:** System Admin or the user themselves
   *
   * It mirrors to the following Smartsheet REST API method: `POST /users/{userId}/profileimage`
   *
   * @example
   * ```typescript
   * const result = await client.users.addProfileImage({
   *   userId: 123456789012345,
   *   body: {
   *     file: imageBuffer
   *   }
   * });
   * ```
   */
  addProfileImage: (
    options: AddProfileImageOptions,
    callback?: RequestCallback<AddProfileImageResponse>
  ) => Promise<AddProfileImageResponse>;

  /**
   * Upgrades the user associated with the specified Smartsheet plan.
   *
   * A user can be upgraded to the following seat types:
   * - GUEST - only external users can be upgraded to this seat type
   * - MEMBER (default)
   *
   * @param options - {@link UpgradeUserOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link BaseResponseStatus}\> - Optional callback function
   * @returns Promise\<{@link BaseResponseStatus}\>
   *
   * @remarks
   * **Who can use this operation:**
   * - **Permissions:** System Admin
   *
   * **Note:** Upgrading a user to its current seat type returns 200 OK.
   *
   * It mirrors to the following Smartsheet REST API method: `POST /users/{userId}/plans/{planId}/upgrade`
   *
   * @example
   * ```typescript
   * const result = await client.users.upgradeUser({
   *   userId: 123456789012345,
   *   planId: 456789012345678,
   *   body: {
   *     seatType: 'MEMBER'
   *   }
   * });
   * ```
   */
  upgradeUser: (
    options: UpgradeUserOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => Promise<BaseResponseStatus>;

  /**
   * Downgrades the user associated with the specified Smartsheet plan.
   *
   * Downgrading a user does not affect their existing permissions on owned or shared items.
   *
   * A user can be downgraded to the following seat types:
   * - GUEST - only external users can be downgraded to this seat type
   * - VIEWER
   *
   * @param options - {@link DowngradeUserOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link BaseResponseStatus}\> - Optional callback function
   * @returns Promise\<{@link BaseResponseStatus}\>
   *
   * @remarks
   * **Who can use this operation:**
   * - **Permissions:** System Admin
   *
   * **Note:** Downgrading a user to its current seat type returns 200 OK.
   *
   * It mirrors to the following Smartsheet REST API method: `POST /users/{userId}/plans/{planId}/downgrade`
   *
   * @example
   * ```typescript
   * const result = await client.users.downgradeUser({
   *   userId: 123456789012345,
   *   planId: 456789012345678,
   *   body: {
   *     seatType: 'VIEWER'
   *   }
   * });
   * ```
   */
  downgradeUser: (
    options: DowngradeUserOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => Promise<BaseResponseStatus>;

  /**
   * Gets a list of plans for the specified user.
   *
   * @param options - {@link ListUserPlansOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link ListUserPlansResponse}\> - Optional callback function
   * @returns Promise\<{@link ListUserPlansResponse}\>
   *
   * @remarks
   * **Who can use this operation:**
   * - **Permissions:** System Admin
   *
   * It mirrors to the following Smartsheet REST API method: `GET /users/{userId}/plans`
   *
   * @example
   * ```typescript
   * const plans = await client.users.listUserPlans({
   *   userId: 123456789012345
   * });
   * ```
   */
  listUserPlans: (
    options: ListUserPlansOptions,
    callback?: RequestCallback<ListUserPlansResponse>
  ) => Promise<ListUserPlansResponse>;

  /**
   * Removes the specified user from the specified plan.
   *
   * @param options - {@link RemoveUserFromPlanOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link BaseResponseStatus}\> - Optional callback function
   * @returns Promise\<{@link BaseResponseStatus}\>
   *
   * @remarks
   * **Who can use this operation:**
   * - **Permissions:** System Admin
   *
   * It mirrors to the following Smartsheet REST API method: `DELETE /users/{userId}/plans/{planId}`
   *
   * @example
   * ```typescript
   * const result = await client.users.removeUserFromPlan({
   *   userId: 123456789012345,
   *   planId: 456789012345678
   * });
   * ```
   */
  removeUserFromPlan: (
    options: RemoveUserFromPlanOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => Promise<BaseResponseStatus>;
}

// ============================================================================
// User Types
// ============================================================================

/**
 * Basic user information used across multiple endpoints.
 */
export interface MiniUser {
  /**
   * User's email address.
   */
  email: string;

  /**
   * User's full name.
   */
  name: string;
}

export enum SeatTypes {
  MEMBER = 'MEMBER',
  PROVISIONAL_MEMBER = 'PROVISIONAL_MEMBER',
  GUEST = 'GUEST',
  VIEWER = 'VIEWER',
}

export interface UserProfile {
  /**
   * User Id.
   */
  id: number;
  /**
   * User's email address.
   */
  email: string;
  /**
   * User's first name.
   */
  firstName?: string;
  /**
   * User's last name.
   */
  lastName?: string;
  /**
   * User's full name (read-only).
   */
  name?: string;
  /**
   * User's role.
   */
  admin?: boolean;
  /**
   * User's license type.
   */
  licensedSheetCreator?: boolean;
  /**
   * User's group admin status.
   */
  groupAdmin?: boolean;
  /**
   * User's resource viewer status.
   */
  resourceViewer?: boolean;
  /**
   * User's status.
   * @see UserStatus
   */
  status?: UserStatus;
  /**
   * URL to user's profile image.
   * @see ProfileImage
   */
  profileImage?: ProfileImage;
  /**
   * User's title.
   */
  title?: string;
  /**
   * User's department.
   */
  department?: string;
  /**
   * User's company.
   */
  company?: string;
  /**
   * User's work phone.
   */
  workPhone?: string;
  /**
   * User's mobile phone.
   */
  mobilePhone?: string;
  /**
   * User's role.
   */
  role?: string;
  /**
   * User's custom welcome screen viewed status.
   */
  customWelcomeScreenViewed?: Date | string;
  /**
   * User's last login time.
   */
  lastLogin?: Date | string;
}

export enum UserStatus {
  ACTIVE = 'ACTIVE',
  PENDING = 'PENDING',
  DECLINED = 'DECLINED',
  DEACTIVATED = 'DEACTIVATED',
}

export interface Account {
  /**
   * Account Id.
   */
  id: number;
  /**
   * Account name.
   */
  name: string;
}

export interface AlternateEmail {
  /**
   * Alternate email Id.
   */
  id: number;
  /**
   * Whether the alternate email is confirmed.
   */
  confirmed: boolean;
  /**
   * The alternate email address.
   */
  email: string;
}

export interface ProfileImage {
  /**
   * Image Id.
   */
  imageId: string;
  /**
   * Image height in pixels.
   */
  height?: number;
  /**
   * Image width in pixels.
   */
  width?: number;
}

// ============================================================================
// Get User
// ============================================================================

export interface GetUserResponse {
  /**
   * User Id.
   */
  id: number;

  /**
   * Account information.
   * @see Account
   */
  account: Account;

  /**
   * User's admin status.
   */
  admin?: boolean;

  /**
   * Alternate email addresses.
   * @see AlternateEmail
   */
  alternateEmails?: AlternateEmail[];

  /**
   * User's company.
   */
  company: string;

  /**
   * User's custom welcome screen viewed timestamp.
   */
  customWelcomeScreenViewed?: Date | string;

  /**
   * User's department.
   */
  department: string;

  /**
   * User's email address.
   */
  email: string;

  /**
   * User's first name.
   */
  firstName: string;

  /**
   * User's group admin status.
   */
  groupAdmin?: boolean;

  /**
   * User's Jira admin status.
   */
  jiraAdmin: boolean;

  /**
   * User's last login timestamp.
   */
  lastLogin?: Date | string;

  /**
   * User's last name.
   */
  lastName: string;

  /**
   * User's licensed sheet creator status.
   */
  licensedSheetCreator?: boolean;

  /**
   * User's locale.
   */
  locale: string;

  /**
   * User's mobile phone.
   */
  mobilePhone: string;

  /**
   * User's profile image.
   * @see ProfileImage
   */
  profileImage?: ProfileImage;

  /**
   * User's resource viewer status.
   */
  resourceViewer?: boolean;

  /**
   * User's role.
   */
  role: string;

  /**
   * User's Salesforce admin status.
   */
  salesforceAdmin: boolean;

  /**
   * User's Salesforce user status.
   */
  salesforceUser: boolean;

  /**
   * User's sheet count.
   */
  sheetCount?: number;

  /**
   * User's time zone.
   */
  timeZone: string;

  /**
   * User's title.
   */
  title: string;

  /**
   * User's work phone.
   */
  workPhone: string;
}

export interface GetUserOptions extends RequestOptions<undefined, undefined> {
  /**
   * User Id to deactivate.
   */
  userId: number;
}

// ============================================================================
// List Users
// ============================================================================

export interface ListUsersQueryParameters extends PaginationQueryParameters {
  /**
   * A comma-separated list of emails.
   */
  email?: string;

  /**
   * A comma-separated list of elements to include in the response.
   */
  include?: string;

  /**
   * Plan Id for which seat types are returned. Available only to system administrators.
   */
  planId?: number;

  /**
   * Seat type based on which to filter the results.
   * @see SeatTypes
   */
  seatType?: SeatTypes;

  /**
   * If true, dates/times are sent and received as milliseconds since
   * the UNIX epoch (midnight on January 1, 1970 in UTC time).
   * @defaultValue false
   */
  numericDates?: boolean;
}

export interface ListUsersData {
  /**
   * User Id.
   */
  id: number;

  /**
   * User's admin status.
   */
  admin: boolean;

  /**
   * User's custom welcome screen viewed timestamp.
   */
  customWelcomeScreenViewed?: Date | string;

  /**
   * User's email address.
   */
  email: string;

  /**
   * User's first name.
   */
  firstName: string;

  /**
   * User's group admin status.
   */
  groupAdmin: boolean;

  /**
   * Whether the user is internal.
   */
  isInternal: boolean;

  /**
   * User's last login timestamp.
   */
  lastLogin?: Date | string;

  /**
   * User's last name.
   */
  lastName: string;

  /**
   * User's licensed sheet creator status.
   */
  licensedSheetCreator: boolean;

  /**
   * User's full name.
   */
  name: string;

  /**
   * User's profile image.
   * @see ProfileImage
   */
  profileImage?: ProfileImage;

  /**
   * Provisional expiration date.
   */
  provisionalExpirationDate?: Date | string;

  /**
   * User's resource viewer status.
   */
  resourceViewer: boolean;

  /**
   * User's seat type.
   * @see SeatTypes
   */
  seatType: SeatTypes | string;

  /**
   * When the seat type was last changed.
   */
  seatTypeLastChangedAt?: Date | string;

  /**
   * User's sheet count.
   */
  sheetCount?: number;

  /**
   * User's status.
   * @see UserStatus
   */
  status: UserStatus | string;
}

export type ListUsersResponse = PaginationResponse<ListUsersData>;

// ============================================================================
// Get Current User
// ============================================================================

export interface GetCurrentUserResponse {
  /**
   * User Id.
   */
  id: number;

  /**
   * Account information.
   * @see Account
   */
  account: Account;

  /**
   * User's admin status.
   */
  admin: boolean;

  /**
   * Alternate email addresses.
   * @see AlternateEmail
   */
  alternateEmails?: AlternateEmail[];

  /**
   * User's company.
   */
  company: string;

  /**
   * User's custom welcome screen viewed timestamp.
   */
  customWelcomeScreenViewed?: Date | string;

  /**
   * User's department.
   */
  department: string;

  /**
   * User's email address.
   */
  email: string;

  /**
   * User's first name.
   */
  firstName: string;

  /**
   * User's group admin status.
   */
  groupAdmin: boolean;

  /**
   * User's Jira admin status.
   */
  jiraAdmin: boolean;

  /**
   * User's last login timestamp.
   */
  lastLogin?: Date | string;

  /**
   * User's last name.
   */
  lastName: string;

  /**
   * User's licensed sheet creator status.
   */
  licensedSheetCreator: boolean;

  /**
   * User's locale.
   */
  locale: string;

  /**
   * User's mobile phone.
   */
  mobilePhone: string;

  /**
   * User's profile image.
   * @see ProfileImage
   */
  profileImage?: ProfileImage;

  /**
   * User's resource viewer status.
   */
  resourceViewer: boolean;

  /**
   * User's role.
   */
  role: string;

  /**
   * User's Salesforce admin status.
   */
  salesforceAdmin: boolean;

  /**
   * User's Salesforce user status.
   */
  salesforceUser: boolean;

  /**
   * User's sheet count.
   */
  sheetCount: number;

  /**
   * User's time zone.
   */
  timeZone: string;

  /**
   * User's title.
   */
  title: string;

  /**
   * User's work phone.
   */
  workPhone: string;

  /**
   * Array of group data objects.
   */
  data: {
    /**
     * Group Id.
     */
    id: number;

    /**
     * Group name.
     */
    name: string;

    /**
     * Group description.
     */
    description: string;

    /**
     * Group owner email.
     */
    owner: string;

    /**
     * Group owner Id.
     */
    ownerId: number;

    /**
     * Group created timestamp.
     */
    createdAt: Date | string;

    /**
     * Group modified timestamp.
     */
    modifiedAt: Date | string;
  }[];
}

export interface GetCurrentUserQueryParameters {
  /**
   * A comma-separated list of elements to include in the response.
   */
  include?: string;
}

// ============================================================================
// Add User
// ============================================================================

export interface AddUserQueryParameters {
  /**
   * @defaultValue false
   * Whether to notify the user by email.
   */
  sendEmail?: boolean;
}

export interface AddUserBody {
  /**
   * User's email address.
   */
  email: string;

  /**
   * User's first name.
   */
  firstName: string;

  /**
   * User's last name.
   */
  lastName: string;

  /**
   * @defaultValue false
   * User's admin status.
   */
  admin?: boolean;

  /**
   * @defaultValue false
   * User's licensed sheet creator status.
   */
  licensedSheetCreator?: boolean;

  /**
   * User's profile image.
   * @see ProfileImage
   */
  profileImage?: ProfileImage;

  /**
   * @defaultValue false
   * User's group admin status.
   */
  groupAdmin?: boolean;

  /**
   * @defaultValue false
   * User's resource viewer status.
   */
  resourceViewer?: boolean;

  /**
   * User's status.
   * @see UserStatus
   */
  status: UserStatus;
}

export interface AddUserResponse {
  /**
   * Status message.
   */
  message: string;
  /**
   * Result code.
   */
  resultCode: number;
  /**
   * The created user object.
   */
  result: {
    /**
     * User Id.
     */
    id: number;
    /**
     * User's admin status.
     */
    admin?: boolean;
    /**
     * User's custom welcome screen viewed timestamp.
     */
    customWelcomeScreenViewed?: Date | string;
    /**
     * User's email address.
     */
    email: string;
    /**
     * User's first name.
     */
    firstName: string;
    /**
     * User's group admin status.
     */
    groupAdmin?: boolean;
    /**
     * Whether the user is internal.
     */
    isInternal?: boolean;
    /**
     * User's last login timestamp.
     */
    lastLogin?: Date | string;
    /**
     * User's last name.
     */
    lastName: string;
    /**
     * User's licensed sheet creator status.
     */
    licensedSheetCreator?: boolean;
    /**
     * User's full name.
     */
    name: string;
    /**
     * User's profile image.
     * @see ProfileImage
     */
    profileImage?: ProfileImage;
    /**
     * Provisional expiration date.
     */
    provisionalExpirationDate?: Date | string;
    /**
     * User's resource viewer status.
     */
    resourceViewer?: boolean;
    /**
     * User's seat type.
     * @see SeatTypes
     */
    seatType?: SeatTypes | string;
    /**
     * When the seat type was last changed.
     */
    seatTypeLastChangedAt?: Date | string;
    /**
     * User's sheet count.
     */
    sheetCount?: number;
    /**
     * User's status.
     * @see UserStatus
     */
    status: UserStatus | string;
  };
}

// ============================================================================
// Update User
// ============================================================================

export interface UpdateUserBody {
  /**
   * User's email address.
   */
  email?: string;
  /**
   * User's first name.
   */
  firstName?: string;
  /**
   * User's last name.
   */
  lastName?: string;
  /**
   * @defaultValue false
   * User's admin status.
   */
  admin?: boolean;
  /**
   * @defaultValue false
   * User's licensed sheet creator status.
   */
  licensedSheetCreator?: boolean;
  /**
   * @defaultValue false
   * User's group admin status.
   */
  groupAdmin?: boolean;
  /**
   * @defaultValue false
   * User's resource viewer status.
   */
  resourceViewer?: boolean;
}

export interface UpdateUserOptions extends RequestOptions<undefined, UpdateUserBody> {
  /**
   * User Id.
   */
  userId: number;
}

export interface UpdateUserResponse {
  /**
   * Status message.
   */
  message: string;
  /**
   * Result code.
   */
  resultCode: number;
  /**
   * Array of updated user data.
   */
  data: {
    /**
     * User's email address.
     */
    email: string;
    /**
     * User's full name.
     */
    name: string;
    /**
     * User's first name.
     */
    firstName: string;
    /**
     * User's last name.
     */
    lastName: string;
    /**
     * User's profile image.
     * @see ProfileImage
     */
    profileImage?: ProfileImage;
    /**
     * User Id.
     */
    id: number;
  }[];
}

// ============================================================================
// Remove User
// ============================================================================

export interface RemoveUserQueryParameters {
  /**
   * ID of the user to transfer ownership to.
   */
  transferTo?: number;
  /**
   * @defaultValue false
   * Whether to transfer sheets.
   */
  transferSheets?: boolean;
  /**
   * @defaultValue false
   * Whether to remove from sharing.
   */
  removeFromSharing?: boolean;
}

export interface RemoveUserOptions extends RequestOptions<RemoveUserQueryParameters, undefined> {
  /**
   * User Id.
   */
  userId: number;
}

// ============================================================================
// Deactivate/Reactivate User
// ============================================================================

export interface DeactivateUserOptions extends RequestOptions<undefined, undefined> {
  /**
   * User Id to deactivate.
   */
  userId: number;
}

export interface ReactivateUserOptions extends RequestOptions<undefined, undefined> {
  /**
   * User Id to reactivate.
   */
  userId: number;
}

// ============================================================================
// Profile Image
// ============================================================================
export interface AddProfileImageBody {
  /**
   * The binary image file to upload as the user's profile image.
   */
  file: Buffer | Blob | ArrayBuffer | Uint8Array | ReadableStream;
}

export interface AddProfileImageOptions extends RequestOptions<undefined, AddProfileImageBody> {
  /**
   * User Id.
   */
  userId: number;
}

export interface AddProfileImageResponse {
  /**
   * Status message.
   */
  message: string;
  /**
   * Result code.
   */
  resultCode: number;
  /**
   * Array of user data with profile image info.
   */
  data: {
    /**
     * User's email address.
     */
    email: string;
    /**
     * User's full name.
     */
    name: string;
    /**
     * User's first name.
     */
    firstName: string;
    /**
     * User's last name.
     */
    lastName: string;
    /**
     * User's profile image.
     * @see ProfileImage
     */
    profileImage: ProfileImage;
    /**
     * User Id.
     */
    id: number;
  }[];
}

// ============================================================================
// Upgrade/Downgrade User
// ============================================================================

export interface UpgradeUserBody {
  /**
   * User's seat type to upgrade to. Can be 'GUEST' (only for external users) or 'MEMBER' (default).
   * @see SeatTypes
   */
  seatType?: SeatTypes;
}

export interface UpgradeUserOptions extends RequestOptions<undefined, UpgradeUserBody> {
  /**
   * User Id.
   */
  userId: number;
  /**
   * Plan Id.
   */
  planId: number;
}

export interface DowngradeUserBody {
  /**
   * User's seat type to downgrade to. Can be 'GUEST' (only for external users) or 'VIEWER' (required).
   * @see SeatTypes
   */
  seatType: SeatTypes;
}

export interface DowngradeUserOptions extends RequestOptions<undefined, DowngradeUserBody> {
  /**
   * User Id.
   */
  userId: number;
  /**
   * Plan Id.
   */
  planId: number;
}

// ============================================================================
// List User Plans
// ============================================================================

export interface ListUserPlansQueryParameters {
  /**
   * The lastKey token returned from the previous page of results.
   */
  lastKey?: string;
  /**
   * @defaultValue 100
   * The maximum amount of items to return in the response.
   */
  maxItems?: number;
}

export interface ListUserPlansOptions extends RequestOptions<ListUserPlansQueryParameters, undefined> {
  /**
   * User Id.
   */
  userId: number;
}

export interface ListUserPlansResponse {
  /**
   * The lastKey token for pagination.
   */
  lastKey?: string;
  /**
   * Array of user plan data.
   */
  data: {
    /**
     * Plan Id.
     */
    planId: number;
    /**
     * User's seat type.
     * @see SeatTypes
     */
    seatType: SeatTypes | string;
    /**
     * When the seat type was last changed.
     */
    seatTypeLastChangedAt?: Date | string;
    /**
     * Whether the user is internal.
     */
    isInternal?: boolean;
    /**
     * Provisional expiration date.
     */
    provisionalExpirationDate?: Date | string;
  }[];
}

// ============================================================================
// Remove User From Plan
// ============================================================================

export interface RemoveUserFromPlanOptions extends RequestOptions<undefined, undefined> {
  /**
   * User Id.
   */
  userId: number;
  /**
   * Plan Id.
   */
  planId: number;
}
