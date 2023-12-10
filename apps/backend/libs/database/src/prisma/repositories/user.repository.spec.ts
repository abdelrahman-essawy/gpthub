import { Test, TestingModule } from '@nestjs/testing';
import { PrismaUserRepository } from './user.repository';
import { mockPrismaClient } from '../prisma.repository.spec';
import { IUserRepository } from '@core';

describe('PrismaUserRepository', () => {
  let prismaUserRepository: PrismaUserRepository;

  const mockUserPrismaClient: IUserRepository = {
    ...mockPrismaClient,
    findByEmail: jest.fn(),
    findByUsername: jest.fn(),
    isEmailExists: jest.fn(),
    isUsernameExists: jest.fn(),
    findByUsernameOrEmail: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: PrismaUserRepository,
          useValue: mockUserPrismaClient,
        },
        PrismaUserRepository,
      ],
    }).compile();

    prismaUserRepository =
      module.get<PrismaUserRepository>(PrismaUserRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(prismaUserRepository).toBeDefined();
  });

  describe('findByUsername', () => {
    it('should call findByUsername with the correct parameters', async () => {
      const username = 'testUsername';
      await prismaUserRepository.findByUsername(username);

      expect(mockUserPrismaClient.findByUsername).toHaveBeenCalledWith(
        username,
        expect.any(Object) // Adjust as needed
      );
    });
  });
});
