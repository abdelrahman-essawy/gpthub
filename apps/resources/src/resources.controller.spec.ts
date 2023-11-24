import { Test, TestingModule } from '@nestjs/testing';
import { ResourceProcessingController } from './resources.controller';
import { ResourceProcessingService } from './resources.service';

describe('ResourceProcessingController', () => {
  let resourceProcessingController: ResourceProcessingController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ResourceProcessingController],
      providers: [ResourceProcessingService],
    }).compile();

    resourceProcessingController = app.get<ResourceProcessingController>(
      ResourceProcessingController,
    );
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(resourceProcessingController.getHello()).toBe('Hello World!');
    });
  });
});
