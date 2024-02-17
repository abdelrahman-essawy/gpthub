import { RegisterUserDto } from '../../../src/app/auth/dto';
import { faker } from '@faker-js/faker';
import { generatePassword } from '../utils';
import { POLICY } from '@core';

export const goodRegisterData: RegisterUserDto = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: generatePassword({
    minLength: POLICY.AUTH.PASSWORD.MIN_LENGTH,
    minLowercase: POLICY.AUTH.PASSWORD.MIN_LOWERCASE,
    minUppercase: POLICY.AUTH.PASSWORD.MIN_UPPERCASE,
  }),
  birthday: faker.date.past({
    years: 30,
  }),
};
