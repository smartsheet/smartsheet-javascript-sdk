// ============================================================================
// Get Sheet Path
// ============================================================================

export interface SheetPathLeaf {
  id: number;
  name?: string;
  permalink?: string;
  accessLevel?: string;
  createdAt?: string;
  modifiedAt?: string;
}

export class SheetPathNode {
  id: number;
  name?: string;
  permalink?: string;
  accessLevel?: string;
  folders?: SheetPathNode[];
  sheets?: SheetPathLeaf[];

  constructor(data: Record<string, unknown>) {
    this.id = data.id as number;
    this.name = data.name as string | undefined;
    this.permalink = data.permalink as string | undefined;
    this.accessLevel = data.accessLevel as string | undefined;
    if (Array.isArray(data.folders)) {
      this.folders = (data.folders as Record<string, unknown>[]).map((f) => new SheetPathNode(f));
    }
    if (Array.isArray(data.sheets)) {
      this.sheets = data.sheets as SheetPathLeaf[];
    }
  }

  private _walkToLeaf(): SheetPathNode[] {
    if (this.sheets && this.sheets.length > 0) return [this];
    if (this.folders && this.folders.length > 0) {
      return [this, ...this.folders[0]._walkToLeaf()];
    }
    return [this];
  }

  /** Returns the target SheetPathLeaf sheet, or undefined if not reachable. */
  getSheet(): SheetPathLeaf | undefined {
    for (const node of this._walkToLeaf()) {
      if (node.sheets && node.sheets.length > 0) return node.sheets[0];
    }
    return undefined;
  }

  /** Returns a slash-separated path string from this node to the target sheet. */
  getSheetPath(): string | undefined {
    const nodes = this._walkToLeaf();
    if (nodes.length === 0) return undefined;
    const parts = nodes.map((n) => n.name).filter(Boolean) as string[];
    const leaf = nodes[nodes.length - 1];
    if (leaf.sheets && leaf.sheets.length > 0 && leaf.sheets[0].name) {
      parts[parts.length - 1] = leaf.sheets[0].name;
    }
    return parts.length > 0 ? parts.join('/') : undefined;
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
