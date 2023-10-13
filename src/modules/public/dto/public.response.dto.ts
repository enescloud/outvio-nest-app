import { PickType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { pick } from 'lodash';
import { PublicEntity } from '../entities/public.entity';

export const publicArgs = Prisma.validator<Prisma.PublicArgs>()({
  select: {
    id: true,
    name: true,
    createdAt: true,
    updatedAt: true,
  },
});

const properties: (keyof PublicEntity)[] = [
  'id',
  'name',
  'createdAt',
  'updatedAt',
];

export type PublicType = Prisma.PublicGetPayload<typeof publicArgs>;

export class PublicResponseDto extends PickType(PublicEntity, properties) {
  constructor(publicType: PublicType) {
    super();
    const partial = pick(publicType, properties);
    Object.assign(this, partial);
  }
}
