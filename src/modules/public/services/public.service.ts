import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PublicInputDto } from '../dto/public.input.dto';
import { PublicResponseDto } from '../dto/public.response.dto';
import { PublicRepository } from '../repositories/public.repository';

@Injectable()
export class PublicService {
  constructor(public publicRepository: PublicRepository) {}

  async create(
    createPublicInputDto: PublicInputDto,
  ): Promise<PublicResponseDto> {
    return new PublicResponseDto(
      await this.publicRepository.create({
        ...createPublicInputDto,
      }),
    );
  }

  async findById(id: string): Promise<PublicResponseDto> {
    return new PublicResponseDto(await this.publicRepository.findById(id));
  }

  async findMany(): Promise<PublicResponseDto[]> {
    const publics = await this.publicRepository.findMany({});

    return publics.map((publicItem) => new PublicResponseDto(publicItem));
  }

  async updateById(
    id: string,
    data: Prisma.PublicUpdateInput,
  ): Promise<PublicResponseDto> {
    // Check if the user exists
    await this.publicRepository.findById(id);

    return new PublicResponseDto(
      await this.publicRepository.updateById({ id }, data),
    );
  }

  async deleteById(id: string): Promise<void> {
    await this.publicRepository.deleteById(id);
  }
}
