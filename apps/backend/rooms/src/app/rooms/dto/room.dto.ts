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

@ObjectType()
@Directive('@key(fields: "id")')
export class RoomDto implements Omit<IRoom, keyof IRoomDatabaseEntity> {
  @IDField(() => ID)
  id: string;

  @FilterableField()
  title: string;

  @FilterableField(() => String, { nullable: true })
  description?: string;

  @FilterableField(() => RoomType)
  roomType: RoomType;

  @Field(() => [String])
  resourceIds: string[];

  @FilterableField(() => GraphQLISODateTime)
  createdAt: Date;

  @FilterableField(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => UserDto)
  author: UserDto;

  @Field(() => [UserDto])
  participants: UserDto[];

  @Field(() => [UserDto])
  owners: UserDto[];

  @Field(() => [UserDto])
  moderators: UserDto[];

  @Field(() => [UserDto])
  collaborators: UserDto[];
}

registerEnumType(RoomType, {
  name: 'RoomType',
});
