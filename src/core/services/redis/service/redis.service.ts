import { Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly redisClient: Redis;

  private readonly logger = new Logger(RedisService.name);

  constructor() {
    this.redisClient = new Redis();
  }

  async setValue(key: string, value: object, ttl: number): Promise<'OK'> {
    return this.redisClient.set(
      key,
      JSON.stringify(value),
      'EX',
      ttl,
      (error) => {
        if (error) {
          this.logger.error('Redis Set Error: ', error);
        }
      },
    );
  }

  async getValue(key: string): Promise<string | null> {
    return this.redisClient.get(key, (error) => {
      if (error) {
        this.logger.error('Redis Get Error: ', error);
      }
    });
  }
}
