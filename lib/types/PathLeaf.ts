import type { PathNode } from './PathNode';

export interface PathLeaf extends PathNode {
  accessLevel: NonNullable<PathNode['accessLevel']>;
  createdAt: string;
  modifiedAt: string;
}
