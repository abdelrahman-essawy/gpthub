import { Field, InputType, ObjectType } from '@nestjs/graphql';
import {
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IUser, IUserDatabaseEntity } from '@core';
import { LoginResponse } from './login.dto';

@InputType({ description: 'Create new user' })
export class RegisterUserDto implements Omit<IUser, keyof IUserDatabaseEntity> {
  @IsNotEmpty()
  @IsEmail()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Field(() => String)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
  })
  @Field(() => String)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Field(() => String)
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Field(() => String)
  username: string;

  @IsDate()
  @IsOptional()
  @Field(() => Date, { nullable: true })
  birthday: Date;

  constructor(createUserInput: RegisterUserDto) {
    Object.assign(this, createUserInput);
  }
}

@ObjectType('RegisterResponse', { description: 'Register response' })
export class RegisterResponse extends LoginResponse {
  constructor(
    public readonly token: string,
    public readonly user: IUser,
  ) {
    super(token, user);
  }
}
