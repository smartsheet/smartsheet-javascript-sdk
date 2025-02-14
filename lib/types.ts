import { LoggerInstance } from "winston";

export interface SmartsheetClient {
    constants: any;
    contacts: any;
    events: any;
    favorites: any;
    folders: any;
    groups: any;
    home: any;
    images: any;
    reports: any;
    request: any;
    search: any;
    server: any;
    sheets: any;
    sights: any;
    templates: any;
    tokens: any;
    users: any;
    webhooks: any;
    workspaces: any;
}

export interface CreateClientOptions {
    accessToken?: string;
    userAgent?: string;
    baseUrl?: string;
    requestor?: any; // Custom HTTP client that will be used. TODO -> Evaluate if we want to keep this.
    maxRetryDurationSeconds?: number;
    calcRetryBackoff?: (retryCount: number, error?: any) => number;
    logger?: LoggerInstance;
    logLevel?: "error" | "warn" | "info" | "http" | "info" | "http" | "verbose" | "debug" | "silly";
    loggerContainer?: any;
}

export type CreateClient = (options?: CreateClientOptions) => SmartsheetClient;

export interface ApiError {
    /**
     * The Id of the specific error occurrence.
     * Please include this information when contacting Smartsheet support.
     */
    refId: string;

    /**
     * Custom error code from Smartsheet. See the complete Error Code List.
     * https://smartsheet.redoc.ly/#section/Error-Code-List
     */
    errorCode: number;

    /**
     * Descriptive error message.
     */
    message: string;
}
