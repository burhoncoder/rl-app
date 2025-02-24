import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';

import { AppModule } from '../src/app.module';
import { Roles } from '../src/modules/auth';
import { SideLoadValues } from '../src/modules/locus';

describe('Locus Service (e2e)', () => {
  let app: INestApplication;

  const signIn = async (role: Roles) => {
    const response = await request(app.getHttpServer())
      .post('/auth/sign-in')
      .send({ role })
      .expect(201);

    return response.body.token;
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
  });

  it('should allow an admin to load data', async () => {
    const adminToken = await signIn(Roles.ADMIN);
    const response = await request(app.getHttpServer())
      .get('/locus')
      .set('Authorization', `Bearer ${adminToken}`)
      .query({ page: 1, limit: 10, sort: 'id' })
      .expect(200);
    expect(response.body).toBeDefined();
  });

  it('should throw ForbiddenException if role is NORMAL and sideLoad is true', async () => {
    const normalToken = await signIn(Roles.NORMAL);
    const response = await request(app.getHttpServer())
      .get('/locus')
      .set('Authorization', `Bearer ${normalToken}`)
      .query({ sideLoad: SideLoadValues.LOCUS_MEMBERS })
      .expect(403);
    expect(response.body.message).toBe(
      'User normal do not have permissions to load locusMembers',
    );
  });

  it('should throw ForbiddenException if role is LIMITED and regionId is supplied', async () => {
    const limitedToken = await signIn(Roles.LIMITED);
    const response = await request(app.getHttpServer())
      .get('/locus')
      .set('Authorization', `Bearer ${limitedToken}`)
      .query({ regionId: 12345 })
      .expect(403);
    expect(response.body.message).toBe(
      'User limited can not user regionId filter',
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
