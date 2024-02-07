import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { ResourceDto } from './resource.dto';

@ObjectType()
@Directive('@key(fields: "id")')
export class UserDto {
  @Field(() => ID)
  id!: string;

  @Field(() => [ResourceDto])
  resources!: ResourceDto[];
}
