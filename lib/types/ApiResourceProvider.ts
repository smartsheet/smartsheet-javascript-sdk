import { AxiosInstance } from 'axios';
import { Logger } from 'winston';

export type CreateResourceProvider<T> = (httpClient: AxiosInstance, logger: Logger) => T;
