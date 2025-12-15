import type { MiniUser } from '../users/types';

/**
 * Represents an attachment.
 */
export interface Attachment {
  /**
   * Attachment Id.
   */
  id: number;

  /**
   * Parent Id (row, comment, etc.).
   */
  parentId: number;

  /**
   * Attachment type.
   */
  attachmentType: string;

  /**
   * Attachment sub-type.
   */
  attachmentSubType: string;

  /**
   * MIME type.
   */
  mimeType: string;

  /**
   * Parent type (row, comment, etc.).
   */
  parentType: string;

  /**
   * Time of creation.
   */
  createdAt: string | number;

  /**
   * MiniUser object representing the creator.
   */
  createdBy: MiniUser;

  /**
   * Attachment name.
   */
  name: string;

  /**
   * Attachment size in kilobytes.
   */
  sizeInKb: number;

  /**
   * Attachment URL.
   */
  url: string;

  /**
   * Time in milliseconds before the URL expires.
   */
  urlExpiresInMillis: number;
}
