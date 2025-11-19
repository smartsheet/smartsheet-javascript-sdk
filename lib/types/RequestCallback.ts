import type { ApiError } from './ApiError.js';

export type RequestCallback<R> = (error?: ApiError, response?: R, body?: any) => void;
