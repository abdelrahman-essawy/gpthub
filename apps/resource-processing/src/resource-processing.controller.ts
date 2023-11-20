import { Controller, Get } from '@nestjs/common';
import { ResourceProcessingService } from './resource-processing.service';

@Controller()
export class ResourceProcessingController {
  // constructor(private readonly resourceProcessingService: ResourceProcessingService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }
}
