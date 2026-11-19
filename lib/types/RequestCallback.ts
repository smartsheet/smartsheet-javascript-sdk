import type { RequestError } from './RequestError';

export type RequestCallback<R> = (error?: RequestError, response?: R, body?: any) => void;
