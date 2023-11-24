import { Test, TestingModule } from '@nestjs/testing';
import { ResourcesController } from './resources.controller';
import { ResourcesService } from './resources.service';

describe('ResourceProcessingController', () => {
  let resources: ResourcesController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ResourcesController],
      providers: [ResourcesService],
    }).compile();

    resources = app.get<ResourcesController>(ResourcesController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(resources.getHello()).toBe('Hello World!');
    });
  });
});
