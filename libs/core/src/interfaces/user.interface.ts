import { IDatabaseEntity } from './interface';

export interface IUser extends IDatabaseEntity {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  verified?: boolean;
  birthday?: Date;
  role?: UserRole;
  password: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
