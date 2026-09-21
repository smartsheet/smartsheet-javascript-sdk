import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';
import type { BaseResponseStatus } from '../types/BaseResponseStatus';

// ============================================================================
// Data Classification API Interface
// ============================================================================

export interface DataClassificationApi {
  /**
   * Sets the data classification on a sheet.
   *
   * @param options - {@link SetDataClassificationOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link BaseResponseStatus}\> - Optional callback function
   * @returns Promise\<{@link BaseResponseStatus}\>
   *
   * @remarks
   * **Who can use this operation:**
   * - **Permissions:** ADMIN or OWNER access on the sheet
   *
   * It mirrors to the following Smartsheet REST API method: `PUT /sheets/{sheetId}/dataclassification`
   *
   * @example
   * ```typescript
   * const result = await client.sheets.setDataClassification({
   *   sheetId: 123456789012345,
   *   body: {
   *     dataClassification: 'Confidential'
   *   }
   * });
   * ```
   */
  setDataClassification: (
    options: SetDataClassificationOptions,
    callback?: RequestCallback<BaseResponseStatus>
  ) => Promise<BaseResponseStatus>;
}

// ============================================================================
// Set Data Classification
// ============================================================================

export interface SetDataClassificationBody {
  /**
   * The data classification of a sheet. This is a free-form label chosen from
   * the classification labels published by a plan admin in Admin Center
   */
  dataClassification: string;
}

export interface SetDataClassificationOptions extends RequestOptions<undefined, SetDataClassificationBody> {
  /**
   * Sheet Id.
   */
  sheetId: number;
}
