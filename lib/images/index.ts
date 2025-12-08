import type { CreateOptions } from '../types/CreateOptions';
import type { RequestCallback } from '../types/RequestCallback';
import type { ImagesApi, ImageUrl, ListImageUrlsResponse } from './types';
import type { RequestOptions } from '../types/RequestOptions';

export function create(options: CreateOptions): ImagesApi {
  const optionsToSend = {
    url: options.apiUrls.imageUrls,
    ...options.clientOptions,
  };

  const listImageUrls = (
    postOptions: RequestOptions<undefined, ImageUrl[]>,
    callback?: RequestCallback<ListImageUrlsResponse>
  ): Promise<ListImageUrlsResponse> =>
    options.requestor.post({ ...optionsToSend, ...postOptions }, callback);

  return {
    listImageUrls,
  };
}
