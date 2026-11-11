import _ from 'underscore';
import type { CreateOptions } from '../types/CreateOptions';
import type { RequestCallback } from '../types/RequestCallback';
import type { BaseResponseStatus } from '../types/BaseResponseStatus';
import type { DataClassificationApi, SetSheetDataClassificationOptions } from './dataclassification_types';

export function create(options: CreateOptions): DataClassificationApi {
  const requestor = options.requestor;
  const optionsToSend = {
    urls: options.apiUrls,
  };
  _.extend(optionsToSend, options.clientOptions);

  const buildUrl = (sheetId: number): string => options.apiUrls.sheets + '/' + sheetId + '/dataclassification';

  const setDataClassification = (
    putOptions: SetSheetDataClassificationOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ): Promise<BaseResponseStatus> => {
    const urlOptions = { url: buildUrl(putOptions.sheetId) };
    return requestor.put(_.extend({}, optionsToSend, urlOptions, putOptions), callback);
  };

  return {
    setDataClassification: setDataClassification,
  };
}
