import type { CreateOptions } from '../types/CreateOptions';
import type { RequestCallback } from '../types/RequestCallback';
import type {
  AddImageToCellOptions,
  ImagesApi,
  ImageUrl,
  ListImageUrlsResponse,
  AddImageToCellResponse,
} from './types';
import type { RequestOptions } from '../types/RequestOptions';

export function create(options: CreateOptions): ImagesApi {
  const optionsToSend = {
    url: options.apiUrls.imageUrls,
    ...options.clientOptions,
  };

  const listImageUrls = (
    postOptions: RequestOptions<undefined, ImageUrl[]>,
    callback?: RequestCallback<ListImageUrlsResponse>
  ): Promise<ListImageUrlsResponse> => options.requestor.post({ ...optionsToSend, ...postOptions }, callback);

  const addImageToCell = (
    postOptions: AddImageToCellOptions,
    callback?: RequestCallback<AddImageToCellResponse>
  ): Promise<AddImageToCellResponse> => {
    const { sheetId, rowId, columnId, ...restOptions } = postOptions;
    const cellImageUrl = `${options.apiUrls.sheets}/${sheetId}/rows/${rowId}/columns/${columnId}/cellimages`;

    return options.requestor.post(
      {
        url: cellImageUrl,
        ...options.clientOptions,
        ...restOptions,
      },
      callback
    );
  };

  return {
    listImageUrls,
    addImageToCell,
  };
}
