import { Module } from '@nestjs/common';
import { PrismaModule } from '@core/services/prisma';
import { PrivateService } from './services/private.service';
import { PrivateController } from './controllers/private.controller';
import { PrivateRepository } from './repositories/private.repository';
import { RateLimiterModule } from '../rate-limiter/rate-limiter.module';

@Module({
  imports: [PrismaModule, RateLimiterModule],
  controllers: [PrivateController],
  providers: [PrivateService, PrivateRepository],
  exports: [PrivateService],
})
export class PrivateModule {}
