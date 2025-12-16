import type { ObjectValue } from '../types/ObjectValue';

/**
 * Represents a cell in a sheet.
 */
export interface Cell {
  /**
   * Column Id.
   */
  columnId: number;

  /**
   * Row Id (only present in certain contexts).
   */
  rowId?: number;

  /**
   * Column type.
   */
  columnType?: string;

  /**
   * Conditional format string.
   */
  conditionalFormat?: string;

  /**
   * Visual representation of cell contents, as presented to the user in the UI.
   */
  displayValue: string;

  /**
   * Format descriptor.
   */
  format?: string;

  /**
   * Cell formula.
   */
  formula: string;

  /**
   * Hyperlink object.
   */
  hyperlink: Hyperlink;

  /**
   * Cell image object.
   */
  image?: CellImage;

  /**
   * Inbound cell link.
   */
  linkInFromCell?: CellLink;

  /**
   * Array of outbound cell links.
   */
  linksOutToCells?: CellLink[];

  /**
   * Object value.
   */
  objectValue: ObjectValue;

  /**
   * Set to true to enable lenient parsing.
   */
  overrideValidation?: boolean;

  /**
   * Set to false to enable lenient parsing.
   */
  strict: boolean;

  /**
   * Cell value.
   */
  value?: string | number | boolean | null;
}

/**
 * Represents an image in a cell.
 */
export interface CellImage {
  /**
   * Alternate text for the image.
   */
  altText: string;

  /**
   * Image height in pixels.
   */
  height: number;

  /**
   * Image Id.
   */
  id: string;

  /**
   * Image width in pixels.
   */
  width: number;
}

/**
 * Represents a link from one cell to another.
 */
export interface CellLink {
  /**
   * Column Id of the linked cell.
   */
  columnId: number;

  /**
   * Row Id of the linked cell.
   */
  rowId: number;

  /**
   * Sheet Id of the linked cell.
   */
  sheetId: number;

  /**
   * Sheet name of the linked cell.
   */
  sheetName: string;

  /**
   * Status of the cell link.
   */
  status: string;
}

/**
 * Represents a hyperlink in a cell.
 */
export interface Hyperlink {
  /**
   * Report Id if the hyperlink points to a report.
   */
  reportId?: number;

  /**
   * Sheet Id if the hyperlink points to a sheet.
   */
  sheetId?: number;

  /**
   * Sight Id if the hyperlink points to a sight/dashboard.
   */
  sightId?: number;

  /**
   * URL if the hyperlink points to an external URL.
   */
  url?: string;
}
