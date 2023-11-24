import { Controller, Get } from '@nestjs/common';
import { ResourcesService } from './resources.service';

@Controller()
export class ResourcesController {
  // constructor(private readonly resourceProcessingService: ResourceProcessingService) {}

  @Get()
  getHello(): string {
    return 'Hello Worlds!';
  }
}
