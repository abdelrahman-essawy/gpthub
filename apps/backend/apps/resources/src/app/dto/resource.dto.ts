import {
  Directive,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { IResource, ResourceFormat, ResourceType } from '@core';
import { FilterableField, Reference } from '@ptc-org/nestjs-query-graphql';
import { UserReferenceDTO } from './user-refrence.dto';

@ObjectType('Resource')
@Directive('@key(fields: "id")')
@Reference('author', () => UserReferenceDTO, { id: 'authorId' })
export class ResourceDto implements IResource {
  @FilterableField(() => ID)
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

  @FilterableField(() => ID)
  authorId: string;
}

registerEnumType(ResourceType, {
  name: 'ResourceType',
});

registerEnumType(ResourceFormat, {
  name: 'ResourceFormat',
});
