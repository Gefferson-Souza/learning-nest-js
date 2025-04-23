import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { AppModule } from './../src/app.module';
import { userEntityList } from '../src/testing/user-entity-list.mock';
import { userE2eMock } from '../src/testing/user-e2e.mock';
import dataSource from '../typeorm/data-source';
import { Role } from '../src/enums/role.enum';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;
  let token: string;
  let userInfoMock: any = {};

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
  });

  it('Get all users', async () => {
    const res = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(403);
  });

  it('Get userInformation', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/verify')
      .set('Authorization', `Bearer ${token}`)
      .send(userE2eMock);

    expect(res.statusCode).toBe(201);
    expect(typeof res.body).toEqual('object');
    userInfoMock = res.body;
  });

  it('Update user manually', async () => {
    const ds = await dataSource.initialize();
    const queryRunner = ds.createQueryRunner();

    try {
      await queryRunner.query(`
        UPDATE users SET role = ${Role.Admin} WHERE id = ${userInfoMock.user}
      `);

    const updatedUser = await queryRunner.query(`
        SELECT * FROM users WHERE id = ${userInfoMock.user}
      `);

    expect(updatedUser[0].role).toEqual(Role.Admin);
    } finally {
      await queryRunner.release();
      await ds.destroy();
    }

  });

  it('Login with admin user', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send(userE2eMock);

    expect(res.statusCode).toBe(201);
    expect(typeof res.body.token).toEqual('string');
    token = res.body.token;
  });

  it('Get all users with admin role', async () => {
    const res = await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
  });
});
