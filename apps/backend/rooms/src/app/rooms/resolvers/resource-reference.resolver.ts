import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { UserReferenceDTO } from '@backend/dtos/room';
import { ResourceDto } from '@backend/dtos/resource';

import { RoomService } from '../services/room.service';

@Resolver(() => UserReferenceDTO)
export class UserReferenceResolver {
  constructor(private readonly roomService: RoomService) {}

  @ResolveField(() => [ResourceDto])
  async resources(@Parent() user: UserReferenceDTO) {
    return await this.roomService.findAllByAuthorId(user.id);
  }
}
