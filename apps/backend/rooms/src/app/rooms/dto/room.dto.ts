import {
  Directive,
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IRoom, IRoomDatabaseEntity, RoomType } from '@core';
import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { UserDto } from './user-dto.directive';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

@ObjectType()
@Directive('@key(fields: "id")')
export class RoomDto implements Omit<IRoom, keyof IRoomDatabaseEntity> {
  @IsNotEmpty()
  @IDField(() => ID)
  id: string;

  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  @FilterableField()
  title: string;

  @IsOptional()
  @MinLength(3)
  @MaxLength(40)
  @FilterableField(() => String, { nullable: true })
  description?: string;

  @IsNotEmpty()
  @FilterableField(() => RoomType)
  roomType: RoomType;

  @IsNotEmpty()
  @Field(() => [String])
  resourceIds: string[];

  @IsNotEmpty()
  @FilterableField(() => GraphQLISODateTime)
  createdAt: Date;

  @IsNotEmpty()
  @FilterableField(() => GraphQLISODateTime)
  updatedAt: Date;

  @IsNotEmpty()
  @Field(() => UserDto)
  author: UserDto;

  @Field(() => [UserDto])
  participants: UserDto[];

  @IsNotEmpty()
  @Field(() => [UserDto])
  owners: UserDto[];

  @Field(() => [UserDto])
  moderators: UserDto[];

  @Field(() => [UserDto])
  collaborators: UserDto[];

  constructor(roomInfo: RoomDto) {
    Object.assign(this, roomInfo);
  }
}

registerEnumType(RoomType, {
  name: 'RoomType',
});
