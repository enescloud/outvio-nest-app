import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Delete,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RateLimiter } from '../../rate-limiter/decorators/rate-limiter.decarator';
import { PublicInputDto } from '../dto/public.input.dto';
import { PublicResponseDto } from '../dto/public.response.dto';
import { PublicService } from '../services/public.service';

@ApiTags('public')
@Controller({
  version: '1',
  path: 'public',
})
export class PublicController {
  constructor(public readonly publicService: PublicService) {}

  @RateLimiter(5)
  @Get()
  getPublics(): Promise<PublicResponseDto[]> {
    return this.publicService.findMany();
  }

  @RateLimiter()
  @Get('/:id')
  getPublic(@Param('id') id: string): Promise<PublicResponseDto> {
    return this.publicService.findById(id);
  }

  @RateLimiter(2)
  @Post()
  create(@Body() createPublicDto: PublicInputDto): Promise<PublicResponseDto> {
    return this.publicService.create(createPublicDto);
  }

  @RateLimiter(2)
  @Patch('/:id')
  updateById(
    @Param('id') id: string,
    @Body() publicInputDto: PublicInputDto,
  ): Promise<PublicResponseDto> {
    return this.publicService.updateById(id, publicInputDto);
  }

  @RateLimiter()
  @Delete('/:id')
  delete(@Param('id') id: string): Promise<void> {
    return this.publicService.deleteById(id);
  }
}
