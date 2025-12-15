import type { Attachment } from '../attachments/types';
import type { MiniUser } from '../users/types';

/**
 * Represents a discussion.
 */
export interface Discussion {
  /**
   * Access level for the discussion.
   */
  accessLevel: string;

  /**
   * Discussion Id.
   */
  id: number;

  /**
   * Array of Comment objects.
   */
  comments?: Comment[];

  /**
   * Array of Attachment objects for comments.
   */
  commentAttachments?: Attachment[];

  /**
   * Number of comments in the discussion.
   */
  commentCount: number;

  /**
   * MiniUser object representing the creator.
   */
  createdBy: MiniUser;

  /**
   * Time of last comment.
   */
  lastCommentedAt: string | number;

  /**
   * MiniUser object representing the last commenter.
   */
  lastCommentedUser: MiniUser;

  /**
   * Parent Id (row, sheet, etc.).
   */
  parentId: number;

  /**
   * Parent type (row, sheet, etc.).
   */
  parentType: string;

  /**
   * Indicates whether the discussion is read-only.
   */
  readOnly: boolean;

  /**
   * Discussion title.
   */
  title: string;
}
