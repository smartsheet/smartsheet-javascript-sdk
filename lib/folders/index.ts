import type { ApiError } from '../types/ApiError';
import type { CreateOptions } from '../types/CreateOptions';
import type { RequestCallback } from '../types/RequestCallback';
import type { BaseResponseStatus } from '../types/BaseResponseStatus';
import type {
  FoldersApi,
  GetFolderMetadataOptions,
  GetFolderMetadataResponse,
  GetFolderChildrenOptions,
  GetFolderChildrenResponse,
  CreateChildFolderOptions,
  CreateFolderResponse,
  UpdateFolderOptions,
  UpdateFolderResponse,
  DeleteFolderOptions,
  CopyFolderOptions,
  MoveFolderOptions,
  MoveFolderResponse,
  CopyFolderResponse,
  GetFolderPathOptions,
} from './types';
import { FolderPathNode } from './types';

export function create(options: CreateOptions): FoldersApi {
  const requestor = options.requestor;

  const optionsToSend = {
    url: options.apiUrls.folders,
    urls: options.apiUrls,
    ...options.clientOptions,
  };

  const createChildFolder = (
    postOptions: CreateChildFolderOptions,
    callback?: RequestCallback<CreateFolderResponse>
  ): Promise<CreateFolderResponse> => {
    const urlOptions = { url: options.apiUrls.folders + '/' + postOptions.folderId + '/folders' };
    return requestor.post({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

  const updateFolder = (
    putOptions: UpdateFolderOptions,
    callback?: RequestCallback<UpdateFolderResponse>
  ): Promise<UpdateFolderResponse> => {
    const urlOptions = { url: options.apiUrls.folders + '/' + putOptions.folderId };
    return requestor.put({ ...optionsToSend, ...urlOptions, ...putOptions }, callback);
  };

  const deleteFolder = (
    deleteOptions: DeleteFolderOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ): Promise<BaseResponseStatus> => {
    const urlOptions = { url: options.apiUrls.folders + '/' + deleteOptions.folderId };
    return requestor.delete({ ...optionsToSend, ...urlOptions, ...deleteOptions }, callback);
  };

  const copyFolder = (
    postOptions: CopyFolderOptions,
    callback?: RequestCallback<CopyFolderResponse>
  ): Promise<CopyFolderResponse> => {
    const urlOptions = { url: options.apiUrls.folders + '/' + postOptions.folderId + '/copy' };
    return requestor.post({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

  const moveFolder = (
    postOptions: MoveFolderOptions,
    callback?: RequestCallback<MoveFolderResponse>
  ): Promise<MoveFolderResponse> => {
    const urlOptions = { url: options.apiUrls.folders + '/' + postOptions.folderId + '/move' };
    return requestor.post({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

  const getFolderMetadata = (
    getOptions: GetFolderMetadataOptions,
    callback?: RequestCallback<GetFolderMetadataResponse>
  ): Promise<GetFolderMetadataResponse> => {
    const urlOptions = { url: options.apiUrls.folders + '/' + getOptions.folderId + '/metadata' };
    return requestor.get({ ...optionsToSend, ...urlOptions, ...getOptions }, callback);
  };

  const getFolderChildren = (
    getOptions: GetFolderChildrenOptions,
    callback?: RequestCallback<GetFolderChildrenResponse>
  ): Promise<GetFolderChildrenResponse> => {
    const urlOptions = { url: options.apiUrls.folders + '/' + getOptions.folderId + '/children' };
    return requestor.get({ ...optionsToSend, ...urlOptions, ...getOptions }, callback);
  };

  const getFolderPath = (
    getOptions: GetFolderPathOptions,
    callback?: RequestCallback<FolderPathNode>
  ): Promise<FolderPathNode> => {
    const urlOptions = { url: options.apiUrls.folders + '/' + getOptions.folderId + '/path' };
    return requestor
      .get({ ...optionsToSend, ...urlOptions, ...getOptions })
      .then((data: Record<string, unknown>) => {
        const node = new FolderPathNode(data);
        if (callback) callback(undefined, node);
        return node;
      })
      .catch((err: unknown) => {
        if (callback) callback(err as ApiError, undefined);
        return Promise.reject(err);
      });
  };

  return {
    getFolderMetadata,
    getFolderChildren,
    createChildFolder,
    updateFolder,
    deleteFolder,
    moveFolder,
    copyFolder,
    getFolderPath,
  };
}
