import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';
import type { BaseResponseStatus } from '../types/BaseResponseStatus';

// ============================================================================
// Users API Interface
// ============================================================================

export interface UsersApi {
  getUser: (options: GetUserOptions, callback?: RequestCallback<GetUserResponse>) => Promise<GetUserResponse>;
  listAllUsers: (
    options: RequestOptions<ListUsersQueryParameters, undefined>,
    callback?: RequestCallback<ListUsersResponse>
  ) => Promise<ListUsersResponse>;
  getCurrentUser: (
    options: RequestOptions<GetCurrentUserQueryParameters, undefined>,
    callback?: RequestCallback<GetCurrentUserResponse>
  ) => Promise<GetCurrentUserResponse>;
  addUser: (
    options: RequestOptions<undefined, AddUserBody>,
    callback?: RequestCallback<AddUserResponse>
  ) => Promise<AddUserResponse>;
  addUserAndSendEmail: (
    options: RequestOptions<undefined, AddUserBody>,
    callback?: RequestCallback<AddUserResponse>
  ) => Promise<AddUserResponse>;
  updateUser: (
    options: UpdateUserOptions,
    callback?: RequestCallback<UpdateUserResponse>
  ) => Promise<UpdateUserResponse>;
  removeUser: (
    options: RemoveUserOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => Promise<BaseResponseStatus>;
  deactivateUser: (
    options: DeactivateUserOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => Promise<BaseResponseStatus>;
  reactivateUser: (
    options: ReactivateUserOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => Promise<BaseResponseStatus>;
  addProfileImage: (
    options: AddProfileImageOptions,
    callback?: RequestCallback<AddProfileImageResponse>
  ) => Promise<AddProfileImageResponse>;
  upgradeUser: (
    options: UpgradeUserOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => Promise<BaseResponseStatus>;
  downgradeUser: (
    options: DowngradeUserOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => Promise<BaseResponseStatus>;
  listUserPlans: (
    options: ListUserPlansOptions,
    callback?: RequestCallback<ListUserPlansResponse>
  ) => Promise<ListUserPlansResponse>;
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

export interface UpgradeUserOptions extends RequestOptions<undefined, undefined> {
  /**
   * @description User Id.
   */
  userId: number;
  /**
   * @description Plan Id.
   */
  planId: number;
}

export interface DowngradeUserOptions extends RequestOptions<undefined, undefined> {
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
