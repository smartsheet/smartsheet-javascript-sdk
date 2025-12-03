import type { CreateOptions } from '../types/CreateOptions';
import type { RequestCallback } from '../types/RequestCallback';
import type { BaseResponseStatus } from '../types/BaseResponseStatus';
import type {
  FoldersApi,
  GetFolderOptions,
  Folder,
  GetFolderMetadataOptions,
  GetFolderMetadataResponse,
  GetFolderChildrenOptions,
  GetFolderChildrenResponse,
  ListChildFoldersOptions,
  ListChildFoldersResponse,
  CreateChildFolderOptions,
  CreateFolderResponse,
  UpdateFolderOptions,
  UpdateFolderResponse,
  DeleteFolderOptions,
  CopyFolderOptions,
  MoveFolderOptions,
  MoveFolderResponse,
  CopyFolderResponse,
} from './types';

export function create(options: CreateOptions): FoldersApi {
  const requestor = options.requestor;

  const optionsToSend = {
    url: options.apiUrls.folders,
    urls: options.apiUrls,
    ...options.clientOptions,
  };

  /**
   * @deprecated Use both getFolderMetadata and getFolderChildren instead.
   */
  const getFolder = (getOptions: GetFolderOptions, callback?: RequestCallback<Folder>): Promise<Folder> => {
    console.warn('DEPRECATED: Folders.getFolder is deprecated. Use getFolderMetadata and getFolderChildren instead.');
    const urlOptions = { url: options.apiUrls.folders + '/' + getOptions.folderId };
    return requestor.get({ ...optionsToSend, ...urlOptions, ...getOptions }, callback);
  };

  /**
   * @deprecated Use getFolderChildren with childrenResourceTypes=folders instead.
   */
  const listChildFolders = (
    getOptions: ListChildFoldersOptions,
    callback?: RequestCallback<ListChildFoldersResponse>
  ): Promise<ListChildFoldersResponse> => {
    console.warn('DEPRECATED: Folders.listChildFolders is deprecated. Use getFolderChildren instead.');
    const urlOptions = { url: options.apiUrls.folders + '/' + getOptions.folderId + '/folders' };
    return requestor.get({ ...optionsToSend, ...urlOptions, ...getOptions }, callback);
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

  return {
    getFolder,
    getFolderMetadata,
    getFolderChildren,
    listChildFolders,
    createChildFolder,
    updateFolder,
    deleteFolder,
    moveFolder,
    copyFolder,
  };
}
