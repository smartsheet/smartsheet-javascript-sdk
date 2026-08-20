import type { FolderPathNode } from './types';

/**
 * Returns the deepest {@link FolderPathNode} (the target folder).
 * Use this for quick access to the leaf folder object from a path response.
 *
 * @param node - The root {@link FolderPathNode} returned by `getFolderPath`
 * @returns The deepest (leaf) {@link FolderPathNode}
 *
 * @example
 * ```typescript
 * const path = await client.folders.getFolderPath({ folderId: 7116448184199044 });
 * const leaf = getLeafFolder(path);
 * console.log(leaf.name);
 * ```
 */
export function getLeafFolder(node: FolderPathNode): FolderPathNode {
  if (node.folders && node.folders.length > 0) {
    return getLeafFolder(node.folders[0]);
  }

  return node;
}

/**
 * Returns a Unix-like slash-separated path string from the given node to the target folder.
 * Use this for quick access to the full path string of the leaf folder from a path response.
 *
 * @param node - The root {@link FolderPathNode} returned by `getFolderPath`
 * @returns A slash-separated path string
 *
 * @example
 * ```typescript
 * const path = await client.folders.getFolderPath({ folderId: 7116448184199044 });
 * const pathStr = getLeafFolderPath(path);
 * console.log(pathStr); // '/Workspace/Folder/Subfolder'
 * ```
 */
export function getLeafFolderPath(node: FolderPathNode): string {
  if (node.folders && node.folders.length > 0) {
    return `/${node.name}${getLeafFolderPath(node.folders[0])}`;
  }

  return `/${node.name}`;
}
