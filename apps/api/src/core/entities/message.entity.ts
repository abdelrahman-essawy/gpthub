import { Entity } from './entity';

export class Message extends Entity {
  senderId: string;
  receiverId: string;
  content: any;
}
