import type { CreateOptions, RequestCallback } from '../types';
import type { SearchAllOptions, SearchApi, SearchResponse, SearchSheetOptions } from './types';

export const createSearch = (options: CreateOptions): SearchApi => {
  const requestor = options.requestor;

  const optionsToSend = {
    url: options.apiUrls.search,
    urls: options.apiUrls,
    ...options.clientOptions,
  };

  const searchAll = (getOptions: SearchAllOptions, callback?: RequestCallback<SearchResponse>) => {
    const options = {
      ...optionsToSend,
      ...getOptions,
      queryParameters: {
        ...getOptions.queryParameters,
        query: getOptions.query,
      },
    };

    return requestor.get(options, callback);
  };

  const searchSheet = (getOptions: SearchSheetOptions, callback?: RequestCallback<SearchResponse>) => {
    const options = {
      ...optionsToSend,
      ...getOptions,
      queryParameters: {
        query: getOptions.query,
        sheetId: getOptions.sheetId,
      },
    };

    return requestor.get(options, callback);
  };

  return {
    searchAll,
    searchSheet,
  };
};
