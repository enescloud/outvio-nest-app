import { Module } from '@nestjs/common';
import { PrismaModule } from '@core/services/prisma';
import { PublicService } from './services/public.service';
import { PublicController } from './controllers/public.controller';
import { PublicRepository } from './repositories/public.repository';
import { RateLimiterModule } from '../rate-limiter/rate-limiter.module';

@Module({
  imports: [PrismaModule, RateLimiterModule],
  controllers: [PublicController],
  providers: [PublicService, PublicRepository],
})
export class PublicModule {}
