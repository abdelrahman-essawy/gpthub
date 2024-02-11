import { CreateRoomInput } from '../../../src/app/rooms/dto';
import {
  emptyCreateDataObjects,
  goodCreateRoomData,
  overLimitObjects,
  underLimitObjects,
} from '../mock/create-room-mock';
import { validateSync } from 'class-validator';
import { describe } from 'node:test';

describe('Create Room DTO Validations', () => {
  it('should create room new instance of CreateRoomInput using valid Inputs', () => {
    const room: CreateRoomInput = new CreateRoomInput(goodCreateRoomData);
    expect(room).toBeDefined();
  });
  describe('Empty', () => {
    for (const key in emptyCreateDataObjects) {
      it(`should fail validation with empty ${key}`, () => {
        const room: CreateRoomInput = new CreateRoomInput(
          emptyCreateDataObjects[key],
        );
        const errors = validateSync(room);
        if (key === 'description' || key === 'roomType')
          expect(errors.length).toEqual(0);
        else expect(errors.length).toBeGreaterThan(0);
      });
    }
  });
  describe('Over limit', () => {
    for (const key in overLimitObjects) {
      it(`should fail validation with over limit ${key}`, () => {
        const room: CreateRoomInput = new CreateRoomInput(
          overLimitObjects[key],
        );
        const errors = validateSync(room);
        expect(errors.length).toBeGreaterThan(0);
      });
    }
  });
  describe('Under limit', () => {
    for (const key in underLimitObjects) {
      it(`should fail validation with under limit ${key}`, () => {
        const room: CreateRoomInput = new CreateRoomInput(
          underLimitObjects[key],
        );
        const errors = validateSync(room);
        expect(errors.length).toBeGreaterThan(0);
      });
    }
  });
});
