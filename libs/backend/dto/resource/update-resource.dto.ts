import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

import { CreateResourceDto } from './create-resource.dto';

@InputType()
export class UpdateResourceDto extends PartialType(CreateResourceDto) {
  @Field(() => Int)
  id: number;
}
