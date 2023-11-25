import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateRoomDto } from './room.dto';

export class CreateResourceDto {
  @IsNotEmpty()
  title: string;

  description?: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  uploader: string;
}

export class UpdateResourceDto extends PartialType(CreateRoomDto) { }
