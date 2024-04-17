import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AppModule } from '../../../users/src/app/app.module';
import request from 'supertest';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { LoginUserDto, RegisterUserDto } from '../../../users/src/app/auth/dto';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { goodRegisterData } from '../../../users/tests/unit/mocks/register.mocks';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { invalidPassword } from '../../../users/tests/unit/mocks/invalid.mocks';

const GRAPHQL_ENDPOINT = '/graphql';

describe('Starts App', () => {
  let app: INestApplication;
  beforeAll(async () => {
    await setup();
  });

  afterAll(async () => {
    await teardown();
  });

  it('should have the application instance defined', () => {
    expect(app).toBeDefined();
  });

  async function setup() {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  }

  async function teardown() {
    await app.close();
  }

  describe('Register End-to-End Tests', () => {
    it('should successfully register a new user', async () => {
      const registrationResponse = await registerUser(goodRegisterData);

      expect(registrationResponse.body.data.register.accessToken).toBeTruthy();
      expect(registrationResponse.body.data.register.refreshToken).toBeTruthy();
      expect(registrationResponse.body.data.register.user.id).toBeTruthy();
    });

    it('should fail to register a user with an existing email', async () => {
      const registrationResponse = await registerUser(goodRegisterData);

      expect(registrationResponse.body.errors).toBeTruthy();
      expect(registrationResponse.body.errors[0].message).toEqual(
        'duplicate key value violates unique constraint "UQ_fe0bb3f6520ee0469504521e710"',
      );
    });

    async function registerUser(userData: RegisterUserDto) {
      const query = `
      mutation {
        register(userInfo: {
          email: "${userData.email}"
          firstName: "${userData.firstName}"
          password: "${userData.password}"
          lastName: "${userData.lastName}"
          username: "${userData.username}"
        }) {
          accessToken
          refreshToken
          user {
            id
          }
        }
      }
    `;

      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({ query });
    }
  });

  describe('Login End-to-End Tests', () => {
    const expectedLoginResponse = {
      accessToken: expect.any(String),
      refreshToken: expect.any(String),
      user: {
        id: expect.any(String),
      },
    };
    it('should login a user with email', async () => {
      const loginResponse = await loginUser({
        email: goodRegisterData.email,
        password: goodRegisterData.password,
      });
      console.log(loginResponse.text);

      expect(loginResponse.body.data.login).toEqual(expectedLoginResponse);
    });

    it('should login a user with username', async () => {
      const loginResponse = await loginUser({
        username: goodRegisterData.username,
        password: goodRegisterData.password,
      });
      console.log(loginResponse.text);

      expect(loginResponse.body.data.login).toEqual(expectedLoginResponse);
    });

    it('should fail to login a user with an invalid password', async () => {
      const loginResponse = await loginUser({
        ...goodRegisterData,
        password: invalidPassword,
      });

      expect(loginResponse.body.errors).toBeTruthy();
    });

    async function loginUser(userData: LoginUserDto) {
      const queryWithUsername = `
      mutation {
        login(credentials: {
          username: "${userData.username}"
          password: "${userData.password}"
        }) {
          accessToken
          refreshToken
          user {
            id
          }
        }
      }
    `;

      const queryWithEmail = `
      mutation {
        login(credentials: {
          email: "${userData.email}"
          password: "${userData.password}"
        }) {
          accessToken
          refreshToken
          user {
            id
          }
        }
      }
    `;
      return request(app.getHttpServer())
        .post(GRAPHQL_ENDPOINT)
        .send({
          query: userData.username ? queryWithUsername : queryWithEmail,
        });
    }
  });
});
