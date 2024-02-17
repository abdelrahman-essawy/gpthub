import { faker } from '@faker-js/faker';

export const invalidEmail = faker.string.alphanumeric(10);
export const invalidPassword = faker.string.alphanumeric(4);
export const invalidBirthday = faker.string.alphanumeric(10);

export const invalidRefreshToken = faker.string.alphanumeric(10);
