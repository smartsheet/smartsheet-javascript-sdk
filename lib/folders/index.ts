import type { ClientOptions, CreateOptions, RequestCallback, RequestOptions } from '../types';
import type {
  FoldersApi,
  ListChildFoldersOptions,
  CreateChildFolderOptions,
  UpdateFolderOptions,
  DeleteFolderOptions,
  CopyFolderOptions,
  MoveFolderOptions,
  Folder,
  FolderList,
  FolderBody,
} from './types';
import { GetFolderOptions } from './types/GetFolder';

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

  const getFolder = (
    getOptions: RequestOptions<GetFolderOptions, FolderBody>,
    callback?: RequestCallback<Folder>
  ): Promise<Folder> => {
    return requestor.get({ ...optionsToSend, ...getOptions }, callback);
  };

  // TODO (jandes)
  const listChildFolders = (
    getOptions: RequestOptions<ListChildFoldersOptions, undefined>,
    callback?: RequestCallback<FolderList>
  ): Promise<FolderList> => {
    const urlOptions = { url: options.apiUrls.folders + getOptions.queryParameters?.folderId + '/folders' };
    return requestor.get({ ...optionsToSend, ...urlOptions, ...getOptions }, callback);
  };

  // TODO (jandes)
  const createChildFolder = (
    postOptions: RequestOptions<CreateChildFolderOptions, any>,
    callback?: RequestCallback<Folder>
  ): Promise<Folder> => {
    const urlOptions = { url: options.apiUrls.folders + postOptions.queryParameters?.folderId + '/folders' };
    return requestor.post({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

  // TODO (jandes)
  const updateFolder = (
    putOptions: RequestOptions<UpdateFolderOptions, any>,
    callback?: RequestCallback<Folder>
  ): Promise<Folder> => {
    return requestor.put({ ...optionsToSend, ...putOptions }, callback);
  };

  // TODO (jandes)
  const deleteFolder = (
    deleteOptions: RequestOptions<DeleteFolderOptions, undefined>,
    callback?: RequestCallback<object>
  ): Promise<object> => {
    return requestor.delete({ ...optionsToSend, ...deleteOptions }, callback);
  };

  // TODO (jandes)
  const copyFolder = (
    postOptions: RequestOptions<CopyFolderOptions, any>,
    callback?: RequestCallback<Folder>
  ): Promise<Folder> => {
    const urlOptions = { url: options.apiUrls.folders + postOptions.queryParameters?.folderId + '/copy' };
    return requestor.post({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

  // TODO (jandes)
  const moveFolder = (
    postOptions: RequestOptions<MoveFolderOptions, any>,
    callback?: RequestCallback<Folder>
  ): Promise<Folder> => {
    const urlOptions = { url: options.apiUrls.folders + postOptions.queryParameters?.folderId + '/move' };
    return requestor.post({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
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
