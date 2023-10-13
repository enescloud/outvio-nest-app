/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { AppConfigService } from '@core/config';
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { RateLimiterService } from '../services/rate-limiter.service';
import { RateLimiterOptions, RedisKeyType } from '../types/rate-limiter.types';
import { RateLimiterException } from '../exceptions/rate-limiter.exeception';

@Injectable()
export class RateLimiterGuard implements CanActivate {
  constructor(
    private configService: AppConfigService,
    private rateLimiterService: RateLimiterService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    let token: string | undefined;
    const ttl: number = this.configService.get('REQUEST_TTL');
    const weight =
      (Reflect.getMetadata('weight', context.getHandler()) as number) || 1;
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization as string;

    if (!request || !request.ip) {
      return false;
    }

    const ip = request.ip as string;

    if (authorization && authorization.startsWith('Bearer')) {
      token = (request.headers.authorization as string)
        .replace('Bearer', '')
        .trim();
    }

    await this.handleRequest({ ip, token, ttl, weight });
    return true;
  }

  async handleRequest(options: RateLimiterOptions): Promise<void> {
    const { ip, token, weight, ttl } = options;

    if (token) {
      await this.checkAndIncrementTotalHit(
        token,
        ttl,
        weight,
        RedisKeyType.token,
      );
      return;
    }

    await this.checkAndIncrementTotalHit(ip, ttl, weight, RedisKeyType.ip);
  }

  async checkAndIncrementTotalHit(
    key: string,
    ttl: number,
    weight: number,
    type: RedisKeyType,
  ): Promise<void> {
    const { totalHits, expiresAt } = await this.rateLimiterService.increment(
      key,
      ttl,
      weight,
    );
    const limit: number =
      type === RedisKeyType.ip
        ? this.configService.get('IP_REQUEST_LIMIT')
        : this.configService.get('TOKEN_REQUEST_LIMIT');

    if (totalHits > limit) {
      throw new RateLimiterException(
        `You have exceeded the request limit. Your Request Limit: ${limit} Expire Time: ${
          new Date(expiresAt) as unknown as string
        }`,
      );
    }
  }
}
