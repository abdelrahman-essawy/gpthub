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
import { RoomEntity } from '../entities/room.entity';

@Resolver(() => RoomDto)
export class RoomResolver {
  constructor(private roomService: RoomService) {}

  @Query(() => RoomDto)
  async room(@Args('id') id: string) {
    return this.roomService.findOne(id);
  }

  @Query(() => [RoomDto])
  async rooms() {
    return this.roomService.findAll();
  }

  @Mutation(() => RoomDto)
  async createRoom(@Args('room') roomData: CreateRoomDto) {
    const room = {
      ...roomData,
      authorId: '6416378b-6305-4791-affa-1f016f2bfc9e',
      ownerIds: ['6416378b-6305-4791-affa-1f016f2bfc9e'],
    };
    return this.roomService.createOne(room);
  }

  // @Mutation(() => RoomDto)
  // async updateResource(@Args('resource') resource: RoomDto) {
  //   return this.roomService.updateOne(resource);
  // }

  @Mutation(() => RoomDto)
  async deleteRoom(@Args('id') id: string) {
    return this.roomService.deleteOne(id);
  }

  @ResolveField(() => UserReferenceDTO)
  async author(@Parent() room: RoomEntity) {
    return { __typename: 'User', id: room.authorId };
  }

  @ResolveField(() => [UserReferenceDTO])
  async participants(@Parent() room: RoomDto) {
    return room.participants.map((id) => ({
      __typename: 'User',
      id,
    }));
  }

  @ResolveField(() => [UserReferenceDTO])
  async owners(@Parent() room: RoomEntity) {
    return room.ownerIds.map((id) => ({
      __typename: 'User',
      id,
    }));
  }

  @ResolveField(() => [UserReferenceDTO])
  async collaborators(@Parent() room: RoomEntity) {
    return room.collaboratorIds.map((id) => ({
      __typename: 'User',
      id,
    }));
  }

  @ResolveField(() => [UserReferenceDTO])
  async moderators(@Parent() room: RoomEntity) {
    return room.moderatorIds.map((id) => ({
      __typename: 'User',
      id,
    }));
  }
}
