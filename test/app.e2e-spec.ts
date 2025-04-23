import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { userEntityList } from '../src/testing/user-entity-list.mock';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Olá Mundo!');
  });

  it('Register new user', async () => {
    const resp = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        name: 'gefferson',
        email: 't@gmail.com',
        password:'123456'
      });

    expect(resp.statusCode).toBe(201);
    expect(typeof resp.body.token).toEqual('string');
  });
});
