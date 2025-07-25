import type {
  WorkspaceOptions,
  WorkspaceUrlOptions,
  GetWorkspaceOptions,
  PostWorkspaceOptions,
  DeleteWorkspaceOptions,
  PutWorkspaceOptions,
  WorkspaceObject
} from './types';

import type { RequestCallback } from '../types/RequestCallback';
import shareFactory from '../share/share.js';

export const create = function(options: WorkspaceOptions): WorkspaceObject {
  const requestor = options.requestor;
  const shares = shareFactory(options.apiUrls.workspaces);

  let optionsToSend: Record<string, unknown> = {
    url: options.apiUrls.workspaces,
  };
  optionsToSend = { ...optionsToSend, ...options.clientOptions };

  const listWorkspaces = <T>(getOptions: GetWorkspaceOptions, callback?: RequestCallback<T>): Promise<T> => {
    const urlOptions = { url: buildUrl(getOptions) };
    return requestor.get<T>({ ...optionsToSend, ...urlOptions, ...getOptions }, callback);
  };

  const listWorkspaceFolders = <T>(getOptions: GetWorkspaceOptions, callback?: RequestCallback<T>): Promise<T> => {
    const urlOptions = { url: buildUrl(getOptions) + '/folders' };
    return requestor.get<T>({ ...optionsToSend, ...urlOptions, ...getOptions }, callback);
  };

  const createWorkspace = <T>(postOptions: PostWorkspaceOptions, callback?: RequestCallback<T>): Promise<T> => {
    const urlOptions = { url: buildUrl(postOptions) };
    return requestor.post<T>({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

  const createFolder = <T>(postOptions: PostWorkspaceOptions, callback?: RequestCallback<T>): Promise<T> => {
    const urlOptions = { url: buildUrl(postOptions) + '/folders' };
    return requestor.post<T>({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

  const updateWorkspace = <T>(putOptions: PutWorkspaceOptions, callback?: RequestCallback<T>): Promise<T> => {
    const urlOptions = { url: buildUrl(putOptions) };
    return requestor.put<T>({ ...optionsToSend, ...urlOptions, ...putOptions }, callback);
  };

  const deleteWorkspace = <T>(deleteOptions: DeleteWorkspaceOptions, callback?: RequestCallback<T>): Promise<T> => {
    const urlOptions = { url: buildUrl(deleteOptions) };
    return requestor.delete<T>({ ...optionsToSend, ...urlOptions, ...deleteOptions }, callback);
  };

  const copyWorkspace = <T>(postOptions: PostWorkspaceOptions, callback?: RequestCallback<T>): Promise<T> => {
    const urlOptions = { url: buildUrl(postOptions) + '/copy' };
    return requestor.post<T>({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

  const buildUrl = (urlOptions: WorkspaceUrlOptions): string => {
    let id = '';
    if (urlOptions && urlOptions.workspaceId) {
      id = urlOptions.workspaceId;
    }
    return options.apiUrls.workspaces + id;
  };

  let workspaceObject: WorkspaceObject = {
    listWorkspaces,
    getWorkspace: listWorkspaces,
    listWorkspaceFolders,
    createWorkspace,
    createFolder,
    deleteWorkspace,
    updateWorkspace,
    copyWorkspace,
  };

  workspaceObject = { ...workspaceObject, ...shares.create(options) };

  return workspaceObject;
};
