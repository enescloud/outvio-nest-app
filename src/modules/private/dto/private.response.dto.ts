import { PickType } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import { pick } from 'lodash';
import { PrivateEntity } from '../entities/private.entity';

export const privateArgs = Prisma.validator<Prisma.PrivateArgs>()({
  select: {
    id: true,
    name: true,
    createdAt: true,
    updatedAt: true,
  },
});

const properties: (keyof PrivateEntity)[] = [
  'id',
  'name',
  'createdAt',
  'updatedAt',
];

export type PrivateType = Prisma.PrivateGetPayload<typeof privateArgs>;

export class PrivateResponseDto extends PickType(PrivateEntity, properties) {
  constructor(privateType: PrivateType) {
    super();
    const partial = pick(privateType, properties);
    Object.assign(this, partial);
  }
}
