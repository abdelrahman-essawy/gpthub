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
import { Transform } from 'class-transformer';

import { IUser, IUserDatabaseEntity, POLICY } from '@core';

@InputType({ description: 'Create new user' })
export class RegisterUserDto implements Omit<IUser, keyof IUserDatabaseEntity> {
  @IsNotEmpty()
  @IsString()
  @MinLength(POLICY.AUTH.FIRST_NAME.MIN_LENGTH)
  @MaxLength(POLICY.AUTH.FIRST_NAME.MAX_LENGTH)
  @Field(() => String)
  firstName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(POLICY.AUTH.LAST_NAME.MIN_LENGTH)
  @MaxLength(POLICY.AUTH.LAST_NAME.MAX_LENGTH)
  @Field(() => String)
  lastName: string;

  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  @IsString()
  @MinLength(POLICY.AUTH.USERNAME.MIN_LENGTH)
  @MaxLength(POLICY.AUTH.USERNAME.MAX_LENGTH)
  @Field(() => String)
  username: string;

  @IsNotEmpty()
  @Transform(({ value }) => value?.trim())
  @IsEmail()
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(POLICY.AUTH.PASSWORD.MAX_LENGTH)
  @IsStrongPassword({
    minLength: POLICY.AUTH.PASSWORD.MIN_LENGTH,
    minLowercase: POLICY.AUTH.PASSWORD.MIN_LOWERCASE,
    minUppercase: POLICY.AUTH.PASSWORD.MIN_UPPERCASE,
    minNumbers: POLICY.AUTH.PASSWORD.MIN_NUMBERS,
    minSymbols: POLICY.AUTH.PASSWORD.MIN_SYMBOLS,
  })
  @Field(() => String)
  password: string;

  @IsDate()
  @IsOptional()
  @Field(() => Date, { nullable: true })
  birthday?: Date;

  constructor(createUserInput: RegisterUserDto) {
    Object.assign(this, createUserInput);
  }
}
