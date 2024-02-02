import { FilterableField } from '@ptc-org/nestjs-query-graphql';
import { ObjectType } from '@nestjs/graphql';

import { IUser } from '@core';

import { UserDto } from '../../users/dto';

@ObjectType('LoginResponseDto', { description: 'Login response' })
export class LoginResponseDto {
  @FilterableField(() => String)
  accessToken: string;

  @FilterableField(() => String)
  refreshToken: string;

  @FilterableField(() => UserDto)
  user: UserDto;

  constructor(user: IUser, accessToken: string, refreshToken: string) {
    Object.assign(this, { user, accessToken, refreshToken });
  }
}
