import { Parent, ResolveField, Resolver } from '@nestjs/graphql';

import { RoomService } from '../services/room.service';
import { UserReferenceDTO } from '@backend/dto/room';
import { ResourceDto } from '@backend/dto/resource';

@Resolver(() => UserReferenceDTO)
export class UserReferenceResolver {
  constructor(private readonly roomService: RoomService) {}

  @ResolveField(() => [ResourceDto])
  async resources(@Parent() user: ) {
    return await this.roomService.findAllByAuthorId(user.id);
  }
}
