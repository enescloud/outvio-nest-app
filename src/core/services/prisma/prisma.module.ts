import { Module } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import { PrismaService } from './services/prisma.service';

@Module({
  imports: [PrismaClient],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
