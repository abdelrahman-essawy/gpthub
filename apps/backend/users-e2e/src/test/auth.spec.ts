import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AppModule } from '../../../users/src/app/app.module';
import request from 'supertest';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { RegisterUserDto } from '../../../users/src/app/auth/dto';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { goodUserData } from '../../../users/tests/unit/mocks/register-mocks';

const GRAPHQL_ENDPOINT = '/graphql';

describe('Authentication End-to-End Tests', () => {
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

  it('should successfully register a new user', async () => {
    const registrationResponse = await registerUser(goodUserData);

    expect(registrationResponse.status).toBe(200);
    expect(registrationResponse.body.data.register.accessToken).toBeTruthy();
    expect(registrationResponse.body.data.register.refreshToken).toBeTruthy();
    expect(registrationResponse.body.data.register.user.id).toBeTruthy();
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

    return request(app.getHttpServer()).post(GRAPHQL_ENDPOINT).send({ query });
  }
});
