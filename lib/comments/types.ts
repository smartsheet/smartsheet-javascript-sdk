import type { Attachment } from '../attachments/types';
import type { MiniUser } from '../users/types';

/**
 * Represents a comment in a discussion.
 */
export interface Comment {
  /**
   * Array of Attachment objects.
   */
  attachments: Attachment[];

  /**
   * Time of creation.
   */
  createdAt: string | number;

  /**
   * MiniUser object representing the creator.
   */
  createdBy: MiniUser;

  /**
   * Discussion Id.
   */
  discussionId: number;

  /**
   * Comment Id.
   */
  id: number;

  /**
   * Time of last modification.
   */
  modifiedAt: string | number;

  /**
   * Comment text.
   */
  text: string;
}
