import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { AppConfigService } from '@core/config';

/* The PrismaService class extends the PrismaClient class and implements the OnModuleInit interface,
providing functionality for connecting to a database and enabling shutdown hooks. */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(configService: AppConfigService) {
    super({
      errorFormat: 'minimal',
      datasources: {
        db: {
          url: configService.DATABASE_URL,
        },
      },
    });
  }

  async onModuleInit(): Promise<void> {
    await this.$connect();
  }

  enableShutdownHooks(app: INestApplication): void {
    this.$on('beforeExit', () => async () => {
      await app.close();
    });
  }
}
