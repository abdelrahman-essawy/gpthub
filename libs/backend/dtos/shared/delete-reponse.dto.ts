import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeleteResponse {
  @Field(() => String)
  message: string;
  @Field(() => Boolean)
  success: boolean;

  constructor(message: string, success: boolean) {
    this.message = message;
    this.success = success;
  }
}
