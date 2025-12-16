export interface WorkspaceListing {
  /**
   * Workspace Id.
   */
  id: number;
  /**
   * Workspace name.
   */
  name: string;
  accessLevel: string;
  /**
   * URL that represents a direct link to the workspace in Smartsheet.
   */
  permalink: string;
}
