import { PrismaService } from '@core/services/prisma';
import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { Prisma, Private } from '@prisma/client';

@Injectable()
export class PrivateRepository {
  private readonly logger = new Logger(PrivateRepository.name);

  constructor(private readonly prismaService: PrismaService) {}

  async create(data: Prisma.PrivateCreateInput): Promise<Private> {
    return this.prismaService.private.create({ data }).catch((e) => {
      this.logger.error('Prisma Create failed', e);
      throw new ConflictException('Create failed');
    });
  }

  async updateById(
    where: Prisma.PrivateWhereUniqueInput,
    data: Prisma.PrivateUpdateInput,
  ): Promise<Private> {
    return this.prismaService.private.update({ data, where }).catch((e) => {
      this.logger.error('Prisma Update failed', e);
      throw new ConflictException('Update failed');
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.prismaService.private
      .delete({
        where: { id },
      })
      .catch((e) => {
        this.logger.error('Prisma Delete failed', e);
        throw new ConflictException('Delete failed');
      });
  }

  async findById(id: string): Promise<Private> {
    return this.prismaService.private.findUniqueOrThrow({ where: { id } });
  }

  async findMany(where: Prisma.PrivateWhereInput): Promise<Private[]> {
    return this.prismaService.private
      .findMany({
        where,
      })
      .catch((e) => {
        this.logger.error('Prisma findMany failed', e);
        throw new ConflictException('Error while fetching users');
      });
  }
}
