import type { PathLeaf } from '../types/PathLeaf';
import type { ReportPathNode } from './types';

/**
 * Returns the target {@link PathLeaf} report, or undefined if not reachable.
 * Use this for quick access to the leaf report object from a path response.
 *
 * @param node - The root {@link ReportPathNode} returned by `getReportPath`
 * @returns The leaf {@link PathLeaf} report, or `undefined` if not found
 *
 * @example
 * ```typescript
 * const path = await client.reports.getReportPath({ reportId: 4583173393803140 });
 * const leaf = getLeafReport(path);
 * console.log(leaf?.name);
 * ```
 */
export function getLeafReport(node: ReportPathNode): PathLeaf | undefined {
  if (node.reports && node.reports.length > 0) {
    return node.reports[0];
  }

  if (node.folders && node.folders.length > 0) {
    return getLeafReport(node.folders[0]);
  }

  return undefined;
}

/**
 * Returns a Unix-like slash-separated path string from the given node to the target report.
 * Use this for quick access to the full path string of the leaf report from a path response.
 *
 * @param node - The root {@link ReportPathNode} returned by `getReportPath`
 * @returns A slash-separated path string, or `undefined` if not reachable
 *
 * @example
 * ```typescript
 * const path = await client.reports.getReportPath({ reportId: 4583173393803140 });
 * const pathStr = getLeafReportPath(path);
 * console.log(pathStr); // '/Workspace/Folder/Report'
 * ```
 */
export function getLeafReportPath(node: ReportPathNode): string | undefined {
  if (node.reports && node.reports.length > 0) {
    return `/${node.reports[0].name}`;
  }

  if (node.folders && node.folders.length > 0) {
    return `/${node.name}${getLeafReportPath(node.folders[0])}`;
  }

  return undefined;
}
