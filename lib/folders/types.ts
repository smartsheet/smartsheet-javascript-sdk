import { RequestCallback } from '../types/RequestCallback';
import { RequestOptions } from '../types/RequestOptions';

export interface FolderOptions {
  /**
   * ID of the folder
   */
  folderId: number | string;
}

export interface GetFolderOptions extends FolderOptions {
  /**
   * Additional options for getting a folder
   */
  includeAll?: boolean;
}

export interface ListChildFoldersOptions extends FolderOptions {
  /**
   * Additional options for listing child folders
   */
  includeAll?: boolean;
}

export interface CreateChildFolderOptions extends FolderOptions {
  /**
   * Data for the new folder
   */
  body?: {
    name: string;
    [key: string]: any;
  };
}

export interface UpdateFolderOptions extends FolderOptions {
  /**
   * Data for updating the folder
   */
  body?: {
    name?: string;
    [key: string]: any;
  };
}

export interface DeleteFolderOptions extends FolderOptions {
  /**
   * Additional options for deleting a folder
   */
  permanent?: boolean;
}

export interface CopyFolderOptions extends FolderOptions {
  /**
   * Data for copying the folder
   */
  body?: {
    destinationId: number | string;
    destinationType?: string;
    newName?: string;
    [key: string]: any;
  };
}

export interface MoveFolderOptions extends FolderOptions {
  /**
   * Data for moving the folder
   */
  body?: {
    destinationId: number | string;
    destinationType?: string;
    [key: string]: any;
  };
}

export interface Folder {
  id: number;
  name: string;
  permalink?: string;
  [key: string]: any;
}

export interface FolderList {
  data: Folder[];
  totalCount: number;
  [key: string]: any;
}

export interface FoldersApi {
  getFolder: (
    options: RequestOptions<GetFolderOptions, undefined>,
    callback?: RequestCallback<Folder>
  ) => Promise<Folder>;

  listChildFolders: (
    options: RequestOptions<ListChildFoldersOptions, undefined>,
    callback?: RequestCallback<FolderList>
  ) => Promise<FolderList>;

  createChildFolder: (
    options: RequestOptions<CreateChildFolderOptions, any>,
    callback?: RequestCallback<Folder>
  ) => Promise<Folder>;

  updateFolder: (
    options: RequestOptions<UpdateFolderOptions, any>,
    callback?: RequestCallback<Folder>
  ) => Promise<Folder>;

  deleteFolder: (
    options: RequestOptions<DeleteFolderOptions, undefined>,
    callback?: RequestCallback<object>
  ) => Promise<object>;

  copyFolder: (
    options: RequestOptions<CopyFolderOptions, any>,
    callback?: RequestCallback<Folder>
  ) => Promise<Folder>;

  moveFolder: (
    options: RequestOptions<MoveFolderOptions, any>,
    callback?: RequestCallback<Folder>
  ) => Promise<Folder>;
}