import { Controller, Get } from '@nestjs/common';
import { ResourceProcessingService } from './resources.service';

@Controller()
export class ResourceProcessingController {
  // constructor(private readonly resourceProcessingService: ResourceProcessingService) {}

  @Get()
  getHello(): string {
    return 'Hello Worlds!';
  }
}
