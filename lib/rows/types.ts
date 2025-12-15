import type { MiniUser } from '../users/types';
import type { Attachment } from '../attachments/types';
import type { Cell } from '../cells/types';
import type { Column } from '../columns/types';
import type { Discussion } from '../discussions/types';
import type { Proof } from '../proofs/types';

/**
 * Represents a row in a sheet.
 */
export interface Row {
  /**
   * Row Id.
   */
  id: number;

  /**
   * Sheet Id.
   */
  sheetId: number;

  /**
   * Sibling Id.
   */
  siblingId: number;

  /**
   * Access level for the row.
   */
  accessLevel: string;

  /**
   * Array of Attachment objects.
   */
  attachments?: Attachment[];

  /**
   * Array of Cell objects.
   */
  cells: Cell[];

  /**
   * Array of Column objects.
   */
  columns: Column[];

  /**
   * Conditional format string.
   */
  conditionalFormat?: string;

  /**
   * Time of creation.
   */
  createdAt: string | number;

  /**
   * MiniUser object representing the creator.
   */
  createdBy: MiniUser;

  /**
   * Array of Discussion objects.
   */
  discussions?: Discussion[];

  /**
   * Proof object.
   */
  proof: Proof;

  /**
   * Indicates if the row is expanded.
   */
  expanded: boolean;

  /**
   * Indicates if the row is filtered out.
   */
  filteredOut?: boolean;

  /**
   * Format string.
   */
  format?: string;

  /**
   * Indicates if the row is in the critical path.
   */
  inCriticalPath?: boolean;

  /**
   * Indicates if the row is locked.
   */
  locked: boolean;

  /**
   * Indicates if the row is locked for the user.
   */
  lockedForUser: boolean;

  /**
   * Time of last modification.
   */
  modifiedAt: string | number;

  /**
   * MiniUser object representing the last modifier.
   */
  modifiedBy: MiniUser;

  /**
   * Permalink to the row.
   */
  permaLink?: string;

  /**
   * Row number.
   */
  rowNumber: number;

  /**
   * Row version number.
   */
  version: number;
}
