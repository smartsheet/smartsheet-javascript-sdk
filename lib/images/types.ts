import type { RequestCallback } from '../types/RequestCallback';
import type { RequestOptions } from '../types/RequestOptions';

// ============================================================================
// Images API Interface
// ============================================================================

export interface ImagesApi {
  /**
   * Gets temporary URLs for accessing cell images or attachment images.
   *
   * @param options - {@link RequestOptions}\<undefined, {@link ImageUrl}[]\> - Configuration options for the request
   * @param callback - {@link RequestCallback}\<{@link ListImageUrlsResponse}\> - Optional callback function
   * @returns Promise\<{@link ListImageUrlsResponse}\>
   *
   * @remarks
   * It mirrors to the following Smartsheet REST API method: `POST /imageurls`
   *
   * @example
   * ```typescript
   * const result = await client.images.listImageUrls({
   *   body: [
   *     { imageId: 'jpbGklqdfZuL4Jw-kZhdZA' }
   *   ]
   * });
   * ```
   */
  listImageUrls: (
    options: RequestOptions<undefined, ImageUrl[]>,
    callback?: RequestCallback<ListImageUrlsResponse>
  ) => Promise<ListImageUrlsResponse>;
}

// ============================================================================
// List Image URLs
// ============================================================================

/**
 * Represents an image URL request item.
 */
export interface ImageUrl {
  /**
   * Image ID.
   */
  imageId?: string;

  /**
   * Image height (in pixels).
   */
  height?: number;

  /**
   * Image width (in pixels).
   */
  width?: number;

  /**
   * Temporary URL that can be used to retrieve the image.
   */
  url?: string;
}

/**
 * Response from listing image URLs.
 */
export interface ListImageUrlsResponse {
  /**
   * Array of ImageUrl objects with temporary URLs.
   */
  imageUrls?: ImageUrl[];

  /**
   * Milliseconds before the URLs within imageUrls expire.
   */
  urlExpiresInMillis?: number;
}
