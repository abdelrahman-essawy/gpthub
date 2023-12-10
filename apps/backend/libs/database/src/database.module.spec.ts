import { Test, TestingModule } from '@nestjs/testing';

import { DatabaseService } from '@core';
import { DatabaseModule } from './database.module';

describe('DatabaseModule', () => {
  let testingModule: TestingModule;

  beforeAll(async () => {
    testingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
    }).compile();
  });

  it('should be defined', () => {
    const module = testingModule.get<DatabaseModule>(DatabaseModule);
    expect(module).toBeDefined();
  });

  it('should provide DatabaseService', () => {
    const databaseService = testingModule.get<DatabaseService>(DatabaseService);
    expect(databaseService).toBeDefined();
  });
});
