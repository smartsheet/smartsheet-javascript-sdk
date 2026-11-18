import _ from 'underscore';
import type { BaseResponseStatus } from '../types/BaseResponseStatus';
import type { CreateOptions } from '../types/CreateOptions';
import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';
import type {
  CopyWorkspaceOptions,
  CreateWorkspaceFolderOptions,
  CreateWorkspaceFolderResponse,
  CreateWorkspaceOptions,
  DeleteWorkspaceOptions,
  GetWorkspaceChildrenOptions,
  GetWorkspaceChildrenResponse,
  GetWorkspaceMetadataOptions,
  ListWorkspacesQueryParameters,
  ListWorkspacesResponse,
  UpdateWorkspaceOptions,
  WorkspaceMetadata,
  WorkspaceResult,
  WorkspacesApi,
} from './types';

export function create(options: CreateOptions): WorkspacesApi {
  const requestor = options.requestor;

  const optionsToSend = {
    url: options.apiUrls.workspaces,
  };
  _.extend(optionsToSend, options.clientOptions);

  const listWorkspaces = (
    getOptions?: RequestOptions<ListWorkspacesQueryParameters, undefined>,
    callback?: RequestCallback<ListWorkspacesResponse>
  ): Promise<ListWorkspacesResponse> => {
    const urlOptions = { url: buildUrl(getOptions) };
    getOptions = getOptions || {};
    getOptions.queryParameters = _.extend({ paginationType: 'token' }, getOptions.queryParameters);
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const createWorkspace = (
    postOptions: CreateWorkspaceOptions,
    callback?: RequestCallback<WorkspaceResult>
  ): Promise<WorkspaceResult> => {
    const urlOptions = { url: buildUrl(postOptions) };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const createFolder = (
    postOptions: CreateWorkspaceFolderOptions,
    callback?: RequestCallback<CreateWorkspaceFolderResponse>
  ): Promise<CreateWorkspaceFolderResponse> => {
    const urlOptions = { url: buildUrl(postOptions) + '/folders' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const updateWorkspace = (
    putOptions: UpdateWorkspaceOptions,
    callback?: RequestCallback<WorkspaceResult>
  ): Promise<WorkspaceResult> => {
    const urlOptions = { url: buildUrl(putOptions) };
    return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  const deleteWorkspace = (
    deleteOptions: DeleteWorkspaceOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ): Promise<BaseResponseStatus> => {
    const urlOptions = { url: buildUrl(deleteOptions) };
    return requestor.delete(_.extend({}, optionsToSend, urlOptions, deleteOptions), callback);
  };

  const copyWorkspace = (
    postOptions: CopyWorkspaceOptions,
    callback?: RequestCallback<WorkspaceResult>
  ): Promise<WorkspaceResult> => {
    const urlOptions = { url: buildUrl(postOptions) + '/copy' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  const getWorkspaceMetadata = (
    getOptions: GetWorkspaceMetadataOptions,
    callback?: RequestCallback<WorkspaceMetadata>
  ): Promise<WorkspaceMetadata> => {
    const urlOptions = { url: buildUrl(getOptions) + '/metadata' };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const getWorkspaceChildren = (
    getOptions: GetWorkspaceChildrenOptions,
    callback?: RequestCallback<GetWorkspaceChildrenResponse>
  ): Promise<GetWorkspaceChildrenResponse> => {
    const urlOptions = { url: buildUrl(getOptions) + '/children' };
    return requestor.get(_.extend({}, optionsToSend, urlOptions, getOptions), callback);
  };

  const buildUrl = (urlOptions?: object) => {
    let id = '';
    if (urlOptions && (urlOptions as { workspaceId?: number }).workspaceId) {
      id = '/' + (urlOptions as { workspaceId?: number }).workspaceId;
    }
    return options.apiUrls.workspaces + id;
  };

  const workspaceObject = {
    listWorkspaces: listWorkspaces,
    getWorkspaceMetadata: getWorkspaceMetadata,
    getWorkspaceChildren: getWorkspaceChildren,
    createWorkspace: createWorkspace,
    createFolder: createFolder,
    deleteWorkspace: deleteWorkspace,
    updateWorkspace: updateWorkspace,
    copyWorkspace: copyWorkspace,
  };

  return workspaceObject;
}
