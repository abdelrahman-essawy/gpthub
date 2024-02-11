import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AppModule } from '../../../users/src/app/app.module';
import request from 'supertest';

const gql = '/graphql';
describe('Auth E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  }, 10000);

  afterAll(async () => {
    await app.close;
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should register a new user', () => {
    const query = `
      mutation{
    register(userInfo:{
      email: "asda@asdas.asdA"
      firstName: "asda"
      password: "asdASda2"
      lastName: "asdsa"
      username:"asdasA"
    }){
      accessToken
      refreshToken
      user{
        id
      }
    }
  }`;

    return request(app.getHttpServer())
      .post(gql)
      .send({ query })
      .expect(200)
      .expect((res) => {
        const data = JSON.parse(res.text).data.register;
        expect(data).toEqual({
          accessToken: expect.any(String),
          refreshToken: expect.any(String),
          user: {
            id: expect.any(String),
          },
        });
      });
  });
});
