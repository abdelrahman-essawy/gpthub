import { IDatabaseEntity } from './interface';

export interface IUser extends IUserDatabaseEntity {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  birthday?: Date;
  password: string;
}

export interface IUserDatabaseEntity extends IDatabaseEntity {
  verified: boolean;
  role: UserRole;
  hashedRefreshToken?: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
