// ============================================================================
// Get Sheet Path
// ============================================================================

import type { PathLeaf } from '../types/PathLeaf';
import type { APIAccessLevel } from '../types/ApiAccessLevel';

export class SheetPathNode {
  id: number;
  name: string;
  permalink: string;
  accessLevel?: APIAccessLevel;
  folders?: SheetPathNode[];
  sheets?: PathLeaf[];

  constructor(data: Record<string, unknown>) {
    this.id = data.id as number;
    this.name = data.name as string;
    this.permalink = data.permalink as string;
    this.accessLevel = data.accessLevel as APIAccessLevel | undefined;
    if (Array.isArray(data.folders)) {
      this.folders = (data.folders as Record<string, unknown>[]).map((f) => new SheetPathNode(f));
    }
    if (Array.isArray(data.sheets)) {
      this.sheets = data.sheets as PathLeaf[];
    }
  }

  /** Returns the target PathLeaf sheet, or undefined if not reachable. */
  getLeafSheet(): PathLeaf | undefined {
    if (this.sheets && this.sheets.length > 0) {
      return this.sheets[0];
    }

    if (this.folders && this.folders.length > 0) {
      return this.folders[0].getLeafSheet();
    }

    return undefined;
  }

  /**
   * Returns a Unix-like slash-separated path string from this node to the target sheet.
   *
   * @example '/Workspace/Folder/Sheet'
   **/
  getLeafSheetPath(): string | undefined {
    if (this.sheets && this.sheets.length > 0) {
      return `/${this.sheets[0].name}`;
    }

    if (this.folders && this.folders.length > 0) {
      return `/${this.name}${this.folders[0].getLeafSheetPath()}`;
    }

    return undefined;
  }
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
