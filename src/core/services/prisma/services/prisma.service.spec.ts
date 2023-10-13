import { Test, TestingModule } from '@nestjs/testing';

import { AppConfigModule } from '@core/config';

import { PrismaService } from './prisma.service';
import { AppModule } from '@app/module';
import { setupVersioning } from '@app/setup';
import { INestApplication } from '@nestjs/common';

describe('PrismaService', () => {
  let service: PrismaService;
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupVersioning(app);
    await app.init();

    service = app.get<PrismaService>(PrismaService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should connect to the database', async () => {
    const connectionResult = await service.$connect();
    expect(connectionResult).toBeUndefined();
  });

  it('should enable shutdown hooks', () => {
    service.enableShutdownHooks(app);
  });
});
