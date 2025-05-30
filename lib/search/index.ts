import { apiUrlByResource } from '../types';
import type { CreateResourceProvider } from '../types/ApiResourceProvider';
import type { SearchAllOptions, SearchApi, SearchResponse, SearchSheetOptions } from './types';

const RESOURCE_PATH = apiUrlByResource['search'];

export const createSearch: CreateResourceProvider<SearchApi> = (httpClient): SearchApi => {
  const searchAll = (options: SearchAllOptions) => {
    return httpClient.get<SearchAllOptions, SearchResponse>(RESOURCE_PATH, { params: options });
  };

  const searchSheet = (options: SearchSheetOptions) => {
    return httpClient.get<SearchSheetOptions, SearchResponse>(RESOURCE_PATH, { params: options });
  };

  return {
    searchAll,
    searchSheet,
  };
};
