import { faker } from '@faker-js/faker';
import { goodRegisterData } from './register.mocks';
import { goodLoginData } from './login.mocks';

export const invalidEmail = faker.string.alphanumeric(10);
export const invalidPassword = faker.string.alphanumeric(4);
export const invalidBirthday = faker.string.alphanumeric(10);
export const invalidRefreshToken = faker.string.alphanumeric(10);
export const invalidUserDataObjects = {
  email: {
    ...goodRegisterData,
    email: invalidEmail,
  },
  password: {
    ...goodRegisterData,
    password: invalidPassword,
  },
  birthday: {
    ...goodRegisterData,
    birthday: invalidBirthday,
  },
};
export const invalidLoginDataObjects = {
  email: {
    ...goodLoginData,
    email: invalidEmail,
  },
  password: {
    ...goodLoginData,
    password: invalidPassword,
  },
};
