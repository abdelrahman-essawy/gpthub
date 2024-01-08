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
import {
  FilterableField,
  PagingStrategies,
  QueryOptions,
} from '@ptc-org/nestjs-query-graphql';

@InputType('Credentials', { description: 'Login user' })
@QueryOptions({ pagingStrategy: PagingStrategies.NONE })
export class LoginUserDto
  implements Partial<Pick<IUser, 'username' | 'email' | 'password'>>
{
  @IsEmail()
  @IsNotEmpty()
  @Field(() => String)
  @ValidateIf((o) => !o.username || o.email, {
    message: 'Email or username is required',
  })
  email?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(20)
  @Field(() => String)
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

  constructor(accessToken: string) {
    this.token = accessToken;
  }
}
