import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { RoomDto } from './room.dto';

@ObjectType('User')
@Directive('@key(fields: "id")')
@Directive('@extends')
export class UserReferenceDTO {
  @Directive('@external')
  @Field(() => ID)
  id!: string;

  @Field(() => [RoomDto])
  rooms!: RoomDto[];
}
