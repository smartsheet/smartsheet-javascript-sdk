import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';
import type { BaseResponseStatus } from '../types/BaseResponseStatus';

// ============================================================================
// Users API Interface
// ============================================================================

export interface UsersApi {
  /**
   * Gets the specified user.
   *
   * @param options - GetUserOptions - Configuration options for the request
   * @param callback - RequestCallback<GetUserResponse> - Optional callback function
   * @returns Promise resolving to the User object
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
   * @param options - RequestOptions<ListUsersQueryParameters, undefined> - Configuration options for the request
   * @param callback - RequestCallback<ListUsersResponse> - Optional callback function
   * @returns Promise resolving to an IndexResult object containing an array of User objects
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
   * @param options - RequestOptions<GetCurrentUserQueryParameters, undefined> - Configuration options for the request
   * @param callback - RequestCallback<GetCurrentUserResponse> - Optional callback function
   * @returns Promise resolving to the current User object
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
   * @param options - RequestOptions<undefined, AddUserBody> - Configuration options for the request
   * @param callback - RequestCallback<AddUserResponse> - Optional callback function
   * @returns Promise resolving to the result containing the newly created User object
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
    options: RequestOptions<undefined, AddUserBody>,
    callback?: RequestCallback<AddUserResponse>
  ) => Promise<AddUserResponse>;

  /**
   * Adds a user to the organization account and sends an email notification.
   *
   * This is a convenience method that adds a user with sendEmail=true query parameter.
   *
   * @param options - RequestOptions<undefined, AddUserBody> - Configuration options for the request
   * @param callback - RequestCallback<AddUserResponse> - Optional callback function
   * @returns Promise resolving to the result containing the newly created User object
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
   * @param options - UpdateUserOptions - Configuration options for the request
   * @param callback - RequestCallback<UpdateUserResponse> - Optional callback function
   * @returns Promise resolving to the result containing updated user data
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
   * @param options - RemoveUserOptions - Configuration options for the request
   * @param callback - RequestCallback<BaseResponseStatus> - Optional callback function
   * @returns Promise resolving to the result object
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
   * @param options - DeactivateUserOptions - Configuration options for the request
   * @param callback - RequestCallback<BaseResponseStatus> - Optional callback function
   * @returns Promise resolving to the result object
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
   * @param options - ReactivateUserOptions - Configuration options for the request
   * @param callback - RequestCallback<BaseResponseStatus> - Optional callback function
   * @returns Promise resolving to the result object
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
   * @param options - AddProfileImageOptions - Configuration options for the request
   * @param callback - RequestCallback<AddProfileImageResponse> - Optional callback function
   * @returns Promise resolving to the result containing user data with profile image info
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
   * @param options - UpgradeUserOptions - Configuration options for the request
   * @param callback - RequestCallback<BaseResponseStatus> - Optional callback function
   * @returns Promise resolving to the result object
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
   * @param options - DowngradeUserOptions - Configuration options for the request
   * @param callback - RequestCallback<BaseResponseStatus> - Optional callback function
   * @returns Promise resolving to the result object
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
   * @param options - ListUserPlansOptions - Configuration options for the request
   * @param callback - RequestCallback<ListUserPlansResponse> - Optional callback function
   * @returns Promise resolving to an object containing an array of user plan data
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
   * @param options - RemoveUserFromPlanOptions - Configuration options for the request
   * @param callback - RequestCallback<BaseResponseStatus> - Optional callback function
   * @returns Promise resolving to the result object
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

export enum SeatTypes {
  MEMBER = 'MEMBER',
  PROVISIONAL_MEMBER = 'PROVISIONAL_MEMBER',
  GUEST = 'GUEST',
  VIEWER = 'VIEWER',
}

export interface UserProfile {
  /**
   * @description User Id.
   */
  id: number;
  /**
   * @description User's email address.
   */
  email: string;
  /**
   * @description User's first name.
   */
  firstName?: string;
  /**
   * @description User's last name.
   */
  lastName?: string;
  /**
   * @description User's full name (read-only).
   */
  name?: string;
  /**
   * @description User's role.
   */
  admin?: boolean;
  /**
   * @description User's license type.
   */
  licensedSheetCreator?: boolean;
  /**
   * @description User's group admin status.
   */
  groupAdmin?: boolean;
  /**
   * @description User's resource viewer status.
   */
  resourceViewer?: boolean;
  /**
   * @description User's status.
   */
  status?: UserStatus;
  /**
   * @description URL to user's profile image.
   */
  profileImage?: ProfileImage;
  /**
   * @description User's title.
   */
  title?: string;
  /**
   * @description User's department.
   */
  department?: string;
  /**
   * @description User's company.
   */
  company?: string;
  /**
   * @description User's work phone.
   */
  workPhone?: string;
  /**
   * @description User's mobile phone.
   */
  mobilePhone?: string;
  /**
   * @description User's role.
   */
  role?: string;
  /**
   * @description User's custom welcome screen viewed status.
   */
  customWelcomeScreenViewed?: Date | string;
  /**
   * @description User's last login time.
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
   * @description Account Id.
   */
  id: number;
  /**
   * @description Account name.
   */
  name: string;
}

export interface AlternateEmail {
  /**
   * @description Alternate email Id.
   */
  id: number;
  /**
   * @description Whether the alternate email is confirmed.
   */
  confirmed: boolean;
  /**
   * @description The alternate email address.
   */
  email: string;
}

export interface ProfileImage {
  /**
   * @description Image Id.
   */
  imageId: string;
  /**
   * @description Image height in pixels.
   */
  height?: number;
  /**
   * @description Image width in pixels.
   */
  width?: number;
}

// ============================================================================
// Get User
// ============================================================================

export interface GetUserResponse {
  /**
   * @description User Id.
   */
  id: number;

  /**
   * @description Account information.
   */
  account: Account;

  /**
   * @description User's admin status.
   */
  admin?: boolean;

  /**
   * @description Alternate email addresses.
   */
  alternateEmails?: AlternateEmail[];

  /**
   * @description User's company.
   */
  company: string;

  /**
   * @description User's custom welcome screen viewed timestamp.
   */
  customWelcomeScreenViewed?: Date | string;

  /**
   * @description User's department.
   */
  department: string;

  /**
   * @description User's email address.
   */
  email: string;

  /**
   * @description User's first name.
   */
  firstName: string;

  /**
   * @description User's group admin status.
   */
  groupAdmin?: boolean;

  /**
   * @description User's Jira admin status.
   */
  jiraAdmin: boolean;

  /**
   * @description User's last login timestamp.
   */
  lastLogin?: Date | string;

  /**
   * @description User's last name.
   */
  lastName: string;

  /**
   * @description User's licensed sheet creator status.
   */
  licensedSheetCreator?: boolean;

  /**
   * @description User's locale.
   */
  locale: string;

  /**
   * @description User's mobile phone.
   */
  mobilePhone: string;

  /**
   * @description User's profile image.
   */
  profileImage?: ProfileImage;

  /**
   * @description User's resource viewer status.
   */
  resourceViewer?: boolean;

  /**
   * @description User's role.
   */
  role: string;

  /**
   * @description User's Salesforce admin status.
   */
  salesforceAdmin: boolean;

  /**
   * @description User's Salesforce user status.
   */
  salesforceUser: boolean;

  /**
   * @description User's sheet count.
   */
  sheetCount?: number;

  /**
   * @description User's time zone.
   */
  timeZone: string;

  /**
   * @description User's title.
   */
  title: string;

  /**
   * @description User's work phone.
   */
  workPhone: string;
}

export interface GetUserOptions extends RequestOptions<undefined, undefined> {
  /**
   * @description User Id to deactivate.
   */
  userId: number;
}

// ============================================================================
// List Users
// ============================================================================

export interface ListUsersQueryParameters {
  /**
   * @description A comma-separated list of emails.
   */
  email?: string;

  /**
   * @description A comma-separated list of elements to include in the response.
   */
  include?: string;

  /**
   * @default false
   * @description If true, include all results (do not paginate).
   */
  includeAll?: boolean;

  /**
   * @default false
   * @description If true, dates/times are sent and received as milliseconds since the UNIX epoch (midnight on January 1, 1970 in UTC time).
   */
  numericDates?: boolean;

  /**
   * @description Plan Id for which seat types are returned. Available only to system administrators.
   */
  planId?: number;

  /**
   * @description Seat type based on which to filter the results.
   */
  seatType?: SeatTypes;

  /**
   * @default 1
   * @description Which page to return.
   */
  page?: number;

  /**
   * @default 100
   * @description The maximum number of items to return per page.
   */
  pageSize?: number;
}

export interface ListUsersData {
  /**
   * @description User Id.
   */
  id: number;

  /**
   * @description User's admin status.
   */
  admin: boolean;

  /**
   * @description User's custom welcome screen viewed timestamp.
   */
  customWelcomeScreenViewed?: Date | string;

  /**
   * @description User's email address.
   */
  email: string;

  /**
   * @description User's first name.
   */
  firstName: string;

  /**
   * @description User's group admin status.
   */
  groupAdmin: boolean;

  /**
   * @description Whether the user is internal.
   */
  isInternal: boolean;

  /**
   * @description User's last login timestamp.
   */
  lastLogin?: Date | string;

  /**
   * @description User's last name.
   */
  lastName: string;

  /**
   * @description User's licensed sheet creator status.
   */
  licensedSheetCreator: boolean;

  /**
   * @description User's full name.
   */
  name: string;

  /**
   * @description User's profile image.
   */
  profileImage?: ProfileImage;

  /**
   * @description Provisional expiration date.
   */
  provisionalExpirationDate?: Date | string;

  /**
   * @description User's resource viewer status.
   */
  resourceViewer: boolean;

  /**
   * @description User's seat type.
   */
  seatType: SeatTypes | string;

  /**
   * @description When the seat type was last changed.
   */
  seatTypeLastChangedAt?: Date | string;

  /**
   * @description User's sheet count.
   */
  sheetCount?: number;

  /**
   * @description User's status.
   */
  status: UserStatus | string;
}

export interface ListUsersResponse {
  /**
   * @default 1
   * @description The current page number.
   */
  pageNumber: number;

  /**
   * @default 100
   * @description The number of items per page.
   */
  pageSize: number;

  /**
   * @description The total number of pages.
   */
  totalPages: number;

  /**
   * @description The total number of users.
   */
  totalCount: number;

  /**
   * @description Array of User objects.
   */
  data: ListUsersData[];
}

// ============================================================================
// Get Current User
// ============================================================================

export interface GetCurrentUserResponse {
  /**
   * @description User Id.
   */
  id: number;

  /**
   * @description Account information.
   */
  account: Account;

  /**
   * @description User's admin status.
   */
  admin: boolean;

  /**
   * @description Alternate email addresses.
   */
  alternateEmails?: AlternateEmail[];

  /**
   * @description User's company.
   */
  company: string;

  /**
   * @description User's custom welcome screen viewed timestamp.
   */
  customWelcomeScreenViewed?: Date | string;

  /**
   * @description User's department.
   */
  department: string;

  /**
   * @description User's email address.
   */
  email: string;

  /**
   * @description User's first name.
   */
  firstName: string;

  /**
   * @description User's group admin status.
   */
  groupAdmin: boolean;

  /**
   * @description User's Jira admin status.
   */
  jiraAdmin: boolean;

  /**
   * @description User's last login timestamp.
   */
  lastLogin?: Date | string;

  /**
   * @description User's last name.
   */
  lastName: string;

  /**
   * @description User's licensed sheet creator status.
   */
  licensedSheetCreator: boolean;

  /**
   * @description User's locale.
   */
  locale: string;

  /**
   * @description User's mobile phone.
   */
  mobilePhone: string;

  /**
   * @description User's profile image.
   */
  profileImage?: ProfileImage;

  /**
   * @description User's resource viewer status.
   */
  resourceViewer: boolean;

  /**
   * @description User's role.
   */
  role: string;

  /**
   * @description User's Salesforce admin status.
   */
  salesforceAdmin: boolean;

  /**
   * @description User's Salesforce user status.
   */
  salesforceUser: boolean;

  /**
   * @description User's sheet count.
   */
  sheetCount: number;

  /**
   * @description User's time zone.
   */
  timeZone: string;

  /**
   * @description User's title.
   */
  title: string;

  /**
   * @description User's work phone.
   */
  workPhone: string;

  /**
   * @description Array of group data objects.
   */
  data: {
    /**
     * @description Group Id.
     */
    id: number;

    /**
     * @description Group name.
     */
    name: string;

    /**
     * @description Group description.
     */
    description: string;

    /**
     * @description Group owner email.
     */
    owner: string;

    /**
     * @description Group owner Id.
     */
    ownerId: number;

    /**
     * @description Group created timestamp.
     */
    createdAt: Date | string;

    /**
     * @description Group modified timestamp.
     */
    modifiedAt: Date | string;
  }[];
}

export interface GetCurrentUserQueryParameters {
  /**
   * @description A comma-separated list of elements to include in the response.
   */
  include?: string;
}

// ============================================================================
// Add User
// ============================================================================

export interface AddUserQueryParameters {
  /**
   * @default false
   * @description Whether to notify the user by email.
   */
  sendEmail?: boolean;
}

export interface AddUserBody {
  /**
   * @description User's email address.
   */
  email: string;

  /**
   * @description User's first name.
   */
  firstName: string;

  /**
   * @description User's last name.
   */
  lastName: string;

  /**
   * @default false
   * @description User's admin status.
   */
  admin?: boolean;

  /**
   * @default false
   * @description User's licensed sheet creator status.
   */
  licensedSheetCreator?: boolean;

  /**
   * @description User's profile image.
   */
  profileImage?: ProfileImage;

  /**
   * @default false
   * @description User's group admin status.
   */
  groupAdmin?: boolean;

  /**
   * @default false
   * @description User's resource viewer status.
   */
  resourceViewer?: boolean;

  /**
   * @description User's status.
   */
  status: UserStatus;
}

export interface AddUserResponse {
  /**
   * @description Status message.
   */
  message: string;
  /**
   * @description Result code.
   */
  resultCode: number;
  /**
   * @description The created user object.
   */
  result: {
    /**
     * @description User Id.
     */
    id: number;
    /**
     * @description User's admin status.
     */
    admin?: boolean;
    /**
     * @description User's custom welcome screen viewed timestamp.
     */
    customWelcomeScreenViewed?: Date | string;
    /**
     * @description User's email address.
     */
    email: string;
    /**
     * @description User's first name.
     */
    firstName: string;
    /**
     * @description User's group admin status.
     */
    groupAdmin?: boolean;
    /**
     * @description Whether the user is internal.
     */
    isInternal?: boolean;
    /**
     * @description User's last login timestamp.
     */
    lastLogin?: Date | string;
    /**
     * @description User's last name.
     */
    lastName: string;
    /**
     * @description User's licensed sheet creator status.
     */
    licensedSheetCreator?: boolean;
    /**
     * @description User's full name.
     */
    name: string;
    /**
     * @description User's profile image.
     */
    profileImage?: ProfileImage;
    /**
     * @description Provisional expiration date.
     */
    provisionalExpirationDate?: Date | string;
    /**
     * @description User's resource viewer status.
     */
    resourceViewer?: boolean;
    /**
     * @description User's seat type.
     */
    seatType?: SeatTypes | string;
    /**
     * @description When the seat type was last changed.
     */
    seatTypeLastChangedAt?: Date | string;
    /**
     * @description User's sheet count.
     */
    sheetCount?: number;
    /**
     * @description User's status.
     */
    status: UserStatus | string;
  };
}

// ============================================================================
// Update User
// ============================================================================

export interface UpdateUserBody {
  /**
   * @description User's email address.
   */
  email?: string;
  /**
   * @description User's first name.
   */
  firstName?: string;
  /**
   * @description User's last name.
   */
  lastName?: string;
  /**
   * @default false
   * @description User's admin status.
   */
  admin?: boolean;
  /**
   * @default false
   * @description User's licensed sheet creator status.
   */
  licensedSheetCreator?: boolean;
  /**
   * @default false
   * @description User's group admin status.
   */
  groupAdmin?: boolean;
  /**
   * @default false
   * @description User's resource viewer status.
   */
  resourceViewer?: boolean;
}

export interface UpdateUserOptions extends RequestOptions<undefined, UpdateUserBody> {
  /**
   * @description User Id.
   */
  userId: number;
}

export interface UpdateUserResponse {
  /**
   * @description Status message.
   */
  message: string;
  /**
   * @description Result code.
   */
  resultCode: number;
  /**
   * @description Array of updated user data.
   */
  data: {
    /**
     * @description User's email address.
     */
    email: string;
    /**
     * @description User's full name.
     */
    name: string;
    /**
     * @description User's first name.
     */
    firstName: string;
    /**
     * @description User's last name.
     */
    lastName: string;
    /**
     * @description User's profile image.
     */
    profileImage?: ProfileImage;
    /**
     * @description User Id.
     */
    id: number;
  }[];
}

// ============================================================================
// Remove User
// ============================================================================

export interface RemoveUserQueryParameters {
  /**
   * @description ID of the user to transfer ownership to.
   */
  transferTo?: number;
  /**
   * @default false
   * @description Whether to transfer sheets.
   */
  transferSheets?: boolean;
  /**
   * @default false
   * @description Whether to remove from sharing.
   */
  removeFromSharing?: boolean;
}

export interface RemoveUserOptions extends RequestOptions<RemoveUserQueryParameters, undefined> {
  /**
   * @description User Id.
   */
  userId: number;
}

// ============================================================================
// Deactivate/Reactivate User
// ============================================================================

export interface DeactivateUserOptions extends RequestOptions<undefined, undefined> {
  /**
   * @description User Id to deactivate.
   */
  userId: number;
}

export interface ReactivateUserOptions extends RequestOptions<undefined, undefined> {
  /**
   * @description User Id to reactivate.
   */
  userId: number;
}

// ============================================================================
// Profile Image
// ============================================================================
export interface AddProfileImageBody {
  /**
   * @description The binary image file to upload as the user's profile image.
   */
  file: Buffer | Blob | ArrayBuffer | Uint8Array | ReadableStream;
}

export interface AddProfileImageOptions extends RequestOptions<undefined, AddProfileImageBody> {
  /**
   * @description User Id.
   */
  userId: number;
}

export interface AddProfileImageResponse {
  /**
   * @description Status message.
   */
  message: string;
  /**
   * @description Result code.
   */
  resultCode: number;
  /**
   * @description Array of user data with profile image info.
   */
  data: {
    /**
     * @description User's email address.
     */
    email: string;
    /**
     * @description User's full name.
     */
    name: string;
    /**
     * @description User's first name.
     */
    firstName: string;
    /**
     * @description User's last name.
     */
    lastName: string;
    /**
     * @description User's profile image.
     */
    profileImage: ProfileImage;
    /**
     * @description User Id.
     */
    id: number;
  }[];
}

// ============================================================================
// Upgrade/Downgrade User
// ============================================================================

export interface UpgradeUserBody {
  /**
   * @description User's seat type to upgrade to. Can be 'GUEST' (only for external users) or 'MEMBER' (default).
   */
  seatType?: SeatTypes;
}

export interface UpgradeUserOptions extends RequestOptions<undefined, UpgradeUserBody> {
  /**
   * @description User Id.
   */
  userId: number;
  /**
   * @description Plan Id.
   */
  planId: number;
}

export interface DowngradeUserBody {
  /**
   * @description User's seat type to downgrade to. Can be 'GUEST' (only for external users) or 'VIEWER' (required).
   */
  seatType: SeatTypes;
}

export interface DowngradeUserOptions extends RequestOptions<undefined, DowngradeUserBody> {
  /**
   * @description User Id.
   */
  userId: number;
  /**
   * @description Plan Id.
   */
  planId: number;
}

// ============================================================================
// List User Plans
// ============================================================================

export interface ListUserPlansQueryParameters {
  /**
   * @description The lastKey token returned from the previous page of results.
   */
  lastKey?: string;
  /**
   * @default 100
   * @description The maximum amount of items to return in the response.
   */
  maxItems?: number;
}

export interface ListUserPlansOptions extends RequestOptions<ListUserPlansQueryParameters, undefined> {
  /**
   * @description User Id.
   */
  userId: number;
}

export interface ListUserPlansResponse {
  /**
   * @description The lastKey token for pagination.
   */
  lastKey?: string;
  /**
   * @description Array of user plan data.
   */
  data: {
    /**
     * @description Plan Id.
     */
    planId: number;
    /**
     * @description User's seat type.
     */
    seatType: SeatTypes | string;
    /**
     * @description When the seat type was last changed.
     */
    seatTypeLastChangedAt?: Date | string;
    /**
     * @description Whether the user is internal.
     */
    isInternal?: boolean;
    /**
     * @description Provisional expiration date.
     */
    provisionalExpirationDate?: Date | string;
  }[];
}

// ============================================================================
// Remove User From Plan
// ============================================================================

export interface RemoveUserFromPlanOptions extends RequestOptions<undefined, undefined> {
  /**
   * @description User Id.
   */
  userId: number;
  /**
   * @description Plan Id.
   */
  planId: number;
}
