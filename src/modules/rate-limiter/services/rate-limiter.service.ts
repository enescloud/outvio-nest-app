import { RedisService } from '@core/services/redis/service/redis.service';
import { Injectable } from '@nestjs/common';
import { RateLimiterRedisRegister } from '../types/rate-limiter.types';

@Injectable()
export class RateLimiterService {
  constructor(private redisService: RedisService) {}

  async increment(
    key: string,
    ttl: number,
    weight: number,
  ): Promise<RateLimiterRedisRegister> {
    if (!(await this.redisService.getValue(key))) {
      await this.setRegister(key, ttl, 0, Date.now() + ttl);
    }
    const data = await this.getRegister(key);

    await this.setRegister(key, ttl, data.totalHits + weight, data.expiresAt);

    if (data.expiresAt < Date.now()) {
      return data;
    }

    return this.getRegister(key);
  }

  async getRegister(key: string): Promise<RateLimiterRedisRegister> {
    return this.redisService
      .getValue(key)
      .then((data) => JSON.parse(data as string) as RateLimiterRedisRegister);
  }

  async setRegister(
    key: string,
    ttl: number,
    totalHits: number,
    expiresAt: number,
  ): Promise<'OK'> {
    return this.redisService.setValue(
      key,
      {
        totalHits,
        expiresAt,
      },
      ttl,
    );
  }
}
