import { faker } from '@faker-js/faker';
import { POLICY } from '@core';
import { goodRegisterData } from './register.mocks';

export const overLimitPassword = faker.string.alphanumeric(
  POLICY.AUTH.PASSWORD.MAX_LENGTH + 1,
);
export const overLimitUsername = faker.string.alphanumeric(
  POLICY.AUTH.USERNAME.MAX_LENGTH + 1,
);
export const overLimitFirstName = faker.string.alphanumeric(
  POLICY.AUTH.FIRST_NAME.MAX_LENGTH + 1,
);
export const overLimitLastName = faker.string.alphanumeric(
  POLICY.AUTH.LAST_NAME.MAX_LENGTH + 1,
);
export const overLimitUserDataObjects = {
  firstName: {
    ...goodRegisterData,
    firstName: overLimitFirstName,
  },
  lastName: {
    ...goodRegisterData,
    lastName: overLimitLastName,
  },
  username: {
    ...goodRegisterData,
    username: overLimitUsername,
  },
  email: {
    ...goodRegisterData,
    email: overLimitUsername,
  },
  password: {
    ...goodRegisterData,
    password: overLimitPassword,
  },
};
