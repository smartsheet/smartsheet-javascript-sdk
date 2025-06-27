import type { DashboardListing, GridListing, RequestCallback, RequestOptions } from '../types';
import type { CopyFolderBody, CopyFolderOptions, CopyFolderResponse } from './types/CopyFolder';
import type { CreateChildFolderBody, CreateChildFolderOptions, CreateChildFolderResponse } from './types/CreateChildFolder';
import type { GetFolderOptions } from './types/GetFolder';
import type { ListChildFoldersOptions, ListChildFoldersResponse } from './types/ListChildFolders';
import type { MoveFolderBody, MoveFolderResponse } from './types/MoveFolder';
import type { UpdateFolderBody, UpdateFolderResponse } from './types/UpdateFolder';

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
   * @description Array of Folder objects.
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

export interface FolderPath {
  /**
   * @description Folder Id where you can create sheets, sights, reports, templates, and other folders.
  */
 folderId: number;
}

export enum FolderSkipRemapEnum {
    CELL_LINKS = 'cellLinks',
    REPORTS = 'reports',
    SHEET_HYPERLINKS = 'sheetHyperlinks',
    SIGHTS = 'sights',
}

export interface FoldersApi {
  getFolder: (
    options: RequestOptions<GetFolderOptions, undefined>,
    callback?: RequestCallback<Folder>
  ) => Promise<Folder>;

  listChildFolders: (
    options: RequestOptions<ListChildFoldersOptions, undefined>,
    callback?: RequestCallback<ListChildFoldersResponse>
  ) => Promise<ListChildFoldersResponse>;

  createChildFolder: (
    options: RequestOptions<CreateChildFolderOptions, CreateChildFolderBody>,
    callback?: RequestCallback<CreateChildFolderResponse>
  ) => Promise<CreateChildFolderResponse>;

  updateFolder: (
    options: RequestOptions<FolderPath, UpdateFolderBody>,
    callback?: RequestCallback<UpdateFolderResponse>
  ) => Promise<UpdateFolderResponse>;

  // TODO (jandes)
  deleteFolder: (
    options: RequestOptions<DeleteFolderOptions, undefined>,
    callback?: RequestCallback<object>
  ) => Promise<object>;

  copyFolder: (
    options: RequestOptions<CopyFolderOptions, CopyFolderBody>,
    callback?: RequestCallback<CopyFolderResponse>
  ) => Promise<CopyFolderResponse>;

  moveFolder: (
    options: RequestOptions<FolderPath, MoveFolderBody>,
    callback?: RequestCallback<MoveFolderResponse>
  ) => Promise<MoveFolderResponse>;
}
