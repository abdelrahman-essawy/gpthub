import { Entity } from './entity';
import { User } from './user.entity';

export class Resource extends Entity {
  title: string;
  description: string;
  content: string;
  uploader: User;
}
