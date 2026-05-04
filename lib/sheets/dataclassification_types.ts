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
   * @param callback - {@link RequestCallback}\<{@link SetDataClassificationResponse}\> - Optional callback function
   * @returns Promise\<{@link SetDataClassificationResponse}\>
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
   *     dataClassification: DataClassificationType.CONFIDENTIAL
   *   }
   * });
   * ```
   */
  setDataClassification: (
    options: SetDataClassificationOptions,
    callback?: RequestCallback<SetDataClassificationResponse>
  ) => Promise<SetDataClassificationResponse>;

  /**
   * Removes the data classification from a sheet. Requires ADMIN or OWNER access.
   *
   * @param options - {@link DeleteDataClassificationOptions} - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link DeleteDataClassificationResponse}\> - Optional callback function
   * @returns Promise\<{@link DeleteDataClassificationResponse}\>
   *
   * @remarks
   * **Who can use this operation:**
   * - **Permissions:** ADMIN or OWNER access on the sheet
   *
   * It mirrors to the following Smartsheet REST API method: `DELETE /sheets/{sheetId}/dataclassification`
   *
   * @example
   * ```typescript
   * const result = await client.sheets.deleteDataClassification({
   *   sheetId: 123456789012345
   * });
   * ```
   */
  deleteDataClassification: (
    options: DeleteDataClassificationOptions,
    callback?: RequestCallback<DeleteDataClassificationResponse>
  ) => Promise<DeleteDataClassificationResponse>;
}

// ============================================================================
// Enums
// ============================================================================

export enum DataClassificationType {
  PUBLIC = 'PUBLIC',
  INTERNAL = 'INTERNAL',
  CONFIDENTIAL = 'CONFIDENTIAL',
  SECRET = 'SECRET',
}

// ============================================================================
// Set Data Classification
// ============================================================================

export interface SetDataClassificationBody {
  /**
   * The data classification of a sheet.
   */
  dataClassification: DataClassificationType;
}

export interface SetDataClassificationOptions extends RequestOptions<undefined, SetDataClassificationBody> {
  /**
   * Sheet Id.
   */
  sheetId: number;
}

export type SetDataClassificationResponse = BaseResponseStatus;

// ============================================================================
// Delete Data Classification
// ============================================================================

export interface DeleteDataClassificationOptions extends RequestOptions<undefined, undefined> {
  /**
   * Sheet Id.
   */
  sheetId: number;
}

export type DeleteDataClassificationResponse = BaseResponseStatus;
