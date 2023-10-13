import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppConfigService } from './services/config.service';
import { validate } from './env.validation';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: AppConfigService.isNeedEnv
        ? `./env/.env.${String(process.env.STAGE ?? 'dev')}`
        : undefined,
      ignoreEnvFile: !AppConfigService.isNeedEnv,
      validate,
    }),
  ],
  controllers: [],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
