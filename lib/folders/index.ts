import { ClientOptions, CreateOptions } from '../types';
import { FoldersApi, GetFolderOptions, ListChildFoldersOptions, CreateChildFolderOptions, UpdateFolderOptions, DeleteFolderOptions, CopyFolderOptions, MoveFolderOptions, Folder, FolderList } from './types';
import { RequestCallback } from '../types/RequestCallback';
import { RequestOptions } from '../types/RequestOptions';

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
    getOptions: RequestOptions<GetFolderOptions, undefined>,
    callback?: RequestCallback<Folder>
  ): Promise<Folder> => {
    return requestor.get({ ...optionsToSend, ...getOptions }, callback);
  };

  const listChildFolders = (
    getOptions: RequestOptions<ListChildFoldersOptions, undefined>,
    callback?: RequestCallback<FolderList>
  ): Promise<FolderList> => {
    const urlOptions = { url: options.apiUrls.folders + getOptions.queryParameters?.folderId + '/folders' };
    return requestor.get({ ...optionsToSend, ...urlOptions, ...getOptions }, callback);
  };

  const createChildFolder = (
    postOptions: RequestOptions<CreateChildFolderOptions, any>,
    callback?: RequestCallback<Folder>
  ): Promise<Folder> => {
    const urlOptions = { url: options.apiUrls.folders + postOptions.queryParameters?.folderId + '/folders' };
    return requestor.post({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

  const updateFolder = (
    putOptions: RequestOptions<UpdateFolderOptions, any>,
    callback?: RequestCallback<Folder>
  ): Promise<Folder> => {
    return requestor.put({ ...optionsToSend, ...putOptions }, callback);
  };

  const deleteFolder = (
    deleteOptions: RequestOptions<DeleteFolderOptions, undefined>,
    callback?: RequestCallback<object>
  ): Promise<object> => {
    return requestor.delete({ ...optionsToSend, ...deleteOptions }, callback);
  };

  const copyFolder = (
    postOptions: RequestOptions<CopyFolderOptions, any>,
    callback?: RequestCallback<Folder>
  ): Promise<Folder> => {
    const urlOptions = { url: options.apiUrls.folders + postOptions.queryParameters?.folderId + '/copy' };
    return requestor.post({ ...optionsToSend, ...urlOptions, ...postOptions }, callback);
  };

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