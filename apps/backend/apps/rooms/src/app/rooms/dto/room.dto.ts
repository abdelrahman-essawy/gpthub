import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IRoom, IRoomDatabaseEntity, ResourceFormat, RoomType } from '@core';
import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { UserReferenceDTO } from '../../../../../../../../libs/backend/dtos/src/resource/user-refrence.dto';

@ObjectType('Room')
export class RoomDto implements Omit<IRoom, keyof IRoomDatabaseEntity> {
  @IDField(() => ID)
  id: string;

  @FilterableField()
  title: string;

  @FilterableField()
  description?: string;

  @FilterableField(() => RoomType) // Add explicit type here
  roomType: RoomType;

  @FilterableField(() => ResourceFormat) // Add explicit type here
  format: ResourceFormat;

  @FilterableField(() => GraphQLISODateTime)
  createdAt: Date;

  @FilterableField(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => UserReferenceDTO)
  author: UserReferenceDTO;

  @FilterableField(() => [UserReferenceDTO])
  participants: UserReferenceDTO[];

  @FilterableField(() => [UserReferenceDTO])
  owners: UserReferenceDTO[];

  @FilterableField(() => [UserReferenceDTO])
  moderators: UserReferenceDTO[];

  @FilterableField(() => [UserReferenceDTO])
  collaborators: UserReferenceDTO[];
}

registerEnumType(RoomType, {
  name: 'RoomType',
});
