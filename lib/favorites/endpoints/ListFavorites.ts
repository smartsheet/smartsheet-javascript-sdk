import { RequestCallback } from "../../types";
import {
  ApiCreator,
  FavoriteItem,
  Pagination,
  PaginationResponse,
} from "../sharedTypes";

type IncludeOptions = string;

type ListFavoritesParamsNonPaginated = {
  includeAll: true;
  include: IncludeOptions;
};

type ListFavoritesParamsPaginated = {
  includeAll?: false;
  include: IncludeOptions;
} & Pagination;

type ListFavortesParams =
  | ListFavoritesParamsPaginated
  | ListFavoritesParamsNonPaginated;

export type ListFavoritesResponse = PaginationResponse & {
  data: FavoriteItem[];
};
export type ListFavoritesRequest = (
  params: ListFavortesParams,
  callback: RequestCallback<ListFavoritesResponse>
) => {};

export const createListFavorites: ApiCreator<ListFavoritesRequest> =
  (requestor, optionsToSend) => (params, callback) => {
    return requestor.get({ ...optionsToSend, ...params }, callback);
  };
