import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsEnum,
  IsOptional,
} from 'class-validator';
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
  @IsOptional()
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
  uploaderId: string;

  @ApiProperty({
    example: ['room1', 'room2'],
    description: 'The rooms associated with the resource',
    isArray: true,
    required: false,
  })
  @IsOptional()
  @IsString({ each: true })
  rooms?: string[];

  @ApiProperty({
    example: 'file',
    description: 'The type of the resource',
    enum: ['file', 'text', 'link'],
  })
  @IsNotEmpty()
  @IsEnum(['file', 'text', 'link'])
  type: 'file' | 'text' | 'link';

  @ApiProperty({
    example: 'resource_file.txt',
    description: 'The filename for file resources',
    required: false,
  })
  @IsOptional()
  @IsString()
  filename?: string;

  @ApiProperty({
    example: 'https://example.com',
    description: 'The link URL for link resources',
    required: false,
  })
  @IsOptional()
  @IsString()
  linkUrl?: string;
}
