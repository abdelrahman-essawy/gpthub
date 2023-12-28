import { CreateResourceDto } from './create-resource.dto';
import { Field, InputType, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateResourceDto extends PartialType(CreateResourceDto) {
  @Field(() => Int)
  id: number;
}
