import { LoginUserDto } from '../../../src/app/auth/dto';
import { faker } from '@faker-js/faker';
import { generatePassword } from '../utils';

export const goodLoginData: LoginUserDto = {
  email: faker.internet.email(),
  password: generatePassword({
    minLength: 10,
    minLowercase: 1,
    minUppercase: 1,
  }),
};

export const emptyLoginDataObjects = {
  email: {
    ...goodLoginData,
    email: '',
  },
  password: {
    ...goodLoginData,
    password: '',
  },
};

export const invalidLoginDataObjects = {
  email: {
    ...goodLoginData,
    email: 'invalidemail',
  },
  password: {
    ...goodLoginData,
    password: 'short',
  },
};
