import { OptionsToSend, Requestor } from "../types";

export type Pagination = {
  page?: number;
  pageSize?: number;
};

export type PaginationResponse = {
  pageNumber: number;
  pageSize?: number;
  totalPages: number;
  totalCount: number;
};

export enum FavoritableResource {
  Folder = "folder",
  Report = "report",
  Sheet = "sheet",
  Sight = "sight",
  Template = "template",
  Workspace = "workspace",
}

export type FavoriteItem = {
  objectId: string;
  type: FavoritableResource;
};

export type ApiCreator<T> = (
  requestor: Requestor,
  optionsToSend: OptionsToSend
) => T;
