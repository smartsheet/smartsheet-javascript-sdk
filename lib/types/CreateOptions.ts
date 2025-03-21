import { ApiUrls } from "./ApiUrls";
import { CreateClientOptions } from "./CreateClientOptions";

export type ClientOptions = Pick<
  CreateClientOptions,
  "accessToken" | "userAgent" | "baseUrl"
>;

export interface CreateOptions {
  apiUrls: ApiUrls;
  requestor: any;
  clientOptions?: ClientOptions;
}
