export interface DashboardListing {
  /**
   * @description Asset Id.
   */
  id: number;
  /**
   * @description Asset name.
   */
  name: string;
  /**
   * @description URL that represents a direct link to the asset in Smartsheet.
   */
  permalink: string;
  /**
   * @description Timestamp_date-time (string) or Timestamp_number (number), (Timestamp)
   * @type {Timestamp_date-time (string) | Timestamp_number (number)}
   */
  createdAt: string | number;
  /**
   * @description Timestamp_date-time (string) or Timestamp_number (number), (Timestamp)
   * @type {Timestamp_date-time (string) | Timestamp_number (number)}
   */
  modifiedAt: string | number;
}
