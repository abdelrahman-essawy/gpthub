import { IEntityInDatabase } from './interface';

export interface IUser extends IEntityInDatabase {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  isEmailConfirmed?: boolean;
  birthday?: Date;
  role?: UserRole;
  password: string;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}
