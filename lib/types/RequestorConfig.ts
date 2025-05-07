import { AxiosProxyConfig } from "axios";
import { LoggerInstance } from "winston";

export interface RequestorConfig {
    maxRetryDurationSeconds?: number;
    maxRetryDurationMillis?: number;
    calcRetryBackoff?: (retryCount: number, error?: any) => number;
    proxy?: AxiosProxyConfig;
    logger?: LoggerInstance
}
