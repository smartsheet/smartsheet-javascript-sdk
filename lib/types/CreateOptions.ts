import type { ApiUrls } from './ApiUrls.js';
import type { CreateClientOptions } from './CreateClientOptions.js';

export type ClientOptions = Pick<CreateClientOptions, 'accessToken' | 'userAgent' | 'baseUrl'>;

export interface CreateOptions {
  apiUrls: ApiUrls;
  requestor: any;
  clientOptions?: ClientOptions;
}
