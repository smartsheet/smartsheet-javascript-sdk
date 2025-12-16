import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';
import type { BaseResponseStatus } from '../types/BaseResponseStatus';
import type { PaginationQueryParameters } from '../types/PaginationQueryParameters';
import type { PaginationResponse } from '../types/PaginationResponse';

// ============================================================================
// Groups API Interface
// ============================================================================

export interface GroupsApi {
  /**
   * Gets a list of all groups in an organization account.
   *
   * @param options - {@link RequestOptions}\<{@link ListGroupsQueryParameters}, undefined\> - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link ListGroupsResponse}\> - Optional callback function
   * @returns Promise\<{@link ListGroupsResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `GET /groups`
   *
   * @example
   * ```typescript
   * const groups = await client.groups.listGroups({
   *   queryParameters: {
   *     includeAll: true
   *   }
   * });
   * ```
   */
  listGroups: (
    options?: RequestOptions<ListGroupsQueryParameters, undefined>,
    callback?: RequestCallback<ListGroupsResponse>
  ) => Promise<ListGroupsResponse>;

  /**
   * Gets a group by ID.
   *
   * @param options - {@link GetGroupOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link Group}\> - Optional callback function
   * @returns Promise\<{@link Group}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `GET /groups/{groupId}`
   *
   * @example
   * ```typescript
   * const group = await client.groups.getGroup({
   *   groupId: 4583173393803140
   * });
   * ```
   */
  getGroup: (options: GetGroupOptions, callback?: RequestCallback<Group>) => Promise<Group>;

  /**
   * Creates a new group.
   *
   * @param options - {@link RequestOptions}\<undefined, {@link AddGroupBody}\> - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link AddGroupResponse}\> - Optional callback function
   * @returns Promise\<{@link AddGroupResponse}\>
   *
   * @remarks
   * **Who can use this operation:**
   * - **Permissions:** System Admin or Group Admin
   *
   * It mirrors to the following Smartsheet REST API method: `POST /groups`
   *
   * @example
   * ```typescript
   * const newGroup = await client.groups.createGroup({
   *   body: {
   *     name: 'New Group',
   *     description: 'Group description'
   *   }
   * });
   * ```
   */
  createGroup: (
    options: RequestOptions<undefined, AddGroupBody>,
    callback?: RequestCallback<AddGroupResponse>
  ) => Promise<AddGroupResponse>;

  /**
   * Updates a group.
   *
   * @param options - {@link UpdateGroupOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link UpdateGroupResponse}\> - Optional callback function
   * @returns Promise\<{@link UpdateGroupResponse}\>
   *
   * @remarks
   * **Who can use this operation:**
   * - **Permissions:** System Admin or Group Admin
   *
   * It mirrors to the following Smartsheet REST API method: `PUT /groups/{groupId}`
   *
   * @example
   * ```typescript
   * const result = await client.groups.updateGroup({
   *   groupId: 4583173393803140,
   *   body: {
   *     name: 'Updated Group Name'
   *   }
   * });
   * ```
   */
  updateGroup: (
    options: UpdateGroupOptions,
    callback?: RequestCallback<UpdateGroupResponse>
  ) => Promise<UpdateGroupResponse>;

  /**
   * Deletes a group.
   *
   * @param options - {@link DeleteGroupOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link BaseResponseStatus}\> - Optional callback function
   * @returns Promise\<{@link BaseResponseStatus}\>
   *
   * @remarks
   * **Who can use this operation:**
   * - **Permissions:** System Admin or Group Admin
   *
   * It mirrors to the following Smartsheet REST API method: `DELETE /groups/{groupId}`
   *
   * @example
   * ```typescript
   * const result = await client.groups.deleteGroup({
   *   groupId: 4583173393803140
   * });
   * ```
   */
  deleteGroup: (
    options: DeleteGroupOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => Promise<BaseResponseStatus>;

  /**
   * Adds members to a group.
   *
   * @param options - {@link AddGroupMembersOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link AddGroupMembersResponse}\> - Optional callback function
   * @returns Promise\<{@link AddGroupMembersResponse}\>
   *
   * @remarks
   * **Who can use this operation:**
   * - **Permissions:** System Admin or Group Admin
   *
   * It mirrors to the following Smartsheet REST API method: `POST /groups/{groupId}/members`
   *
   * @example
   * ```typescript
   * const result = await client.groups.addGroupMembers({
   *   groupId: 4583173393803140,
   *   body: [
   *     { email: 'user@example.com' }
   *   ]
   * });
   * ```
   */
  addGroupMembers: (
    options: AddGroupMembersOptions,
    callback?: RequestCallback<AddGroupMembersResponse>
  ) => Promise<AddGroupMembersResponse>;

  /**
   * Removes a member from a group.
   *
   * @param options - {@link RemoveGroupMemberOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link BaseResponseStatus}\> - Optional callback function
   * @returns Promise\<{@link BaseResponseStatus}\>
   *
   * @remarks
   * **Who can use this operation:**
   * - **Permissions:** System Admin or Group Admin
   *
   * It mirrors to the following Smartsheet REST API method: `DELETE /groups/{groupId}/members/{userId}`
   *
   * @example
   * ```typescript
   * const result = await client.groups.removeGroupMember({
   *   groupId: 4583173393803140,
   *   userId: 1234567890123456
   * });
   * ```
   */
  removeGroupMember: (
    options: RemoveGroupMemberOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => Promise<BaseResponseStatus>;
}

// ============================================================================
// Group Types
// ============================================================================

export interface GroupMember {
  /**
   * Member's user Id.
   */
  id: number;

  /**
   * Member's email address.
   */
  email: string;

  /**
   * Member's first name.
   */
  firstName: string;

  /**
   * Member's last name.
   */
  lastName: string;

  /**
   * Member's full name
   */
  name: string;
}

export interface Group {
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
   * Group owner's email address.
   */
  owner: string;

  /**
   * Group owner's user Id.
   */
  ownerId: number;

  /**
   * Time of creation.
   */
  createdAt: string | number;

  /**
   * Time of last modification.
   */
  modifiedAt: string | number;

  /**
   * List of group members.
   */
  members?: GroupMember[];
}

// ============================================================================
// List Groups
// ============================================================================

export interface ListGroupsQueryParameters extends PaginationQueryParameters {
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

export type ListGroupsResponse = PaginationResponse<Group>;

// ============================================================================
// Get Group
// ============================================================================

export interface GetGroupOptions extends RequestOptions<undefined, undefined> {
  /**
   * Group Id.
   */
  groupId: number;
}

// ============================================================================
// Add Group
// ============================================================================

export interface AddGroupMember {
  /**
   * Member's email address (required).
   */
  email: string;
}

export interface AddGroupBody {
  /**
   * Group name (required).
   */
  name: string;

  /**
   * Group description.
   */
  description?: string;

  /**
   * Array of AddGroupMember objects.
   */
  members?: AddGroupMember[];
}

export interface AddGroupResponse extends BaseResponseStatus {
  /**
   * The created group object.
   */
  result: Group;
}

// ============================================================================
// Update Group
// ============================================================================

export interface UpdateGroupBody {
  /**
   * Group name.
   */
  name?: string;

  /**
   * Group description.
   */
  description?: string;

  /**
   * Group owner's user Id.
   */
  ownerId?: number;
}

export interface UpdateGroupOptions extends RequestOptions<undefined, UpdateGroupBody> {
  /**
   * Group Id.
   */
  groupId: number;
}

export interface UpdateGroupResponse extends BaseResponseStatus {
  /**
   * The updated group object.
   */
  result: Group;
}

// ============================================================================
// Delete Group
// ============================================================================

export interface DeleteGroupOptions extends RequestOptions<undefined, undefined> {
  /**
   * Group Id.
   */
  groupId: number;
}

// ============================================================================
// Add Group Members
// ============================================================================

export interface AddGroupMembersOptions extends RequestOptions<undefined, GroupMember | GroupMember[]> {
  /**
   * Group Id.
   */
  groupId: number;
}

export interface AddGroupMembersResponse extends BaseResponseStatus {
  /**
   * Array of added GroupMember objects.
   */
  result: GroupMember | GroupMember[];
}

// ============================================================================
// Remove Group Member
// ============================================================================

export interface RemoveGroupMemberOptions extends RequestOptions<undefined, undefined> {
  /**
   * Group Id.
   */
  groupId: number;

  /**
   * User Id.
   */
  userId: number;
}
