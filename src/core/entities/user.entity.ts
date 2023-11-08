import { Entity } from './entity';

export class User extends Entity {
  username: string;
  password: string;
  email: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
}
