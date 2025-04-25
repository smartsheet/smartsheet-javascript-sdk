import { AxiosInstance } from 'axios';

export type CreateResourceProvider<T> = (httpClient: AxiosInstance) => T;
