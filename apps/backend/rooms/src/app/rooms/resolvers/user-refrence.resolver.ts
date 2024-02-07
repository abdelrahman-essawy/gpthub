import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { RoomService } from '../services/room.service';
import { RoomDto, UserReferenceDTO } from '../dto';

@Resolver(() => UserReferenceDTO)
export class UserReferenceResolver {
  constructor(private readonly roomService: RoomService) {}

  @ResolveField(() => [RoomDto])
  async rooms(@Parent() user: UserReferenceDTO) {
    return await this.roomService.find({ where: { authorId: user.id } });
  }

  @ResolveField(() => [RoomDto])
  async moderatedRooms(@Parent() user: UserReferenceDTO) {
    return await this.roomService.find({ where: { moderatorIds: user.id } });
  }

  @ResolveField(() => [RoomDto])
  async participatedRooms(@Parent() user: UserReferenceDTO) {
    return await this.roomService.find({ where: { participantIds: user.id } });
  }

  @ResolveField(() => [RoomDto])
  async collaboratedRooms(@Parent() user: UserReferenceDTO) {
    return await this.roomService.find({ where: { collaboratorIds: user.id } });
  }
}
