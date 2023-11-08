import { IsEmail, IsNotEmpty, IsStrongPassword } from 'class-validator';
import { User } from '../entities/user.entity';
import { PartialType } from '@nestjs/mapped-types';

export class CreateUserDto extends User {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  lastName: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
