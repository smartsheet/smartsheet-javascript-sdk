/**
 * Represents a column in a sheet.
 */
export interface Column {
  /**
   * Auto number format descriptor.
   */
  autoNumberFormat: AutoNumberFormat;

  /**
   * Array of ContactOption objects.
   */
  contactOptions: ContactOption[];

  /**
   * Column description.
   */
  description: string;

  /**
   * Format descriptor.
   */
  format?: string;

  /**
   * Column formula.
   */
  formula: string;

  /**
   * Indicates whether the column is hidden.
   */
  hidden: boolean;

  /**
   * Column Id.
   */
  id: number;

  /**
   * Column index (zero-based).
   */
  index: number;

  /**
   * Indicates whether the column is locked.
   */
  locked: boolean;

  /**
   * Indicates whether the column is locked for the user.
   */
  lockedForUser: boolean;

  /**
   * Array of options for the column.
   */
  options: string[];

  /**
   * Indicates whether the column is the primary column.
   */
  primary?: boolean;

  /**
   * Symbol for the column.
   */
  symbol?: string;

  /**
   * System column type.
   */
  systemColumnType: string;

  /**
   * Array of tags for the column.
   */
  tags: string[];

  /**
   * Column title.
   */
  title: string;

  /**
   * Column type.
   */
  type: string;

  /**
   * Indicates whether validation is enabled for the column.
   */
  validation: boolean;

  /**
   * Column version number.
   */
  version: number;

  /**
   * Column width in pixels.
   */
  width: number;
}

/**
 * Represents the auto number format for a column.
 */
export interface AutoNumberFormat {
  /**
   * The prefix.
   */
  fill: string;

  /**
   * The prefix.
   */
  prefix: string;

  /**
   * The starting number for the auto number format.
   */
  startingNumber: number;

  /**
   * The suffix.
   */
  suffix: string;
}

/**
 * Represents a contact option for a column.
 */
export interface ContactOption {
  /**
   * Contact email address.
   */
  email: string;

  /**
   * Contact name.
   */
  name: string;
}
