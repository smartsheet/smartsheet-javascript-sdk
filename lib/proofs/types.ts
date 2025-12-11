import type { Attachment } from '../attachments/types';
import type { Discussion } from '../discussions/types';
import type { User } from '../types/User';

/**
 * Represents a proof.
 */
export interface Proof {
  /**
   * Proof Id.
   */
  id: number;

  /**
   * Original proof Id.
   */
  originalId: number;

  /**
   * Proof name.
   */
  name?: string;

  /**
   * Proof type.
   */
  type: string;

  /**
   * Document type.
   */
  documentType: string;

  /**
   * Proof request URL.
   */
  proofRequestUrl: string;

  /**
   * Proof version number.
   */
  version: number;

  /**
   * Time of last update.
   */
  lastUpdatedAt: string | number;

  /**
   * User object representing the last updater.
   */
  lastUpdatedBy: User;

  /**
   * Indicates whether the proof is completed.
   */
  isCompleted: boolean;

  /**
   * Array of Attachment objects.
   */
  attachments?: Attachment[];

  /**
   * Array of Discussion objects.
   */
  discussions?: Discussion[];
}
