export interface CrossSheetReference {
  /**
   * Defines ending edge of range when specifying one or more columns. To specify an entire column, omit the startRowId and endRowId parameters.
   */
  endColumnId?: number;
  /**
   * Defines ending edge of range when specifying one or more rows. To specify an entire row, omit the startColumnId and endColumnId parameters.
   */
  endRowId?: number;
  /**
   * Cross-sheet reference Id, guaranteed unique within referencing sheet.
   */
  id: number;
  /**
   * Friendly name of reference. Auto-generated unless specified in Create Cross-sheet References.
   */
  name: string;
  /**
   * Defines beginning edge of range when specifying one or more columns. To specify an entire column, omit the startRowId and endRowId parameters.
   */
  startColumnId?: number;
  /**
   * Defines beginning edge of range when specifying one or more rows. To specify an entire row, omit the startColumnId and endColumnId parameters.
   */
  startRowId?: number;
  /**
   * Status of request.
   */
  status: string;
  /**
   * Sheet Id of source sheet.
   */
  sourceSheetId: number;
}
