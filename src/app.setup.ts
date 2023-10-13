import { INestApplication, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import path from 'path';

export function setupSwagger(app: INestApplication): void {
  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Outvio Nest App')
    .setDescription('Nest Prisma Mongo Rest API Documentation')
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
    })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });
  const outputPath = path.resolve(process.cwd(), 'docs/swagger.json');
  writeFileSync(outputPath, JSON.stringify(document), { encoding: 'utf8' });
  // Swagger UI - http://localhost:3003/api
  // Swagger json - http://localhost:3003/api-json
  // ****************
}

export function setupVersioning(app: INestApplication): void {
  // Versioning
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  // ****************
}
