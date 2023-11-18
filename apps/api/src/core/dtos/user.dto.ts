import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  isNotEmpty,
} from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ example: 'john_doe', description: 'The username of the user' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({
    example: 'P@ssw0rd',
    description: 'The password of the user',
  })
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
  @Exclude({ toPlainOnly: true })
  password: string;

  @ApiProperty({
    example: 'john.doe@example.com',
    description: 'The email address of the user',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'John',
    description: 'The first name of the user',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The last name of the user',
  })
  @IsString()
  @MinLength(3)
  @MaxLength(20)
  lastName: string;

  @ApiProperty({
    example: 'https://example.com/avatar.jpg',
    description: "The URL of the user's avatar",
  })
  @IsOptional()
  @IsString()
  avatar: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password', 'email']),
) { }

export class AuthenticateUserDto extends PickType(CreateUserDto, ['password']) {
  @ApiProperty({
    example: 'john_doe',
    description: 'The username or email address of the user',
  })
  @IsNotEmpty()
  @IsString()
  usernameOrEmail: string;
}

export class UpdatePasswordDto {
  @ApiProperty({
    example: 'P@ssw0rd',
    description: 'The old password of the user',
  })
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({
    example: 'newP@ssw0rd',
    description: 'The new password of the user',
  })
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
  newPassword: string;
}
