import { Field, InputType } from '@nestjs/graphql';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  ValidateIf,
} from 'class-validator';

import { IUser } from '@core';

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

export class UserTokenPayload {
  id: string;

  constructor(tokenPayload: UserTokenPayload) {
    this.id = tokenPayload.id;
  }
}
