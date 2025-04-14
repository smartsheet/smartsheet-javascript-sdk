import { FavoritableResource, FavoriteItem } from '../sharedTypes';

type RemoveSingleFavoriteItem = {};

type RemoveFavoritesBaseParams = {
  /**
   * @description A string or array of strings representing the objectIds to remove from favorites
   */
  objectIds: FavoriteItem['objectId'] | FavoriteItem['objectId'][];
  favoriteType: FavoritableResource;
};
