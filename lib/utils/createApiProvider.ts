import { ApiResource, CreateOptions, OptionsToSend, Requestor } from '../types';

export const createApiProvider = <ApiContract>(
  options: CreateOptions,
  ApiResource: ApiResource,
  createApi: (requestor: Requestor, optionsToSend: OptionsToSend) => ApiContract
) => {
  const requestor: Requestor = options.requestor;

  let optionsToSend: OptionsToSend = {
    url: options.apiUrls[ApiResource],
  };

  if (options.clientOptions) {
    optionsToSend = {
      ...optionsToSend,
      ...options.clientOptions,
    };
  }

  return createApi(requestor, optionsToSend);
};
