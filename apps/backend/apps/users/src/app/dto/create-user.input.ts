import { ArgsType, Field, InputType } from '@nestjs/graphql';
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
import { IUser } from '@core';
import { IDatabaseEntity } from '../../../../../../../libs/core/src/interfaces/interface';

@InputType()
@ArgsType()
export class CreateUserInput implements Omit<IUser, keyof IDatabaseEntity> {
  @Field(() => Date, { nullable: true })
  @IsDate()
  @IsOptional()
  birthday: Date;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  firstName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
  })
  password: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  lastName: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  constructor(createUserInput: CreateUserInput) {
    Object.assign(this, createUserInput);
  }
}
