import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EnvironmentVariables } from '../env.validation';

@Injectable()
/* The `AppConfigService` class provides methods to retrieve configuration values from the
`ConfigService` and has static properties to check if secrets or environment variables are needed. */
export class AppConfigService {
  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
  ) {}

  get STAGE(): string {
    return this.configService.getOrThrow('STAGE');
  }

  get PORT(): number {
    return this.configService.getOrThrow('PORT');
  }

  get DATABASE_URL(): string {
    return this.configService.getOrThrow<string>('DATABASE_URL');
  }

  get<T>(key: keyof EnvironmentVariables): T {
    return this.configService.getOrThrow<T>(key);
  }

  get isNeedSecrets(): boolean {
    return true;
  }

  static get isNeedEnv(): boolean {
    return true;
  }
}
