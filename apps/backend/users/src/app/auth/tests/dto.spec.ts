import { validateSync } from 'class-validator';
import { RegisterUserDto } from '../dto';
import {
  emptyUserDataObjects,
  goodUserData,
  invalidUserDataObjects,
  overLimitUserDataObjects,
} from './user-mocks.spec';

describe('Register DTO Validations', () => {
  it('should create a new instance of RegisterUserDto with valid input', () => {
    const registerUserInput: RegisterUserDto = new RegisterUserDto(
      goodUserData,
    );
    expect(registerUserInput).toBeDefined();
  });

  it('should populate all fields correctly with valid input', () => {
    const registerUserInput: RegisterUserDto = new RegisterUserDto(
      goodUserData,
    );
    expect(registerUserInput).toEqual(goodUserData);
  });

  describe('Register Good User', () => {
    it('should pass all validation checks with valid input', () => {
      const registerUserInput: RegisterUserDto = new RegisterUserDto(
        goodUserData,
      );
      const errors = validateSync(registerUserInput);
      expect(errors.length).toEqual(0);
    });
  });

  describe('Empty', () => {
    for (const emptyUserDataObjectsKey in emptyUserDataObjects) {
      it(`should fail validation with empty ${emptyUserDataObjectsKey}`, () => {
        const registerUserInput: RegisterUserDto = new RegisterUserDto(
          emptyUserDataObjects[emptyUserDataObjectsKey],
        );
        const errors = validateSync(registerUserInput);
        expect(errors.length).toBeGreaterThan(0);
      });
    }
  });

  describe('Invalid', () => {
    for (const invalidUserDataObjectsKey in invalidUserDataObjects) {
      it(`should fail validation with invalid ${invalidUserDataObjectsKey}`, () => {
        const registerUserInput: RegisterUserDto = new RegisterUserDto(
          invalidUserDataObjects[invalidUserDataObjectsKey],
        );
        const errors = validateSync(registerUserInput);
        expect(errors.length).toBeGreaterThan(0);
      });
    }
  });

  describe('Over Limit', () => {
    for (const overLimitUserDataObjectsKey in overLimitUserDataObjects) {
      it(`should fail validation with over limit ${overLimitUserDataObjectsKey}`, () => {
        const registerUserInput: RegisterUserDto = new RegisterUserDto(
          overLimitUserDataObjects[overLimitUserDataObjectsKey],
        );
        const errors = validateSync(registerUserInput);
        expect(errors.length).toBeGreaterThan(0);
      });
    }
  });
});
