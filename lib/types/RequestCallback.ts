import type { ApiError } from './ApiError';

export type RequestCallback<R> = (error?: ApiError, response?: R, body?: any) => void;
