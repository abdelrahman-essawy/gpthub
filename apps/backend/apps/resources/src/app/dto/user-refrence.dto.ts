import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { ResourceDto } from './resource.dto';

@ObjectType('User')
@Directive('@key(fields: "id")')
@Directive('@extends')
export class UserReferenceDTO {
  @Directive('@external')
  @Field(() => ID)
  id!: string;

  @Field(() => [ResourceDto])
  resources!: ResourceDto[];
}
