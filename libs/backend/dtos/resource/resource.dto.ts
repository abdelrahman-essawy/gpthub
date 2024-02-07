import {
  Directive,
  Field,
  GraphQLISODateTime,
  ID,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { FilterableField, IDField } from '@ptc-org/nestjs-query-graphql';

import { IResource, ResourceFormat, ResourceType } from '@core';

import { ResourceUserReferenceDto } from './user-refrence.dto';

@ObjectType('Resource', {
  description: 'Resources uploaded by users',
})
@Directive('@key(fields: "id")')
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

  @Field(() => ResourceUserReferenceDto)
  author: ResourceUserReferenceDto;

  @Field(() => String, {
    nullable: true,
  })
  indexed: string;
  @Field(() => String, {
    nullable: true,
  })
  raw: string;
}

registerEnumType(ResourceType, {
  name: 'ResourceType',
});

registerEnumType(ResourceFormat, {
  name: 'ResourceFormat',
});
