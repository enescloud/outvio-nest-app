import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariables } from '../env.validation';
import { AppModule } from '@app/module';
import { setupVersioning } from '@app/setup';
import { PrivateService } from 'src/modules/private/services/private.service';
import { INestApplication } from '@nestjs/common';
import { AppConfigService } from './config.service';

describe('AppConfigService', () => {
  let app: INestApplication;
  let service: AppConfigService;
  let configService: ConfigService<EnvironmentVariables>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupVersioning(app);
    await app.init();

    service = app.get<AppConfigService>(AppConfigService);
    configService = app.get<ConfigService<EnvironmentVariables>>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return STAGE value', () => {
    const stageValue = 'development';
    jest.spyOn(configService, 'getOrThrow').mockReturnValue(stageValue);

    expect(service.STAGE).toBe(stageValue);
  });

  it('should return PORT value', () => {
    const portValue = 3000;
    jest.spyOn(configService, 'getOrThrow').mockReturnValue(portValue);

    expect(service.PORT).toBe(portValue);
  });

  it('should return DATABASE_URL value', () => {
    const databaseUrlValue = 'your_database_url_here';
    jest.spyOn(configService, 'getOrThrow').mockReturnValue(databaseUrlValue);

    expect(service.DATABASE_URL).toBe(databaseUrlValue);
  });

  it('should return values using the generic get method', () => {
    const customValue = 'custom_value';
    jest.spyOn(configService, 'getOrThrow').mockReturnValue(customValue);

    const key: keyof EnvironmentVariables = 'REQUEST_TTL';
    const result = service.get<string>(key);

    expect(result).toBe(customValue);
  });

  it('should return isNeedSecrets value', () => {
    expect(service.isNeedSecrets).toBe(true);
  });

  it('should return isNeedEnv value', () => {
    expect(AppConfigService.isNeedEnv).toBe(true);
  });
});
