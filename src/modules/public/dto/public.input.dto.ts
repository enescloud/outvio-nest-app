import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class PublicInputDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name!: string;
}
