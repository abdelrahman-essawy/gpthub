import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AuthModule } from '../../src/app/auth/auth.module';
import request from 'supertest';

const gql = '/graphql';
describe('Auth E2E', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();
    app = module.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
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
        expect(res.body.data.getCats).toEqual(query);
      });
  });
});
