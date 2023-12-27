import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Resource } from './resource.entity';

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  id: string;

  @Field(() => [Resource], { nullable: true })
  resources?: Resource[];
}
