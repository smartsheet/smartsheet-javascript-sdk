/**
 * Basic user information used across multiple endpoints.
 */
export interface User {
  /**
   * User's email address.
   */
  email: string;

  /**
   * User's full name.
   */
  name: string;
}

/**
 * Extended user information with additional details.
 */
export interface UserInfo extends User {
  /**
   * User Id.
   */
  id?: number;

  /**
   * User's first name.
   */
  firstName?: string;

  /**
   * User's last name.
   */
  lastName?: string;
}
