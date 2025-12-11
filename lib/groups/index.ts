import type { CreateOptions } from '../types/CreateOptions';
import type { RequestCallback } from '../types/RequestCallback';
import type { BaseResponseStatus } from '../types/BaseResponseStatus';
import type { RequestOptions } from '../types/RequestOptions';
import type {
  GroupsApi,
  Group,
  ListGroupsQueryParameters,
  ListGroupsResponse,
  GetGroupOptions,
  AddGroupBody,
  AddGroupResponse,
  UpdateGroupOptions,
  UpdateGroupResponse,
  DeleteGroupOptions,
  AddGroupMembersOptions,
  AddGroupMembersResponse,
  RemoveGroupMemberOptions,
} from './types';

export function create(options: CreateOptions): GroupsApi {
  const requestor = options.requestor;

  const optionsToSend = {
    url: options.apiUrls.groups,
    ...options.clientOptions,
  };

  const listGroups = (
    getOptions?: RequestOptions<ListGroupsQueryParameters, undefined>,
    callback?: RequestCallback<ListGroupsResponse>
  ): Promise<ListGroupsResponse> => {
    return requestor.get({ ...optionsToSend, ...getOptions }, callback);
  };

  const getGroup = (getOptions: GetGroupOptions, callback?: RequestCallback<Group>): Promise<Group> => {
    const urlOptions = { url: options.apiUrls.groups + '/' + getOptions.groupId };
    return requestor.get({ ...optionsToSend, ...urlOptions, ...getOptions }, callback);
  };

  const createGroup = (
    postOptions: RequestOptions<undefined, AddGroupBody>,
    callback?: RequestCallback<AddGroupResponse>
  ): Promise<AddGroupResponse> => {
    return requestor.post({ ...optionsToSend, ...postOptions }, callback);
  };

  const updateGroup = (
    putOptions: UpdateGroupOptions,
    callback?: RequestCallback<UpdateGroupResponse>
  ): Promise<UpdateGroupResponse> => {
    const urlOptions = { url: options.apiUrls.groups + '/' + putOptions.groupId };
    return requestor.put({ ...optionsToSend, ...urlOptions, ...putOptions }, callback);
  };

  const deleteGroup = (
    deleteOptions: DeleteGroupOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ): Promise<BaseResponseStatus> => {
    const urlOptions = { url: options.apiUrls.groups + '/' + deleteOptions.groupId };
    return requestor.delete({ ...optionsToSend, ...urlOptions, ...deleteOptions }, callback);
  };

  const addGroupMembers = (
    postOptions: AddGroupMembersOptions,
    callback?: RequestCallback<AddGroupMembersResponse>
  ): Promise<AddGroupMembersResponse> => {
    const urlOptions = { url: options.apiUrls.groups + '/' + postOptions.groupId + '/members' };
    return requestor.post({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

  const removeGroupMember = (
    deleteOptions: RemoveGroupMemberOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ): Promise<BaseResponseStatus> => {
    const urlOptions = {
      url: options.apiUrls.groups + '/' + deleteOptions.groupId + '/members/' + deleteOptions.userId,
    };
    return requestor.delete({ ...optionsToSend, ...urlOptions, ...deleteOptions }, callback);
  };

  return {
    listGroups,
    getGroup,
    createGroup,
    updateGroup,
    deleteGroup,
    addGroupMembers,
    removeGroupMember,
  };
}
