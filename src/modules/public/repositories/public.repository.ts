import { PrismaService } from '@core/services/prisma';
import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { Prisma, Public } from '@prisma/client';

@Injectable()
export class PublicRepository {
  public readonly logger = new Logger(PublicRepository.name);

  constructor(public readonly prismaService: PrismaService) {}

  async create(data: Prisma.PublicCreateInput): Promise<Public> {
    return this.prismaService.public.create({ data }).catch((e) => {
      this.logger.error('Prisma Create failed', e);
      throw new ConflictException('Create failed');
    });
  }

  async updateById(
    where: Prisma.PublicWhereUniqueInput,
    data: Prisma.PublicUpdateInput,
  ): Promise<Public> {
    return this.prismaService.public.update({ data, where }).catch((e) => {
      this.logger.error('Prisma Update failed', e);
      throw new ConflictException('Update failed');
    });
  }

  async deleteById(id: string): Promise<void> {
    await this.prismaService.public
      .delete({
        where: { id },
      })
      .catch((e) => {
        this.logger.error('Prisma Delete failed', e);
        throw new ConflictException('Delete failed');
      });
  }

  async findById(id: string): Promise<Public> {
    return this.prismaService.public.findUniqueOrThrow({ where: { id } });
  }

  async findMany(where: Prisma.PublicWhereInput): Promise<Public[]> {
    return this.prismaService.public
      .findMany({
        where,
      })
      .catch((e) => {
        this.logger.error('Prisma findMany failed', e);
        throw new ConflictException('Error while fetching users');
      });
  }
}
