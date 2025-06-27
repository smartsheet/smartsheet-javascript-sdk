import type { ClientOptions, CreateOptions, RequestCallback, RequestOptions } from '../types';
import type { FoldersApi, Folder, FolderPath } from './types';
import type { CopyFolderBody, CopyFolderOptions, CopyFolderResponse } from './types/CopyFolder';
import type {
  CreateChildFolderBody,
  CreateChildFolderOptions,
  CreateChildFolderResponse,
} from './types/CreateChildFolder';
import type { GetFolderOptions } from './types/GetFolder';
import type { ListChildFoldersOptions, ListChildFoldersResponse } from './types/ListChildFolders';
import type { MoveFolderBody } from './types/MoveFolder';

type OptionsToSend = Partial<ClientOptions> & {
  url: string;
  urls: any;
};

export const createFolders = (options: CreateOptions): FoldersApi => {
  const requestor = options.requestor;

  let optionsToSend: OptionsToSend = {
    url: options.apiUrls.folders,
    urls: options.apiUrls,
  };

  if (options.clientOptions) {
    optionsToSend = {
      ...optionsToSend,
      ...options.clientOptions,
    };
  }

  /** GET Endpoints */
  const getFolder = (
    getOptions: RequestOptions<GetFolderOptions, undefined>,
    callback?: RequestCallback<Folder>
  ): Promise<Folder> => {
    return requestor.get({ ...optionsToSend, ...getOptions }, callback);
  };

  const listChildFolders = (
    getOptions: RequestOptions<ListChildFoldersOptions, undefined>,
    callback?: RequestCallback<ListChildFoldersResponse>
  ): Promise<ListChildFoldersResponse> => {
    const urlOptions = { url: options.apiUrls.folders + getOptions.queryParameters?.folderId + '/folders' };
    return requestor.get({ ...optionsToSend, ...urlOptions, ...getOptions }, callback);
  };

  /** POST Endpoints */
  const createChildFolder = (
    postOptions: RequestOptions<CreateChildFolderOptions, CreateChildFolderBody>,
    callback?: RequestCallback<CreateChildFolderResponse>
  ): Promise<CreateChildFolderResponse> => {
    const urlOptions = { url: options.apiUrls.folders + postOptions.queryParameters?.folderId + '/folders' };
    return requestor.post({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

  const copyFolder = (
    postOptions: RequestOptions<CopyFolderOptions, CopyFolderBody>,
    callback?: RequestCallback<CopyFolderResponse>
  ): Promise<CopyFolderResponse> => {
    const urlOptions = { url: options.apiUrls.folders + postOptions.queryParameters?.folderId + '/copy' };
    // TODO: Update to use an array with the include enum in new major version
    return requestor.post({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

  const moveFolder = (
    postOptions: RequestOptions<FolderPath, MoveFolderBody>,
    callback?: RequestCallback<Folder>
  ): Promise<Folder> => {
    const urlOptions = { url: options.apiUrls.folders + postOptions.queryParameters?.folderId + '/move' };
    return requestor.post({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

  /** PUT Endpoints */
  // TODO (jandes)
  const updateFolder = (
    putOptions: RequestOptions<UpdateFolderOptions, any>,
    callback?: RequestCallback<Folder>
  ): Promise<Folder> => {
    return requestor.put({ ...optionsToSend, ...putOptions }, callback);
  };

  /** DELETE Endpoints */
  // TODO (jandes)
  const deleteFolder = (
    deleteOptions: RequestOptions<DeleteFolderOptions, undefined>,
    callback?: RequestCallback<object>
  ): Promise<object> => {
    return requestor.delete({ ...optionsToSend, ...deleteOptions }, callback);
  };

  return {
    getFolder,
    listChildFolders,
    createChildFolder,
    updateFolder,
    deleteFolder,
    moveFolder,
    copyFolder,
  };
};
