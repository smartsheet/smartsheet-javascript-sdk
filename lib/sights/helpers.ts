import type { PathLeaf } from '../types/PathLeaf';
import type { SightPathNode } from './types';

/**
 * Returns the target {@link PathLeaf} sight, or undefined if not reachable.
 * Use this for quick access to the leaf sight object from a path response.
 *
 * @param node - The root {@link SightPathNode} returned by `getSightPath`
 * @returns The leaf {@link PathLeaf} sight, or `undefined` if not found
 *
 * @example
 * ```typescript
 * const path = await client.sights.getSightPath({ sightId: 123456789 });
 * const leaf = getLeafSight(path);
 * console.log(leaf?.name);
 * ```
 */
export function getLeafSight(node: SightPathNode): PathLeaf | undefined {
  if (node.sights && node.sights.length > 0) {
    return node.sights[0];
  }

  if (node.folders && node.folders.length > 0) {
    return getLeafSight(node.folders[0]);
  }

  return undefined;
}

/**
 * Returns a Unix-like slash-separated path string from the given node to the target sight.
 * Use this for quick access to the full path string of the leaf sight from a path response.
 *
 * @param node - The root {@link SightPathNode} returned by `getSightPath`
 * @returns A slash-separated path string, or `undefined` if not reachable
 *
 * @example
 * ```typescript
 * const path = await client.sights.getSightPath({ sightId: 123456789 });
 * const pathStr = getLeafSightPath(path);
 * console.log(pathStr); // '/Workspace/Folder/Dashboard'
 * ```
 */
export function getLeafSightPath(node: SightPathNode): string | undefined {
  if (node.sights && node.sights.length > 0) {
    return `/${node.sights[0].name}`;
  }

  if (node.folders && node.folders.length > 0) {
    return `/${node.name}${getLeafSightPath(node.folders[0])}`;
  }

  return undefined;
}
