import { ID, ObjectType, registerEnumType } from '@nestjs/graphql';
import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';

import { IUser, UserRole } from '@core';

@ObjectType('User')
export class UserDto implements Omit<IUser, 'password' | 'hashedRefreshToken'> {
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

  @FilterableField({
    nullable: true,
  })
  birthday?: Date;

  @FilterableField(() => UserRole)
  role: UserRole;

  @FilterableField()
  createdAt: Date;

  @FilterableField()
  updatedAt: Date;

  constructor(user: UserDto) {
    Object.assign(this, user);
  }
}

registerEnumType(UserRole, {
  name: 'UserRole',
});
