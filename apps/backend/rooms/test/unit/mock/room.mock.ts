import { RoomDto } from '../../../src/app/rooms/dto';
import { faker } from '@faker-js/faker';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { RoomType } from '../../../../../../libs/core';

export const goodRoomData: RoomDto = {
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

export const overLimitRoomObjects = {
  description: {
    ...goodRoomData,
    description: faker.string.alphanumeric({ length: 45 }),
  },
  title: {
    ...goodRoomData,
    title: faker.string.alphanumeric({ length: 25 }),
  },
};

export const underLimitRoomObjects = {
  description: {
    ...goodRoomData,
    description: faker.string.alphanumeric({ length: 2 }),
  },
  title: {
    ...goodRoomData,
    title: faker.string.alphanumeric({ length: 2 }),
  },
};
