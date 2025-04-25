export const errorCodes = {
  RATE_LIMIT: 4001,
  GATEWAY_TIMEOUT: 4002,
  INTERNAL_SERVER_ERROR: 4003,
  SERVICE_UNAVAILABLE: 4004,
} as const;

//export interface SmartsheetResponse {
//  statusCode: number;
//  headers: Record<string, string>;
//  body: unknown;
//  content?: unknown;
//  errorCode?: number | string;
//  message?: string;
//  refId?: string;
//  detail?: unknown;
//}

// Define the expected structure of Smartsheet API response data
export interface SmartsheetErrorResponseData {
  [key: string]: unknown;
  errorCode?: number;
  message?: string;
  refId?: string;
  detail?: unknown;
}
