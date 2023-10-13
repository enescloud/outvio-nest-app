import { Test, TestingModule } from '@nestjs/testing';
import { PublicService } from './public.service';
import { AppModule } from '@app/module';
import { setupVersioning } from '@app/setup';
import { INestApplication } from '@nestjs/common';
import { isArray } from 'lodash';
import { PrismaService } from '@core/services/prisma';
import { PublicInputDto } from '../dto/public.input.dto';
import { PublicResponseDto } from '../dto/public.response.dto';

describe('PublicService', () => {
  let app: INestApplication;
  let service: PublicService;
  let prismaService: PrismaService;
  let deleteSpy: jest.SpyInstance;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupVersioning(app);
    await app.init();

    service = app.get<PublicService>(PublicService);
    prismaService = app.get<PrismaService>(PrismaService);
    deleteSpy = jest.spyOn(prismaService.public, 'delete');
  });

  afterEach(() => {
    // Clear spyOn after every test
    deleteSpy.mockRestore();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create-public', () => {
    it('should create a new public entity', async () => {
      const createPublicInputDto: PublicInputDto = {
        name: 'public_test1',
      };

      const createdPublic = await service.create(createPublicInputDto);

      expect(createdPublic).toBeDefined();
      expect(createdPublic).toBeInstanceOf(PublicResponseDto);

      expect(createdPublic).toMatchObject(
        expect.objectContaining({
          id: createdPublic.id,
          name: createPublicInputDto.name,
        }),
      );
    });
  });

  describe('find-by-id', () => {
    it('should create a public entity and should get entity by that entity id', async () => {
      const createPublicInputDto: PublicInputDto = {
        name: 'public_test2',
      };

      const createdPublic = await service.create(createPublicInputDto);

      const response = await service.findById(createdPublic.id);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(PublicResponseDto);

      expect(response).toMatchObject(
        expect.objectContaining({
          id: createdPublic.id,
          name: createdPublic.name,
          createdAt: createdPublic.createdAt,
          updatedAt: createdPublic.createdAt,
        }),
      );
    });
  });

  describe('find-all', () => {
    it('should create a public entity and should get all entities', async () => {
      const response = await service.findMany();

      expect(response).toBeDefined();
      expect(isArray(response)).toBe(true);
      expect(response.length).toBeGreaterThan(0);
      response.forEach((item) => {
        expect(item).toBeInstanceOf(PublicResponseDto);
      });
    });
  });

  describe('update-by-id', () => {
    it('should create a public entity and should update entity by that entity id', async () => {
      const createPublicInputDto: PublicInputDto = {
        name: 'public_test3',
      };

      const createdPublic = await service.create(createPublicInputDto);

      const updatePublicInputDto: PublicInputDto = {
        name: 'public_test3_updated',
      };

      const updatedPublic = await service.updateById(
        createdPublic.id,
        updatePublicInputDto,
      );

      expect(updatedPublic).toBeDefined();
      expect(updatedPublic).toBeInstanceOf(PublicResponseDto);

      expect(updatedPublic).toMatchObject(
        expect.objectContaining({
          id: createdPublic.id,
          name: updatePublicInputDto.name,
          createdAt: createdPublic.createdAt,
          updatedAt: updatedPublic.updatedAt,
        }),
      );
    });
  });

  describe('delete-by-id', () => {
    it('should create a public entity and should delete that entity', async () => {
      const createPublicInputDto: PublicInputDto = {
        name: 'public_test3',
      };

      const createdPublic = await service.create(createPublicInputDto);

      jest.spyOn(prismaService.public, 'delete');

      await service.deleteById(createdPublic.id);

      expect(deleteSpy).toHaveBeenCalledWith({
        where: { id: createdPublic.id },
      });
    });
  });
});
