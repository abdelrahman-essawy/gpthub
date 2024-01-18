import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { RoomService } from '../services/room.service';
import { RoomDto } from '../dto/room.dto';
import { CreateRoomDto } from '../dto/create-room.dto';
import { ResourceEntity } from '../../../../../resources/src/app/entities/resource.entity';
import { UserReferenceDTO } from '@backend/dto/resource';

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
