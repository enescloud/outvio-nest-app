import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrivateInputDto } from '../dto/private.input.dto';
import { PrivateRepository } from '../repositories/private.repository';
import { PrivateResponseDto } from '../dto/private.response.dto';

@Injectable()
export class PrivateService {
  constructor(private privateRepository: PrivateRepository) {}

  async create(
    createPrivateInputDto: PrivateInputDto,
  ): Promise<PrivateResponseDto> {
    return new PrivateResponseDto(
      await this.privateRepository.create({
        ...createPrivateInputDto,
      }),
    );
  }

  async findById(id: string): Promise<PrivateResponseDto> {
    return new PrivateResponseDto(await this.privateRepository.findById(id));
  }

  async findMany(): Promise<PrivateResponseDto[]> {
    const privates = await this.privateRepository.findMany({});

    return privates.map((privateItem) => new PrivateResponseDto(privateItem));
  }

  async updateById(
    id: string,
    data: Prisma.PrivateUpdateInput,
  ): Promise<PrivateResponseDto> {
    // Check if the user exists
    await this.privateRepository.findById(id);

    return new PrivateResponseDto(
      await this.privateRepository.updateById({ id }, data),
    );
  }

  async deleteById(id: string): Promise<void> {
    await this.privateRepository.deleteById(id);
  }
}
