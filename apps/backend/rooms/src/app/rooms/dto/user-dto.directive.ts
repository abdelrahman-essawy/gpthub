import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { RoomDto } from './room.dto';

@ObjectType()
@Directive('@key(fields: "id")')
export class UserDto {
  @Field(() => ID)
  id!: string;

  @Field(() => [RoomDto])
  rooms!: RoomDto[];
}
