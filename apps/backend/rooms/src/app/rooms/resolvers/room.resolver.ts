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
import { CreateRoomInput, RoomDto, UserDto } from '../dto';
import { RoomEntity } from '../entities/room.entity';

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

  @ResolveField(() => UserDto)
  async author(@Parent() room: RoomEntity) {
    return {
      __typename: UserDto.name,
      id: room.authorId,
    };
  }

  @ResolveField(() => [UserDto])
  async participants(@Parent() room: RoomEntity) {
    return room.participantIds.map((id) => ({
      __typename: UserDto.name,
      id,
    }));
  }

  @ResolveField(() => [UserDto])
  async owners(@Parent() room: RoomEntity) {
    return room.ownerIds.map((id) => ({
      __typename: UserDto.name,
      id,
    }));
  }

  @ResolveField(() => [UserDto])
  async collaborators(@Parent() room: RoomEntity) {
    return room.collaboratorIds.map((id) => ({
      __typename: UserDto.name,
      id,
    }));
  }

  @ResolveField(() => [UserDto])
  async moderators(@Parent() room: RoomEntity) {
    return room.moderatorIds.map((id) => ({
      __typename: UserDto.name,
      id,
    }));
  }
}
