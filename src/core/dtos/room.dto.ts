import { IsNotEmpty } from 'class-validator';
import { Room } from '../entities/room.entity';
import { PartialType } from '@nestjs/mapped-types';

export class CreateRoomDto extends Room {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}

export class UpdateRoomDto extends PartialType(CreateRoomDto) {}
