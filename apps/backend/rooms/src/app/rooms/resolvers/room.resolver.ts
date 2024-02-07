import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ForbiddenException, UseGuards } from '@nestjs/common';

import { IUserTokenPayload, UserRole } from '@core';
import { JwtGuard } from '@backend/guards';
import { CurrentUser } from '@backend/decorators';
import { DeleteResponse } from '@backend/dtos/shared';

import { RoomService } from '../services/room.service';
import { RoomEntity } from '../entities/room.entity';
import { CreateRoomInput, RoomDto, UserReferenceDTO } from '../dto';

@UseGuards(JwtGuard)
@Resolver(() => RoomDto)
export class RoomResolver {
  constructor(private roomService: RoomService) {}

  @Query(() => RoomDto)
  async room(@Args('id') id: string) {
    return this.roomService.findOneByOrFail({ id });
  }

  @Query(() => [RoomDto])
  async rooms() {
    return this.roomService.find();
  }

  @Mutation(() => RoomDto)
  async createRoom(
    @CurrentUser() user: IUserTokenPayload,
    @Args('room') roomData: CreateRoomInput,
  ) {
    return this.roomService.createOne({
      ...roomData,
      authorId: user.id,
    });
  }

  @Mutation(() => DeleteResponse)
  async deleteRoom(
    @CurrentUser() user: IUserTokenPayload,
    @Args('id') id: string,
  ) {
    const room = await this.roomService.findOneByOrFail({ id });
    if (room.authorId === user.id || user.role === UserRole.ADMIN) {
      await this.roomService.removeOne(room);
      return new DeleteResponse('Room deleted successfully.');
    }
    throw new ForbiddenException('You are not the author of this room');
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
    console.log(room.moderatorIds);
    return room.moderatorIds.map((id) => ({
      __typename: 'User',
      id,
    }));
  }
}
