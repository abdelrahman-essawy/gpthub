import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { ResourceDto } from '@backend/dtos/resource';

import { RoomService } from '../services/room.service';
import { UserReferenceDTO } from '../dto';

@Resolver(() => UserReferenceDTO)
export class UserReferenceResolver {
  constructor(private readonly roomService: RoomService) {}

  @ResolveField(() => [ResourceDto])
  async resources(@Parent() user: UserReferenceDTO) {
    return await this.roomService.findAllByAuthorId(user.id);
  }
}
