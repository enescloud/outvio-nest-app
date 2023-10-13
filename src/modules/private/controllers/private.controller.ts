import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RateLimiter } from '../../rate-limiter/decorators/rate-limiter.decarator';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { PrivateResponseDto } from '../dto/private.response.dto';
import { PrivateInputDto } from '../dto/private.input.dto';
import { PrivateService } from '../services/private.service';

@ApiTags('private')
@Controller({
  version: '1',
  path: 'private',
})
export class PrivateController {
  constructor(private readonly privateService: PrivateService) {}

  @RateLimiter(5)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  getPrivates(): Promise<PrivateResponseDto[]> {
    return this.privateService.findMany();
  }

  @RateLimiter()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get('/:id')
  getPrivate(@Param('id') id: string): Promise<PrivateResponseDto> {
    return this.privateService.findById(id);
  }

  @RateLimiter(2)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  create(
    @Body() createPrivateDto: PrivateInputDto,
  ): Promise<PrivateResponseDto> {
    return this.privateService.create(createPrivateDto);
  }

  @RateLimiter(2)
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch('/:id')
  updateById(
    @Param('id') id: string,
    @Body() privateInputDto: PrivateInputDto,
  ): Promise<PrivateResponseDto> {
    return this.privateService.updateById(id, privateInputDto);
  }

  @RateLimiter()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('/:id')
  delete(@Param('id') id: string): Promise<void> {
    return this.privateService.deleteById(id);
  }
}
