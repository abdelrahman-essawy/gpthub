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
import { Transform } from 'class-transformer';

@InputType({ description: 'Create new user' })
export class RegisterUserDto implements Omit<IUser, keyof IUserDatabaseEntity> {
  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
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
  @MaxLength(20)
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 0,
    minSymbols: 0,
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
  @Transform(({ value }) => value?.trim())
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
