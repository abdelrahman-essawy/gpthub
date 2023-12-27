import { CreateResourceInput } from './create-resource.input';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateResourceInput extends PartialType(CreateResourceInput) {
  @Field(() => Int)
  id: number;
}
