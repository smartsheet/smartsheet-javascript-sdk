import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';

export interface ServerApi {
  /**
   * Gets application constants: the format lookup tables and the supported locales.
   *
   * @param options - {@link GetServerInfoOptions} - Optional configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link ServerInfo}\> - Optional callback function
   * @returns Promise\<{@link ServerInfo}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `GET /serverinfo`
   *
   * @example
   * ```typescript
   * const info = await client.server.getInfo();
   * console.log(info.supportedLocales);
   * ```
   */
  getInfo: (options?: GetServerInfoOptions, callback?: RequestCallback<ServerInfo>) => Promise<ServerInfo>;
}

export type GetServerInfoOptions = RequestOptions<undefined, undefined>;

export interface ServerInfo {
  /** Lookup tables that cell format descriptor indexes refer to. */
  formats?: FormatTables;
  /** All Smartsheet-supported locales. */
  supportedLocales?: string[];
  /** Feature flags for the API. */
  featureInfo?: FeatureInfo;
}

/**
 * Lookup tables that format descriptor indexes refer to.
 * New values may be appended to any table over time.
 *
 * @remarks
 * Follows the real API response and the Java/C# SDKs: the API returns a single `color` table,
 * while the OpenAPI spec lists `colorForeground`, `colorBackground`, and `colorTaskBar`, which the API does not return.
 */
export interface FormatTables {
  /** Format descriptor describing the formats displayed for values that have not been set. */
  defaults?: string;
  fontFamily?: FontFamily[];
  fontSize?: string[];
  bold?: string[];
  italic?: string[];
  underline?: string[];
  strikethrough?: string[];
  horizontalAlign?: string[];
  verticalAlign?: string[];
  /** Colors used for text, background, and task bar formats. */
  color?: string[];
  currency?: Currency[];
  decimalCount?: string[];
  thousandsSeparator?: string[];
  numberFormat?: string[];
  textWrap?: string[];
  dateFormat?: string[];
}

export interface FeatureInfo {
  /** Version of the symbols set available for symbol columns. */
  symbolsVersion?: number;
}

export interface FontFamily {
  /** Name of the font family, e.g. `Arial`. */
  name?: string;
  /** Platform-independent traits of the font family, e.g. `sans-serif`. */
  traits?: string[];
}

export interface Currency {
  /** The ISO 4217 currency code, e.g. `EUR`. */
  code?: string;
  /** The currency symbol, e.g. `€`. */
  symbol?: string;
}
