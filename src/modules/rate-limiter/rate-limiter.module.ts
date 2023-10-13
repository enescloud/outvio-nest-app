import { Module } from '@nestjs/common';
import { RateLimiterService } from './services/rate-limiter.service';
import { RedisModule } from '../../core/services/redis/redis.module';

@Module({
  imports: [RedisModule],
  providers: [RateLimiterService],
  exports: [RateLimiterService],
})
export class RateLimiterModule {}
