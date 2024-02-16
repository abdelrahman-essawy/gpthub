import { faker } from '@faker-js/faker';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { IRoom, RoomType } from '../../../../../../libs/core';
import { RoomDto, UserDto } from '../../../src/app/rooms/dto';

export const roomInDatabase: IRoom = {
  title: faker.string.alphanumeric({ length: { min: 3, max: 20 } }),
  roomType: RoomType.PUBLIC,
  authorId: faker.string.uuid(),
  resourceIds: [faker.string.uuid(), faker.string.uuid()],
  participantIds: [faker.string.uuid(), faker.string.uuid()],
  ownerIds: [faker.string.uuid(), faker.string.uuid()],
  moderatorIds: [faker.string.uuid(), faker.string.uuid()],
  collaboratorIds: [faker.string.uuid(), faker.string.uuid()],
  id: faker.string.uuid(),
  createdAt: new Date(),
  updatedAt: new Date(),
};
export const roomDto: RoomDto = {
  id: faker.string.uuid(),
  title: faker.string.alphanumeric({ length: { min: 3, max: 20 } }),
  description: faker.string.alphanumeric({ length: { min: 3, max: 40 } }),
  roomType: RoomType.PUBLIC,
  resourceIds: [faker.string.uuid()],
  createdAt: new Date(),
  updatedAt: new Date(),
  author: { id: faker.string.uuid(), rooms: [] },
  participants: [{ id: faker.string.uuid(), rooms: [] }],
  owners: [{ id: faker.string.uuid(), rooms: [] }],
  moderators: [{ id: faker.string.uuid(), rooms: [] }],
  collaborators: [{ id: faker.string.uuid(), rooms: [] }],
};

export const user : UserDto = new UserDto({
  id:faker.string.uuid(),
  rooms:[roomDto]
})

export const goodRoomData = new RoomDto({
  id: roomInDatabase.id,
  title: roomInDatabase.title,
  description: roomInDatabase.description,
  roomType: roomInDatabase.roomType,
  resourceIds: roomInDatabase.resourceIds,
  createdAt: roomInDatabase.createdAt,
  updatedAt: roomInDatabase.updatedAt,
  author: user,
  participants:[user],
  owners: [user],
  moderators: [user],
  collaborators: [user]
});



export const emptyRoomDataObjects = {
  id: {
    ...goodRoomData,
    id: null,
  },
  title: {
    ...goodRoomData,
    title: null,
  },
  description: {
    ...goodRoomData,
    description: null,
  },
  roomType: {
    ...goodRoomData,
    roomType: null,
  },
  resourceIds: {
    ...goodRoomData,
    resourceIds: null,
  },
  createdAt: {
    ...goodRoomData,
    createdAt: null,
  },
  updatedAt: {
    ...goodRoomData,
    updatedAt: null,
  },
  author: {
    ...goodRoomData,
    author: null,
  },
  participants: {
    ...goodRoomData,
    participants: null,
  },
  owners: {
    ...goodRoomData,
    owners: null,
  },
  moderators: {
    ...goodRoomData,
    moderators: null,
  },
  collaborators: {
    ...goodRoomData,
    collaborators: null,
  },
};
