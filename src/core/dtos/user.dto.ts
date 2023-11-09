import { PartialType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 0,
    },
    {
      message:
        'Password must contain at least 8 characters, 1 lowercase letter, 1 uppercase letter, and 1 number',
    },
  )
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  firstName: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  lastName: string;

  @IsOptional()
  @IsString()
  avatar: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
