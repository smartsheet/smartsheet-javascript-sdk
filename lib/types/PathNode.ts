import type { APIAccessLevel } from './ApiAccessLevel';

export interface PathNode {
  id: number;
  name: string;
  permalink: string;
  accessLevel?: APIAccessLevel;
}
