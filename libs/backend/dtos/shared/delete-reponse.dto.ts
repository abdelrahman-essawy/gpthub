import { Directive, Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Directive('@shareable')
export class DeleteResponse {
  @Field(() => String)
  message: string;
  @Field(() => Boolean)
  success: boolean;

  constructor(message: string) {
    this.message = message;
    this.success = true;
  }
}
