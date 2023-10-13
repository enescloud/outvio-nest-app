import { NestFactory } from '@nestjs/core';

import { AppConfigService } from '@core/config';

import { PrismaService } from '@core/services/prisma';
import { AppModule } from './app.module';
import { setupSwagger, setupVersioning } from './app.setup';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    rawBody: true,
  });

  setupVersioning(app);
  setupSwagger(app);
  app.enableCors({
    credentials: true,
    origin: '*',
  });

  const prismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);

  // Get config
  const configService = app.get(AppConfigService);
  console.log('STAGE: ', configService.STAGE);

  // ****************
  // Start server
  await app.listen(configService.PORT);
  // ****************
}
bootstrap().catch((err) => {
  console.error(err);
});
