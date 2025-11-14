import type { BaseResponseStatus, CreateOptions, RequestCallback, RequestOptions } from '../types';
import type {
  UsersApi,
  ListUsersQueryParameters,
  ListUsersResponse,
  GetCurrentUserQueryParameters,
  AddUserBody,
  DeactivateUserOptions,
  ReactivateUserOptions,
  AddProfileImageOptions,
  UpgradeUserOptions,
  DowngradeUserOptions,
  ListUserPlansOptions,
  ListUserPlansResponse,
  RemoveUserFromPlanOptions,
  GetUserOptions,
  GetUserResponse,
  GetCurrentUserResponse,
  AddUserQueryParameters,
  UpdateUserOptions,
  UpdateUserResponse,
  AddUserResponse,
  RemoveUserOptions,
  AddProfileImageResponse,
} from './types';

import * as alternateEmails from './alternateemails';

export function create(options: CreateOptions): UsersApi {
  const requestor = options.requestor;

  const optionsToSend = {
    url: options.apiUrls.users,
    ...options.clientOptions,
  };

  const listAllUsers = (
    getOptions: RequestOptions<ListUsersQueryParameters, undefined>,
    callback?: RequestCallback<ListUsersResponse>
  ) => {
    const requestOptions = { ...optionsToSend, ...getOptions };
    return requestor.get(requestOptions, callback);
  };

  const getUser = (getOptions: GetUserOptions, callback?: RequestCallback<GetUserResponse>) => {
    const urlOptions = { url: options.apiUrls.users + '/' + getOptions.userId };
    return requestor.get({ ...optionsToSend, ...urlOptions, ...getOptions }, callback);
  };

  const getCurrentUser = (
    getOptions: RequestOptions<GetCurrentUserQueryParameters, undefined>,
    callback?: RequestCallback<GetCurrentUserResponse>
  ) => {
    const urlOptions = { url: options.apiUrls.users + '/me' };
    return requestor.get({ ...optionsToSend, ...urlOptions, ...getOptions }, callback);
  };

  const addUser = (postOptions: RequestOptions<undefined, AddUserBody>, callback?: RequestCallback<AddUserResponse>) =>
    requestor.post({ ...optionsToSend, ...postOptions }, callback);

  const addUserAndSendEmail = (
    postOptions: RequestOptions<AddUserQueryParameters, AddUserBody>,
    callback?: RequestCallback<AddUserResponse>
  ) => requestor.post({ ...optionsToSend, ...postOptions }, callback);

  const updateUser = (putOptions: UpdateUserOptions, callback?: RequestCallback<UpdateUserResponse>) => {
    const urlOptions = { url: options.apiUrls.users + '/' + putOptions.userId };
    return requestor.put({ ...optionsToSend, ...urlOptions, ...putOptions }, callback);
  };

  const removeUser = (deleteOptions: RemoveUserOptions, callback?: RequestCallback<BaseResponseStatus>) => {
    const urlOptions = { url: options.apiUrls.users + '/' + deleteOptions.userId };
    return requestor.delete({ ...optionsToSend, ...urlOptions, ...deleteOptions }, callback);
  };

  const deactivateUser = (postOptions: DeactivateUserOptions, callback?: RequestCallback<BaseResponseStatus>) => {
    const urlOptions = { url: buildDeactivateUserUrl(postOptions) };
    return requestor.post({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

  const reactivateUser = (postOptions: ReactivateUserOptions, callback?: RequestCallback<BaseResponseStatus>) => {
    const urlOptions = { url: buildReactivateUserUrl(postOptions) };
    return requestor.post({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

  const addProfileImage = (
    postOptions: AddProfileImageOptions,
    callback?: RequestCallback<AddProfileImageResponse>
  ) => {
    const urlOptions = { url: buildProfileImageUrl(postOptions) };
    return requestor.postFile({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

  const upgradeUser = (postOptions: UpgradeUserOptions, callback?: RequestCallback<BaseResponseStatus>) => {
    const urlOptions = { url: buildUserUpgradeUrl(postOptions) };
    return requestor.post({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

  const downgradeUser = (postOptions: DowngradeUserOptions, callback?: RequestCallback<BaseResponseStatus>) => {
    const urlOptions = { url: buildUserDowngradeUrl(postOptions) };
    return requestor.post({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

  const listUserPlans = (getOptions: ListUserPlansOptions, callback?: RequestCallback<ListUserPlansResponse>) => {
    const urlOptions = { url: buildListUserPlansUrl(getOptions) };
    const requestOptions = { ...optionsToSend, ...urlOptions, ...getOptions };
    return requestor.get(requestOptions, callback);
  };

  const removeUserFromPlan = (
    deleteOptions: RemoveUserFromPlanOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => {
    const urlOptions = { url: buildRemoveUserFromPlanUrl(deleteOptions) };
    const requestOptions = { ...optionsToSend, ...urlOptions, ...deleteOptions };
    return requestor.delete(requestOptions, callback);
  };

  const buildProfileImageUrl = (urlOptions: { userId: number }) =>
    options.apiUrls.users + '/' + urlOptions.userId + '/profileimage';

  const buildDeactivateUserUrl = (urlOptions: { userId: number }) =>
    options.apiUrls.users + '/' + urlOptions.userId + '/deactivate';

  const buildReactivateUserUrl = (urlOptions: { userId: number }) =>
    options.apiUrls.users + '/' + urlOptions.userId + '/reactivate';

  const buildUserUpgradeUrl = (urlOptions: { userId: number; planId: number }) =>
    options.apiUrls.users + '/' + urlOptions.userId + '/plans/' + urlOptions.planId + '/upgrade';

  const buildUserDowngradeUrl = (urlOptions: { userId: number; planId: number }) =>
    options.apiUrls.users + '/' + urlOptions.userId + '/plans/' + urlOptions.planId + '/downgrade';

  const buildRemoveUserFromPlanUrl = (urlOptions: { userId: number; planId: number }) =>
    options.apiUrls.users + '/' + urlOptions.userId + '/plans/' + urlOptions.planId;

  const buildListUserPlansUrl = (urlOptions: { userId: number }) =>
    options.apiUrls.users + '/' + urlOptions.userId + '/plans';

  const userObject: UsersApi = {
    getUser: getUser,
    listAllUsers: listAllUsers,
    getCurrentUser: getCurrentUser,
    addUser: addUser,
    addUserAndSendEmail: addUserAndSendEmail,
    updateUser: updateUser,
    removeUser: removeUser,
    deactivateUser: deactivateUser,
    reactivateUser: reactivateUser,
    addProfileImage: addProfileImage,
    upgradeUser: upgradeUser,
    downgradeUser: downgradeUser,
    listUserPlans: listUserPlans,
    removeUserFromPlan: removeUserFromPlan,
  };

  // Extend with alternate emails functionality
  return { ...userObject, ...alternateEmails.create(options) };
}
