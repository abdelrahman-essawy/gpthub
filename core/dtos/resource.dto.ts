import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { CreateRoomDto } from './room.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Optional } from '@nestjs/common';

export class CreateResourceDto {
  @ApiProperty({
    example: 'Resource title',
    description: 'The title of the resource',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  title: string;

  @ApiProperty({
    example: 'Resource description',
    description: 'The description of the resource',
  })
  @IsString()
  @Optional()
  @MaxLength(500)
  description?: string;

  @ApiProperty({
    example: 'Resource content',
    description: 'The content of the resource',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  content: string;

  @ApiProperty({
    example: 'Resource uploader',
    description: 'The uploader of the resource',
  })
  @IsNotEmpty()
  @IsString()
  uploader: string;
}
