// ============================================================================
// Get Sheet Path
// ============================================================================

import type { PathLeaf } from '../types/PathLeaf';
import type { PathNode } from '../types/PathNode';

export interface SheetPathNode extends PathNode {
  folders?: SheetPathNode[];
  sheets?: PathLeaf[];
}

/**
 * Returns the target {@link PathLeaf} sheet, or undefined if not reachable.
 * Use this for quick access to the leaf sheet object from a path response.
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
 * @example '/Workspace/Folder/Sheet'
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

export interface SheetUserSettings {
  /**
   * Does this user have "Show Critical Path" turned on for this sheet? NOTE: This setting only has an effect on project sheets with dependencies enabled.
   */
  criticalPathEnabled: boolean;
  /**
   * Does this user have "Display Summary Tasks" turned on for this sheet? Applies only to sheets where "Calendar View" has been configured.
   */
  displaySummaryTasks: boolean;
}
