import { faker } from '@faker-js/faker';
import { Room } from '../core/types';

export const fake_room_data = (n: number): Room[] => {
  const rooms: Room[] = [];
  for (let i = 0; i < n; i++) {
    const room: Room = {
      name: faker.word.adjective(),
      subTitle: faker.word.adjective(),
      id: `${i + 1}`,
      img: faker.image.url(),
      messages: faker.number.int({ max: 100 }),
    };
    rooms.push(room);
  }
  return rooms;
};
