import {
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IResource, ResourceFormat, ResourceType } from '@core';
import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';
import { UserReferenceDTO } from './user-refrence.dto';

@ObjectType('Resource')
export class ResourceDto implements IResource {
  @IDField(() => ID)
  id: string;

  @FilterableField()
  title: string;

  @FilterableField()
  description?: string;

  @FilterableField(() => ResourceType) // Add explicit type here
  type: ResourceType;

  @FilterableField(() => ResourceFormat) // Add explicit type here
  format: ResourceFormat;

  @FilterableField(() => GraphQLISODateTime)
  createdAt: Date;

  @FilterableField(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => UserReferenceDTO)
  author: UserReferenceDTO;
}

registerEnumType(ResourceType, {
  name: 'ResourceType',
});

registerEnumType(ResourceFormat, {
  name: 'ResourceFormat',
});
