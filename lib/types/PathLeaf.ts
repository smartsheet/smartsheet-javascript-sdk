import type { APIAccessLevel } from './ApiAccessLevel';

export interface PathLeaf {
  id: number;
  name: string;
  permalink: string;
  accessLevel: APIAccessLevel;
  createdAt: string;
  modifiedAt: string;
}
