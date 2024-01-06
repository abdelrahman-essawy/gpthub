import { IUser, UserRole } from '@core';
import { Directive, ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';

@ObjectType('User')
@Directive('@key(fields: "id")')
export class UserDto implements Omit<IUser, 'password'> {
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

  @FilterableField(() => UserRole)
  role: UserRole;

  @FilterableField()
  createdAt: Date;

  @FilterableField()
  updatedAt: Date;
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
