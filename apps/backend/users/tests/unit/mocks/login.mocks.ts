import { LoginUserDto } from '../../../src/app/auth/dto';
import { generatePassword } from '../utils';
import { POLICY } from '@core';
import { userInDatabase } from './login-responce.mocks';

export const goodLoginData: LoginUserDto = {
  email: userInDatabase.email,
  password: generatePassword({
    minLength: POLICY.AUTH.PASSWORD.MIN_LENGTH,
    minLowercase: POLICY.AUTH.PASSWORD.MIN_LOWERCASE,
    minUppercase: POLICY.AUTH.PASSWORD.MIN_UPPERCASE,
  }),
};
