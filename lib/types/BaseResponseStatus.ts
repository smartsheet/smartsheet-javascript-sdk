export interface BaseResponseStatus {
  message: 'SUCCESS' | 'PARTIAL_SUCCESS';

  /**
   * 0 - Success
   * 3 - Partial success of bulk operation
   */
  resultCode: 0 | 3;
}
