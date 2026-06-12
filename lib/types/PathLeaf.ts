import type { APIAccessLevel } from '@smartsheet/types';

export interface PathLeaf {
  id: number;
  name: string;
  permalink: string;
  accessLevel: APIAccessLevel;
  createdAt: string;
  modifiedAt: string;
}
