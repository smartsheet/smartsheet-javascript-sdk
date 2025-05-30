import type { AxiosInstance } from 'axios';
import type { Logger } from 'winston';

export type CreateResourceProvider<T> = (httpClient: AxiosInstance, logger: Logger) => T;
