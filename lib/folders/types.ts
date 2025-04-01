import type { DashboardListing, GridListing, RequestCallback, RequestOptions } from '../types';

export interface Folder {
  /**
   * @description Folder Id.
   */
  id: number;
  /**
   * @deprecated
   * @description Returned only if the user has marked the folder as a favorite in their "Home" tab (value=true).
   */
  favorite?: boolean;
  /**
   * @description Array of Folder oblects.
   */
  folders: Folder[];
  /**
   * @description Folder name.
   */
  name: string;
  /**
   * @description URL that represents a direct link to the folder in Smartsheet.
   */
  permalink: string;
  /**
   * @description Reports contained in folder.
   */
  reports: GridListing[];
  /**
   * @description Sheets contained in folder.
   */
  sheets: GridListing[];
  /**
   * @description Dashboards contained in folder.
   */
  sights: DashboardListing[];
  /**
   * @description Templates contained in folder.
   */
  templates: GridListing[];
}


export interface FolderBody {
  /**
   * @description Folder Id where you can create sheets, sights, reports, templates, and other folders.
  */
 folderId: number;
}

// BELOW CREATED BY ROO
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