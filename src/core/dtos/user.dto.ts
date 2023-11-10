import { ApiProperty, PartialType } from '@nestjs/swagger';
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
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  // You can add additional properties specific to the update if needed
}
