import { ApiProperty } from '@nestjs/swagger';

export class TokenResponseDto {
  constructor(partial: Partial<TokenResponseDto>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  token!: string;
}
