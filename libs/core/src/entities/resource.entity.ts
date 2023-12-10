import { Entity } from './entity';

export interface Resource extends Entity {
  title: string;
  description?: string;
  content: string;
  uploaderId: string;
}
