import { Field, InputType } from '@nestjs/graphql';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IRoom, IRoomDatabaseEntity, RoomType } from '@core';

@InputType({ description: 'Input to create a new room' })
export class CreateRoomInput {
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

  @Field(() => String, { nullable: true })
  @IsEnum(RoomType)
  @IsOptional()
  roomType: RoomType;

  @Field(() => [String])
  @IsNotEmpty()
  @IsUUID('4', { each: true })
  resourceIds: string[];

  constructor(roomInfo:CreateRoomInput) {
  Object.assign(this,roomInfo )
  }
}

export class CreateRoom
  extends CreateRoomInput
  implements Omit<IRoom, keyof IRoomDatabaseEntity>
{
  @Field(() => String)
  @IsNotEmpty()
  @IsUUID('4')
  authorId: string;
}
