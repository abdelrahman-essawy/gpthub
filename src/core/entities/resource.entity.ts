import { Entity } from './entity';

export class Resource extends Entity {
  title: string;
  description?: string;
  content: string;
  uploaderId: string;
}
