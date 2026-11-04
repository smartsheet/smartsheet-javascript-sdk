import _ from 'underscore';
import type { Folder } from '../folders/types';
import type { CreateOptions } from '../types/CreateOptions';
import type { PaginationResponse } from '../types/PaginationResponse';
import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';
import type { CreateHomeFolderResponse, HomeApi, ListHomeFoldersQueryParameters } from './types';

export function create(options: CreateOptions): HomeApi {
  const requestor = options.requestor;

  const optionsToSend = {
    url: options.apiUrls.home,
  };
  _.extend(optionsToSend, options.clientOptions);

  /**
   * @deprecated See: https://developers.smartsheet.com/api/smartsheet/guides/updating-code/migrate-from-using-the-sheets-folder
   */
  const listContents = <R = Record<string, unknown>>(
    getOptions?: RequestOptions<unknown, undefined>,
    callback?: RequestCallback<R>
  ): Promise<R> => {
    console.warn('DEPRECATED: Home.listContents is deprecated.');
    return requestor.get(_.extend({}, optionsToSend, getOptions), callback);
  };

  /**
   * @deprecated See: https://developers.smartsheet.com/api/smartsheet/guides/updating-code/migrate-from-using-the-sheets-folder
   */
  const listFolders = (
    getOptions?: RequestOptions<ListHomeFoldersQueryParameters, undefined>,
    callback?: RequestCallback<PaginationResponse<Folder>>
  ): Promise<PaginationResponse<Folder>> => {
    console.warn('DEPRECATED: Home.listFolders is deprecated.');
    return listContents(_.extend({ url: options.apiUrls.home + '/' + 'folders' }, getOptions), callback);
  };

  /**
   * @deprecated See: https://developers.smartsheet.com/api/smartsheet/guides/updating-code/migrate-from-using-the-sheets-folder
   */
  const createFolder = (
    postOptions: RequestOptions<undefined, { name: string }>,
    callback?: RequestCallback<CreateHomeFolderResponse>
  ): Promise<CreateHomeFolderResponse> => {
    console.warn('DEPRECATED: Home.createFolder is deprecated.');
    const urlOptions = { url: options.apiUrls.home + '/' + 'folders' };
    return requestor.post(_.extend({}, optionsToSend, urlOptions, postOptions), callback);
  };

  return {
    listContents: listContents,
    listFolders: listFolders,
    createFolder: createFolder,
  };
}
