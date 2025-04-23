import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { userEntityList } from '../src/testing/user-entity-list.mock';
import { userE2eMock } from '../src/testing/user-e2e.mock';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let token: string;

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
      .send(userE2eMock);

    expect(resp.statusCode).toBe(201);
    expect(typeof resp.body.token).toEqual('string');
  });

  it('Login', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(userE2eMock);

      expect(res.statusCode).toBe(201);
      expect(typeof res.body.token).toEqual('string');
      token = res.body.token;
  })

  it('Get all users', async () => {
    const res = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

      console.log(token);
    expect(res.statusCode).toBe(200);
    expect(typeof res.body).toEqual('object');
  });

  it('Get userInformation', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/verify')
      .set('Authorization', `Bearer ${token}`)
      .send(userE2eMock);

    expect(res.statusCode).toBe(201);
    expect(typeof res.body).toEqual('object');
  })
});
