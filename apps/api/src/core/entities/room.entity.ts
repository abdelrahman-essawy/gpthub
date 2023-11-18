import { Entity } from './entity';
import { Message } from './message.entity';
import { User } from './user.entity';

export class Room extends Entity {
  title: string;
  description: string;
  members: User[];
  messages: Message[];
  isActive: boolean;
}
