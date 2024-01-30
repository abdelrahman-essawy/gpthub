import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { RoomService } from '../services/room.service';
import { RoomDto, UserReferenceDTO } from '@backend/dtos/room';

@Resolver(() => UserReferenceDTO)
export class UserReferenceResolver {
  constructor(private readonly roomService: RoomService) {}

  @ResolveField(() => [RoomDto])
  async rooms(@Parent() user: UserReferenceDTO) {
    return await this.roomService.findAllByAuthorId(user.id);
  }
}
