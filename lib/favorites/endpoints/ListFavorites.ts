import { RequestCallback } from '../../types';
import { ApiGenerator, FavoriteItem, Pagination, PaginationResponse } from '../sharedTypes';

type IncludeOptions = string;

type ListFavortesParams = {
  /**
   * @description If true, include all results, that is, do not paginate. Mutually exclusive with page and pageSize (they are ignored if includeAll=true is specified).
   */
  includeAll?: boolean;
  /**
   * @description A comma-separated list of optional elements to include in the response.
   * Enum ["directId", "name"]
   */
  include?: IncludeOptions;
} & Pagination;

export type ListFavoritesResponse = PaginationResponse & {
  data: FavoriteItem[];
};
/**
 * @description Gets a list of all of the user's favorite items.
 */
export type ListFavoritesRequest = (
  params: ListFavortesParams,
  callback: RequestCallback<ListFavoritesResponse>
) => Promise<ListFavoritesResponse>;

export const createListFavorites: ApiGenerator<ListFavoritesRequest> =
  (requestor, optionsToSend) => (params, callback) => {
    return requestor.get({ ...optionsToSend, ...params }, callback);
  };
