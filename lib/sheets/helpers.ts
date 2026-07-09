import type { PathLeaf } from '../types/PathLeaf';
import type { SheetPathNode } from './types';

/**
 * Returns the target {@link PathLeaf} sheet, or undefined if not reachable.
 * Use this for quick access to the leaf sheet object from a path response.
 *
 * @param node - The root {@link SheetPathNode} returned by `getSheetPath`
 * @returns The leaf {@link PathLeaf} sheet, or `undefined` if not found
 *
 * @example
 * ```typescript
 * const path = await client.sheets.getSheetPath({ sheetId: 123456789 });
 * const leaf = getLeafSheet(path);
 * console.log(leaf?.name);
 * ```
 */
export function getLeafSheet(node: SheetPathNode): PathLeaf | undefined {
  if (node.sheets && node.sheets.length > 0) {
    return node.sheets[0];
  }

  if (node.folders && node.folders.length > 0) {
    return getLeafSheet(node.folders[0]);
  }

  return undefined;
}

/**
 * Returns a Unix-like slash-separated path string from the given node to the target sheet.
 * Use this for quick access to the full path string of the leaf sheet from a path response.
 *
 * @param node - The root {@link SheetPathNode} returned by `getSheetPath`
 * @returns A slash-separated path string, or `undefined` if not reachable
 *
 * @example
 * ```typescript
 * const path = await client.sheets.getSheetPath({ sheetId: 123456789 });
 * const pathStr = getLeafSheetPath(path);
 * console.log(pathStr); // '/Workspace/Folder/Sheet'
 * ```
 */
export function getLeafSheetPath(node: SheetPathNode): string | undefined {
  if (node.sheets && node.sheets.length > 0) {
    return `/${node.sheets[0].name}`;
  }

  if (node.folders && node.folders.length > 0) {
    return `/${node.name}${getLeafSheetPath(node.folders[0])}`;
  }

  return undefined;
}
