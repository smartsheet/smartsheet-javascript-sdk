import type {
  GovernanceApi,
  GetDataClassificationSettingsOptions,
  GetDataClassificationSettingsResponse,
} from './types';
import type { RequestCallback } from '../types/RequestCallback';
import type { ClientOptions, CreateOptions } from '../types/CreateOptions';

type OptionsToSend = Partial<ClientOptions> & {
  url: string;
};

export const createGovernance = (options: CreateOptions): GovernanceApi => {
  const requester = options.requestor;

  let optionsToSend: OptionsToSend = {
    url: options.apiUrls.governance + '/data-classification/settings',
  };

  if (options.clientOptions) {
    optionsToSend = {
      ...optionsToSend,
      ...options.clientOptions,
    };
  }

  return {
    getDataClassificationSettings: (
      getOptions: GetDataClassificationSettingsOptions,
      callback?: RequestCallback<GetDataClassificationSettingsResponse>
    ): Promise<GetDataClassificationSettingsResponse> => {
      return requester.get({ ...optionsToSend, ...getOptions }, callback);
    },
  };
};
