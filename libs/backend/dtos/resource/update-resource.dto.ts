import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

import { CreateResourceInput } from './create-resource.input';

@InputType()
export class UpdateResourceDto extends PartialType(CreateResourceInput) {
  @Field(() => Int)
  id: number;
}
