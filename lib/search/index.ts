import type { RequestCallback, RequestOptions } from '../types';
import type { CreateOptions } from '../types/CreateOptions';
import { apiUrls } from '../utils/apis';
import type { SearchQueryParameters, SearchApi, SearchResponse, SearchSheetOptions } from './types';

export const createSearch = (options: CreateOptions): SearchApi => {
  const requestor = options.requestor;

  const optionsToSend = {
    url: options.apiUrls.search,
    urls: options.apiUrls,
    ...options.clientOptions,
  };

  const searchAll = (
    getOptions: RequestOptions<SearchQueryParameters, undefined>,
    callback?: RequestCallback<SearchResponse>
  ) => {
    const options = { ...optionsToSend, ...getOptions };
    return requestor.get(options, callback);
  };

  const searchSheet = (getOptions: SearchSheetOptions, callback?: RequestCallback<SearchResponse>) => {
    const options = { ...optionsToSend, ...getOptions };
    options.url = apiUrls.search + '/sheets/' + getOptions.sheetId;
    return requestor.get(options, callback);
  };

  return {
    searchAll,
    searchSheet,
  };
};
