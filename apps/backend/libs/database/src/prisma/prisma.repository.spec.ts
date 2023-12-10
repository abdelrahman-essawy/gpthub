import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import { PrismaRepository } from './repository';
import { PrismaUserRepository } from './repositories';

export const mockPrismaClient = {
  create: jest.fn(),
  update: jest.fn(),
  delete: jest.fn(),
  find: jest.fn(),
  findOneById: jest.fn(),
  search: jest.fn(),
  deleteAll: jest.fn(),
  count: jest.fn(),
};

describe('PrismaRepository', () => {
  let prismaRepository: PrismaRepository<PrismaClient['user']>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaClient,
          useValue: mockPrismaClient,
        },
        PrismaRepository,
        PrismaUserRepository,
      ],
    }).compile();

    prismaRepository =
      module.get<PrismaRepository<PrismaClient['user']>>(PrismaRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(prismaRepository).toBeDefined();
  });
});
