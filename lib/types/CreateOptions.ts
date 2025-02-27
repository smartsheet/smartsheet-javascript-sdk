import { ApiUrls } from "./ApiUrls";
import { CreateClientOptions } from "./CreateClientOptions";

export interface CreateOptions {
  apiUrls: ApiUrls;
  requestor: any;
  clientOptions?: Pick<
    CreateClientOptions,
    "accessToken" | "userAgent" | "baseUrl"
  >;
}
