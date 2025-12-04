export interface ApiError {
  /**
   * The Id of the specific error occurrence.
   * Please include this information when contacting Smartsheet support.
   */
  refId: string;

  /**
   * Custom error code from Smartsheet. See the complete Error Code List.
   * https://developers.smartsheet.com/api/smartsheet#section/Error-Code-List
   */
  errorCode: number;

  /**
   * Descriptive error message.
   */
  message: string;
}
