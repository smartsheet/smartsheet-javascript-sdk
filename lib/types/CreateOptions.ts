import { ApiUrlPathBySection } from "./ApiUrls";
import { CreateClientOptions } from "./CreateClientOptions";

export type ClientOptions = Pick<
  CreateClientOptions,
  "accessToken" | "userAgent" | "baseUrl"
>;

export type Requestor = {
  get: (options: any, callback: any) => any;
  put: (options: any, callback: any) => any;
  post: (options: any, callback: any) => any;
  postFile: (options: any, callback: any) => any;
  delete: (options: any, callback: any) => any;
  internal: {
    buildHeaders: (options: any) => {
      Accept: any;
      "Content-Type": any;
      "User-Agent": string;
    };
    buildUrl: (options: any) => any;
  };
};

export interface CreateOptions {
  apiUrls: ApiUrlPathBySection;
  requestor: Requestor;
  clientOptions?: ClientOptions;
}

export type OptionsToSend = Partial<ClientOptions> & {
  url: string;
};
