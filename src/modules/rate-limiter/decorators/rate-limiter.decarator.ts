/* eslint-disable @typescript-eslint/naming-convention */
import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { RateLimiterGuard } from '../guards/rate-limiter.guard';

export function RateLimiter(weight?: number): MethodDecorator {
  return applyDecorators(
    SetMetadata('weight', weight),
    UseGuards(RateLimiterGuard),
  );
}
