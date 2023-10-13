import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { AppModule } from '@app/module';
import { setupVersioning } from '@app/setup';
import { PrismaService } from '@core/services/prisma';
import { INestApplication } from '@nestjs/common';
import { TokenResponseDto } from '../dto/token-response.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AppConfigService } from '@core/config';

describe('AuthService', () => {
  let app: INestApplication;
  let service: AuthService;
  let jwtService: JwtService;
  let configService: AppConfigService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupVersioning(app);
    await app.init();

    configService = app.get<AppConfigService>(AppConfigService);
    jwtService = app.get<JwtService>(JwtService);
    service = app.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('create-token', () => {
    it('should create a token', async () => {
      jest.spyOn(jwtService, 'signAsync');

      const result = await service.createToken();

      expect(result).toBeInstanceOf(TokenResponseDto);
      expect(jwtService.signAsync).toHaveBeenCalledWith(
        {
          id: expect.any(String),
        },
        {
          secret: configService.get('ACCESS_TOKEN_SECRET'),
        },
      );
    });
  });
});
