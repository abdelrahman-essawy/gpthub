import { Field, InputType } from '@nestjs/graphql';
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

@InputType({ description: 'Create new user' })
export class CreateUserDto implements Omit<IUser, keyof IUserDatabaseEntity> {
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

  constructor(createUserInput: CreateUserDto) {
    Object.assign(this, createUserInput);
  }
}
