import { Test, TestingModule } from '@nestjs/testing';
import { RedisService } from './redis.service';
import { AppModule } from '@app/module';
import { setupVersioning } from '@app/setup';
import { INestApplication } from '@nestjs/common';
import { RedisClient } from 'ioredis/built/connectors/SentinelConnector/types';
import Redis from 'ioredis';

describe('RedisService', () => {
  let app: INestApplication;
  let service: RedisService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupVersioning(app);
    await app.init();

    service = app.get<RedisService>(RedisService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should set a value in Redis', async () => {
    const key = 'testKey';
    const value = { data: 'testValue' };
    const ttl = 60;

    const result = await service.setValue(key, value, ttl);

    expect(result).toEqual('OK');
  });

  it('should get a value from Redis', async () => {
    const key = 'testKey';
    const value = { data: 'testValue' };
    const ttl = 60;
    await service.setValue(key, value, ttl);

    const result = await service.getValue(key);

    expect(result).toEqual(JSON.stringify(value));
  });
});
