import { faker } from '@faker-js/faker';

import { RoomType } from '@core';

import { CreateRoomInput } from '../../../src/app/rooms/dto';

export const goodCreateRoomData: CreateRoomInput = {
  resourceIds: [faker.string.uuid()],
  description: faker.string.alphanumeric({ length: { min: 3, max: 40 } }),
  title: faker.string.alphanumeric({ length: { min: 3, max: 20 } }),
  roomType: RoomType.PUBLIC,
};

export const emptyCreateDataObjects = {
  resourceIds: {
    ...goodCreateRoomData,
    resourceIds: null,
  },
  description: {
    ...goodCreateRoomData,
    description: null,
  },
  roomType: {
    ...goodCreateRoomData,
    roomType: null,
  },
};

export const overLimitObjects = {
  description: {
    ...goodCreateRoomData,
    description: faker.string.alphanumeric(45),
  },
  title: {
    ...goodCreateRoomData,
    title: faker.string.alphanumeric(25),
  },
};
export const underLimitObjects = {
  description: {
    ...goodCreateRoomData,
    description: faker.string.alphanumeric(2),
  },
  title: {
    ...goodCreateRoomData,
    title: faker.string.alphanumeric(2),
  },
};
