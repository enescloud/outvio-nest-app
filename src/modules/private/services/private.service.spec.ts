import { Test, TestingModule } from '@nestjs/testing';
import { PrivateService } from './private.service';
import { AppModule } from '@app/module';
import { setupVersioning } from '@app/setup';
import { INestApplication } from '@nestjs/common';
import { PrivateInputDto } from '../dto/private.input.dto';
import { PrivateResponseDto } from '../dto/private.response.dto';
import { isArray } from 'lodash';
import { PrismaService } from '@core/services/prisma';

describe('PrivateService', () => {
  let app: INestApplication;
  let service: PrivateService;
  let prismaService: PrismaService;
  let deleteSpy: jest.SpyInstance;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    setupVersioning(app);
    await app.init();

    service = app.get<PrivateService>(PrivateService);
    prismaService = app.get<PrismaService>(PrismaService);
    deleteSpy = jest.spyOn(prismaService.private, 'delete');
  });

  afterEach(() => {
    // Clear spyOn after every test
    deleteSpy.mockRestore();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create-private', () => {
    it('should create a new private entity', async () => {
      const createPrivateInputDto: PrivateInputDto = {
        name: 'private_test1',
      };

      const createdPrivate = await service.create(createPrivateInputDto);

      expect(createdPrivate).toBeDefined();
      expect(createdPrivate).toBeInstanceOf(PrivateResponseDto);

      expect(createdPrivate).toMatchObject(
        expect.objectContaining({
          id: createdPrivate.id,
          name: createPrivateInputDto.name,
        }),
      );
    });
  });

  describe('find-by-id', () => {
    it('should create a private entity and should get entity by that entity id', async () => {
      const createPrivateInputDto: PrivateInputDto = {
        name: 'private_test2',
      };

      const createdPrivate = await service.create(createPrivateInputDto);

      const response = await service.findById(createdPrivate.id);

      expect(response).toBeDefined();
      expect(response).toBeInstanceOf(PrivateResponseDto);

      expect(response).toMatchObject(
        expect.objectContaining({
          id: createdPrivate.id,
          name: createdPrivate.name,
          createdAt: createdPrivate.createdAt,
          updatedAt: createdPrivate.createdAt,
        }),
      );
    });
  });

  describe('find-all', () => {
    it('should create a private entity and should get all entities', async () => {
      const response = await service.findMany();

      expect(response).toBeDefined();
      expect(isArray(response)).toBe(true);
      expect(response.length).toBeGreaterThan(0);
      response.forEach((item) => {
        expect(item).toBeInstanceOf(PrivateResponseDto);
      });
    });
  });

  describe('update-by-id', () => {
    it('should create a private entity and should update entity by that entity id', async () => {
      const createPrivateInputDto: PrivateInputDto = {
        name: 'private_test3',
      };

      const createdPrivate = await service.create(createPrivateInputDto);

      const updatePrivateInputDto: PrivateInputDto = {
        name: 'private_test3_updated',
      };

      const updatedPrivate = await service.updateById(
        createdPrivate.id,
        updatePrivateInputDto,
      );

      expect(updatedPrivate).toBeDefined();
      expect(updatedPrivate).toBeInstanceOf(PrivateResponseDto);

      expect(updatedPrivate).toMatchObject(
        expect.objectContaining({
          id: createdPrivate.id,
          name: updatePrivateInputDto.name,
          createdAt: createdPrivate.createdAt,
          updatedAt: updatedPrivate.updatedAt,
        }),
      );
    });
  });

  describe('delete-by-id', () => {
    it('should create a private entity and should delete that entity', async () => {
      const createPrivateInputDto: PrivateInputDto = {
        name: 'private_test3',
      };

      const createdPrivate = await service.create(createPrivateInputDto);

      jest.spyOn(prismaService.private, 'delete');

      await service.deleteById(createdPrivate.id);

      expect(deleteSpy).toHaveBeenCalledWith({
        where: { id: createdPrivate.id },
      });
    });
  });
});
