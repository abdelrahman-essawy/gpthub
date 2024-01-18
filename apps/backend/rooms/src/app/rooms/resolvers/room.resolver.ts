import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { CreateRoomDto, RoomDto, UserReferenceDTO } from '@backend/dto/room';

import { RoomService } from '../services/room.service';
import { ResourceEntity } from '../../../../../resources/src/app/entities/resource.entity';

@Resolver(() => RoomDto)
export class RoomResolver {
  constructor(private resourceService: RoomService) {}

  @Query(() => RoomDto)
  async room(@Args('id') id: string) {
    return this.resourceService.findOne(id);
  }

  @Query(() => [RoomDto])
  async rooms() {
    return this.resourceService.findAll();
  }

  @Mutation(() => RoomDto)
  async createRoom(@Args('room') room: CreateRoomDto) {
    return this.resourceService.createOne(room);
  }

  // @Mutation(() => RoomDto)
  // async updateResource(@Args('resource') resource: RoomDto) {
  //   return this.resourceService.updateOne(resource);
  // }

  @Mutation(() => RoomDto)
  async deleteRoom(@Args('id') id: string) {
    return this.resourceService.deleteOne(id);
  }

  @ResolveField(() => UserReferenceDTO)
  async author(@Parent() resource: ResourceEntity) {
    return { __typename: 'User', id: resource.authorId };
  }

  @ResolveField(() => [UserReferenceDTO])
  async participants(@Parent() room: RoomDto) {
    return room.participants.map((id) => ({
      __typename: 'User',
      id,
    }));
  }
}
