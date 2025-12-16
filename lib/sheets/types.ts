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
