import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateRoomDto } from './room.dto';

export class CreateMessageDto {
  @IsNotEmpty()
  @IsString()
  senderId: string;

  @IsNotEmpty()
  @IsString()
  receiverId: string;

  @IsNotEmpty()
  content: string;
}

export class UpdateMessageDto extends PartialType(CreateRoomDto) {}
