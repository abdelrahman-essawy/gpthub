import { ObjectType } from '@nestjs/graphql';

import { IUser } from '@core';

import { LoginResponseDto } from './login-response.dto';

@ObjectType('RegisterResponse', { description: 'Register response' })
export class RegisterResponse extends LoginResponseDto {
  constructor(
    public readonly user: IUser,
    public readonly accessToken: string,
    public readonly refreshToken: string,
  ) {
    super(user, accessToken, refreshToken);
  }
}
