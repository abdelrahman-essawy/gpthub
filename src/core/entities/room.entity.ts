import { User } from './user.entity';

export class Room {
  id: number;
  name: string;
  description: string;
  members: User[];
  isActive: boolean;
  created: Date;
  updated: Date;
}
