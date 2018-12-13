import { DatabaseModule } from './utils/database/database.module';
import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '../src/config/config.module';
import { AuthModule } from '../src/auth/auth.module';
import { UsersModule } from '../src/users/users.module';
import { CoreModule } from '../src/common/core/core.module';
import { QueryBuilder } from 'typeorm';
import { createConnection } from 'typeorm';
import { TestUtils } from './utils/test.utils';

describe('AppController (e2e)', async () => {
  let app: INestApplication;
  console.log(__dirname);
  let connection;
  let testUtils: TestUtils;

  // beforeEach(() => reloadTestingDatabases(connection));
  // afterAll(() => closeTestingConnections(connection));


  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [
        ConfigModule,
        AuthModule,
        DatabaseModule,
        UsersModule,
        CoreModule,
      ],
      providers: [
        TestUtils,
      ],
    })
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    testUtils = app.get<TestUtils>(TestUtils);
    await testUtils.reloadFixtures();
  });

  afterEach(async done => {
    await testUtils.closeDbConnection();
    done();
  });
  beforeAll(async () => {
    // connection = await createTestingConnections({
    //   entities: ['./../src/data/entities/*.entity.ts'],
    //   enabledDrivers: ['mysql'],
    //   dropSchema: true,
    //   migrations: [],

    // });

    // const moduleFixture = await Test.createTestingModule({
    //   imports: [
    //     ConfigModule,
    //     AuthModule,
    //     TypeOrmModule.forRoot({
    //       type: 'mysql',
    //       host: 'localhost',
    //       port: 3306,
    //       username: 'root',
    //       password: 'root',
    //       database: 'testdb',
    //       entities: ['./src/data/entities/*.entity.ts'],
    //     }),
    //     UsersModule,
    //     CoreModule,
    //   ],
    // })
    //   .compile();

    // app = moduleFixture.createNestApplication();
    // await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/users')
      .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1hcnRpbkB0ZWxlcmlrYWNhZGVteS5jb20iLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE1NDQzOTYxMzcsImV4cCI6MTU0NTAwMDkzN30.fqmWkUcrADb2c5XeyO6FIerau10VWvqSdkSeHWnuqq0', { type: 'bearer' })
      .expect(200)
      .expect('[{"id":1,"email":"martin@telerikacademy.com","password":"123","avatarUrl":"public\\\\images\\\\default.png","isAdmin":true}]');
  });
});
