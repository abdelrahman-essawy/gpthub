import { validateSync } from 'class-validator';
import { LoginUserDto } from '../../dto';
import { emptyLoginDataObjects, goodLoginData, invalidLoginDataObjects } from '../mocks/login-mocks';

describe('Login DTO Validations', () => {
  it('should create a new instance of LoginUserDto with valid input', () => {
    const loginUserInput: LoginUserDto = new LoginUserDto(goodLoginData);
    expect(loginUserInput).toBeDefined();
  });

  it('should populate all fields correctly with valid input', () => {
    const loginUserInput: LoginUserDto = new LoginUserDto(goodLoginData);
    expect(loginUserInput).toEqual(goodLoginData);
  });

  describe('Good Login User', () => {
    it('should pass all validation checks with valid input', () => {
      const loginUserInput: LoginUserDto = new LoginUserDto(goodLoginData);
      const errors = validateSync(loginUserInput);
      expect(errors.length).toEqual(0);
    });
  });

  describe('Empty', () => {
    for (const key in emptyLoginDataObjects) {
      it(`should fail validation with empty ${key}`, () => {
        const loginUserInput: LoginUserDto = new LoginUserDto(
          emptyLoginDataObjects[key],
        );
        const errors = validateSync(loginUserInput);
        expect(errors.length).toBeGreaterThan(0);
      });
    }
  });

  describe('Invalid', () => {
    for (const key in invalidLoginDataObjects) {
      it(`should fail validation with invalid ${key}`, () => {
        const loginUserInput: LoginUserDto = new LoginUserDto(
          invalidLoginDataObjects[key],
        );
        const errors = validateSync(loginUserInput);
        expect(errors.length).toBeGreaterThan(0);
      });
    }
  });
});
