import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IRoom, IRoomDatabaseEntity, RoomType } from '@core';
import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { UserReferenceDTO } from './user-reference.dto';

@ObjectType('Room')
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

  @Field(() => UserReferenceDTO)
  author: UserReferenceDTO;

  @Field(() => [UserReferenceDTO])
  participants: UserReferenceDTO[];

  @Field(() => [UserReferenceDTO])
  owners: UserReferenceDTO[];

  @Field(() => [UserReferenceDTO])
  moderators: UserReferenceDTO[];

  @Field(() => [UserReferenceDTO])
  collaborators: UserReferenceDTO[];
}

registerEnumType(RoomType, {
  name: 'RoomType',
});
