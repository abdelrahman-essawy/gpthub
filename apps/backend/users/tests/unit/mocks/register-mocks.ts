import { RegisterUserDto } from '../../../src/app/auth/dto';
import { faker } from '@faker-js/faker';
import { generatePassword } from '../utils';

export const goodUserData: RegisterUserDto = {
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  username: faker.internet.userName(),
  email: faker.internet.email(),
  password: generatePassword({
    minLength: 10,
    minLowercase: 1,
    minUppercase: 1,
  }),
  birthday: faker.date.past({
    years: 30,
  }),
};

export const emptyUserDataObjects = {
  firstName: {
    ...goodUserData,
    firstName: '',
  },
  lastName: {
    ...goodUserData,
    lastName: '',
  },
  username: {
    ...goodUserData,
    username: '',
  },
  email: {
    ...goodUserData,
    email: '',
  },
  password: {
    ...goodUserData,
    password: '',
  },
  birthday: {
    ...goodUserData,
    birthday: '',
  },
};

export const invalidUserDataObjects = {
  email: {
    ...goodUserData,
    email: faker.string.alphanumeric(10),
  },
  password: {
    ...goodUserData,
    password: faker.string.alphanumeric(4),
  },
  birthday: {
    ...goodUserData,
    birthday: faker.string.alphanumeric(10),
  },
};

export const overLimitUserDataObjects = {
  firstName: {
    ...goodUserData,
    firstName: faker.string.alphanumeric(21),
  },
  lastName: {
    ...goodUserData,
    lastName: faker.string.alphanumeric(21),
  },
  username: {
    ...goodUserData,
    username: faker.string.alphanumeric(21),
  },
  email: {
    ...goodUserData,
    email: faker.string.alphanumeric(101),
  },
  password: {
    ...goodUserData,
    password: faker.string.alphanumeric(101),
  },
};
