import { Field, InputType } from '@nestjs/graphql';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IRoom, IRoomDatabaseEntity, ResourceType, RoomType } from '@core';

@InputType({ description: 'Input to create a new room' })
export class CreateRoomDto implements Omit<IRoom, keyof IRoomDatabaseEntity> {
  @Field(() => String)
  @IsNotEmpty()
  @IsUUID()
  authorId: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @MinLength(3)
  @MaxLength(40)
  description?: string;

  @Field(() => String)
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  title: string;

  @Field(() => ResourceType)
  @IsEnum(RoomType)
  roomType: RoomType;
}
