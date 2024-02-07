import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ResourceDto } from '@backend/dtos/resource';

import { RoomService } from '../services/room.service';
import { UserDto } from '../dto';

@Resolver(() => UserDto)
export class UserReferenceResolver {
  constructor(private readonly roomService: RoomService) {}

  @ResolveField(() => [ResourceDto])
  async resources(@Parent() user: UserDto) {
    return await this.roomService.findAllByAuthorId(user.id);
  }
}
