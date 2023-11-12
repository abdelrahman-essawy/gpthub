import { Prisma } from '@prisma/client';

export class UserPrismaDocument implements Prisma.UserCreateInput {
  id?: string;
  password: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar: string;
  rooms?: Prisma.UserCreateroomsInput | string[];
}
