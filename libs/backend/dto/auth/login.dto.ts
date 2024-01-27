import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IUser } from '@core';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { FilterableField } from '@ptc-org/nestjs-query-graphql';
import { UserDto } from '../user';

@InputType('Credentials', { description: 'Login user' })
export class LoginUserDto
  implements Partial<Pick<IUser, 'username' | 'email' | 'password'>>
{
  @IsEmail()
  @IsNotEmpty()
  @Field(() => String, { nullable: true })
  @ValidateIf((o) => !o.username || o.email, {
    message: 'Email or username is required',
  })
  email?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @Field(() => String, { nullable: true })
  @ValidateIf((o) => !o.email || o.username, {
    message: 'Email or username is required',
  })
  username?: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String)
  password: string;

  constructor(loginUserDto: LoginUserDto) {
    Object.assign(this, loginUserDto);
  }
}

@ObjectType('LoginResponse', { description: 'Login response' })
export class LoginResponse {
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

export class UserTokenPayload {
  id: string;

  constructor(tokenPayload: UserTokenPayload) {
    this.id = tokenPayload.id;
  }
}
