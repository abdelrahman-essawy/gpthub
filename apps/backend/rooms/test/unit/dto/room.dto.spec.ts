import { validateSync } from 'class-validator';

import { emptyRoomDataObjects, goodRoomData } from '../mock/room.mock';
import { RoomDto } from '../../../src/app/rooms/dto';

describe('Room DTO Validations', () => {
  it('should create a new instance of RoomDto using valid inputs', () => {
    const room = new RoomDto(goodRoomData);
    expect(room).toBeDefined();
    expect(room).toEqual(goodRoomData);
  });

  describe('Empty field validation', () => {
    for (const key in emptyRoomDataObjects) {
      it(`should fail validation with empty ${key}`, () => {
        const room: RoomDto = new RoomDto(emptyRoomDataObjects[key]);
        const errors = validateSync(room);

        // Check if the key is among the fields where empty values are allowed
        if (
          [
            'description',
            'moderators',
            'participants',
            'collaborators',
          ].includes(key)
        )
          expect(errors.length).toEqual(0);
        else expect(errors.length).toBeGreaterThan(0);
      });
    }
  });
});
