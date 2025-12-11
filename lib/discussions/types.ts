import type { Attachment } from '../attachments/types';
import type { User } from '../types/User';

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
   * User object representing the creator.
   */
  createdBy: User;

  /**
   * Time of last comment.
   */
  lastCommentedAt: string | number;

  /**
   * User object representing the last commenter.
   */
  lastCommentedUser: User;

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
