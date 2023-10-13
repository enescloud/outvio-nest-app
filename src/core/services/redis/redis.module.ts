/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Module } from '@nestjs/common';
import { RedisService } from './service/redis.service';

@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
