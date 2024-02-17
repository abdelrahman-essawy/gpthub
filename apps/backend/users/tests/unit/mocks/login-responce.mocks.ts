import { faker } from '@faker-js/faker';
import { IUser, POLICY, UserRole } from '@core';
import { generatePassword } from '../utils';

export const userInDatabase: IUser = {
  id: faker.string.uuid(),
  email: faker.internet.email(),
  username: faker.internet.userName(),
  password: generatePassword({
    minLength: POLICY.AUTH.PASSWORD.MIN_LENGTH,
    minLowercase: POLICY.AUTH.PASSWORD.MIN_LOWERCASE,
    minUppercase: POLICY.AUTH.PASSWORD.MIN_UPPERCASE,
  }),
  verified: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  firstName: faker.person.firstName(),
  role: UserRole.USER,
  hashedRefreshToken: faker.internet.password(),
  birthday: faker.date.past(),
  lastName: faker.person.lastName(),
};

export const refreshToken = faker.string.alphanumeric(20);
export const accessToken = faker.string.alphanumeric(20);
