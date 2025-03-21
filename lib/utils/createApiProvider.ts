import { CreateOptions, OptionsToSend, Requestor } from "../types";
import { ApiSection } from "./apis";

export const createApiProvider = <ApiContract>(
  options: CreateOptions,
  apiSection: ApiSection,
  createApi: (requestor: Requestor, optionsToSend: OptionsToSend) => ApiContract
) => {
  const requestor: Requestor = options.requestor;

  let optionsToSend: OptionsToSend = {
    url: options.apiUrls[apiSection],
  };

  if (options.clientOptions) {
    optionsToSend = {
      ...optionsToSend,
      ...options.clientOptions,
    };
  }

  return createApi(requestor, optionsToSend);
};
