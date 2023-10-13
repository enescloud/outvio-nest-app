import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AppConfigService } from '@core/config';
import { v4 as uuid4 } from 'uuid';
import { TokenResponseDto } from '../dto/token-response.dto';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private jwtService: JwtService,
    private configService: AppConfigService,
  ) {}

  async createToken(): Promise<TokenResponseDto> {
    const token = await this.jwtService
      .signAsync(
        {
          id: uuid4(),
        },
        {
          secret: this.configService.get('ACCESS_TOKEN_SECRET'),
        },
      )
      .catch((e) => {
        this.logger.error(`Error in AuthService.generateTokens: `, e);
        throw new Error(`Could not generate access token`);
      });
    return new TokenResponseDto({
      token,
    });
  }
}
