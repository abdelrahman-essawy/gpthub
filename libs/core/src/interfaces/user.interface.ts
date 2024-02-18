import { IDatabaseEntity } from './interface';

export interface IUser extends IUserDatabaseEntity {
  avatar?: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  birthday?: Date;
  password: string;
  bio?: string;
}

export interface IUserDatabaseEntity extends IDatabaseEntity {
  verified: boolean;
  role: UserRole;
  hashedRefreshToken?: string;
  lastLogin?: Date;
  githubId?: string;
  googleId?: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
