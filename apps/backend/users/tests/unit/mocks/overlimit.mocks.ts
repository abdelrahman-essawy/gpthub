import { faker } from '@faker-js/faker';
import { POLICY } from '@core';

export const overLimitPassword = faker.string.alphanumeric(
  POLICY.AUTH.PASSWORD.MAX_LENGTH + 1,
);
export const overLimitUsername = faker.string.alphanumeric(
  POLICY.AUTH.USERNAME.MAX_LENGTH + 1,
);
