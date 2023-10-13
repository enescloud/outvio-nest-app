import { Test, TestingModule } from '@nestjs/testing';
import { RateLimiterService } from './rate-limiter.service';
import { AppModule } from '@app/module';
import { setupVersioning } from '@app/setup';
import { INestApplication } from '@nestjs/common';
import { RedisService } from '@core/services/redis/service/redis.service';

describe('RateLimiterService', () => {
  let app: INestApplication;
  let service: RateLimiterService;
  let redisService: RedisService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupVersioning(app);
    await app.init();

    service = app.get<RateLimiterService>(RateLimiterService);
    redisService = app.get<RedisService>(RedisService);
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should increment the rate limiter and return the updated rate limiter', async () => {
    const key = 'testKey';
    const ttl = 60;
    const weight = 1;

    const initialRegister = {
      totalHits: 0,
      expiresAt: Date.now() + ttl,
    };

    const updatedRegister = {
      totalHits: initialRegister.totalHits + weight,
      expiresAt: initialRegister.expiresAt,
    };
    jest.spyOn(redisService, 'getValue').mockResolvedValue(
      JSON.stringify({
        totalHits: updatedRegister.totalHits,
        expiresAt: initialRegister.expiresAt,
      }),
    );
    jest.spyOn(redisService, 'setValue').mockResolvedValue('OK');

    const result = await service.increment(key, ttl, weight);

    expect(result).toEqual(updatedRegister);
  });

  it('should get a rate limiter register', async () => {
    const key = 'testKey';

    const registerData = {
      totalHits: 5,
      expiresAt: Date.now() + 60000,
    };

    jest
      .spyOn(redisService, 'getValue')
      .mockResolvedValue(JSON.stringify(registerData));

    const result = await service.getRegister(key);

    expect(result).toEqual(registerData);
  });

  it('should set a rate limiter register', async () => {
    const key = 'testKey';
    const ttl = 60;
    const totalHits = 10;
    const weight = 1;

    jest.spyOn(redisService, 'setValue').mockResolvedValue('OK');

    const result = await service.setRegister(key, ttl, totalHits, weight);

    expect(result).toEqual('OK');
  });
});
