import type { CellImage, Hyperlink } from '../cells/types';
import type { ContactOption } from '../columns/types';
import type { ObjectValue } from '../types';
import type { MiniUser } from '../users/types';

/**
 * Represents the entire summary, or a list of defined fields and values, for a specific sheet.
 */
export interface SheetSummary {
  /**
   * Array of summary (or metadata) fields defined on the sheet.
   */
  fields: SummaryField[];
}

export interface SummaryField {
  /**
   * SummaryField Id.
   */
  id: number;
  /**
   * Array of ContactOption objects to specify a pre-defined list of values for the column. Column type must be CONTACT_LIST.
   */
  contactOptions: ContactOption[];
  /**
   * Field creation date.
   */
  createdAt: string | number;
  /**
   * MiniUser Object
   */
  createdBy: MiniUser;
  /**
   * Visual representation of cell contents, as presented to the user in the UI.
   */
  displayValue: string;
  /**
   * The format descriptor. Only returned if the include query string parameter contains format and this column has a non-default format applied to it.
   */
  format?: string;
  /**
   * The formula for a cell, if set.
   */
  formula?: string;
  hyperlink?: Hyperlink;
  image?: CellImage;
  /**
   * Field index or position. This number is zero-based.
   */
  index: number;
  /**
   * Indicates whether the field is locked.
   */
  locked: boolean;
  /**
   * Indicates whether the field is locked for the requesting user.
   */
  lockedForUser: boolean;
  /**
   * Field modification date.
   */
  modifiedAt: string | number;
  /**
   * MiniUser Object
   */
  modifiedBy: MiniUser;
  /**
   * String or number or boolean or Contact object value (object) or Date object value (object)
   */
  objectValue: ObjectValue;
  /**
   * When applicable for PICKLIST column type. Array of the options available for the field.
   */
  options?: string[];
  /**
   * When applicable for PICKLIST column type.
   */
  symbol?: string;
  /**
   * Arbitrary name, must be unique within summary.
   */
  title: string;
  /**
   * Field type.
   */
  type: string;
  /**
   * Indicates whether summary field values are restricted to the type.
   */
  validation: boolean;
}
