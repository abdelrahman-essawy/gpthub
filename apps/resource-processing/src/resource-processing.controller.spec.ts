import { Test, TestingModule } from '@nestjs/testing';
import { ResourceProcessingController } from './resource-processing.controller';
import { ResourceProcessingService } from './resource-processing.service';

describe('ResourceProcessingController', () => {
  let resourceProcessingController: ResourceProcessingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ResourceProcessingController],
      providers: [ResourceProcessingService],
    }).compile();

    resourceProcessingController = app.get<ResourceProcessingController>(ResourceProcessingController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(resourceProcessingController.getHello()).toBe('Hello World!');
    });
  });
});
