import { goodLoginData } from './login.mocks';
import { goodRegisterData } from './register.mocks';

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
export const emptyUserDataObjects = {
  firstName: {
    ...goodRegisterData,
    firstName: '',
  },
  lastName: {
    ...goodRegisterData,
    lastName: '',
  },
  username: {
    ...goodRegisterData,
    username: '',
  },
  email: {
    ...goodRegisterData,
    email: '',
  },
  password: {
    ...goodRegisterData,
    password: '',
  },
  birthday: {
    ...goodRegisterData,
    birthday: '',
  },
};
