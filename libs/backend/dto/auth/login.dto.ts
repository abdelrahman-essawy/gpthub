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
  token: string;

  @FilterableField(() => UserDto)
  user: UserDto;

  constructor(token: string, user: UserDto) {
    Object.assign(this, { token, user });
  }
}

export class UserTokenPayload {
  id: string;
  username: string;
  email: string;
  role: string;

  constructor(tokenPayload: UserTokenPayload) {
    this.id = tokenPayload.id;
    this.username = tokenPayload.username;
    this.email = tokenPayload.email;
    this.role = tokenPayload.role;
  }
}
