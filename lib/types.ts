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
