import { IUser, UserRole } from '@core';
import { Directive, ID, ObjectType } from '@nestjs/graphql';
import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';

@ObjectType('User')
@Directive('@extends')
@Directive('@key(fields: "id")')
export class UserModel implements Omit<IUser, 'password'> {
  @IDField(() => ID)
  id: string;

  @FilterableField(() => String)
  firstName: string;

  @FilterableField()
  lastName: string;

  @FilterableField()
  username: string;

  @FilterableField()
  email: string;

  @FilterableField()
  verified: boolean;

  @FilterableField()
  birthday?: Date;

  @FilterableField(() => String)
  role: UserRole;

  @FilterableField()
  createdAt: Date;

  @FilterableField()
  updatedAt: Date;
}
