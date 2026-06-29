// ============================================================================
// Get Sheet Path
// ============================================================================

import type { PathLeaf } from '../types/PathLeaf';
import type { PathNode } from '../types/PathNode';

/**
 * Represents a node in the path tree from the workspace root to the target sheet.
 * Returned by `getSheetPath`. Use {@link getLeafSheet} to extract the leaf sheet object,
 * or {@link getLeafSheetPath} to get the full slash-separated path string.
 *
 * @see getLeafSheet
 * @see getLeafSheetPath
 */
export interface SheetPathNode extends PathNode {
  folders?: SheetPathNode[];
  sheets?: PathLeaf[];
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
