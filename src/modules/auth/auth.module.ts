import { Module } from '@nestjs/common';
import { AppConfigService } from '@core/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthConstants } from './constants/auth.constants';
import { RateLimiterModule } from '../rate-limiter/rate-limiter.module';

@Module({
  imports: [
    RateLimiterModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: AppConfigService) => ({
        secret: configService.get('ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: AuthConstants.accessTokenExpiresIn,
        },
      }),
      inject: [AppConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
