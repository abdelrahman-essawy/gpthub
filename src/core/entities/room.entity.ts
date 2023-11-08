import { Entity } from './entity';
import { Message } from './message.entity';
import { User } from './user.entity';

export class Room extends Entity {
  name: string;
  description: string;
  members: User[];
  messages: Message[];
  isActive: boolean;
}
